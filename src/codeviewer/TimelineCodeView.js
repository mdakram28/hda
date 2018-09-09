import React from "react";
import { Style } from "react";
import CodeView from "./CodeView";
import Slider from "@material-ui/lab/Slider";
import { withStyles } from "@material-ui/core/styles";
import { fetchTimeline } from "../fetchfiles";
import Moment from "moment";

class TimelineCodeView extends React.Component {
  state = {
    data: null,
    timeline: {},
    timelineKeys: [],
    value: 0,
    percent: 50,
    color: "#3FC7FA"
  };

  getTimeline() {
    fetchTimeline(this.props.file).then(res => {
      //   console.log(res);
      this.setState({ timeline: res, timelineKeys: Object.keys(res) });
      this.handleChange(null, this.state.timelineKeys.length - 1);
    });
  }

  handleChange(event, value) {
    //   console.log("timeline...", this.state.timeline[this.state.timelineKeys[value]]);
    try {
      this.setState({
        value: value,
        data: this.state.timeline[this.state.timelineKeys[value]]
      });
    } catch (err) {}
  }

  constructor(props) {
    super(props); // file
    this.handleChange = this.handleChange.bind(this);
    this.getTimeline();
  }

  render() {
    var date = new Date(parseInt(this.state.timelineKeys[this.state.value]));
    const containerStyle = {
      width: "250px"
    };
    return (
      <div>
        <Slider
          value={this.state.value}
          min={0}
          max={this.state.timelineKeys.length - 1}
          step={1}
          onChange={this.handleChange}
          //   style={{position: "fixed"}}
        />
        Time : {Moment(date).format("YYYY-MM-ddd HH:mm:ss.SSS")}
        <hr />
        <div>
          <CodeView stats={this.state.data} />
        </div>
      </div>
    );
  }
}

export default TimelineCodeView;
