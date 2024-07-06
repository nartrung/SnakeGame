import React, { useState } from "react";
import "./board.css";

interface Props {
  size: number;
}

const Board: React.FC<Props> = ({ size }) => {
  const [board, setBoard] = useState(initBoard(size));
  const [snakeCells, setSnakeCells] = useState([1, 2, 3]);
  const [foodCell, setFoodCell] = useState(size * size - 2);

  return (
    <>
      <h1>Score: 0</h1>
      <div className="board">
        {board.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((cellValue, cellIdx) => {
              const className = getCellClassName(cellValue, foodCell, snakeCells);
              return <div key={cellIdx} className={className}></div>;
            })}
          </div>
        ))}
      </div>
    </>
  );
};

const initBoard = (size: number) => {
  let cnt = 1;
  const board = [];
  for (let row = 0; row < size; row++) {
    const currentRow = [];
    for (let col = 0; col < size; col++) {
      currentRow.push(cnt++);
    }
    board.push(currentRow);
  }
  return board;
};

const getCellClassName = (cellValue: number, foodCell: number, snakeCells: number[]) => {
  let className = "cell";
  if (cellValue === foodCell) {
    className = "cell cell-red";
  }
  if (snakeCells.includes(cellValue)) className = "cell cell-green";

  return className;
};

export default Board;
