import "../css/ComponentMenu.css";
import Components from "./Components";
import { useState } from "react";

function ComponentMenu({ onClose }) {
  return (
    <div className="component-menu">
      <button id="close-button" onClick={onClose}>
        X
      </button>
      <Components />
    </div>
  );
}

export default ComponentMenu;
