
import Store from '../store';

test('Should set state values', () => {
  const storeComponent = new Store();
  storeComponent.setState({ a: 3, b: 2 });
  storeComponent.setState({ c: 3 });

  expect(JSON.stringify(storeComponent.state)).toBe((JSON.stringify({ a: 3, b: 2, c: 3 })));
});
