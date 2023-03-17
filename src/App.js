import React, { Component, Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";

import { connect } from "react-redux";

class App extends Component {
  render() {
    const { fetching, dog, requestNewDog, error } = this.props;

    return (
      <Fragment>
        <p className="App-intro">React Redux Saga Example</p>
        {dog ? (
          <p className="App-intro">Keep clicking for new dogs!</p>
        ) : (
          <p className="App-intro">Hello you can generate a dog picture by clicking!</p>
        )}

        <div>
          <p align="center">
            {fetching ? (
              <button className="btn-dog" disabled>Fetching...</button>
            ) : (
              <button className="btn-dog" onClick={requestNewDog}>REQUEST A DOG</button>
            )}
          </p>
        </div>

        {error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}

        <img src={dog || logo} className="App-logo" alt="logo" />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    dog: state.dog,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestNewDog: () => dispatch({ type: "API_CALL_REQUEST" })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// mapStateToProps untuk membuat status terbaru pengambilan, anjing, dan kesalahan tersedia sebagai properti di komponen Aplikasi.
// Menggunakan mapDispatchToProps, kami membuat fungsi yang disebut requestNewDog ​​yang mengirim tindakan API_CALL_REQUEST ke Store.
// hubungkan komponen Aplikasi dan ekspor versi "reduxed" ini untuk digunakan di index.js.