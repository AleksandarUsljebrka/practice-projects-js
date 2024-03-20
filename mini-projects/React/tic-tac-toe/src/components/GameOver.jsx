import React from 'react'

function GameOver({winner, onRematch}) {
  return (
    <div id="game-over">
        <h2>GameOver!</h2>
        {winner && <p>{winner} won!</p>}
        {!winner && <p>It's draw!</p>}
        <p>
            <button onClick={onRematch}>Rematch</button>
        </p>
    </div>
  )
}

export default GameOver