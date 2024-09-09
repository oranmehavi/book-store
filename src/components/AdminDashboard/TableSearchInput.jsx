import React from "react";
import './TableSearchInput.scss';

export default function TableSearchInput({searchBooks}) {
  const onEnterClicked = (e) => {
    if (e.key === "Enter") {
      searchBooks(e.target.value.toLowerCase().trim());
    }
  };
  return (
    <div className="table-search-books">
      <input
        type="text"
        onKeyDown={onEnterClicked}
        placeholder="Search books"
      />
    </div>
  );
}
