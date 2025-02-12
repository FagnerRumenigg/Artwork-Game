// screens/home/index.jsx
import React, { useState } from "react";
import "./styles.css";

function HomeScreen({ onStartGame }) {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([]);

  const handleAddPlayer = () => {
    const trimmedName = playerName.trim();
    if (!trimmedName) return;
    setPlayers((prevPlayers) => [...prevPlayers, trimmedName]);
    setPlayerName("");
  };

  // Adiciona o jogador ao pressionar Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddPlayer();
    }
  };

  const handleStartGame = () => {
    if (players.length > 0) {
      onStartGame(players);
    }
  };

  return (
    <div className="home-screen">
      <h1>Bem-vindo ao Jogo!</h1>
      <div className="player-input">
        <input
          type="text"
          placeholder="Digite o nome do jogador"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAddPlayer}>Adicionar Jogador</button>
      </div>
      <div className="player-list">
        <h2>Jogadores Adicionados:</h2>
        {players.length === 0 ? (
          <p>Nenhum jogador adicionado.</p>
        ) : (
          <ul>
            {players.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={handleStartGame} disabled={players.length === 0}>
        Iniciar Jogo
      </button>
    </div>
  );
}

export default HomeScreen;
