import React, { useEffect, useState } from "react";
import "./board.css";
import Direction, {
  generateRandomFoodPosition,
  getCellClassName,
  getNextHeadPosition,
  initBoard,
  isOutOfBounds,
} from "../utils/utils";

interface Props {
  size: number;
}

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

  // Handle the movement of the snake, call the moveSnake function every 500 milliseconds.
  useEffect(() => {
    intervalId = setInterval(() => {
      moveSnake();
    }, 1000);
    return () => clearInterval(intervalId);
  }, [snakeCells]);

  // Handle the resetting of the game when the size prop changes.
  useEffect(() => {
    handlePlayAgain();
  }, [size]);
  useEffect(() => {
    setBoard(initBoard(size));
  }, [size]);

  // Updates the direction state based on the key pressed, but only if the game is not over.
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

  // Handle the movement of the snake.
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

  // Function to handle the consumption of food by the snake.
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

  // Function to reset the game.
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

export default Board;
