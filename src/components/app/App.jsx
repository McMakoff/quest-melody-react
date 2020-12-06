import React, {Component} from 'react';
import Welcome from '../welcome/Welcome';
import {questions} from "../../mocks/questions";
import Header from "../game/header/Header";
import Artist from "../game/artist/Artist";
import Genre from "../game/genre/Genre";
import {connect} from "react-redux";
import {actionCreator} from "../../reducer";
import PropTypes from 'prop-types';

const mapStateToProps = (state, ownProps) => {
  return (
    Object.assign({}, ownProps, {
      step: state.step,
      lives: state.lives,
    })
  );
};

const mapDispatchToProps = (dispatch) => ({
  onWelcomeClick: (step, data, lives) => dispatch(actionCreator.incrementStep(step, data, lives)),
  onUserAnswer: (userAnswer, data, lives, step) => {
    dispatch(actionCreator.incrementStep(step, data));
    dispatch(actionCreator.decrementLives(userAnswer, data, lives, step));
  },
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  getGameScreen() {
    const {onUserAnswer, step, lives} = this.props;
    const question = questions[step];

    switch (question.type) {
      case `artist`:
        return (
          <Artist
            question={question}
            onAnswer={(userAnswer) => onUserAnswer(userAnswer, questions, lives, step)}
          />
        );

      case `genre`:
        return (
          <Genre
            question={question}
            onAnswer={(userAnswer) => onUserAnswer(userAnswer, questions, lives, step)}
          />
        );
    }

    return null;
  }

  renderGameScreen() {
    const {step, lives} = this.props;
    const type = questions[step].type;

    return (
      <section className={`game game--${type === `genre` ? type : `artist`}`}>
        <Header lives={lives} />
        {this.getGameScreen()}
      </section>
    );
  }

  render() {
    const {step, onWelcomeClick} = this.props;

    if (step === -1) {
      return <Welcome handleClick={() => onWelcomeClick(step, questions)}/>;
    } else {
      return this.renderGameScreen();
    }
  }
}

App.propTypes = {
  lives: PropTypes.number,
  step: PropTypes.number,
  onUserAnswer: PropTypes.func,
  onWelcomeClick: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
