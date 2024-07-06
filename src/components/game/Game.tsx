import React, { useEffect, useState } from "react";
import Board from "../board/Board";

const Game: React.FC = () => {
  const [inputSize, setInputSize] = useState(4);
  const [size, setSize] = useState(0);
  useEffect(() => {}, [size]);
  return (
    <div>
      <h1>SNAKE GAME</h1>
      <h2>Please select size for the maxtrix</h2>

      <input
        type="number"
        min={4}
        max={20}
        value={inputSize}
        onChange={(e) => setInputSize(parseInt(e.target.value))}
      />
      <button
        onClick={() => {
          setSize(inputSize);
        }}>
        Play
      </button>
      {size > 0 && <Board size={size}></Board>}
    </div>
  );
};

export default Game;
