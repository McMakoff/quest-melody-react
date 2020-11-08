import PropTypes from 'prop-types';
import React, {Component} from 'react';
import AudioPlayer from "../audioPlayer/AudioPlayer";

export default class Genre extends Component {
  constructor(props) {
    super(props);

    this.playBtnHandler = this.playBtnHandler.bind(this);

    this.state = {
      activeTrack: -1
    };
  }

  playBtnHandler(index) {
    this.setState(() => {
      return {activeTrack: this.state.activeTrack === index ? -1 : index};
    });
  }

  render() {
    const {question, onAnswer} = this.props;
    const {activeTrack} = this.state;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {`${question.genre}`} треки</h2>
        <form className="game__tracks" onSubmit={onAnswer}>
          {question.answers.map((item, i) => (
            <div className="track" key={`${item.id}`}>
              <AudioPlayer
                src={item.src}
                isPlaying={activeTrack === i}
                onPlayButtonClick={() => this.playBtnHandler(i)}
              />
              <div className="game__answer">
                <input
                  className="game__input visually-hidden"
                  type="checkbox"
                  name="answer"
                />
                <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
              </div>
            </div>
          ))}
          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}

Genre.propTypes = {
  question: PropTypes.object,
  onAnswer: PropTypes.func,
};
