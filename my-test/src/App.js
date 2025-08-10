
import { useState } from 'react'; // use in r components to record UI interactions 
// state tip: store in parent -> i.e., board-> square, shared state with parent 

function Square({value, onSquareClick}) {
    // Since state is private to a component that defines it, you cannot update the Board’s state directly from Square
    // callback prop or event handler pro; passed (functions) by reference; gets executed at This executes the parent’s function in the parent’s scope
    // Todo:  Real life: possible to have child and parent on different remote/ client, i.e. SSR, try later
 return <button className="square" onClick={onSquareClick}> 
    {value} 
    </button>
  // child: hooks parent callback in JSX
}




 function Board({xIsNext, squares, onPlay}) { // export can be used in other files if import; default: if not renamed, if without
    // defualt, then Named export => no name changing unless import {x as y} from z
    
    // shared children state
    


  function handleClick(i) {
   
    if (squares[i] || calculateWinner(squares)){
        return; //already filled with X or O <- I suddently realize react components are just functions 

    }


    const nextSquares = squares.slice(); //parent re-render from last state's copy with i set to X
    if (xIsNext) {
        nextSquares[i]="X"
    }else{
        nextSquares[i]="O"
    }
    
    onPlay(nextSquares) //calling Game function, replaced the following
  
    // setSquares(nextSquares);
    // setXIsNext(!xIsNext); //switch terms
  }

    // variable passing using { } with JXS 
    //< Square value={squares[0]} onSquareClick={handleClick(0)}  /> 
    // handleClick : pass as prop;  handleClick(0) : calling function (before clicks)
    // solution: onSquareClick={() => handleClick(0)}

    let gstatus;
    const winner = calculateWinner(squares);
   
    if (winner) {
            gstatus = "Winner: " + winner;
        } else {
            gstatus = "Next player: " + (xIsNext ? "X" : "O");
        }
  
    return (
    <>
    <div className="status">{gstatus}</div>
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


export default function Game(){ //store board history and render current board to allow player actions during play game
    const [xIsNext, setXIsNext]= useState(true);
    const [history, setHistory]= useState([Array(9).fill(null)]);
    const currentSquare= history[history.length -1]; //get last state of board

    function handlePlay(nextSquares){ 
        setHistory([...history, nextSquares]); // history+= nextSquares
        setXIsNext(!xIsNext);

    }
    
    return(
        <div className ="game">
            <div className= "game-board">

            </div>
            /* use child in parent funcion 
            handlePlay: allow child to use parent's callback function within it's context when 
            user interacts with child 
            
            inside parent's handle play: where the actual re-render occures 
            */
           <Board xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay}/>  
        

        <div className='game-info'>
            <ol>{ }</ol>
        </div>
    </div>
    )
}


/////// copy - and - pasted helper :
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}