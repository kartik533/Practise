import {useState} from "react";

const N = 3

function createNewBoard(N) {
    return Array.from({length: N}, () => Array(N).fill(null))
}

function determineWinner(board, N) {
    const leftDiagMark = board[0][0];
    if (leftDiagMark && board.every((row, ind) => row[ind] === leftDiagMark)) return leftDiagMark;

    const length = board[0].length
    const rightDiagMark = board[0][length - 1];
    if (rightDiagMark && board.every((row, ind) => row[length - 1 - ind] === rightDiagMark)) return rightDiagMark;

    for (let i = 0; i < N; i++) {
        const rowMark = board[i][0];
        if (rowMark && board[i].every(item => item === rowMark)) return rowMark;

        const colMark = board[0][i];
        if (colMark && board.every(row => row[i] === colMark)) return colMark;
    }
    return null;
}

export default function TicTacToe({N = 3}) {
    const [board, setBoard] = useState(createNewBoard(N));
    const [isXPlaying, setIsXPlaying] = useState(true);

    const winner = determineWinner(board, N);

    const isDraw = board.flat().every((cell) => cell !== null);

    const getStatus = () => {
        if (winner)  return `Player ${winner} Won!`;
        if (isDraw) return `It's a Draw!!`;
        return `Player ${isXPlaying ? 'X' : 'O'} turn`;
    }

    const handleReset = () => {
        setBoard(createNewBoard(N));
        setIsXPlaying(true);
    }

    const handleCellClick = (rowIdx, colIdx) => {
        const newBoard = board.map(row => [...row]);
        newBoard[rowIdx][colIdx] = isXPlaying ? 'X' : 'O';
        setBoard(newBoard);
        setIsXPlaying(prev => !prev);
    }

    return (
        <div className="main">
            <h4>{getStatus()}</h4>
            <div
                className="board"
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${N}, 1fr)`,
                }}
            >
                {
                    board.map((row, rowIdx) => {
                        return row.map((cell, colIdx) => {
                            return (
                                <button
                                    key={`${rowIdx}-${colIdx}`}
                                    onClick={() => handleCellClick(rowIdx, colIdx)}
                                    className="cell"
                                    disabled={winner || cell !== null}
                                >
                                    {cell}
                                </button>
                            )
                        })
                    })
                }
            </div>
            <button className='reset-button' onClick={handleReset}>Reset</button>
        </div>
    )
}