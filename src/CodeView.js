import React from "react";
import { Style } from "react";

class CodeView extends React.Component {
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

  format_count(count) {
    if (count == "-") count = "";
    else if (count == "#####") count = "";
    return count;
  }

  format_code(code) {
    return code;
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
      <table class="code-view">
        {this.state.data.lines.map((line, index) => (
          <tr>
            <td class="count">{this.format_count(line.count)}</td>
            <td class="lineno">{index + 1}</td>
            <td class="code">
              <pre>{this.format_code(line.code)}</pre>
            </td>
          </tr>
        ))}
      </table>
    );
  }
}

export default CodeView;
