
import { useState } from "react";

function Main() {

const[count, setCount] = useState(0);
function handleClick() {
  setCount(count + 1);
}

  return(<>
    <h1>Main</h1>
    <button onClick={handleClick}> CLICK</button>
    <p>You clicked {count} times</p>
    
    
  </>)
}

export default Main;