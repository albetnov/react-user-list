import React from "react";

export default function Collapse({ btnName, state, setState, children }) {
  return (
    <div>
      <button
        className="btn"
        onClick={() => setState((prevValue) => !prevValue)}
      >
        {btnName}
      </button>
      <div className={state ? "card-sm visible" : "card-sm invisible"}>
        {children}
      </div>
    </div>
  );
}
