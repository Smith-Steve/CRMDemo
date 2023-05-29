import React from 'react';
import HeaderComponent from '../HelperComponents/ComponentHeaders'
import { createFlight } from '../../Library/API_CALLS'

export default class Flights extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.submitFlight = this.submitFlight.bind(this);
        this.state = {Component: 'Flights', FlightName: ''}
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
        </div>
        )
    }
}