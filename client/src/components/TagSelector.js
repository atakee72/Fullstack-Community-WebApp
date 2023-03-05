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
  };

  return (
    <div className="tag-selector">
      <div className="available-tags">
        {availableTags.map((tag) => (
          <div
            key={tag}
            draggable
            onDragStart={(event) => handleTagDragStart(event, tag)}
            className="tag"
            onClick={(event) => handleTagClick(event, tag)}
          >
            {tag}
          </div>
        ))}
      </div>
      <div
        className="selected-tags"
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleTagDrop}
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
