import React from 'react';
import HeaderComponent from '../HelperComponents/ComponentHeaders';
import { getAllFromFlight, getOneFlight } from '../../Library/API_CALLS';
import Email from '../../Library/email-post';

class FlightPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {Component: 'Flight Page', emailList: []}
    }

    componentDidMount(){
        this.getFlightEmails()
    }

    //API call - Get Emails For Flight
    getFlightEmails = () => {
        getAllFromFlight(this.props.activeFlight.FlightId)
            .then((this.onGetFlightEmailsSuccess))
            .catch((error) => console.log('Error message: ', error))
    }

    onGetFlightEmailsSuccess = (response) => {
        this.setState({emailList: response})
    }

    setComponent = () => {
        this.props.setComponent("EmailConfiguration")
    }

    render(){
        return(
            <div className={this.state.Component}>
                <HeaderComponent component={this.state.Component}/>
                <div className='Component-Body'>
                    <div className='Component-Element-Container'>
                        <div className='row'>
                            <div className='col'>
                                <div className='center Component-Header-Text green'>
                                    <h3>{this.props.activeFlight.FlightName}</h3>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                View the details of this flight below:
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className='center'>
                                    <button className='rounded-corners customer-profile-button'>Edit Flight</button> <button className='rounded-corners customer-profile-button' onClick={this.setComponent}>Add Email</button> <button className='red rounded-corners customer-profile-button'>Delete Email</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FlightPage;