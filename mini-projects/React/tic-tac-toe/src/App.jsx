import {useState} from 'react';
import Player from "./components/Player.jsx"
import GameBoard from "./components/GameBoard.jsx"
import Log from "./components/Log.jsx"
import GameOver from "./components/GameOver.jsx"
import {WINNING_COMBINATIONS} from "./winning-combinations.js"

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]  
];
const PLAYERS ={
    X:"Player 1",
    O:"Player 2"
};
function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player ==='X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}
function deriveWinner(gameBoard, players){
  let winner;
  
  for(const combination of WINNING_COMBINATIONS){
    let firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    let secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    let thirdquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdquareSymbol){
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}
function deriveGameBoard(gameTurns){

  let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray=>[...innerArray] )];

  for(const turn of gameTurns){
      const{square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  }
  return gameBoard;
}
function App() {

  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  
  let isDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    
    setGameTurns(prevTurns =>{
      const currentPlayer = deriveActivePlayer(prevTurns); 

      const updateTurns = [
        {square:{row:rowIndex, col:colIndex}, player:currentPlayer},
        ...prevTurns,
      ];

      return updateTurns;
    })
  }
  function handleRematch(){
    setGameTurns([]);
    
  }
  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers =>{
      return{
        ...prevPlayers,
        [symbol]:newName
      }
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
         
         <Player onChangeName = {handlePlayerNameChange} initialName={PLAYERS.X} symbol={"X"} isActive = {activePlayer === 'X'}/>
         <Player onChangeName = {handlePlayerNameChange} initialName={PLAYERS.O} symbol={"O"} isActive = {activePlayer === 'O'}/>

        </ol>
        
        <GameBoard onSelectSquare = {handleSelectSquare} board = {gameBoard}/>
      {(winner || isDraw) && <GameOver onRematch={handleRematch} winner={winner}/>}
      </div>
      <Log turns = {gameTurns}/>
    </main>
  )
}

export default App
