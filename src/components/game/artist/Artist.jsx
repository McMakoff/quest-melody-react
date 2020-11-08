import PropTypes from 'prop-types';
import React, {Component} from 'react';
import AudioPlayer from "../audioPlayer/AudioPlayer";

export default class Artist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false
    };
  }

  render() {
    const {question, onAnswer} = this.props;
    const {isPlaying} = this.state;

    return (
      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <AudioPlayer
            src={question.song.src}
            isPlaying={isPlaying}
            onPlayButtonClick={() => this.setState({isPlaying: !isPlaying})}
          />
        </div>
        <form className="game__artist">
          {question.answers.map((item) => (
            <div className="artist" key={`${item.id}`}>
              <input
                onChange={onAnswer}
                className="artist__input visually-hidden"
                type="radio"
                name="answer"
                value={`${item.artist}`}
                id={`${item.id}`}
              />
              <label className="artist__name" htmlFor={`${item.id}`}>
                <img className="artist__picture" src={`${item.picture}`} alt={`${item.artist}`}/>
                {`${item.artist}`}
              </label>
            </div>
          ))}
        </form>
      </section>
    );
  }
}

Artist.propTypes = {
  question: PropTypes.object,
  onAnswer: PropTypes.func,
};
