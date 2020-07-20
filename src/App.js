import React, { Component } from 'react';
import { connect } from 'react-redux';

import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import { getSecretWord } from './actions';
import Input from './input';
import './App.css';

export class UnconnectedApp extends Component {
  componentDidMount() {
    this.props.getSecretWord();
  }

  render() {
    const { success, guessedWords } = this.props;

    return (
      <div className='container'>
        <h1>Jotto</h1>
        <Congrats success={success} />
        <Input />
        <GuessedWords
          guessedWords={guessedWords}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ success, guessedWords, secretWord }) => ({
  success,
  guessedWords,
  secretWord,
});

export default connect(mapStateToProps, { getSecretWord })(UnconnectedApp);
