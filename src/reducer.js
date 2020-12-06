const initialState = {
  lives: 3,
  step: -1,
  time: 300,
};

const isAnswerArtistCorrect = (userAnswer, question) => {
  return userAnswer === question.song.artist;
};

const isAnswerGenreCorrect = (userAnswer, question) => {
  const questionMode = question.answers.map((item) => {
    return item.genre === question.genre;
  });

  return (
    questionMode.every((item, i) => item === userAnswer[i])
  );
};

const actionCreator = {
  incrementStep: (step, questions) => {
    if (step >= questions.length - 1) {
      return {
        type: `RESET`,
      };
    }

    return {
      type: `INCREMENT_STEP`,
      payload: 1,
    };
  },

  decrementLives: (userAnswer, questions, lives, step) => {
    const question = questions[step];
    let isAnswerCorrect = false;

    switch (question.type) {
      case (`artist`):
        isAnswerCorrect = isAnswerArtistCorrect(userAnswer, question);
        break;
      case (`genre`):
        isAnswerCorrect = isAnswerGenreCorrect(userAnswer, question);
        break;
    }

    if (!isAnswerCorrect && (lives - 1 === 0)) {
      return {
        type: `RESET`,
      };
    }

    return {
      type: `DECREMENT_LIVES`,
      payload: !isAnswerCorrect ? 1 : 0,
    };
  },

  decrementTime: (time) => {
    if (time - 1 === 0) {
      return {
        type: `RESET`,
      };
    }

    return {
      type: `DECREMENT_TIME`,
      payload: 1,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (`INCREMENT_STEP`):
      return (
        Object.assign({}, state, {
          step: state.step + action.payload,
        })
      );

    case (`DECREMENT_LIVES`):
      return (
        Object.assign({}, state, {
          lives: state.lives - action.payload,
        })
      );

    case (`DECREMENT_TIME`):
      return (
        Object.assign({}, state, {
          time: state.time - action.payload,
        })
      );

    case (`RESET`):
      return Object.assign({}, initialState);
  }

  return state;
};

export {actionCreator, reducer};
