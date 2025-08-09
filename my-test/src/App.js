
import { useState } from 'react'; // use in r components to record UI interactions 
// state tip: store in parent -> i.e., board-> square, shared state with parent 

function Square({value, onSquareClick}) {
    // Since state is private to a component that defines it, you cannot update the Board’s state directly from Square
    // callback prop or event handler pro; passed (functions) by reference; gets executed at This executes the parent’s function in the parent’s scope
    // Todo:  Real life: possible to have child and parent on different remote/ client, i.e. SSR, try later
 return <button className="square" onClick={onSquareClick}> 
    {value} 
    </button>
  
}




export default function Board() { // export can be used in other files if import; default: if not renamed, if without
    // defualt, then Named export => no name changing unless import {x as y} from z
    
    // shared children state
    const [squares, setSquares] = useState(Array(9).fill(null)); // squares = Array(9).fill(null) initially 
    
  function handleClick(i) {
    const nextSquares = squares.slice();
    nextSquares[i] = "X";
    setSquares(nextSquares);
  }

    // variable passing using { } with JXS 
    //< Square value={squares[0]} onSquareClick={handleClick(0)}  /> 
    // handleClick : pass as prop;  handleClick(0) : calling function (before clicks)
    // solution: onSquareClick={() => handleClick(0)}
    return (
    <>
    <div className='board-row'>
        < Square value={squares[0]} onSquareClick={()=> {handleClick(0)}}  /> 
        < Square value={squares[1]} onSquareClick={()=> {handleClick(1)}} />
        < Square value={squares[2]} onSquareClick={()=> {handleClick(2)}} />

    </div>

        <div className='board-row'>
        < Square value={squares[3]} onSquareClick={()=> {handleClick(3)}} />
        < Square value={squares[4]} onSquareClick={()=> {handleClick(4)}} />
        < Square value={squares[5]} onSquareClick={()=> {handleClick(5)}} />
    </div>
    <div className='board-row'>
        < Square value={squares[6]} onSquareClick={()=> {handleClick(6)}} />
        < Square value={squares[7]} onSquareClick={()=> {handleClick(7)}} />
        < Square value={squares[8]} onSquareClick={()=> {handleClick(8)}} />
    </div>
    </>
    );
}