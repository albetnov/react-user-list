import React from "react";

export default function Alert({ message, state }) {
  if (!state) return "";

  if (message && typeof message === "string") {
    return <div className="">{message}</div>;
  }
}
