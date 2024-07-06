import React, { useState } from "react";
import Board from "../board/Board";

const Game: React.FC = () => {
  const [inputSize, setInputSize] = useState(10);

  return (
    <div>
      <h1>SNAKE GAME</h1>
      <Board size={inputSize}></Board>
    </div>
  );
};

export default Game;
