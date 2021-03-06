import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { loadUserLocation } from './actions/user';
import {
  createAudioPlayer,
  playSoundTrack,
  pickRandomSeries,
  pickRandomColour,
  pickRandomSoundIndex
} from './actions/media';
import './index.css';
import App from './App';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true
    })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);
const store = createStore(reducer, enhancer);
store.dispatch(pickRandomColour());
store.dispatch(loadUserLocation());
store.dispatch(createAudioPlayer());
store.dispatch(pickRandomSeries());
store.dispatch(pickRandomSoundIndex());
store.dispatch(playSoundTrack(store.getState().media.currentSeries));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
