import React from 'react';
import renderer from 'react-test-renderer';
import Welcome from './Welcome';

it(`Welcome corrected render`, () => {
  const tree = renderer.create(
      <Welcome
        mistakes={0}
        gameTime={0}
      />
  );

  expect(tree).toMatchSnapshot();
});
