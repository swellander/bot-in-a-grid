import React, { Component } from "react";
import Cell from "./Cell";
import "./App.css";
import { Button } from "@material-ui/core";

class App extends Component {
  state = {
    board: new Array(10).fill(1).map(row => new Array(10).fill(" "))
  };

  handleClick = (row, col) => {
    if (row === 0 && col === 0) return;
    const { board } = this.state;
    const currVal = board[row][col];
    const newBoard = board.slice("");
    newBoard[row][col] = currVal === "X" ? " " : "X";
    this.setState({ board: newBoard });
  };

  runBot = () => {
    const rows = 10;
    const cols = 10;
    const that = this;

    function findPath([y, x], board) {
      if (y === rows || x === cols) return false;
      const cell = board[y][x];
      if (cell === "X") return false;

      board = board.slice("");
      if (y === rows - 1 && x === cols - 1) {
        board[y][x] = "!";
        that.setState({ board });
        return true;
      }
      //if bad cell return false
      board[y][x] = "O";

      that.setState({ board });
      return findPath([y + 1, x], board) || findPath([y, x + 1], board);
    }
    findPath([0, 0], this.state.board);
  };

  reset = () => {
    const newBoard = new Array(10).fill(1).map(row => new Array(10).fill(" "));
    this.setState({ board: newBoard });
  };

  render() {
    return (
      <div className="App">
        <table className="App-header">
          <Button variant="contained" onClick={this.runBot}>
            Run Bot
          </Button>
          {this.state.board.map((row, i) => (
            <tr>
              {row.map((val, j) => (
                <Cell
                  handleClick={this.handleClick}
                  val={val}
                  row={i}
                  col={j}
                />
              ))}
            </tr>
          ))}
          <Button variant="contained" onClick={this.reset}>
            Reset
          </Button>
        </table>
      </div>
    );
  }
}

export default App;
