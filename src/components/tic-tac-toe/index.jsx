import { useState } from 'react';
import './style.css';
import GameBoard from './gameBoard.jsx';

export default function TicTacToe() {

    const [moveHistory, setMoveHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [sortInAscendingOrder, setSortInAscendingOrder] = useState(true);
    const currentGameDisplay = moveHistory[currentMove];
    const xIsNext = currentMove % 2 === 0;
    const sortedMoveHistory = sortInAscendingOrder ? moveHistory : moveHistory.toReversed();
    let currentSquarePosition;

    function handlePlay(nextSquares, squarePosition) {
        const nextHistory = [...moveHistory.slice(0, currentMove + 1), nextSquares]; // ??
        setMoveHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        currentSquarePosition = squarePosition;
        // DOES NOT WORK, FIND ANOTHER WAY TO MAKE THE INFO PASS ;)
    }


    function handleJumpTo(move) {
        setCurrentMove(move);
    }

    return (
        <div className='ticTacToe'>
            <h2>Tic Tac Toe</h2>
            <GameBoard xIsNext={xIsNext} currentGameDisplay={currentGameDisplay} onPlay={handlePlay}/>
            <div className='ticTacToe__gameInfo'>
                <button
                onClick={() => setSortInAscendingOrder(!sortInAscendingOrder)}
                >Sort in {sortInAscendingOrder ? 'descending' : 'ascending'} order</button>
                <ol>
                    {
                        sortedMoveHistory && sortedMoveHistory.length > 0 ? sortedMoveHistory.map((gameDisplay, moveNumber) => 
                            <li key={moveNumber}>
                                {
                                    gameDisplay.filter(s => s !== null).length === currentMove ? 
                                    `You are at move #${gameDisplay.filter(s => s !== null).length}`: 
                                    <button
                                    onClick={() => handleJumpTo(gameDisplay.filter(s => s !== null).length)}
                                    >
                                        {
                                            gameDisplay.filter(s => s !== null).length !== 0 ? `Go to move #${gameDisplay.filter(s => s !== null).length} (colomn ${currentSquarePosition?.col}, line ${currentSquarePosition?.line})`
                                            : 'Go to the game start'
                                        }
                                    </button>
                                }
                            </li>
                        )
                        : null
                    }
                </ol>
            </div>
        </div>
    );

   
}