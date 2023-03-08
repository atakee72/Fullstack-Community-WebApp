import { useState } from "react";

const HobbySelector = ({ availableHobbies, handleHobbiesSelected }) => {
  const [selectedHobbies, setSelectedHobbies] = useState([]);

  const handleHobbyDragStart = (event, hobby) => {
    event.dataTransfer.setData("text/plain", hobby);
  };

  const handleHobbyDrop = (event) => {
    event.preventDefault();
    const hobby = event.dataTransfer.getData("text/plain");
    if (!selectedHobbies.includes(hobby)) {
      setSelectedHobbies([...selectedHobbies, hobby]);
      handleHobbiesSelected([...selectedHobbies, hobby]);
    }
  };

  const handleHobbyClick = (event, hobby) => {
    if (!selectedHobbies.includes(hobby)) {
      setSelectedHobbies([...selectedHobbies, hobby]);
      handleHobbiesSelected([...selectedHobbies, hobby]);
    }
  };

  const handleHobbyRemove = (hobby) => {
    const filteredHobbies = selectedHobbies.filter((t) => t !== hobby);
    setSelectedHobbies(filteredHobbies);
    handleHobbiesSelected(filteredHobbies);
  };

  return (
    <div className="hobby-selector">
      <div className="available-hobbys">
        {availableHobbies.map((hobby) => (
          <div
            key={hobby}
            draggable
            onDragStart={(event) => handleHobbyDragStart(event, hobby)}
            className="hobby"
            onClick={(event) => handleHobbyClick(event, hobby)}
          >
            {hobby}
          </div>
        ))}
      </div>
      <div
        className="selected-hobbys"
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleHobbyDrop}
      >
        {selectedHobbies.map((hobby) => (
          <div
            key={hobby}
            className="hobby selected"
            onClick={() => handleHobbyRemove(hobby)}
          >
            {hobby}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HobbySelector;
