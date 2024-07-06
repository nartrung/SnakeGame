import React, { useEffect, useState } from "react";
import "./board.css";

interface Props {
  size: number;
}

const Direction = {
  UP: "UP",
  RIGHT: "RIGHT",
  DOWN: "DOWN",
  LEFT: "LEFT",
};

const Board: React.FC<Props> = ({ size }) => {
  const [board, setBoard] = useState(initBoard(size));
  const [snakeCells, setSnakeCells] = useState([1, 2, 3]);
  const [foodCell, setFoodCell] = useState(generateRandomFoodPosition(size, snakeCells));
  const [direction, setDirection] = useState(Direction.RIGHT);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isLose, setIsLose] = useState(false);
  const [isWin, setIsWin] = useState(false);
  let intervalId: number | undefined;

  useEffect(() => {
    intervalId = setInterval(() => {
      moveSnake();
    }, 500);
    return () => clearInterval(intervalId);
  }, [snakeCells]);

  useEffect(() => {
    handlePlayAgain();
  }, [size]);
  useEffect(() => {
    setBoard(initBoard(size));
  }, [size]);
  const handleKeydown = (e: KeyboardEvent) => {
    if (!gameOver) {
      switch (e.key) {
        case "ArrowUp":
          if (direction !== Direction.DOWN) setDirection(Direction.UP);
          break;
        case "ArrowDown":
          if (direction !== Direction.UP) setDirection(Direction.DOWN);
          break;
        case "ArrowLeft":
          if (direction !== Direction.RIGHT) setDirection(Direction.LEFT);
          break;
        case "ArrowRight":
          if (direction !== Direction.LEFT) setDirection(Direction.RIGHT);
          break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [direction]);

  const moveSnake = () => {
    const currentHeadPotision = snakeCells[snakeCells.length - 1];

    const nextHeadPosition = getNextHeadPosition(size, currentHeadPotision, direction);

    if (isOutOfBounds(currentHeadPotision, nextHeadPosition, size)) {
      setGameOver(true);
      setIsLose(true);
      return;
    }
    if (snakeCells.includes(nextHeadPosition)) {
      setGameOver(true);
      setIsLose(true);
      return;
    }

    const newSnakeCells = [...snakeCells];
    newSnakeCells.push(nextHeadPosition);

    const foodConsumed = nextHeadPosition === foodCell;
    if (!foodConsumed) {
      newSnakeCells.shift();
      setSnakeCells(newSnakeCells);
    } else {
      handleFoodConsumption(newSnakeCells);
    }
  };

  const handleFoodConsumption = (newSnakeCells: number[]) => {
    setScore(score + 1);
    if (newSnakeCells.length == size * size) {
      setIsWin(true);
      setGameOver(true);
      return;
    }
    setSnakeCells(newSnakeCells);

    let nextFoodPosition = generateRandomFoodPosition(size, newSnakeCells);
    setFoodCell(nextFoodPosition);
  };

  const handlePlayAgain = () => {
    setIsLose(false);
    setIsWin(false);
    setGameOver(false);
    setScore(0);
    setSnakeCells([1, 2, 3]);
    setFoodCell(generateRandomFoodPosition(size, snakeCells));
    setDirection(Direction.RIGHT);
  };

  return (
    <>
      <h1>Your Score: {score}</h1>
      {isLose && (
        <div>
          <h3>You Lose!!</h3>
          <button onClick={handlePlayAgain} style={{ marginBottom: "10px" }}>
            Play Again
          </button>
        </div>
      )}
      {isWin && (
        <div>
          <h3>You Win!!</h3>
          <button onClick={handlePlayAgain} style={{ marginBottom: "10px" }}>
            Play Again
          </button>
        </div>
      )}
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

const getNextHeadPosition = (size: number, position: number, direction: string) => {
  if (direction === Direction.UP) {
    return position - size;
  }
  if (direction === Direction.RIGHT) {
    return position + 1;
  }
  if (direction === Direction.DOWN) {
    return position + size;
  }
  if (direction === Direction.LEFT) {
    return position - 1;
  }
  return -1;
};

const isOutOfBounds = (currentPosition: number, nextPostion: number, size: number) => {
  return (
    nextPostion < 1 ||
    nextPostion > size * size ||
    (currentPosition % size == 0 && nextPostion % size == 1) ||
    (currentPosition % size == 1 && nextPostion % size == 0)
  );
};

const generateRandomFoodPosition = (size: number, newSnakeCells: number[]) => {
  let randomFoodPosition;
  while (true) {
    randomFoodPosition = Math.floor(Math.random() * size * size + 1);
    if (newSnakeCells.includes(randomFoodPosition)) {
      continue;
    }
    break;
  }
  return randomFoodPosition;
};

export default Board;
