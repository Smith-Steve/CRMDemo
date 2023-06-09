import React from 'react';
import Sidebar from './components/sidebar';
import HomeComponent from './components/home-component';
import CreateCustomer from './components/Customers/CreateCustomers';
import CustomerProfilePage from './components/Customers/CustomerProfilePage';
import Customers from './components/Customers/Customers';
import CreateContact from './components/Customers/Contacts/CreateContact'
import Flights from './components/Flights/Flights'
import {BrowserRouter} from 'react-router-dom'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.setActiveCustomer = this.setActiveCustomer.bind(this)
    this.setComponent = this.setComponent.bind(this)
    this.setFlight = this.setFlight.bind(this)
    this.state = { activeComponent: window.location.pathname.replace('/',''), activeCustomer: JSON.parse(localStorage.getItem('Active-Customer') || null), activeFlight: null}
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

  renderComponent() {
    const path = this.state.activeComponent;
    if(path === 'CreateContacts')
    {
      return <CreateCustomer/>
    } else if (path === 'Customers') {
      return <Customers setActiveCustomer={this.setActiveCustomer}/>
    } else if (path.substring(0, path.indexOf('/')) === 'Customer') {
      return <CustomerProfilePage setComponent={this.setComponent} activeCustomer={this.state.activeCustomer} setActiveCustomer={this.setActiveCustomer}/>
    } else if (path === 'CreateContact'){
      return <CreateContact activeCustomer={this.state.activeCustomer}/>
    } else if (path === 'Flights'){
      return <Flights setFlight={this.setFlight} setComponent={this.setComponent}/>
    } else if (path === 'Flights/FlightConfiguration') {
      //FlightConfiguration has not been configured yet. Therefore this path returns to the home component.
      return <HomeComponent/>
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