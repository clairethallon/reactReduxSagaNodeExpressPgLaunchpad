import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import logger from 'redux-logger';

const reducerName = (state = [], action) => {
  console.log('inventory reducer:', action);
  if (action.type === 'SET_THINGS') {
    return action.payload;
  }
  return state;
}

const reducerPostName = (state = [], action) => {
  console.log('inventory reducer:', action);
  if (action.type === 'SEND_THINGS') {
    return action.payload;
  }
  return state;
}
// sagas
function* watcherSaga() {
  // takeEvery also lisens for dispatch
  yield takeEvery('GET_THINGS', getSaga);
  yield takeEvery('POST_THINGS', postSaga);
}
// generator functions for async
function* getSaga(action) {
  console.log('in *getSaga:', action);
  try {
    // yield to avoid 
    const response = yield axios.get('/test');
    console.log('back from get:', response.data);
    // use a "put" to dispatch for sagas
    yield put({ type: 'SET_THINGS', payload: response.data });
  } catch (err) {
    alert('no');
    console.log(err);
  }
}

function* postSaga(action) {
  console.log('in *postSaga', action);
  try {
    // yield to avoid 
    const response = yield axios.post('/test', action.payload);
    console.log('back from get:', response.data);
    // use a "put" to dispatch for sagas
    yield put({ type: 'SEND_THINGS', payload: response.data });
  } catch (err) {
    alert('no');
    console.log(err);
  }

}

const sagaMiddleware = createSagaMiddleware();
// create store w/ reducers and middlewares
const store = createStore(
  combineReducers({
    reducerName,
    reducerPostName
  }),
  applyMiddleware(logger, sagaMiddleware)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// make sure our saga is running
sagaMiddleware.run(watcherSaga);

reportWebVitals();
