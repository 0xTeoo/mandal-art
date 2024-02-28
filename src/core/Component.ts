export interface Component<S = {}> {
  setup: () => void;
  template: () => string;
  setEvent: () => void;
  setState: (newState: S) => void;
  mounted: () => void;
}

export abstract class BaseComponent<T extends HTMLElement, S = {}, P = {}> implements Component<S> {
  $target: T;
  state: Readonly<S>;
  props: Readonly<P>;

  constructor(element: T, props: Readonly<P>) {
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
    const newNode = document.importNode(this.$target, true);
    newNode.innerHTML = this.template();

    const oldChildNodes = [...this.$target.childNodes];
    const newChildNodes = [...newNode.childNodes];
    const max = Math.max(oldChildNodes.length, newChildNodes.length);

    for (let i = 0; i < max; i++) {
      updateElement(this.$target, newChildNodes[i], oldChildNodes[i]);
    }

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
// TODO: Refactoring needed
// @ts-ignore
function updateElement(parent, newNode, oldNode) {
  if (!newNode && oldNode) return oldNode.remove();
  if (newNode && !oldNode) return parent.appendChild(newNode);
  if (newNode instanceof Text && oldNode instanceof Text) {
    if (oldNode.nodeValue === newNode.nodeValue) return;
    oldNode.nodeValue = newNode.nodeValue
    return;
  }
  if (newNode.nodeName !== oldNode.nodeName) {
    const index = [...parent.childNodes].indexOf(oldNode);
    oldNode.remove();
    parent.appendChild(newNode, index);
    return;
  }
  updateAttributes(oldNode, newNode);

  const newChildren = [...newNode.childNodes];
  const oldChildren = [...oldNode.childNodes];
  const maxLength = Math.max(newChildren.length, oldChildren.length);
  for (let i = 0; i < maxLength; i++) {
    updateElement(oldNode, newChildren[i], oldChildren[i]);
  }
}

// @ts-ignore
function updateAttributes(oldNode, newNode) {
  for (const { name, value } of [...newNode.attributes]) {
    console.log(name, value);
    if (value === oldNode.getAttribute(name)) continue;
    oldNode.setAttribute(name, value);
  }
  for (const { name } of [...oldNode.attributes]) {
    if (newNode.getAttribute(name) !== undefined) continue;
    oldNode.removeAttribute(name);
  }
}