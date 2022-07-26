import React from "react";

export default function Visibility({ elem }) {
  const toggleFocus = (e) => {
    if ("key" in e) {
      if (e.key !== "Enter") {
        return false;
      }
    }
    elem[Object.keys(elem)[0]].current.focus();
  };
  return (
    <div
      tabIndex="0"
      className="skip"
      onClick={toggleFocus}
      onKeyDown={toggleFocus}
    >
      Skip to main content
    </div>
  );
}
