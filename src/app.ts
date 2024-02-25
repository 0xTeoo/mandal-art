import { BaseComponent } from './core/Component';
import { GoalList } from './components/GoalList';

class App extends BaseComponent<HTMLElement> {
  template() {
    return `
      <header class="header">
        <h1 class="header-title">MANDAL_ART</h1>
        <p class="header-description">꿈과 목표를 시각화하여 실현에 이르게 하는 첫 걸음, </br>당신만의 맞춤형 만다라트 계획표로 일상에 변화를 주세요.</p>
      </header>
      <main class="goal-section"></main>
      <footer class="footer">
        <p class="footer-description">Copyright 2024. @Moon All rights reserved</p>
      </footer>
    `
  }

  async mounted() {
    const $goalSection = this.$target.querySelector('.goal-section')! as HTMLElement;
    new GoalList($goalSection);
  }
}

new App(document.querySelector("#app")!);