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
}

/*const mapDispatchToProps = (dispatch) => ({
  handleScreenClick: () => {
    return dispatch(actionCreator.incrementStep(mapStateToProps.step, questions));
  },
});*/

const mergeProps = (stateProps, dispatchProps) => {
  const {step} = stateProps;
  const {dispatch} = dispatchProps;

  return {
    step,
    handleScreenClick: () => dispatch(actionCreator.incrementStep(step, questions)),
  };
};

class App extends Component {
  constructor(props) {
    super(props);
  }

  getGameScreen() {
    const {handleScreenClick, step} = this.props;

    switch (questions[step].type) {
      case `artist`:
        return (
          <Artist
            question={questions[step]}
            onAnswer={() => handleScreenClick()}
          />
        );

      case `genre`:
        return (
          <Genre
            question={questions[step]}
            onAnswer={() => handleScreenClick()}
          />
        );
    }
  }

  renderGameScreen() {
    const {type} = questions[this.props.step];

    return (
      <section className={`game game--${type === `genre` ? type : `artist`}`}>
        <Header/>
        {this.getGameScreen()}
      </section>
    );
  }

  render() {
    const {step, handleScreenClick} = this.props;

    if (step === -1) {
      return <Welcome handleClick={() => handleScreenClick()}/>;
    } else {
      return this.renderGameScreen();
    }
  }
}

App.propTypes = {
  lives: PropTypes.number,
  step: PropTypes.number,
  handleScreenClick: PropTypes.func,
}

export default connect(mapStateToProps, null, mergeProps)(App);
