import React from 'react';
import Sidebar from './components/sidebar';
import HomeComponent from './components/home-component';
import CreateCustomer from './components/CreateCustomers';
import {BrowserRouter, Route, Switch, Routes} from 'react-router-dom'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.activeComponent = this.setActiveComponent.bind(this)
    this.state = { activeComponent: window.location.pathname.replace('/','')}
  }

  setActiveComponent(selectComponent) {
    this.setState({ activeComponent: selectComponent});
  }

  renderComponent() {
    const { path } = this.state.activeComponent;
    if(path === 'CreateContacts')
    {
      return <CreateCustomer/>
    }
    return <HomeComponent/>
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
      <div className='component-container'>
        <div className='row'>
          <div className='col'>
            {this.renderComponent()}
          </div>
        </div>
      </div>
      </BrowserRouter>
    )
  }
}

export default Home;