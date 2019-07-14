import EventSource from '../eventSource';

const FakeComponent = function FakeComponent() {
  return {
    messages: [],
    addMessage: function addMessage(msg) {
      this.messages.push(msg);
    },
    getMessages: function getMessages() {
      return this.messages;
    },
  };
};

const MESSAGE_BEFORE_CALL_FIRE = 'Before call fire';
const MESSAGE_AFTER_CALL_FIRE = 'after call fire';
const MESSAGE_ACTION1 = 'Fisrt action';
const MESSAGE_ACTION2 = 'Second action';


test('Should call a function listener', async () => {
  const event = new EventSource({}, 'onClick');
  const action = jest.fn();

  event.addListener(action);
  await event.fire();

  expect(action).toHaveBeenCalled();
});

test('Should dispatch all functions async and wait only final code', async () => {
  const component = new FakeComponent();
  const event = new EventSource(component, 'onClick');

  const action1 = function action1(componentHandler) {
    componentHandler.addMessage(MESSAGE_ACTION1);
  };

  const action2 = function action2(componentHandler) {
    componentHandler.addMessage(MESSAGE_ACTION2);
  };

  event.addListener(action1);
  event.addListener(action2);

  component.addMessage(MESSAGE_BEFORE_CALL_FIRE);
  const eventAysnc = event.fire();
  component.addMessage(MESSAGE_AFTER_CALL_FIRE);

  await eventAysnc;

  const messagesGenerated = component.getMessages();
  const messagesExpected = [
    MESSAGE_BEFORE_CALL_FIRE,
    MESSAGE_AFTER_CALL_FIRE,
    MESSAGE_ACTION1,
    MESSAGE_ACTION2];

  expect(messagesExpected).toStrictEqual(messagesGenerated);
});

test('Should dispatch all functions async and wait before continue', async () => {
  const component = new FakeComponent();
  const event = new EventSource(component, 'onClick');

  const action1 = function action1(componentHandler) {
    componentHandler.addMessage(MESSAGE_ACTION1);
  };

  const action2 = function action2(componentHandler) {
    componentHandler.addMessage(MESSAGE_ACTION2);
  };

  event.addListener(action1);
  event.addListener(action2);

  component.addMessage(MESSAGE_BEFORE_CALL_FIRE);
  await event.fire();
  component.addMessage(MESSAGE_AFTER_CALL_FIRE);

  const messagesGenerated = component.getMessages();
  const messagesExpected = [
    MESSAGE_BEFORE_CALL_FIRE,
    MESSAGE_ACTION1,
    MESSAGE_ACTION2,
    MESSAGE_AFTER_CALL_FIRE];

  expect(messagesExpected).toStrictEqual(messagesGenerated);
});
