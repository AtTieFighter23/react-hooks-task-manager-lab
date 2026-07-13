import React, { useRef, useState } from "react";
import TaskList from "./TaskList";

function SearchBar() {
  // Uncontrolled input: the DOM manages its own value, we just read it via ref
  const searchInputRef = useRef(null);
  // Only used to trigger a re-render of TaskList when the search term changes
  const [query, setQuery] = useState("");

  function handleSearch() {
    setQuery(searchInputRef.current.value);
  }

  return (
    <div>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search tasks..."
        onChange={handleSearch}
      />
      <TaskList query={query} />
    </div>
  );
}

export default SearchBar;