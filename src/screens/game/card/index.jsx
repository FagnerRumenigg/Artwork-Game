// screens/game/card/index.jsx
import React from "react";
import "./styles.css";

function ArtworkCard({ artwork }) {
  return (
    <div className="artwork-card">
      <div className="artwork-image-container">
        <img src={artwork.image} alt={artwork.title} className="artwork-image" />
      </div>
      <div className="artwork-title">
        {artwork.title}
      </div>
    </div>
  );
}

export default ArtworkCard;
