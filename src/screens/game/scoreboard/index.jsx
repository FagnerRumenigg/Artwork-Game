import React, { useState } from "react";
import "./styles.css";

function Scoreboard({ players, currentPlayer }) {
  const [collapsed, setCollapsed] = useState(true);

  const toggleScoreboard = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`scoreboard ${collapsed ? "collapsed" : ""}`}>
      <div className="scoreboard-header" onClick={toggleScoreboard}>
        <span>Tabela de pontos</span>
        <button className="toggle-button">
          {collapsed ? "►" : "◄"}
        </button>
      </div>
      {!collapsed && (
        <ul>
          {players.map((player, index) => (
            <li key={index} style={{ color: player.color }}>
              {player.name}: {player.points} pontos
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Scoreboard;
