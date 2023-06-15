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
    this.setActiveCustomer = this.setActiveCustomer.bind(this)
    this.setComponent = this.setComponent.bind(this)
    this.setFlight = this.setFlight.bind(this)
    this.state = { activeComponent: window.location.pathname.replace('/',''), activeCustomer: JSON.parse(localStorage.getItem('Active-Customer') || null), activeFlight: null, activeContact: null, activeEmail: null}
  }

  setActiveCustomer(selectedCustomer){
    this.setState({ activeCustomer: selectedCustomer})
  }

  setComponent(component){
    this.setState({activeComponent: component})
  }

  setFlight(flight){
    this.setState({activeFlight: flight})
  }

  setActiveEmail(email){
    this.setState({activeEmail: email})
  }

  setActiveContact = (contact) => {
    this.setState({activeContact: contact})
  }

  renderComponent() {
    const path = this.state.activeComponent;
    if(path === 'CreateContacts')
    {
      return <CreateCustomer/>
    } else if (path === 'Customers') {
      return <Customers setActiveCustomer={this.setActiveCustomer}/>
    } else if (path.substring(0, path.indexOf('/')) === 'Customer') {
      return <CustomerProfilePage setComponent={this.setComponent} activeCustomer={this.state.activeCustomer} setActiveCustomer={this.setActiveCustomer} setActiveContact={this.setActiveContact}/>
    } else if (path === 'CreateContact'){
      return <CreateContact activeCustomer={this.state.activeCustomer} setComponent={this.setComponent} activeContact={this.state.activeContact}/>
    } else if (path === 'Flights'){
      return <Flights setFlight={this.setFlight} setComponent={this.setComponent}/>
    } else if (path === 'Flights/FlightConfiguration') {
      return <FlightPage activeFlight={this.state.activeFlight} setComponent={this.setComponent}/>
    } else if (path === 'EmailConfiguration'){
      return <EmailConfiguration activeFlight={this.state.activeFlight} setActiveEmail={this.setActiveEmail}/>
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