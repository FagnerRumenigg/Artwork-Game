import React, { useState, useEffect } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import DraggableArtwork from "./dragSlot/index.jsx";
import DroppableSlot from "./dropSlot/index.jsx";
import getArtworksData from "../../data/artworksData";
import "./styles.css";

function Game() {
  const [artworks, setArtworks] = useState([]);
  const [timeline, setTimeline] = useState([]);
  // Cria uma referência à lista ordenada (imutável) das obras
  const [sortedArtworks, setSortedArtworks] = useState([]);

  useEffect(() => {
    const artworksData = getArtworksData();
    setArtworks(artworksData);
    // Armazena a lista ordenada com base no ano
    setSortedArtworks([...artworksData].sort((a, b) => a.year - b.year));
    setTimeline(Array(artworksData.length).fill(null));
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const artworkId = parseInt(active.id, 10);
    const artwork = artworks.find((art) => art.id === artworkId);
    const timelineSlotIndex = parseInt(over.id.replace("slot-", ""), 10);

    // Usa a lista imutável para determinar o ano correto
    const correctYear = sortedArtworks[timelineSlotIndex].year;

    if (artwork.year === correctYear) {
      const newTimeline = [...timeline];
      newTimeline[timelineSlotIndex] = { ...artwork, correct: true };
      setTimeline(newTimeline);
      setArtworks(artworks.filter((art) => art.id !== artworkId));
    }
  };

  return (
    <div className="game-container">
      <h1>Organize as Obras de Arte</h1>
      
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="timeline-container">
          <div className="timeline-line"></div>
          {timeline.map((_, index) => (
            <DroppableSlot key={index} index={index} timeline={timeline} />
          ))}
        </div>

        <div className="artwork-grid">
          {artworks.map((art) => (
            <DraggableArtwork key={art.id} artwork={art} />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

export default Game;
