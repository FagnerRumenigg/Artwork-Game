// App.jsx
import React, { useState } from "react";
import "./App.css";
import Game from "./screens/game/index";
import HomeScreen from "./screens/home/index"; // certifique-se de que o caminho está correto

function App() {
  // Se players for null ou [] significa que ainda estamos na HomeScreen.
  // Ao iniciar o jogo, players será uma lista com pelo menos um jogador.
  const [players, setPlayers] = useState(null);

  const handleStartGame = (playersList) => {
    setPlayers(playersList);
  };

  return (
    <div>
      {players ? (
        <Game players={players} />
      ) : (
        <HomeScreen onStartGame={handleStartGame} />
      )}
    </div>
  );
}

export default App;
