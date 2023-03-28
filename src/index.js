import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';
import { createStore } from 'redux';
import allReducers from './reducers';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
