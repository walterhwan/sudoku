import React from 'react'
import PropTypes from 'prop-types'
import { strToBoard } from './helper'
import './App.css'

const rawProblemStr =
  '004300209005009001070060043006002087190007400050083000600000105003508690042910300'
const startBoard = strToBoard(rawProblemStr)

// const board = (new Array(9).fill(0)).map(() => new Array(9).fill(0))

const Cell = (props) => {
  const { num = '0', onClick, selected, coSelected } = props
  const displayNum = num === '0' ? '' : num
  const id = selected ? 'selected' : coSelected ? 'co-selected' : ''
  return (
    <div className="cell" onClick={onClick} id={id}>
      <p>{`${displayNum}`}</p>
    </div>
  )
}
Cell.propTypes = {
  num: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  coSelected: PropTypes.bool,
}

function useKey(startKey) {
  const [key, setKey] = React.useState(startKey)
  // Event handlers
  const onDown = (event) => {
    console.log('onDown', event.key)
    setKey(event.key)
    // if (match(event)) setPressed(false)
  }
  React.useEffect(() => {
    window.addEventListener('keydown', onDown)

    return () => {
      window.removeEventListener('keydown', onDown)
    }
  }, [key])

  return [key, setKey]
}

function Board() {
  const [board, setBoard] = React.useState(startBoard)
  const [coord, setCoord] = React.useState([])
  const [selectedNum, setSelectedNum] = React.useState()
  const [keyPressed, setKeyPressed] = useKey()

  if (/[0-9]/.test(keyPressed)) {
    const newBoard = [...board]
    newBoard[coord[0]][coord[1]] = keyPressed
    setSelectedNum(keyPressed)
    setKeyPressed()
    setBoard(newBoard)
  }

  const handleOnClick = (rowIdx, colIdx) => () => {
    // if click on the selected cell
    const [row, col] = coord
    setSelectedNum(board[rowIdx][colIdx])
    if (rowIdx === row && colIdx === col) {
      setCoord([])
    } else {
      setCoord([rowIdx, colIdx])
    }
  }

  return (
    <div className="board">
      {board.map((row, rowIdx) => (
        <div className="row" key={`row-${rowIdx}`}>
          {row.map((cellNum, colIdx) => {
            const selected = rowIdx === coord[0] && colIdx === coord[1]
            const coSelected = selectedNum !== '0' && selectedNum === cellNum
            return (
              <Cell
                selected={selected}
                coSelected={coSelected}
                key={`cell-${rowIdx}-${colIdx}`}
                num={cellNum}
                onClick={handleOnClick(rowIdx, colIdx)}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <Board />
    </div>
  )
}

export default App
