import React from "react";

export default function Search({ onSearch }) {
  return (
    <div>
      <input
        type="search"
        placeholder="Search Anything..."
        onChange={onSearch}
        className="search"
      />
    </div>
  );
}
