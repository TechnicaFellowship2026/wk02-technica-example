import { useState } from "react";
import "./App.css";

function App() {
  // What you THINK you'd use
  let count = 0;
  // What we HAVE to use
  const [countState, setCountState] = useState(0);

  // Try to increment count by 1
  const handleCountUpdate = () => {
    count += 1;
  };

  // Increment countState by 1 using its set function
  const handleCountStateUpdate = () => {
    // CANNOT say countState += 1 because
    // countState is a const variable
    // countState is a reference to a state value that
    // React can change.
    setCountState(countState + 1);
  };

  return (
    <div id="main-container">
      <div className="count-container">
        <h2>count: {count}</h2>
        <button onClick={handleCountUpdate}>+</button>
      </div>
      <div className="count-container">
        <h2>countState: {countState}</h2>
        <button onClick={handleCountStateUpdate}>+</button>
      </div>
    </div>
  );
}

export default App;
