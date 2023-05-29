import image from '../assets/goblin.png';

export default class GoblinGame {
  constructor() {
    this.position = 0;
    this.field = 0;
    this.boarSize = 0;
    this.successShot = 0;
    this.bossShot = 0;
    this.rounds = 0;
    this.gameResults = document.createElement('p');
  }

  goblinSetter() {
    return Math.floor(Math.random() * (this.boarSize ** 2));
  }

  boardGeneration(countOfCells) {
    this.boarSize = countOfCells;
    this.field = document.createElement('div');
    this.field.classList.add('board');
    const width = 124 * countOfCells;
    this.field.style.width = `${width}px`;
    document.body.appendChild(this.field);
    for (let i = 0; i < countOfCells ** 2; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      this.field.appendChild(cell);
    }
    document.body.appendChild(this.gameResults);
  }

  imgCreate(interval) {
    const goblin = new Image();
    goblin.src = image;
    goblin.classList.add('red-head');
    let intervalId = setInterval(() => {
      if (this.bossShot > 4) {
        clearInterval(intervalId);
        intervalId = null;
        document.body.insertAdjacentHTML(
          'beforeEnd',
          `<div class="modal_mask">
            <div class="modal">
              <div class="modal_msg">Ты был не точен, игра окончена.</div>
              <button class="close_btn">Закрыть</button>
            </div>
          </div>`,
        );
        const clsModalBtn = document.querySelector('.close_btn');
        clsModalBtn.addEventListener('click', (ev) => ev.target.closest('div.modal_mask').remove() & location. reload());
      }
      const position = this.goblinSetter();
      this.field.childNodes[position].appendChild(goblin);
      this.rounds += 1;
      this.gameResults.textContent = `Попадания: ${this.successShot} / Промахи: ${this.bossShot} / Число попыток: ${this.rounds}`;
    }, interval);
  }

  shootsRecorder() {
    document.body.addEventListener('click', (ev) => {
      if (ev.target.classList.contains('red-head')) {
        this.successShot += 1;
        ev.target.closest('img.red-head').remove()
      } else if (ev.target.classList.contains('cell')) {
        this.bossShot += 1;
      }
    });
  }
}
