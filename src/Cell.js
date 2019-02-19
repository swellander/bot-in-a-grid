import React, { Component } from "react";
import "./App.css";

class Cell extends Component {
  render() {
    const { val, row, col, handleClick } = this.props;
    return (
      <td onClick={() => handleClick(row, col)} className="cell">
        {val}
      </td>
    );
  }
}

export default Cell;
