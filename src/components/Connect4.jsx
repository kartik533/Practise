import { useState, useRef } from "react";
import "../App.css";

function createNewBoard(N, M) {
  return Array.from({ length: N }, () => Array(M).fill(null));
}

function determineWinnerScore4(board, row, col, player) {
  let winner = false;
  let counterConsecutivePlayer = 0;

  for (let i = 0; i < board.length; i++) {
    if (board[i][col] === player) {
      counterConsecutivePlayer++;
      if (counterConsecutivePlayer === 4) {
        winner = true;
      }
    } else {
      counterConsecutivePlayer = 0;
    }
  }
  counterConsecutivePlayer = 0;

  for (let i = 0; i < board[0].length; i++) {
    if (board[row][i] === player) {
      counterConsecutivePlayer++;
      if (counterConsecutivePlayer === 4) {
        winner = true;
      }
      console.log("2", row, i, counterConsecutivePlayer, player);
    } else {
      counterConsecutivePlayer = 0;
    }
  }

  return winner;
}

export default function TicTacToe({ N = 6, M = 7 }) {
  const [board, setBoard] = useState(createNewBoard(N, M));
  const [isXPlaying, setIsXPlaying] = useState(true);
  const winner = useRef(null);

  const isDraw = board.flat().every((cell) => cell !== null);

  const getStatus = () => {
    if (winner.current) return `Player ${winner.current} Won!`;
    if (isDraw) return `It's a Draw!!`;
    return `Player ${isXPlaying ? "X" : "O"} turn`;
  };

  const handleReset = () => {
    setBoard(createNewBoard(N));
    setIsXPlaying(true);
  };

  const handleCellClick = (rowIdx, colIdx) => {
    const newBoard = board.map((row) => [...row]);
    newBoard[rowIdx][colIdx] = isXPlaying ? "X" : "O";
    if (
      determineWinnerScore4(newBoard, rowIdx, colIdx, isXPlaying ? "X" : "O")
    ) {
      winner.current = isXPlaying ? "X" : "O";
    }
    setBoard(newBoard);
    setIsXPlaying((prev) => !prev);
  };

  return (
    <div className="main">
      <h4>{getStatus()}</h4>
      <div
        className="board"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${M}, 1fr)`,
        }}
      >
        {board.map((row, rowIdx) => {
          return row.map((cell, colIdx) => {
            return (
              <button
                key={`${rowIdx}-${colIdx}`}
                onClick={() => handleCellClick(rowIdx, colIdx)}
                className="cell"
              >
                {cell}
              </button>
            );
          });
        })}
      </div>
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
