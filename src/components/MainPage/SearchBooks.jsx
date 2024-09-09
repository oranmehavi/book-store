import React from "react";
export default function SearchBooks({ searchBooks }) {
  const onEnterClicked = (e) => {
    if (e.key === "Enter") {
        searchBooks(e.target.value.toLowerCase().trim())
    }
  };
  return (
    <div className="search-books">
      <input type="text" onKeyDown={onEnterClicked} placeholder="Search books"/>
    </div>
  );
}
