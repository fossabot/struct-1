export default class EventSource {
  #listeners = [];

  constructor(component, eventName) {
    this.eventName = eventName;
    this.component = component;
  }

  addListener(func) {
    this.#listeners.push(func);
  }

  async fire() {
    const iterator = await this.internalFire();
    let result = iterator.next();
    while (!result.done) {
      result = iterator.next();
    }
  }

  * internalFire() {
    const listernes = [...this.#listeners];
    // eslint-disable-next-line no-restricted-syntax
    for (const listener of listernes) yield listener(this.component, this);
  }

  hasListeners() {
    return this.#listeners.length > 0;
  }

  getComponent() {
    return this.component;
  }
}
