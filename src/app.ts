import html2canvas from 'html2canvas';
import { BaseComponent } from './core/Component';
import { GoalList } from './components/GoalList';
import downloadIcon from './images/download.svg';

const HEADER_TITLE = "MANDAL_ART"
const HEADER_DESCRIPTION = "꿈과 목표를 시각화하여 실현에 이르게 하는 첫 걸음, </br>당신만의 맞춤형 만다라트 계획표로 일상에 변화를 주세요."

class App extends BaseComponent<HTMLElement>{
  private $body = document.querySelector("body")!;

  template() {
    return `
      <header class="header">
        <section class="header-contents">
          <h1 class="header-title">${HEADER_TITLE}</h1>
          <p class="header-description">${HEADER_DESCRIPTION}</p>
        </section>
        <aside data-html2canvas-ignore="true">
          <ul class="aside-list">
            <li>
              <button class="image-download-button">
                <img src="${downloadIcon}" width="24" height="24" />
              </button>
            </li>
          </ul>
        </aside>
      </header>
      <main class="goal-section"></main>
      <footer class="footer">
        <p class="footer-description">
          Copyright 2024. 
          <a href="https://github.com/mooncastlestone" target="_blank" class="github-link">@mooncastlestone</a>
          All rights reserved
        </p>
      </footer>
    `
  }

  setEvent() {
    const $imageDownloadButton = document.querySelector(".image-download-button")! as HTMLButtonElement;

    $imageDownloadButton.addEventListener("click", () => {
      this.handleImageDownloadButtonClick();
    });
  }

  async mounted() {
    const $goalSection = this.$target.querySelector('.goal-section')! as HTMLElement;
    new GoalList($goalSection, { goals: [] });
  }

  handleImageDownloadButtonClick() {
    html2canvas(this.$body, { foreignObjectRendering: true }).then(canvas => {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "mandal_art.png";
      link.click();
    });
  }
}

new App(document.querySelector("#app")!, {});