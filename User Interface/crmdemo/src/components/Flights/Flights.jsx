import React from 'react';
import HeaderComponent from '../HelperComponents/ComponentHeaders';
import {BlankTable, FlightTables} from './FlightTables';
import { createFlight, getFlights } from '../../Library/API_CALLS';

export default class Flights extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.submitFlight = this.submitFlight.bind(this);
        this.state = {Component: 'Flights', FlightName: '', listOfFlights: []}
    }

    componentDidMount(){
        this.getFlightDetails()
        //We are going to mount the flight list to state so we can work with a display that displays all flights. (5/29/2023)
    }

    getFlightDetails = () => {
        getFlights().then((this.onGetFlightSuccess))
    }

    onGetFlightSuccess = (response) => {
        this.setState({listOfFlights: response})
    }

    handleChange(event){
        const name = event.target.name
        this.setState({[name]: event.target.value})
    }

    submitFlight(event){
        event.preventDefault();
        createFlight(this.state.FlightName)
    }

    render(){
        const numberOfFlights = this.state.listOfFlights.length
        const flightList = this.state.listOfFlights
        return(
            <div className={this.state.Component}>
            <HeaderComponent component={this.state.Component}/>
            <div className='row'>
                <div className='col'>
                    <form onSubmit={this.submitFlight}>
                        <div className='input-row'>
                            <label>Enter Flight Name:</label>
                            <input type="text" name="FlightName" value={this.state.FlightName} onChange={this.handleChange} required></input>
                        </div>
                        <div className='align-right'>
                            <button onSubmit={this.submitFlight}>Enter Flight</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    {numberOfFlights > 1 ? FlightTables(this.state.listOfFlights) : BlankTable()}
                    {/* {numberOfFlights > 1 ? <FlightTables listOfFlights={this.state.listOfFlights}/> : BlankTable()} */}
                </div>
            </div>
        </div>
        )
    }
}