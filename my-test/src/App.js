
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



    // squares: passing current square
 function Board({xIsNext, squares, onPlay}) { // export can be used in other files if import; default: if not renamed, if without
    // defualt, then Named export => no name changing unless import {x as y} from z
    

    

    // map this function in JXS
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

        onPlay(nextSquares) 

    } // handleClick // 



    let gstatus;
    const winner = calculateWinner(squares);
   
    if (winner) {
            gstatus = "Winner: " + winner;
        } else {
            gstatus = "Next player: " + (xIsNext ? "X" : "O");
        }
    
    // render UI
    return(

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


/*
This gives the Game component full control over the Board’s 
data and lets it instruct the Board to render previous turns from the history.
*/

export default function Game(){ //store board history and render current board to allow player actions during play game
    const [xIsNext, setXIsNext]= useState(true);
    const [history, setHistory]= useState([Array(9).fill(null)]);
    // const currentSquare= history[history.length -1]; //get last state of board
    const [currentMove, setCurrentMove]=useState(0); //currentMove counts number of total moves

    const currentSquare= history[currentMove]; // Allow jump to any chosen history
    
    function handlePlay(nextSquares){
        const nextHistory= [...history.slice(0, currentMove +1),nextSquares]; // history+= nextSquares
        setHistory(nextHistory); 
        setCurrentMove(nextHistory.length -1 ) //**** check this
        setXIsNext(!xIsNext);

    }

    function jumpTo(nextMove){ //go back to a specific history, then reset current and next move 
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0);

    }

    const moves = history.map((square,move)=>{

        let description
        if (move >0){
            description = 'Go to move # ' + move;
        }else{
            description= 'Go to game start';
        }
        return ( // list item per history, on each render, react store state info per li 
            // r either updates or destory old list li keys matchs or not (not-> add component)
            // for later: check best use case on db <-> r keys

            //we use "move"- the index, to call jumpTo, where we reset play states (terms and maps)
            <li key= {move}>
                <button onClick={()=>jumpTo(move)}> {description} </button>
            </li>
        );
    });
    
    return(
        <div className ="game">
            <div className= "game-board">

            </div>
            
           <Board xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay}/>  
        

        <div className='game-info'>
            <ol>{moves}</ol>
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