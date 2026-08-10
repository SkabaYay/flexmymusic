import "../css/AlbumSpot.css";

function AlbumSpot({ id, image, onClick }) {
  return (
    <div className="album-spot" aria-label={`Album ${id}`} onClick={onClick}>
      <img src={image} alt={`Album ${id}`} draggable={false} />
    </div>
  );
}
export default AlbumSpot;
