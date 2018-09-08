import React from "react";
import { Style } from "react";
import CodeView from "./CodeView";
import Slider from "@material-ui/lab/Slider";
import { withStyles } from "@material-ui/core/styles";
import { fetchTimeline } from "../fetchfiles";
import Moment from 'moment';


class TimelineCodeView extends React.Component {
  state = {
    data: {
      lines: []
    },
    timeline: {},
    timelineKeys: [],
    value: 0,
  
  };

  getTimeline() {
    fetchTimeline(this.props.file).then(res => {
      console.log(res);
      this.setState({ timeline: res, timelineKeys: Object.keys(res) });
    });
  }

  handleChange(event, value) {
	//   console.log("timeline...", this.state.timeline[this.state.timelineKeys[value]]);
    this.setState({
      value: value,
      data: this.state.timeline[this.state.timelineKeys[value]]
    });
  }

  constructor(props) {
    super(props); // file
    this.handleChange = this.handleChange.bind(this);
    this.getTimeline();
  }

  render() {
    const containerStyle = {
      width: '250px',
    };
    return (
      <div>
        <Slider
          value={this.state.value}
          min={0}
          max={this.state.timelineKeys.length - 1}
          step={1}
          onChange={this.handleChange}
        />
        At time : {Moment(this.state.timelineKeys[this.state.value]).format('yyyy-MM-dd HH:mm:ss.SSS')}
        <CodeView stats={this.state.data} />
      </div>
    );
  }
}

export default TimelineCodeView;
