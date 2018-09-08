import React from "react";
import { Style } from "react";
import CodeView from "./CodeView";
import { Line } from 'rc-progress';


class LiveCodeView extends React.Component {
  state = {
    data: null,
    percent: 0,
    color: '#3FC7FA',
  };

  on_wsopen() {
    this.ws.send(
      JSON.stringify({
        type: "register",
        filename: this.props.file
      })
    );
  }

  on_wsclose() { }

  on_wsmessage(message) {
    var data = JSON.parse(message.data);
    if (data.source == this.props.file) {
      this.setState({ data: data });
    }
  }

  constructor(props) {
    super(props);
    this.ws = new WebSocket("ws://localhost:3001/");
    this.ws.onopen = this.on_wsopen.bind(this);
    this.ws.onclose = this.on_wsclose.bind(this);
    this.ws.onmessage = this.on_wsmessage.bind(this);
  }

  render() {
	  const containerStyle = {
		  width: "250px"
	  }
    return (
      <div>
        {/* Live Code View controls */}
        <CodeView stats={this.state.data} />
      </div>
    );
  }
}

export default LiveCodeView;
