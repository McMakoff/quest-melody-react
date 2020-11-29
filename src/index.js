import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reducer} from "./reducer";

const init = () => {
  const store = createStore(reducer);

  ReactDOM.render (
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
  );
};

init();
