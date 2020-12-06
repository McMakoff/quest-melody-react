import PropTypes from 'prop-types';
import React, {Component} from 'react';
import AudioPlayer from "../audioPlayer/AudioPlayer";
import {connect} from "react-redux";
import {actionCreator} from "../../../reducer";

const mapStateToProps = (state, ownProps) => {
  return (
    Object.assign({}, ownProps, {
      time: state.time,
    })
  );
};

const mapDispatchToProps = (dispatch) => ({
  onChangeTime: (time) => dispatch(actionCreator.decrementTime(time)),
});

class Genre extends Component {
  constructor(props) {
    super(props);

    this.getAnswers = new Array(props.question.answers.length).fill(false);
    this.timer = null;

    this.state = {
      activeTrack: -1
    };
  }

  componentDidMount() {
    const {onChangeTime, time} = this.props;

    this.timer = window.setInterval(() => {
      onChangeTime(time);
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  playBtnHandler(index) {
    this.setState(() => {
      return {activeTrack: this.state.activeTrack === index ? -1 : index};
    });
  }

  handlerInputChange(item) {
    this.getAnswers[item] = true;
  }

  render() {
    const {question, onAnswer} = this.props;
    const {activeTrack} = this.state;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {`${question.genre}`} треки</h2>
        <form className="game__tracks" onSubmit={() => onAnswer(this.getAnswers)}>
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
                  name={`answer-${i}`}
                  id={`answer-${i}`}
                  onChange={() => this.handlerInputChange(i)}
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
  onChangeTime: PropTypes.func,
  onAnswer: PropTypes.func,
  time: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Genre);
