import '../css/style.css';
import GoblinGame from './GoblinGame';

window.addEventListener('load', () => {
  const goblinGame = new GoblinGame(3, 1000);
  goblinGame.boardGeneration();
  goblinGame.shootsRecorder();
  //goblinGame.imgCreate(1000);
});
