export default function GameBoard({ xIsNext, currentGameDisplay, onPlay }) {

    function handleClick(currentSquare) {
        if (getWinner(currentGameDisplay) || currentGameDisplay[currentSquare]) return;
        const copySquares = [...currentGameDisplay];
        copySquares[currentSquare] = xIsNext ? 'X' : 'O';
        const currentSquareLocation = currentSquare < 3 ? { line: 1, col: currentSquare + 1 }
                                    : currentSquare < 6 ? { line: 2, col: (currentSquare + 1) - 3 }
                                    : { line: 3, col: (currentSquare + 1) - 6};
                                    console.log(currentSquareLocation);
        onPlay(copySquares, currentSquareLocation);
    }

    function getWinner(squares) {
        const winningPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7]
        ];
        for (let i = 0; i < winningPatterns.length; i++) {
            const [x, y, z] = winningPatterns[i];
            if(squares[x] && squares[x] === squares[y] && squares[x] === squares[z]) {
                // console.log(winningPatterns[i]);
                return {
                    winner: squares[x],
                    winningPattern: winningPatterns[i]
                };
            }
        }
        return null;
    }

    function handleCurrentStatus() {
        if (!getWinner(currentGameDisplay) && currentGameDisplay?.every(square => square !== null)) {
            return "It's a draw! Feel free to try again!";
        } else if (getWinner(currentGameDisplay)) {
            return `The winner is ${getWinner(currentGameDisplay).winner}`;
        } else {
            return `It is ${xIsNext ? 'X' : 'O'} turn.`;
        }
    }

    let row = [];
    for (let i = 0; i < 3; i++) {
        let squares = [];
        for (let j = 0; j < 3; j++) {
            let startNum = i === 0 ? 0 : i === 1 ? 3 : 6;
            squares.push(
            <Square
                winner={getWinner(currentGameDisplay) && getWinner(currentGameDisplay).winningPattern.filter(num => num === startNum + j).length > 0 ? true : false}
                key={j} 
                value={currentGameDisplay[startNum + j]} 
                onSquareClick={() => handleClick(startNum + j)}
            />);
        }
        row.push(<div className="ticTacToe__row" key={i}>{squares}</div>);
    }

    // function handleRestart() {
    //     setIsXTurn(true);
    //     setSquares(Array(9).fill(""));
    // }

    return (
        <>
            <div className='ticTacToe__gameBoard'>
                <h3 className='ticTacToe__status'>{currentGameDisplay && currentGameDisplay.length > 0 ? handleCurrentStatus() : null}</h3>
                { row.map(row => row) }
                {/* <button onClick={handleRestart}>Restart</button> */}
            </div>
        </>
    );
}

function Square({ value, onSquareClick, winner }) {

    return (
        <button 
        className={winner ? 'ticTacToe__square ticTacToe__square--winner' : 'ticTacToe__square'}
        onClick={onSquareClick}>
            {value}
        </button>
    );
}