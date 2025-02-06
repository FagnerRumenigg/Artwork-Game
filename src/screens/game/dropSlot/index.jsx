// DroppableSlot/index.jsx
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import "./styles.css";

function DroppableSlot({ index, timeline }) {
  const { setNodeRef } = useDroppable({
    id: `slot-${index}`,
  });

  const artwork = timeline[index];

  return (
    <div
      ref={setNodeRef}
      id={`slot-${index}`}
      className={`timeline-slot ${artwork && artwork.correct ? "correct" : ""}`}
    >
      {artwork && artwork.correct && (
        <img
          src={artwork.image}
          alt={artwork.title}
          className="timeline-artwork"
        />
      )}
    </div>
  );
}

export default DroppableSlot;
