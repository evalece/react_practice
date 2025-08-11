/*
pass value with pros summary:
Props = properties (data) passed from parent to child.

Observation- 
add value properties in functions using {}, this allows value passing with props via JSX 
in format of < Square val='xxx' > assuming the square function returns a JSX 

React rendering action: board passes value to square, square renders button
*/
function Square({ value }) {
  return <button className="square">{value}</button>;
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
}