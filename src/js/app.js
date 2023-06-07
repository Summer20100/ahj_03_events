import '../css/style.css';
import GoblinGame from './GoblinGame';

window.addEventListener('load', () => {
  const goblinGame = new GoblinGame(3, 700);
  goblinGame.boardGeneration();
  goblinGame.shootsRecorder();
});
