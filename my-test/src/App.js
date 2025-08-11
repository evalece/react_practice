/*
lifting state up:
observation: avoid visiting each square for state info, store all 9 squares' info in board instead.
Idea "Lifting State": shared state in parent, parent pass data to children via prop in children communication.
    -  declare share state in parent, then parent passes state to children
    - board passes val (X, Null, O) to square

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
    function handleClick() {
        const nextSquares = squares.slice();
        nextSquares[0] = "X";
        setSquares(nextSquares);
    }

    // 1. Square value={squares[0]} passes value for squares 
   return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={handleClick} />
        <Square value={squares[1]} />
        <Square value={squares[2]} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} />
        <Square value={squares[4]} />
        <Square value={squares[5]} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} />
        <Square value={squares[7]} />
        <Square value={squares[8]} />
      </div>
    </>
  );
}
