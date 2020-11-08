import React, {Component} from 'react';
import Welcome from '../welcome/Welcome';
import {questions} from "../../mocks/questions";
import Layout from "../game/layout/Layout";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: -1,
    };
  }

  handlerQuestionChange() {
    this.setState((prevState) => {
      const nextIndex = prevState.question + 1;
      const isEnd = nextIndex >= questions.length;
      return {
        question: isEnd ? -1 : nextIndex,
      };
    });
  }
  renderScreen() {
    const {question} = this.state;
    if (question === -1) {
      return <Welcome handleClick={() => this.handlerQuestionChange()}/>;
    } else {
      return <Layout question={question} answerCb={() => this.handlerQuestionChange}/>;
    }
  }

  render() {
    return this.renderScreen();
  }
}
