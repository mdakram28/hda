import React from "react";
import { Style } from "react";
import CodeView from "./CodeView";

class LiveCodeView extends React.Component {
  state = {
    data: {
      lines: []
    }
  };

  on_wsopen() {
    this.ws.send(
      JSON.stringify({
        type: "register",
        filename: this.props.file
      })
    );
  }

  on_wsclose() {}

  on_wsmessage(message) {
    var data = JSON.parse(message.data);
    if (data.source == this.props.file) {
      console.log(data);
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
    return (
      <div>
		{/* Live Code View controls */}
        <CodeView stats={this.state.data} />
      </div>
    );
  }
}

export default LiveCodeView;
