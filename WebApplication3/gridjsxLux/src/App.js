import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GridPoc from './Components/GridCrudPoc';
import ControlledTabs from './Components/Tabs';

class App extends Component {
  render() {
    return (
     <ControlledTabs></ControlledTabs>
    );
  }
}

export default App;
