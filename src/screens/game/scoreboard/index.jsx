// Scoreboard.jsx
import React, { useState } from "react";
import "./styles.css";

function Scoreboard({ players }) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="scoreboard-container">
      <button
        className="toggle-button"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Esconder Placar" : "Mostrar Placar"}
      </button>
      {isVisible && (
        <table className="scoreboard-table">
          <thead>
            <tr>
              <th>Jogador</th>
              <th>Pontos</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index}>
                <td>{player.name}</td>
                <td>{player.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Scoreboard;
