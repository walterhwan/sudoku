import React from "react";
import PropTypes from 'prop-types';
import { strToBoard } from "./helper";
import "./App.css";

const rawProblemStr = '004300209005009001070060043006002087190007400050083000600000105003508690042910300'
const board = strToBoard(rawProblemStr)

// const board = (new Array(9).fill(0)).map(() => new Array(9).fill(0))

const Cell = (props) => {
  const { num = '0' } = props
  const displayNum = num === '0' ? '' : num
  // const displayNum = num
  return (
    <div className="block"><p>{`${displayNum}`}</p></div>
  )
}
Cell.propTypes = {
  num: PropTypes.string,
}

function App() {
  return (
    <div className="app">
      <div className="board">
        {board.map((row, rowIdx) => (
          <div className="row" key={`row-${rowIdx}`}>
            {row.map((cellNum, colIdx) => (
              <Cell key={`cell-${rowIdx}-${colIdx}`} num={cellNum}/>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
