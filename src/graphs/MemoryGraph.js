import React from "react";
import { Style } from "react";
import { fetchTimeline } from "../fetchfiles";
import SimpleLineChart from "./SimpleLineChart";

class MemoryGraph extends React.Component {

	state = {
		timeline: []
	}

  constructor(props) {
	super(props);
	this.getTimeline();
  }


  getTimeline() {
    fetchTimeline(this.props.file).then(res => {
	  console.log(res);
	  var timeline = Object.values(res).sort((a,b) => a.time - b.time);
	  if(timeline.length > 100) {
		  timeline = timeline.slice(100);
	  }
      this.setState({ timeline: timeline });
    });
  }

  render() {
	return (<div>
		<SimpleLineChart data={this.state.timeline} xkey={"time"} ykey={"memory"} />
	</div>);
  }
}

export default MemoryGraph;
