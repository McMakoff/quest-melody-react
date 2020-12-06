import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return (
    Object.assign({}, ownProps, {
      time: state.time,
    })
  );
};

class Timer extends Component {
  render() {
    const {time} = this.props;

    const minute = `0${Math.floor(time / 60)}`;
    const second = time % 60;

    return (
      <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
        <span className="timer__mins">{minute}</span>
        <span className="timer__dots">:</span>
        <span className="timer__secs">{second < 10 ? `0${second}` : second}</span>
      </div>
    );
  }
}

Timer.propTypes = {
  time: PropTypes.number,
};

export default connect(mapStateToProps, null)(Timer);
