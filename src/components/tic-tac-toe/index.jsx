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

    function handlePlay(nextSquares) {
        const nextHistory = [...moveHistory.slice(0, currentMove + 1), nextSquares]; // ??
        setMoveHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function handleMoveLocation(moveNum, prevMoveNum) {
        console.log(moveNum, prevMoveNum);
        const currentDisplay = moveHistory[moveNum];
        const lastDisplay = moveHistory[prevMoveNum];
        console.log(currentDisplay, lastDisplay);
        const currentMove = lastDisplay ? currentDisplay.findIndex((newMove, i) => lastDisplay[i] !== newMove) : null;
        console.log(currentMove);
        if (currentMove || currentMove === 0) {
            return currentMove < 3 ? { row: 1, col: currentMove + 1 }
            : currentMove < 6 ? { row: 2, col: (currentMove + 1) - 3 }
            : { row: 3, col: (currentMove + 1) - 6};
        }
        return null;
    }

    function handleJumpTo(move) {
        setCurrentMove(move);
    }

    function handleRestartGame() {
        setMoveHistory([Array(9).fill(null)]);
        setCurrentMove(0);
    }

    return (
        <div className='ticTacToe'>
            <h2>Tic Tac Toe</h2>
            <div className='ticTacToe__wrapper'>
                <GameBoard 
                xIsNext={xIsNext} 
                currentGameDisplay={currentGameDisplay} 
                onPlay={handlePlay}
                onRestart={handleRestartGame}/>
                <div className='ticTacToe__gameInfo'>
                    <h3>Game History</h3>
                    <div className='ticTacToe__switchWrapper'>
                        <p>Ascending</p>
                        <div>
                            <button
                            className={sortInAscendingOrder ? 'ticTacToe__switch' : 'ticTacToe__switch ticTacToe__switch--descending'}
                            onClick={() => setSortInAscendingOrder(!sortInAscendingOrder)}>
                            </button>
                        </div>
                        <p>Descending</p>
                    </div>
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
                                                gameDisplay.filter(s => s !== null).length !== 0 ? `Go to move #${gameDisplay.filter(s => s !== null).length} (colomn ${handleMoveLocation(moveNumber, moveNumber - 1)?.col}, row ${handleMoveLocation(moveNumber, moveNumber - 1)?.row})`
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
        </div>
    );

   
}