import PropTypes from 'prop-types';
import React, {Component} from 'react';

export default class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.audioRef = React.createRef();

    this.state = {
      isLoading: false,
      isPlaying: this.props.isPlaying,
    };
  }

  componentDidMount() {
    const audio = this.audioRef.current;

    audio.oncanplaythrough = () => {
      this.setState({isLoading: false});
    };

    audio.onplay = () => {
      this.setState({isPlaying: true});
    };

    audio.onpause = () => {
      this.setState({isPlaying: false});
    };
  }

  componentDidUpdate() {
    const {isPlaying} = this.props;
    const audio = this.audioRef.current;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  playButtonClickHandler() {
    this.props.onPlayButtonClick();
    this.setState({isPlaying: !this.state.isPlaying});
  }

  render() {
    const {src} = this.props;
    const {isLoading, isPlaying} = this.state;

    return (
      <React.Fragment>
        <button
          className={`track__button track__button--${!isPlaying ? `play` : `pause`}`}
          type="button"
          disabled={isLoading}
          onClick={() => this.playButtonClickHandler()}
        />
        <div className="track__status">
          <audio
            ref={this.audioRef}
            src={src}
          />
        </div>
      </React.Fragment>
    );
  }
}

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};
