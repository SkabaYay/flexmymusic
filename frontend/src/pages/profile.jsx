import "../css/profile.css";
import { useState, useRef, useEffect } from "react";
import {
  GridLayout,
  horizontalCompactor,
  ReactGridLayout,
  useContainerWidth,
} from "react-grid-layout";
import { noCompactor } from "react-grid-layout/core";
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

  const { width, containerRef, mounted } = useContainerWidth();
  const [containerHeight, setContainerHeight] = useState(0);

  const [componentMenuOpen, setComponentMenuOpen] = useState(false);
  const [components, setComponents] = useState([]);
  const [layout, setLayout] = useState([
    { i: "a", x: 0, y: 0, w: 1, h: 9 },
    { i: "b", x: 1, y: 0, w: 1, h: 9 },
  ]);

  function handleAlbumClick(index) {
    setSelectedAlbum(index);
    setSearchOpen(true);
  }

  function handleAlbumSelect(imageSrc) {
    setAlbums((currentAlbums) => {
      const newAlbums = [...currentAlbums];
      newAlbums[selectedAlbum] = imageSrc;
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
          //onClick={() => handleAddSomethingClick()}
        >
          <div className="component-container" ref={containerRef}>
            {mounted && (
              <ReactGridLayout
                layout={layout}
                width={width}
                gridConfig={{
                  cols: 2,
                  rowHeight: 50,
                }}
                dragConfig={{
                  bounded: true,
                }}
                onLayoutChange={(newLayout) => {
                  setLayout(newLayout);
                }}
                compactor={horizontalCompactor}
              >
                <div key="a">a</div>
                <div key="b">b</div>
              </ReactGridLayout>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
