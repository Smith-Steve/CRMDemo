import React from 'react';
import Sidebar from './components/sidebar';
import HomeComponent from './components/home-component';
import CreateCustomer from './components/Customers/CreateCustomers';
import CustomerProfilePage from './components/Customers/CustomerProfilePage';
import Customers from './components/Customers/Customers';
import {BrowserRouter, Route, Switch, Routes} from 'react-router-dom'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.activeComponent = this.setActiveComponent.bind(this)
    this.setActiveCustomer = this.setActiveCustomer.bind(this)
    this.state = { activeComponent: window.location.pathname.replace('/',''), activeCustomer: JSON.parse(localStorage.getItem('Active-Customer') || null)}
  }

  setActiveCustomer(selectedCustomer){
    this.setState({ activeCustomer: selectedCustomer})
  }

  setActiveComponent(selectComponent) {
    this.setState({ activeComponent: selectComponent});
  }

  renderComponent() {
    const path = this.state.activeComponent;
    if(path === 'CreateContacts')
    {
      return <CreateCustomer/>
    } else if (path === 'Customers') {
      return <Customers setActiveCustomer={this.setActiveCustomer}/>
    } else if (path.substring(0, path.indexOf('/')) === 'Customer') {
      return <CustomerProfilePage activeCustomer={this.state.activeCustomer}/>
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
      <div className='component-container grey rounded-corners padding'>
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