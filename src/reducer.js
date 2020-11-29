const initialState = {
  lives: 3,
  step: -1,
};

const isAnswerArtistCorrect = (userAnswer, question) => {
  return {
    userAnswer,
    question
  };
};

const isAnswerGenreCorrect = (userAnswer, question) => {
  return {
    userAnswer,
    question
  };
};

const actionCreator = {
  incrementStep: (step, questions) => {
    if (step >= questions.length - 1) {
      return {
        type: `RESET`,
      }
    }

    return {
      type: `INCREMENT_STEP`,
      payload: 1,
    }
  },

  incrementLives: (userAnswer, question, lives) => {
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
      type: `INCREMENT_LIVES`,
      payload: 1,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (`INCREMENT_STEP`):
      return (
        Object.assign({}, state, {
          step: state.step + action.payload,
        })
      );

    case (`INCREMENT_LIVES`):
      return (
        Object.assign({}, state, {
          lives: state.lives - action.payload,
        })
      );

    case (`RESET`):
      return Object.assign({}, initialState);
  }

  return state;
};

export {actionCreator, reducer};
