import { useEffect, useState } from "react";
// I'm using some MaterialUI to give me some icons and other stuff.
import {
  AddCircleOutlineRounded,
  RemoveCircleOutlineRounded,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { red, green } from "@mui/material/colors";

const TallyCounter = ({
  id,
  name,
  count,
  removeCounter,
  updateCount,
  updateName,
}) => {
  // Used to check whether or not we are editing the TallyCounter's name.
  const [isEditing, setIsEditing] = useState(false);
  // Used to keep track of the user changing the <input />
  const [editedName, setEditedName] = useState(name);

  // Handle when the counter should be removed
  const handleRemoveCounter = () => {
    removeCounter(id);
  }

  // Update the parent state when the count decreases
  const handleSubtract = () => {
    updateCount(id, count > 1 ? count - 1 : 0);
  };

  // Update the parent state when the count increases
  const handleAdd = () => {
    updateCount(id, count + 1);
  };

  // Called when the user finishes editing the name, e.g.
  // when they click outside the input or press Enter.
  // Updates the parent state that the corresponding <h2></h2> is based on
  const saveName = () => {
    updateName(id, editedName);
    setIsEditing(false);
  };

  // FOR DEBUGGING PURPOSES
  // With npm run dev, during development the initial rendering of the component will run twice
  // to identify any potential issues in the code.
  // This would not happen in production (when the website is deployed).
  useEffect(() => {
    console.log(`Counter ${id} name is: ${editedName}`);
  }, [editedName, id]);

  useEffect(() => {
    console.log(`Counter ${id} count is: ${count}`);
  }, [count, id]);

  return (
    <div className="tally-container">
      {/* MaterialUI components so I don't have an ugly button to close the TallyCounter */}
      <IconButton className="close-icon" onClick={handleRemoveCounter}>
        <CloseIcon sx={{ color: red[500] }} />
      </IconButton>
      {/* 
        If isEditing is true, display an <input /> that the user can
        type into to change the name of the given TallyCounter.

        If isEditing is false, just display an <h2></h2> with the
        current name.
      */}
      {isEditing ? (
        <input
          // Automatically focuses the input field when it's rendered
          // so that they can type immediately (vs. having to click first)
          autoFocus
          // Specifies that this is a text field
          type="text"
          // Binds input value to the state variable name
          value={editedName}
          // Handles changes to the input field, updating the
          // name state variable
          onChange={(e) => {
            setEditedName(e.target.value);
          }}
          // Call saveName when the input field loses focus (e.g. clicking outside it)
          // Otherwise the <h2></h2> may not show.
          onBlur={saveName}
          // If a key is pressed and it's the Enter key,
          // handleKeyDown will call savename and exit editing mode
          onKeyDown={(e) => {
            e.key === "Enter" && saveName();
          }}
        />
      ) : (
        // When the user clicks on the heading,
        // isEditing will be set to true so that
        // the user can change the name of the TallyCounter.
        <h2
          onClick={() => {
            setIsEditing(true);
          }}
        >
          {name}
        </h2>
      )}
      <h1>{count}</h1>
      <hr className="horizontal-line" />
      <div className="button-container">
        <IconButton className="minus-icon" onClick={handleSubtract}>
          {/* Don't worry too much about this sx stuff... 
              it's just changing the color and size of the MaterialUI icons 
          */}
          <RemoveCircleOutlineRounded
            sx={{ color: red[700], fontSize: "200%" }}
          />
        </IconButton>
        <IconButton className="plus-icon" onClick={handleAdd}>
          <AddCircleOutlineRounded
            sx={{ color: green[700], fontSize: "200%" }}
          />
        </IconButton>
        <hr className="vertical-line" />
      </div>
    </div>
  );
};

export default TallyCounter;
