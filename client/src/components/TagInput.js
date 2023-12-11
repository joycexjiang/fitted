import React, { useState } from "react";

const TagInput = ({ onAddTag }) => {
  const [tagInput, setTagInput] = useState("");

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleTagInputKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const newTag = tagInput.trim();
      if (newTag) {
        onAddTag(newTag);
        setTagInput("");
      }
    }
  };

  return (
    <input
      type="text"
      id="tags"
      name="tags"
      value={tagInput}
      onChange={handleTagInputChange}
      onKeyDown={handleTagInputKeyDown}
      placeholder="add tags"
      className="mt-4 w-full block p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
  );
};

export default TagInput;
