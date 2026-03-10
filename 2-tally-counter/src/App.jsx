// Import useState...REQUIRED to, well, use it.
import { useState } from "react";
// This is used to give each counter a unique ID
import { v4 as uuidv4 } from "uuid";
// Import the custom component we made
import TallyCounter from "./components/TallyCounter";
// Import the CSS file
import "./App.css";

// The "main" component of our tally counter website.
function App() {
  // Keep track of counter data as objects in an array
  const [counters, setCounters] = useState([]);

  // Add a new counter with a unique id
  const handleAddCounter = () => {
    const newCounter = {
      id: uuidv4(),
      name: `Counter #${counters.length + 1}`,
      count: 0,
    };
    setCounters([...counters, newCounter]);
  };

  // Remove a counter by filtering on its unique ID
  const removeCounter = (id) => {
    // Probably better to use !== but I don't care right now
    setCounters(counters.filter((counters) => counters.id != id));
  };

  // Update a counter's count to change it to newCount
  const updateCount = (id, newCount) => {
    setCounters(
      counters.map((counter) =>
        // SHould probably use ===
        counter.id == id ? { ...counter, count: newCount } : counter
      )
    );
  };

  // Update a counter's name
  const updateName = (id, newName) => {
    setCounters(
      counters.map((counter) =>
        counter.id == id ? { ...counter, name: newName } : counter
      )
    );
  };

  return (
    // Column flexbox, contains everything.
    <div id="main-container">
      {/* If there are no TallyCounters, prompt user to press the button.
          Otherwise, just display the TallyCounters
          I couldn't be damned to CSS the rest of the stuff :sob:
      */}
      {counters.length === 0 ? (
        <p>Press the button below to add some tally counters!</p>
      ) : (
        counters.map((counter) => (
          <TallyCounter 
            key={counter.id} // Required by React, not a prop.
            id={counter.id}
            name={counter.name}
            count={counter.count}
            removeCounter={removeCounter}
            updateCount={updateCount}
            updateName={updateName}
          />
        ))
      )}
      <button onClick={handleAddCounter}>Add Counter</button>
    </div>
  );
}

export default App;
