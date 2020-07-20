import React, { Component } from 'react';
import { connect } from 'react-redux';

import { guessWord } from './actions';

export class UnconnectedInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentGuess: null,
    };
  }

  submitGuessedWord = (e) => {
    e.preventDefault();

    const guessedWord = this.state.currentGuess;

    if (guessedWord && guessedWord.length > 0) {
      this.props.guessWord(guessedWord);
      this.setState({ currentGuess: '' });
    }
  }

  render() {
    const contents = this.props.success ? null : (
      <form className='form-inline'>
        <input
          data-test='input-box'
          className='mb-2 mx-sm-3'
          type='text'
          value={this.state.currentGuess}
          onChange={(e) => {
            this.setState({ currentGuess: e.target.value });
          }}
          placeholder='enter guess'
        />
        <button
          data-test='submit-button'
          type='submit'
          className='btn btn-primary mb-2'
          onClick={this.submitGuessedWord}
        >
          Submit
        </button>
      </form>
    );
    return <div data-test='component-input'>{contents}</div>;
  }
}

const mapStateToProps = ({ success }) => ({
  success,
});

export default connect(mapStateToProps, { guessWord })(UnconnectedInput);
