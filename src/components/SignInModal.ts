import { BaseComponent } from '../core/Component';

const TITLE = "당신의 꿈을 저장하세요!"
const GOOGLE_BUTTON_TEXT = "구글로 계속하기";

type SignInModalProps = {
  onClose(): void;
  onClickGoogleButton(): void;
}

export class SignInModal extends BaseComponent<HTMLElement, {}, SignInModalProps> {
  template() {
    return `
      <section class="login-modal-inner">
      <button class="modal-close-button">
        <img src="../../assets/close.svg" class="modal-close-icon"/>
      </button>
      <section class="login-modal-contents">
        <h1 class="login-modal-title">${TITLE}</h1>
      </section>
      <button class="google-button">
        <img src="../../assets/google.svg" class="google-icon"/>
        <span class="google-button-text">${GOOGLE_BUTTON_TEXT}</span>
      </button>
      </section>
    `
  }

  setEvent(): void {
    const closeButton = document.querySelector(".modal-close-button")! as HTMLButtonElement;
    const googleButton = document.querySelector(".google-button")! as HTMLButtonElement;

    closeButton.addEventListener("click", () => {
      this.handleCloseButtonClick();
    })

    googleButton.addEventListener("click", () => {
      this.handleGoogleButtonClick();
    })
  }

  handleCloseButtonClick() {
    this.props.onClose();
  }

  handleGoogleButtonClick() {
    this.props.onClickGoogleButton();
  }
}