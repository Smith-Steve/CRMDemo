import React from 'react';
import Sidebar from './components/sidebar';
import HomeComponent from './components/home-component';
import CreateCustomer from './components/Customers/CreateCustomers';
import CustomerProfilePage from './components/Customers/CustomerProfilePage';
import Customers from './components/Customers/Customers';
import CreateContact from './components/Customers/Contacts/CreateContact'
import Flights from './components/Flights/Flights'
import FlightPage from './components/Flights/FlightPage';
import {BrowserRouter} from 'react-router-dom'
import EmailConfiguration from './components/Flights/EmailConfiguration';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeComponent: window.location.pathname.replace('/',''), activeCustomer: JSON.parse(localStorage.getItem('Active-Customer')) || null, activeFlight: null, activeContact: null, activeEmail: null}
  }

  setActiveCustomer = (selectedCustomer) => {
    this.setState({activeCustomer: selectedCustomer})
    console.log('active customer - Home Component: ', selectedCustomer)
  }

  setComponent = (component) => {
    this.setState({activeComponent: component})
  }

  setFlight = (flight) => {
    this.setState({activeFlight: flight})
  }

  setActiveEmail = (email) => {
    this.setState({activeEmail: email})
  }

  setActiveContact = (contact) => {
    this.setState({activeContact: contact})
  }

  renderComponent() {
    const path = this.state.activeComponent;
    if(path === 'CreateContacts')
    {
      return <CreateCustomer activeCustomer={this.state.activeCustomer}/>
    } else if (path === 'Customers') {
      return <Customers setActiveCustomer={this.setActiveCustomer}/>
    } else if (path.substring(0, path.indexOf('/')) === 'Customer') {
      return <CustomerProfilePage activeCustomer={this.state.activeCustomer} setComponent={this.setComponent} setActiveCustomer={this.setActiveCustomer} setActiveContact={this.setActiveContact}/>
    } else if (path === 'CreateContact'){
      return <CreateContact activeCustomer={this.state.activeCustomer} setComponent={this.setComponent} activeContact={this.state.activeContact}/>
    } else if (path === 'Flights'){
      return <Flights setFlight={this.setFlight} setComponent={this.setComponent}/>
    } else if (path === 'Flights/FlightConfiguration') {
      return <FlightPage activeFlight={this.state.activeFlight} setComponent={this.setComponent} setActiveEmail={this.setActiveEmail}/>
    } else if (path === 'EmailConfiguration'){
      return <EmailConfiguration activeFlight={this.state.activeFlight} activeEmail={this.state.activeEmail}/>
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