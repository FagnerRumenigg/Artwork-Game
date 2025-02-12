import React from "react";
import { useDraggable } from "@dnd-kit/core";
import ArtworkCard from "../card/index";
import "./styles.css";

function DraggableArtwork({ artwork }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: artwork.id.toString(),
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      <ArtworkCard artwork={artwork} />
    </div>
  );
}

export default DraggableArtwork;
