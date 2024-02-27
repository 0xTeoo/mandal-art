interface Component<S> {
  setup: () => void;
  template: () => string;
  setEvent: () => void;
  setState: (newState: S) => void;
  mounted: () => void;
}

export class BaseComponent<T extends HTMLElement, S = {}, P = {}> implements Component<S> {
  $target: T;
  state: Readonly<S>;
  props: Readonly<P>;

  constructor(element: T, props?: Readonly<P>) {
    this.$target = element;

    if (props) {
      this.props = props;
    }

    this.setup();
    this.render();
    this.setEvent();
  }

  setup() { }

  template() {
    return ''
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  setEvent() {
  }

  setState(newState: S) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  mounted() { }
}