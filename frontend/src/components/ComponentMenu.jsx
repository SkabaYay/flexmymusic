import "../css/ComponentMenu.css";
import Components from "./Components";
import { useState } from "react";
import Seasons from "../assets/Seasons.svg";
import Mood from "../assets/Mood.svg";
import ThreeComps from "../assets/Three Comps.svg";
import Missing from "../assets/Missing.svg";

const ComponentList = [
  { name: "Seasons", image: Seasons },
  { name: "Mood (Happy/Sad/Angry)", image: ThreeComps },
  { name: "test", image: Missing },
  { name: "test", image: Missing },
];

function ComponentMenu({ onClose }) {
  return (
    <div className="component-menu">
      <button id="close-button" onClick={onClose}>
        X
      </button>
      <div className="components">
        {ComponentList.map((component, index) => {
          return (
            <Components
              key={index}
              name={component.name}
              image={component.image}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ComponentMenu;
