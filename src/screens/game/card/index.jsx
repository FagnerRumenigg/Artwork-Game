import React from "react";
import "./styles.css"

function ArtworkCard({ artwork }) {
  return (
    <div className="artwork-card">
      <img src={artwork.image} alt={artwork.title} />
      <p>{artwork.title}</p>
    </div>
  );
}

export default ArtworkCard;
