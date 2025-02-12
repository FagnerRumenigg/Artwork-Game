// screens/game/index.jsx
import React, { useState, useEffect, useCallback } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import DraggableArtwork from "./dragSlot/index.jsx";
import DroppableSlot from "./dropSlot/index.jsx";
import getArtworksData from "../../data/artworksData";
import Scoreboard from "./scoreboard/index.jsx";
import "./styles.css";

function Game({ players }) {
  function getRandomColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return '#' + randomColor.padStart(6, '0');
  }

  const initializeScoreboard = useCallback(() => {
    return players.map((name) => ({ name, points: 0, color: getRandomColor() }));
  }, [players]);

  const [scoreboard, setScoreboard] = useState(initializeScoreboard());
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [artworks, setArtworks] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [sortedArtworks, setSortedArtworks] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winners, setWinners] = useState([]);

  const initializeGame = useCallback(() => {
    const artworksData = getArtworksData();

    // Ordena a régua corretamente (por ID, para manter a sequência esperada)
    const orderedArtworks = [...artworksData].sort((a, b) => a.id - b.id);
    setSortedArtworks(orderedArtworks);
    
    // Embaralha as obras que ficarão disponíveis para arrastar
    const shuffledArtworks = [...artworksData].sort(() => Math.random() - 0.5);
    setArtworks(shuffledArtworks);
    
    // Reseta a timeline
    setTimeline(new Array(artworksData.length).fill(null));
    setGameOver(false);
    setWinners([]);
    setCurrentPlayer(0);
    setScoreboard(initializeScoreboard());
  }, [initializeScoreboard]);
  

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const determineWinner = useCallback(() => {
    setGameOver(true);
    const highestScore = Math.max(...scoreboard.map((player) => player.points));
    const winningPlayers = scoreboard.filter(
      (player) => player.points === highestScore
    );
    setWinners(winningPlayers);
  }, [scoreboard]);

  useEffect(() => {
    if (timeline.length > 0 && timeline.every((slot) => slot !== null)) {
      determineWinner();
    }
  }, [timeline, determineWinner]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
  
    const artworkId = parseInt(active.id, 10);
    const artwork = artworks.find((art) => art.id === artworkId);
    const timelineSlotIndex = parseInt(over.id.replace("slot-", ""), 10);
    const expectedArtwork = sortedArtworks[timelineSlotIndex]; // Certo agora!
  
    if (artwork.id === expectedArtwork.id) { 
      // Atualiza a régua
      const newTimeline = [...timeline];
      newTimeline[timelineSlotIndex] = { ...artwork, correct: true };
      setTimeline(newTimeline);
  
      // Remove a arte da área de arrasto
      setArtworks(artworks.filter((art) => art.id !== artworkId));
  
      // Atualiza a pontuação do jogador atual
      setScoreboard((prevScoreboard) =>
        prevScoreboard.map((player, index) =>
          index === currentPlayer ? { ...player, points: player.points + 100 } : player
        )
      );
    } else {
      // Passa a vez para o próximo jogador
      setCurrentPlayer((prev) => (prev + 1) % scoreboard.length);
    }
  };
  
  

  const resetGame = () => {
    initializeGame();
  };

  return (
    <div className="game-container">
      <Scoreboard players={scoreboard} currentPlayer={currentPlayer} />

      {gameOver ? (
        <div className="winner-modal">
          <h2>🎉 Fim de jogo! 🎉</h2>
          {winners.length === 1 ? (
            <p>
              🏆 O vencedor é {" "}
              <span style={{ color: winners[0].color }}>
                <strong>{winners[0].name}</strong>
              </span>{" "}
              com {winners[0].points} pontos! 🏆
            </p>
          ) : (
            <p>
              🏆 Empate entre: {" "}
              {winners.map((w, index) => (
                <span key={index} style={{ color: w.color }}>
                  {w.name}
                  {index < winners.length - 1 ? ", " : ""}
                </span>
              ))}{" "}
              com {winners[0].points} pontos! 🏆
            </p>
          )}
          <button onClick={resetGame}>Reiniciar jogo</button>
        </div>
      ) : (
        <>
          <h1>Organize as Obras de Arte</h1>
          <p>
            <strong>É a vez de: </strong>
            <span style={{ color: scoreboard[currentPlayer].color }}>
              {scoreboard[currentPlayer].name}
            </span>
          </p>

          <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <div className="game-layout">
              <div className="artwork-column left">
                {artworks.slice(0, Math.ceil(artworks.length / 2)).map((art) => (
                  <DraggableArtwork key={art.id} artwork={art} />
                ))}
              </div>
              <div className="timeline-grid">
                {timeline.map((_, index) => (
                  <DroppableSlot key={index} index={index} timeline={timeline} />
                ))}
              </div>
              <div className="artwork-column right">
                {artworks.slice(Math.ceil(artworks.length / 2)).map((art) => (
                  <DraggableArtwork key={art.id} artwork={art} />
                ))}
              </div>
            </div>
          </DndContext>
        </>
      )}
    </div>
  );
}

export default Game;
