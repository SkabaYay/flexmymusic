import { useState } from "react";
import "../css/profile.css";

function Profile() {
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
        <div className="top-container">
          <div className="profile-info">
            <div className="profile-image"></div>
            <p>User</p>
          </div>
          <div className="favorites"></div>
        </div>

        <div className="bottom-container">
          <div className="add-something">
            <p>+ Add something!</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
