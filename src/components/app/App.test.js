import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

it(`App corrected render`, () => {
  const tree = renderer.create(
      <App
        mistakes={0}
        gameTime={0}
      />
  );

  expect(tree).toMatchSnapshot();
});
