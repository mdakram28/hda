import React from "react";
import { Style } from "react";

class CodeView extends React.Component {
  format_count(count) {
    if (count == "-") count = "";
    else if (count == "#####") {
      count = "";
      // this.refs.code-view.style.color = "red";
    }
    return count;
  }

  format_code(code) {
    return code;
  }

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.stats) return (<span>Loading...</span>);
      return (
        <table class="code-view" cellspacing="0">
          <tr>
            <th class="lineno" col>Line No</th>
            <th class="count">Count Data</th>
            <th class="code">Lines of Code</th>
          </tr>
          {this.props.stats.lines.map((line, index) => (
            <tr
              className={
                line.count == "#####" ? "red" : (line.code.trim() == "" ? "" : "green")
              }>
              <td class="lineno">{index + 1}</td>
              <td class="count">{this.format_count(line.count)}</td>
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
