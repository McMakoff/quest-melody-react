import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Welcome from './Welcome';

configure({adapter: new Adapter()});

it(`click on the launch button works correctly`, () => {
  const handleClick = jest.fn();
  const welcome = shallow(<Welcome gameTime={0} mistakes={0} handleClick={handleClick}/>);
  const btn = welcome.find(`.welcome__button`);
  btn.simulate(`click`);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
