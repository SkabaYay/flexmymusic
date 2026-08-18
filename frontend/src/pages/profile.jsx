import "../css/profile.css";
import { useState } from "react";
import AlbumSpot from "../components/AlbumSpot";
import AlbumSearch from "../components/AlbumSearch";
import ComponentMenu from "../components/ComponentMenu";
import Add from "../assets/Add.svg";
import Test from "../assets/test.jpg";

const numberOfFavorites = 5;

function Profile() {
  const [albums, setAlbums] = useState([Add, Add, Add, Add, Add]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [componentMenuOpen, setComponentMenuOpen] = useState(false);

  function handleAlbumClick(index) {
    setSelectedAlbum(index);
    setSearchOpen(true);
  }

  function handleAlbumSelect(imageSrc) {
    setAlbums((currentAlbums) => {
      const newAlbums = [...currentAlbums];
      newAlbums[selectedAlbum - 1] = imageSrc;
      return newAlbums;
    });
    setSearchOpen(false);
  }

  function handleAddSomethingClick() {
    console.log("Add something clicked!");
    setComponentMenuOpen(true);
  }

  function handleCloseSearch() {
    setSearchOpen(false);
  }

  function handleCloseComponentMenu() {
    setComponentMenuOpen(false);
  }

  return (
    <>
      <header>
        <p>flexmymusic</p>
        <nav>
          <a href="#">Register</a>
          <a href="#">Login</a>
        </nav>
      </header>

      <section>
        {searchOpen && (
          <AlbumSearch
            onClose={handleCloseSearch}
            onAlbumSelect={handleAlbumSelect}
          />
        )}
        {componentMenuOpen && (
          <ComponentMenu onClose={handleCloseComponentMenu} />
        )}

        <div className="top-container">
          <div className="profile-info">
            <div className="profile-image"></div>
            <p>User</p>
          </div>
          <div className="favorites">
            {Array.from({ length: numberOfFavorites }).map((_, number) => (
              <AlbumSpot
                key={number}
                id={number}
                image={albums[number]}
                onClick={() => handleAlbumClick(number)}
              />
            ))}
          </div>
        </div>

        <div
          className="bottom-container"
          onClick={() => handleAddSomethingClick()}
        >
          <div className="add-something">
            <p>+ Add something!</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
