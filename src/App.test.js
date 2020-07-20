import React from 'react';
import { shallow } from 'enzyme';

import { storeFactory } from '../test/testUtils';
import App, { UnconnectedApp } from './App';

const setup = (state = {}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<App store={store} />).dive().dive();
  return wrapper;
}

describe('redux state as props', () => {
  test('has success piece of state as props', () => {
    const wrapper = setup();
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(false);
  });

  test('has guessedWords piece of state as props', () => {
    const wrapper = setup();
    const guessedWordsProps = wrapper.instance().props.guessedWords;
    expect(guessedWordsProps).toEqual([]);
  });

  test('has secretWord piece of state as props', () => {
    const secretWord = 'party';
    const wrapper = setup({ secretWord });
    const secretWordProps = wrapper.instance().props.secretWord;
    expect(secretWordProps).toBe(secretWord);
  });

  test('has action creator to get secretword', () => {
    const wrapper = setup();
    const getSecretWordProps = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProps).toBeInstanceOf(Function);
  });
});

test('`getSecretWord` runs on app mount', () => {
  const getSecretWordMock = jest.fn();

  const props = {
    getSecretWord: getSecretWordMock,
    success: true,
    guessedWords: [],
  }

  // set up app component with getSecretWordMock as the getSecretWord prop

  const wrapper = shallow(<UnconnectedApp {...props} />);

  wrapper.instance().componentDidMount();

  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;

  expect(getSecretWordCallCount).toBe(1);
});

