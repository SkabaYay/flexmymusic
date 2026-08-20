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
  const [layout, setLayout] = useState([{ i: "b", x: 1, y: 0, w: 1, h: 8.5 }]);

  const dropConfig = {
    enabled: true,
    defaultItem: {
      w: 1,
      h: 8.5,
    },
  };

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
    setComponentMenuOpen(true);
  }

  function handleCloseSearch() {
    setSearchOpen(false);
  }

  function handleCloseComponentMenu() {
    setComponentMenuOpen(false);
  }

  function handleDrop(layout, item, event) {
    console.log("dropped");
    const componentName = event.dataTransfer.getData("component");
    console.log(componentName);

    const newItem = {
      i: crypto.randomUUID(),
      type: componentName,
      x: item.x,
      y: item.y,
      w: item.w,
      h: item.h,
    };

    setLayout((current) => [...current, newItem]);
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

        <div className="bottom-container">
          <button onClick={() => handleAddSomethingClick()}>Edit</button>
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
                dropConfig={dropConfig}
                onDrop={handleDrop}
                onLayoutChange={(newLayout) => {
                  setLayout(newLayout);
                }}
                compactor={horizontalCompactor}
              >
                {layout.map((item) => (
                  <div key={item.i}>{item.i}</div>
                ))}
              </ReactGridLayout>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
