import "../css/profile.css";
import { useState } from "react";
import AlbumSpot from "../components/AlbumSpot";
import AlbumSearch from "../components/AlbumSearch";
import Add from "../assets/Add.svg";
import Test from "../assets/test.jpg";

function Profile() {
  const [albums, setAlbums] = useState([Add, Add, Add, Add, Add]);
  const [searchOpen, setSearchOpen] = useState(false);

  function handleAlbumClick(index) {
    setAlbums((currentAlbums) => {
      const newAlbums = [...currentAlbums];
      newAlbums[index - 1] = Test;
      return newAlbums;
    });
    setSearchOpen(true);
  }

  function handleAddSomethingClick() {
    console.log("Add something clicked!");
  }

  function handleCloseSearch() {
    setSearchOpen(false);
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
        {searchOpen && <AlbumSearch onClose={handleCloseSearch} />}
        <div className="top-container">
          <div className="profile-info">
            <div className="profile-image"></div>
            <p>User</p>
          </div>
          <div className="favorites">
            {[1, 2, 3, 4, 5].map((number) => (
              <AlbumSpot
                key={number}
                id={number}
                image={albums[number - 1]}
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
