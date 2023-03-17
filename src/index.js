import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

import { reducer } from "./services/redux-saga/redux";
import { watcherSaga } from "./services/redux-saga/saga";

// buat saga middleware 
const sagaMiddleware = createSagaMiddleware();

// dev tools middleware 
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// buat redux store dengan render kita diatas dan middleware
let store = createStore(
  reducer,
  compose(applyMiddleware(sagaMiddleware), reduxDevTools)
)

// jalankan saga 
sagaMiddleware.run(watcherSaga)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Hal-hal Redux seharusnya terlihat familier.

// createStore dengan peredam kami
// Hubungkan Redux DevTools ke Store untuk debugging dan pembelajaran
// Dan bungkus komponen <App/> dalam komponen <Provider/> dengan store, yang memungkinkan kita bekerja dengan Redux di React.
// Kami akan benar-benar menghubungkan() komponen <App/> segera.
// Untuk membuat saga redux kami berfungsi dengan Redux…

// createSagaMiddleware, dan terapkan ke toko Redux dengan bantuan dari compose dan applyMiddleware
// jalankan watcherSaga, sehingga dapat memicu workerSaga saat ada API_CALL_REQUEST
