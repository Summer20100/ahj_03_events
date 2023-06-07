import image from '../assets/goblin.png';

export default class GoblinGame {
  constructor(boarSize, interval) {
    this.field = 0;
    this.boarSize = boarSize;
    this.successShot = 0;
    this.bossShot = 0;
    this.rounds = 0;
    this.gameResults = document.createElement('p');
    this.interval = interval;
    this.lastPosition = 0;

    this.imageGoblin = new Image();
    this.imageGoblin.src = image;
    this.imageGoblin.classList.add('red-head');
  }

  goblinSetter() {
    const position = Math.floor(Math.random() * (this.boarSize ** 2));
    if (position === this.lastPosition) {
      const position2 = this.goblinSetter();
      return position2;
    }
    return position;
  }

  boardGeneration() {
    this.boarSize = this.boarSize;
    this.field = document.createElement('div');
    this.field.classList.add('board');
    const width = 124 * this.boarSize;
    this.field.style.width = `${width}px`;
    document.body.appendChild(this.field);
    for (let i = 0; i < this.boarSize ** 2; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      this.field.appendChild(cell);
    }
    document.body.appendChild(this.gameResults);
  }

  setTimeout(interval) {
    const intervalId = setInterval(() => {
      this.lastPosition = this.goblinSetter();
      this.field.childNodes[this.lastPosition].appendChild(this.imageGoblin);
      this.rounds += 1;
      this.gameResults.textContent = `Число поподаний: ${this.successShot} / Число промахов: ${this.bossShot} / Всего раз перебежал гоблин: ${this.rounds}`;
      if (this.bossShot > 4) {
        clearInterval(intervalId);
        document.body.insertAdjacentHTML(
          'beforeEnd',
          `<div class="modal_mask">
            <div class="modal">
              <div class="modal_msg">В следующий раз обязятельно получится</div>
              <button class="close_btn">Закрыть</button>
            </div>
          </div>`,
        );
        const closeBtn = document.querySelector('.close_btn');
        closeBtn.addEventListener('click', (ev) => {
          ev.target.closest('div.modal_mask').remove();
          location.reload();
        });
      }
    }, interval);
  }

  shootsRecorder() {
    const intervalId = this.setTimeout(this.interval);
    console.log(intervalId);
    document.body.addEventListener('click', (ev) => {
      if (ev.target.classList.contains('red-head')) {
        ev.target.remove();
        this.successShot += 1;
        this.gameResults.textContent = `Число поподаний: ${this.successShot} / Число промахов: ${this.bossShot} / Всего раз перебежал гоблин: ${this.rounds}`;
      } else if (ev.target.classList.contains('cell')) {
        this.bossShot += 1;
        this.gameResults.textContent = `Число поподаний: ${this.successShot} / Число промахов: ${this.bossShot} / Всего раз перебежал гоблин: ${this.rounds}`;
      }
    });
  }
}
