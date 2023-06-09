import React from 'react';
import HeaderComponent from '../HelperComponents/ComponentHeaders';
import { getAllFromFlight } from '../../Library/API_CALLS';
import Email from '../../Library/email-post';

class FlightPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {Component: 'Flight Page', emailList: []}
    }

    componentDidMount(){
        this.getFlightEmails()
    }

    getFlightEmails = (FlightId) => {
        getAllFromFlight(FlightId).then((this.onGetFlightEmailsSuccess))
    }

    onGetFlightEmailsSuccess = (response) => {
        this.setState({emailList: response})
    }

    render(){
        return(
            <div className={this.state.Component}>
                <HeaderComponent component={this.state.Component}/>
                <div className='row'>
                    <div className='col'>

                    </div>
                </div>
            </div>
        )
    }
}

export default FlightPage;