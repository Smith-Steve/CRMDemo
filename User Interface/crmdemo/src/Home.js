import React from 'react';
import Sidebar from './components/sidebar';
import HomeComponent from './components/home-component';
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
      <div className='container'>
        <div className='row'>
          <div className='col'>
          <Sidebar/>
          </div>
        </div>
      </div>
      </BrowserRouter>
    )
  }
}

export default Home;
