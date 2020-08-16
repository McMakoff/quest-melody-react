import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App'

const init = () => {
  const settings = {
    mistakes: 3,
    gameTime: 5
  };

  ReactDOM.render(
    <App
      mistakes={settings.mistakes}
      gameTime={settings.gameTime}
    />,
    document.querySelector(`#root`)
  )
};

init();
