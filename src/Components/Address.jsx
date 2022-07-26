import React, { useState } from "react";
import Collapse from "./Collapse";

export default function Address({ address }) {
  if (!address) return "";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Collapse state={isOpen} setState={setIsOpen} btnName="Address Info">
        <ul className="list">
          <li>{address.street}</li>
          <li>{address.suite}</li>
          <li>{address.city}</li>
          <li>{address.zipcode}</li>
          <li>
            {address.geo.lat} - {address.geo.lng}
          </li>
        </ul>
      </Collapse>
    </div>
  );
}
