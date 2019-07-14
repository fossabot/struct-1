export default class Store {
  state = {};

  setState(newState = {}) {
    this.state = { ...this.state, ...newState };
  }
}
