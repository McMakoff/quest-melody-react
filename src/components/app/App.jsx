import React from 'react';
import Welcome from '../welcome/Welcome';

const App = (props) => {
  const {mistakes, gameTime} = props;
  return (
    <Welcome
      mistakes={mistakes}
      gameTime={gameTime}
    />
  );
};

export default App;