import React, {Component} from 'react';
import {questions} from "../../../mocks/questions";
import Artist from "../artist/Artist";
import PropTypes from 'prop-types';
import Header from "../header/Header";
import Genre from "../genre/Genre";

export default class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: this.props.question,
    };
  }

  answerHandler(cb) {
    cb();
    this.setState((prevState) => {
      return {
        question: prevState.question + 1,
      };
    });
  }

  renderScreen() {
    const {answerCb} = this.props;
    const {question} = this.state;

    switch (questions[question].type) {
      case `artist`:
        return (
          <Artist
            question={questions[question]}
            onAnswer={() => this.answerHandler(answerCb)}
          />
        );
      case `genre`:
        return (
          <Genre
            question={questions[question]}
            onAnswer={() => this.answerHandler(answerCb)}
          />
        );
    }

    return null;
  }

  render() {
    const {type} = questions[this.state.question];

    return (
      <section className={`game game--${type === `genre` ? type : `artist`}`}>
        <Header/>
        {this.renderScreen()}
      </section>
    );
  }
}

Layout.propTypes = {
  answerCb: PropTypes.func,
  question: PropTypes.number
};
