import React, {Component} from 'react';
import PropTypes from "prop-types";
import {settings} from "../../../mocks/questions";
import Timer from "./Timer";

export default class Header extends Component {
  render() {
    const {lives} = this.props;

    return (
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"/>
        </svg>
        <Timer/>
        <div className="game__mistakes">
          {new Array(settings.mistakes - lives)
            .fill(`wrong __empty`)
            .map((item, i) => <div className={item} key={i}/>)}
          {new Array(lives)
            .fill(`wrong`)
            .map((item, i) => <div className={item} key={i}/>)}
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  lives: PropTypes.number,
};
