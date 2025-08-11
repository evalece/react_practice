/*
lifting state up Part 2, event handler with inputs in JSX :
observation: 
JSX pattern at 
onSquareClick={() => handleClick(3)}

after user clicks, we have square calling onSquareClick-> go to parent (board)-> handleClick

*/
import { useState } from 'react';


function Square({ value, onSquareClick }) {
    //2.  Square to update the Board’s state -> upon clicks.  Aside:  Since state is private to a component that defines it, you cannot update the Board’s state directly from Square
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}


export default function Board() {

    const [squares, setSquares] = useState(Array(9).fill(null)); // shared state 


    //3.Connect the onSquareClick prop to a function in the Board component that you’ll name handleClick
    function handleClick(i) {
        const nextSquares = squares.slice();
        nextSquares[i] = "X";
        setSquares(nextSquares);
    }

    // 1. Square value={squares[0]} passes value for squares 
   return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
  
    </>
  );
}
