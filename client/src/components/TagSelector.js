import { useState } from "react";

const TagSelector = ({ availableTags, handleTagsSelected }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagDragStart = (event, tag) => {
    event.dataTransfer.setData("text/plain", tag);
  };

  const handleTagDrop = (event) => {
    event.preventDefault();
    const tag = event.dataTransfer.getData("text/plain");
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      handleTagsSelected([...selectedTags, tag]);
    }
  };

  const handleTagClick = (event, tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      handleTagsSelected([...selectedTags, tag]);
    }
  };

  const handleTagRemove = (tag) => {
    const filteredTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(filteredTags);
    handleTagsSelected(filteredTags);
    availableTags.push(tag);
  };

  return (
    <div
      className="tag-selector"
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        className="available-tags"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        {availableTags
          .filter((tag) => !selectedTags.includes(tag))
          .map((tag) => (
            <div
              key={tag}
              draggable
              onDragStart={(event) => handleTagDragStart(event, tag)}
              className="tag"
              onClick={(event) => handleTagClick(event, tag)}
              style={{
                backgroundColor: "#eccc6e",
                color: "#4b9aaa",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              {tag}
            </div>
          ))}
      </div>
      <div
        className="selected-tags"
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleTagDrop}
        style={{ backgroundColor: "#eccc6e", borderRadius: "5px" }}
      >
        {selectedTags.map((tag) => (
          <div
            key={tag}
            className="tag selected"
            onClick={() => handleTagRemove(tag)}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagSelector;
