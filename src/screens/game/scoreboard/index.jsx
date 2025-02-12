// screens/game/scoreboard/index.jsx
import React from "react";
import "./styles.css";

function Scoreboard({ players, currentPlayer }) {
  return (
    <div className="scoreboard">
      <h2>Placar</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index} style={{ color: player.color }}>
            {player.name}: {player.points} pontos
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Scoreboard;
