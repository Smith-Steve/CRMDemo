import React from 'react';
import HeaderComponent from '../HelperComponents/ComponentHeaders';
// import {BlankTable, FlightTables} from './FlightTables';
import { BlankTable, FlightTables } from './Flight-Tables';
import { createFlight, getFlights, removeFlight } from '../../Library/API_CALLS';

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
        getFlights()
            .then((this.onGetFlightSuccess))
            .then((this.onGetFlightFailure))

    }

    onGetFlightSuccess = (response) => {
        this.setState({listOfFlights: response})
    }

    onGetFlightFailure = (response) => {
        console.log(response)
    }

    deleteFlight = (deletedFlightId) =>{
        removeFlight(deletedFlightId)
        this.removeFlightFromList(deletedFlightId)
    }

    clearForm = () => {
        this.setState({flightName: ''})
    }

    removeFlightFromList = (deletedFlight) => {
        this.setState(prevState => {
            const indexOfFlight = prevState.listOfFlights.findIndex(
                flight => flight.FlightId === deletedFlight);
            const newFlightList = [...prevState.listOfFlights];
            if(indexOfFlight >= 0) newFlightList.splice(indexOfFlight, 1)
            return {
                listOfFlights: newFlightList
            }
        })
    }

    handleChange(event){
        const name = event.target.name
        this.setState({[name]: event.target.value})
    }

    submitFlight(event){
        event.preventDefault();
        createFlight(this.state.FlightName)
        this.addFlight(this.state.FlightName)
    }

    addFlight = (newFlight, ) => {
        let lastElementNumber = this.state.listOfFlights.length - 1;
        let lastNumber = this.state.listOfFlights[lastElementNumber].FlightId
        const insertedFlight = {FlightId: lastNumber + 1, FlightName: newFlight}
        //This is not the appropriate way to be entering this. But since we're just looking to get moving, we'll leave this as is
        this.setState(state => {
            const updateFlightList = [insertedFlight, ...this.state.listOfFlights];
            return {
                listOfFlights: updateFlightList
            }
            //This is not being called - why?
        }, this.clearForm())
    }

    setActiveFlight = (flight) => {
        this.props.setFlight(flight)
        this.props.setComponent('Flights/FlightConfiguration')
    }

    render(){
        const numberOfFlights = this.state.listOfFlights.length
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
                    {numberOfFlights > 0 ? <FlightTables setActiveFlight={this.setActiveFlight} listOfFlights={this.state.listOfFlights} deleteFlight={this.deleteFlight}/> : <BlankTable/>}
                </div>
            </div>
        </div>
        )
    }
}