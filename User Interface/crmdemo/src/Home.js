import React from 'react';
import Sidebar from './components/sidebar';
import {BrowserRouter, Route, Switch, Routes} from 'react-router-dom'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.activeComponent = this.setActiveComponent.bind(this)
  }

  setActiveComponent(selectComponent) {
    this.setState({ activeComponent: selectComponent});
  }

  render() {
    return (
      <BrowserRouter>
        <Sidebar></Sidebar>
      </BrowserRouter>
    )
  }
}

export default Home;
