
import { useState } from 'react'; // use in r components to record UI interactions 
// state tip: store in parent -> i.e., board-> square, shared state with parent 

function Square({value}) {
    
    /*
    const [value, setValue]= useState(null); // setValue-> function to change value,   useState(null) <- initial state

    function handleClick(){ //Event handler pattern: the event handler is hook to html where user 
    // interacts with things like typing and clicking, before the handler is evoked
            setValue('X');
         //console.log("clicked")
    }
  return (
        <button 
        className="square"
        onClick={handleClick}
        >
        {value}
        </button>

  );
 */
}




export default function Board() { // export can be used in other files if import; default: if not renamed, if without
    // defualt, then Named export => no name changing unless import {x as y} from z
    
    // shared children state
    const [squares, setValue] = useState(Array(9).fill(null)); // squares = Array(9).fill(null) initially 
    
    return (
    <>
    <div className='board-row'>
        < Square value={squares[1]} />
        < Square value={squares[2]}/>
        < Square value={squares[3]}/>

    </div>

        <div className='board-row'>
        < Square value={squares[4]} />
        < Square value={squares[5]}/>
        < Square value={squares[6]}/>
    </div>
    <div className='board-row'>
        < Square value={squares[7]} />
        < Square value={squares[8]}/>
        < Square value={squares[9]}/>
    </div>
    </>
    );
}