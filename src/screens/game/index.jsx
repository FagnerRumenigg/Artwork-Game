// Game.jsx
import React, { useState, useEffect } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import DraggableArtwork from "./dragSlot/index.jsx";
import DroppableSlot from "./dropSlot/index.jsx";
import getArtworksData from "../../data/artworksData";
import Scoreboard from "./scoreboard/index.jsx"; // Certifique-se de que o caminho esteja correto
import "./styles.css";

function Game({ players }) {
  // Converte os nomes (strings) recebidos em objetos com pontos (inicialmente 0)
  const [scoreboard, setScoreboard] = useState(
    players.map((name) => ({ name, points: 0 }))
  );
  // Estado para controlar de quem é a vez (índice no scoreboard)
  const [currentPlayer, setCurrentPlayer] = useState(0);

  // Estados para a lógica do jogo (obras de arte e timeline)
  const [artworks, setArtworks] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [sortedArtworks, setSortedArtworks] = useState([]);

  useEffect(() => {
    const artworksData = getArtworksData();
    setArtworks(artworksData);
    // Cria uma lista ordenada (imutável) das obras pela propriedade "year"
    setSortedArtworks([...artworksData].sort((a, b) => a.year - b.year));
    setTimeline(Array(artworksData.length).fill(null));
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    // Se o item não foi dropado sobre uma área válida, não faz nada
    if (!over) return;

    const artworkId = parseInt(active.id, 10);
    const artwork = artworks.find((art) => art.id === artworkId);
    // Identifica o índice do slot da timeline a partir do id (ex: "slot-2")
    const timelineSlotIndex = parseInt(over.id.replace("slot-", ""), 10);
    // Obtém o ano correto da peça para aquele slot, usando a lista ordenada
    const correctYear = sortedArtworks[timelineSlotIndex].year;

    if (artwork.year === correctYear) {
      // Jogada correta:
      // 1. Atualiza a timeline (coloca a peça no slot correspondente)
      const newTimeline = [...timeline];
      newTimeline[timelineSlotIndex] = { ...artwork, correct: true };
      setTimeline(newTimeline);
      // 2. Remove a peça da lista de obras disponíveis
      setArtworks(artworks.filter((art) => art.id !== artworkId));
      // 3. Atualiza o placar do jogador atual (acrescenta 100 pontos)
      setScoreboard((prevScoreboard) =>
        prevScoreboard.map((player, index) =>
          index === currentPlayer
            ? { ...player, points: player.points + 100 }
            : player
        )
      );
      // O mesmo jogador continua jogando, portanto, não alteramos currentPlayer.
    } else {
      // Jogada incorreta: nenhum ponto e passa para o próximo jogador.
      setCurrentPlayer((prev) => (prev + 1) % scoreboard.length);
    }
  };

  return (
    <div className="game-container">
      {/* Placar que inclui a lista de jogadores e, opcionalmente, destaque para o jogador atual */}
      <Scoreboard players={scoreboard} currentPlayer={currentPlayer} />

      <h1>Organize as Obras de Arte</h1>
      <p>
        <strong>É a vez de:</strong> {scoreboard[currentPlayer].name}
      </p>

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
