import "../css/AlbumSearch.css";
import { searchAlbums, getAlbumCover } from "../services/api";
import { useState } from "react";
import Loading from "../assets/Loading.svg";
import Missing from "../assets/Missing.svg";

function AlbumSearch({ onClose, onAlbumSelect }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();

    if (!searchQuery.trim()) return;
    if (loading) return;

    setResults([]);
    setLoading(true);

    try {
      const searchResults = await searchAlbums(searchQuery);

      setResults(searchResults);
      console.log(searchResults);
      setError(null);

      searchResults.forEach(async (album) => {
        const cover = await getAlbumCover(album.id);

        setResults((currentResults) =>
          currentResults.map((currentAlbum) =>
            currentAlbum.id === album.id
              ? { ...currentAlbum, cover }
              : currentAlbum,
          ),
        );
      });
    } catch (err) {
      console.log("err");
      setError("Failed to search albums");
    } finally {
      setLoading(false);
    }
  }

  function handleAlbumClick(e) {
    const imageSrc = e.currentTarget.querySelector("img").src;
    onAlbumSelect(imageSrc);
  }

  return (
    <div className="album-search">
      <button id="close-button" onClick={onClose}>
        X
      </button>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search album..."
          id="album-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          name="album-search"
        />
      </form>
      <div className="albums">
        {loading ? (
          <p>Loading albums...</p>
        ) : results.length === 0 ? (
          <p>No albums found</p>
        ) : (
          results.map((album) => {
            return (
              <div
                key={album.id}
                className="album"
                onClick={
                  album.cover === undefined ? undefined : handleAlbumClick
                }
              >
                <img
                  src={
                    album.cover === undefined ? Loading : album.cover || Missing
                  }
                  alt={album.title}
                />

                <div className="album-info">
                  <p>{album.title}</p>
                  <p>{album.artist}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AlbumSearch;
