import html2canvas from 'html2canvas';
import { BaseComponent } from './core/Component';
import { GoalList } from './components/GoalList';
import { signInWithRedirect } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { SignInModal } from './components/SignInModal';

export const MY_USER_ID = "2ZERQRUJZ4fUoI7Gm9LX00aMWub2";

const HEADER_TITLE = "MANDAL_ART"
const HEADER_DESCRIPTION = "Visualize Your Dream and Goals.</br>Make your day better with your Mandala chart for your dream."
const FOOTER_DESCRIPTION = "Copyright 2024. @Moon All rights reserved"

class App extends BaseComponent<HTMLElement, { isModalOpen: boolean, isLogin: boolean }> {
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
                <img src="./assets/download.svg" width="24" height="24" />
              </button>
            </li>
          </ul>
        </aside>
      </header>
      <main class="goal-section"></main>
      ${this.state.isModalOpen ? `
      <section class="modal"></section>` : ""}
      <footer class="footer">
        <p class="footer-description">${FOOTER_DESCRIPTION}</p>
      </footer>
    `
  }

  setup() {
    this.state = {
      isModalOpen: false,
      isLogin: false
    }
  }

  setEvent() {
    const imageDownloadButton = document.querySelector(".image-download-button")! as HTMLButtonElement;

    imageDownloadButton.addEventListener("click", () => {
      this.handleImageDownloadButtonClick();
    });

    // TODO: Login need to be implemented
    // const dataSaveButton = document.querySelector(".data-save-button")!

    // dataSaveButton.addEventListener('click', () => {
    //   this.handleDataSaveButtonClick();
    // })
  }

  async mounted() {
    const goalSection = this.$target.querySelector('.goal-section')! as HTMLElement;
    new GoalList(goalSection, { goals: [] });

    if (this.state.isModalOpen) {
      const modal = document.querySelector(".modal")! as HTMLElement;
      new SignInModal(modal, { onClose: this.closeModal.bind(this), onClickGoogleButton: this.signInGoogle.bind(this) });
    }

    // TODO: Login need to be implemented
    // try {
    //   const authResult = await getRedirectResult(auth);

    //   if (authResult) {
    //     const credential = GoogleAuthProvider.credentialFromResult(authResult)!;
    //     const token = credential.accessToken;
    //     const user = authResult.user;
    //     this.setState({ ...this.state, isLogin: true });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
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

  handleDataSaveButtonClick() {
    if (this.state.isLogin) {
      // TODO: Save data to firebase
    } else {
      this.setState({ ...this.state, isModalOpen: true })
      this.$body.classList.add("modal-open");
    }
  }

  closeModal() {
    this.setState({ ...this.state, isModalOpen: false })
    this.$body.classList.remove("modal-open");
  }

  signInGoogle() {
    signInWithRedirect(auth, provider);
  }
}

new App(document.querySelector("#app")!, {});