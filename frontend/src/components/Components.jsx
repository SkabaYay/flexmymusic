import ComponentMenu from "./ComponentMenu";
import "../css/Components.css";

function Components({ name, image }) {
  return (
    <div className="component">
      <img src={image} alt="component" />
      <p>{name}</p>
    </div>
  );
}

export default Components;
