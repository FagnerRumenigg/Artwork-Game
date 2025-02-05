import React from "react";
import { useDroppable } from "@dnd-kit/core";
import "./styles.css";

function DroppableSlot({ index, timeline }) {
  const { setNodeRef } = useDroppable({
    id: `slot-${index}`,
  });

  const isCorrect = timeline[index]?.correct;

  return <div ref={setNodeRef} id={`slot-${index}`} className={`timeline-slot ${isCorrect ? "correct" : ""}`} />;
}

export default DroppableSlot;
