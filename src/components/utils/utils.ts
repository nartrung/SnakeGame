const Direction = {
  UP: "UP",
  RIGHT: "RIGHT",
  DOWN: "DOWN",
  LEFT: "LEFT",
};

// Function to initial
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
  switch (direction) {
    case Direction.UP:
      return position - size;
    case Direction.RIGHT:
      return position + 1;
    case Direction.DOWN:
      return position + size;
    case Direction.LEFT:
      return position - 1;
    default:
      return -1;
  }
};

const isOutOfBounds = (currentPosition: number, nextPostion: number, size: number) => {
  return (
    nextPostion < 1 ||
    nextPostion > size * size ||
    (currentPosition % size === 0 && nextPostion % size === 1) ||
    (currentPosition % size === 1 && nextPostion % size === 0)
  );
};

const generateRandomFoodPosition = (size: number, newSnakeCells: number[]) => {
  let randomFoodPosition;
  do {
    randomFoodPosition = Math.floor(Math.random() * size * size + 1);
  } while (newSnakeCells.includes(randomFoodPosition));

  return randomFoodPosition;
};

export default Direction;
export { initBoard, getCellClassName, getNextHeadPosition, isOutOfBounds, generateRandomFoodPosition };
