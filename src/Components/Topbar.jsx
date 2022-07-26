import React from "react";
import Search from "./Search";

export default function Topbar({ onSearch }) {
  return (
    <div className="topbar">
      <h2>Users List</h2>
      <Search onSearch={onSearch} />
    </div>
  );
}
