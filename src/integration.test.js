import { storeFactory } from '../test/testUtils';
import { guessWord } from './actions';

describe('', () => {
  const secretWord = 'party';
  const unscuccessfulGuess = 'train';

  describe('no guessed words', () => {
    let store;

    const initialState = { secretWord };
    beforeEach(() => {
      store = storeFactory(initialState);
    });

    test('updates state coreectly for incorrect guesses', () => {
      store.dispatch(guessWord(unscuccessfulGuess));
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        success: false,
        guessedWords: [
          {
            guessedWord: unscuccessfulGuess,
            letterMatchCount: 3,
          },
        ],
      };
      expect(newState).toEqual(expectedState);
    });

    test('updates state coreectly for correct guesses', () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();

      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [
          {
            guessedWord: secretWord,
            letterMatchCount: 5,
          },
        ],
      };

      expect(newState).toEqual(expectedState);
    });
  });

  describe('some guessed words', () => {
    const guessedWords = [
      {
        guessedWord: 'agile',
        letterMatchCount: 1,
      },
    ];

    const initialState = { guessedWords, secretWord };
    let store;

    beforeEach(() => {
      store = storeFactory(initialState);
    });

    test('updates state coreectly for incorrect guesses', () => {
      store.dispatch(guessWord(unscuccessfulGuess));
      const newState = store.getState();

      const expectedState = {
        secretWord,
        success: false,
        guessedWords: [
          ...guessedWords,
          {
            guessedWord: unscuccessfulGuess,
            letterMatchCount: 3,
          },
        ],
      };

      expect(newState).toEqual(expectedState);
    });

    test('updates state coreectly for correct guesses', () => {
      store.dispatch(guessWord(secretWord));

      const newState = store.getState();
      const expectedState = {
        ...initialState,
        guessedWords: [
          ...guessedWords, { guessedWord: secretWord, letterMatchCount: 5 }
        ],
        success: true
      }
    });
  });
});
