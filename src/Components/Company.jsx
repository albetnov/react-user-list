import React, { useState } from "react";
import Collapse from "./Collapse";

export default function Company({ company }) {
  if (!company) return "";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Collapse state={isOpen} setState={setIsOpen} btnName="Company Info">
        <ul className="list">
          <li>{company.name}</li>
          <li>{company.catchPhrase}</li>
          <li>{company.bs}</li>
        </ul>
      </Collapse>
    </div>
  );
}
