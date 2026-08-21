import "../css/profile.css";
import { useState, useRef, useEffect } from "react";
import {
  horizontalCompactor,
  ReactGridLayout,
  useContainerWidth,
} from "react-grid-layout";
import AlbumSpot from "../components/AlbumSpot";
import AlbumSearch from "../components/AlbumSearch";
import ComponentMenu from "../components/ComponentMenu";
import Add from "../assets/Add.svg";
import Test from "../assets/test.jpg";

const numberOfFavorites = 5;

const DROP_CONFIG = {
  enabled: true,
  defaultItem: {
    w: 1,
    h: 8,
  },
};

const GRID_CONFIG = {
  cols: 2,
  rowHeight: 50,
};

const DRAG_CONFIG = {
  bounded: true,
};

function Profile() {
  const [albums, setAlbums] = useState([Add, Add, Add, Add, Add]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const { width, containerRef, mounted } = useContainerWidth();

  const [componentMenuOpen, setComponentMenuOpen] = useState(false);
  const [layout, setLayout] = useState([{ i: "b", x: 1, y: 0, w: 1, h: 8 }]);

  function handleAlbumClick(index) {
    setSelectedAlbum(index);
    setSearchOpen(true);
  }

  function handleAlbumSelect(imageSrc) {
    if (selectedAlbum === null) return;

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
    const componentName = event.dataTransfer.getData("component");

    if (!componentName) return;

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

  function handleLayoutChange(newLayout) {
    setLayout(newLayout);
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
            {mounted && width > 0 && (
              <ReactGridLayout
                layout={layout}
                width={width}
                gridConfig={GRID_CONFIG}
                dragConfig={DRAG_CONFIG}
                dropConfig={DROP_CONFIG}
                isDroppable={true}
                onDrop={handleDrop}
                onLayoutChange={handleLayoutChange}
                compactor={horizontalCompactor}
              >
                {layout.map((item) => (
                  <div>{item.type || item.i}</div>
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
