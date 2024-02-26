import html2canvas from 'html2canvas';
import { BaseComponent } from './core/Component';
import { GoalList } from './components/GoalList';

class App extends BaseComponent<HTMLElement> {
  template() {
    return `
      <header class="header">
        <section class="header-contents">
          <h1 class="header-title">MANDAL_ART</h1>
          <p class="header-description">꿈과 목표를 시각화하여 실현에 이르게 하는 첫 걸음, </br>당신만의 맞춤형 만다라트 계획표로 일상에 변화를 주세요.</p>
        </section>
        <aside>
          <ul class="header-button-list">
            <li>
              <button class="image-download-button">
                <img src="./assets/download.svg" width="24" height="24" />
              </button>
            </li>
          </ul>
        </aside>
      </header>
      <main class="goal-section"></main>
      <footer class="footer">
        <p class="footer-description">Copyright 2024. @Moon All rights reserved</p>
      </footer>
    `
  }

  setEvent() {
    const $body = document.querySelector("body")! as HTMLElement;
    const imageDownloadButton = document.querySelector(".image-download-button")! as HTMLButtonElement;

    imageDownloadButton.addEventListener("click", () => {
      html2canvas($body, { foreignObjectRendering: true }).then(canvas => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "mandal_art.png";
        link.click();
      });
    });
  }

  async mounted() {
    const $goalSection = this.$target.querySelector('.goal-section')! as HTMLElement;
    new GoalList($goalSection);
  }
}

new App(document.querySelector("#app")!);