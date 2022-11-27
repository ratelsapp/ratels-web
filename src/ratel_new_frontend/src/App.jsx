import React, { Component } from 'react';
import Main from './components/main';
import Navbar from './components/Navbar';
import Banner from "./components/Banner";

class App extends Component {
  render() {
    return (
      <div className="App">

        <Navbar />
        <Banner />
        <Main />

      </div>
    );
  }
}

export default App;
