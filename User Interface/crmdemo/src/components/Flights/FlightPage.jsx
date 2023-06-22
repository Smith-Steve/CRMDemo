import React from 'react';
import HeaderComponent from '../HelperComponents/ComponentHeaders';
import { getAllFromFlight, deleteEmail } from '../../Library/API_CALLS';

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
            .then((this.onGetFlightEmailsError))
    }

    onGetFlightEmailsSuccess = (response) => {
        let finalList = response.sort((a, b) => a.EmailId - b.EmailId)
        this.setState({emailList: finalList})
    }

    onGetFlightEmailsError = (error) => {
        console.log("On Get Flight Emails Error: ", error)
    }

    removeEmail = (deletedEmail) => {
        deleteEmail(deletedEmail.EmailId)
        this.setState(prevState => {
            const indexOfEmail = prevState.emailList.findIndex(
                email => email.EmailId === deletedEmail.EmailId
            );
            const newEmailList = [...prevState.emailList];
            if(indexOfEmail >= 0) newEmailList.splice(indexOfEmail,1)
            return {emailList: newEmailList}
        })
    }

    editEmail = (email) => {
        this.props.setActiveEmail(email)
        this.props.setComponent('EmailConfiguration')
    }

    buildEmailTable = (flightEmailList, editEmail) => {
        const emailRow = flightEmailList.map(email => {
            return <tr key={email.EmailId}>
                        <td><span>{email.EmailName}</span></td>
                        <td>{email.EmailSubjectTitle}</td>
                        <td>{email.SendOn}</td>
                        <td><button className='rounded-corners contact-button' onClick={function (){editEmail(email)}}>Edit</button><button className='red rounded-corners contact-button' onClick={() => this.removeEmail(email)}>Delete</button></td>
                    </tr>
        })
        return(
            <div className='row'>
                <div className='col'>
                    <table>
                        <thead>
                            <tr className='green'>
                                <th>Email Name</th>
                                <th>Email Subject</th>
                                <th>Send On</th>
                                <th>Buttons</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emailRow}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    setComponent = () => {
        this.props.setComponent("EmailConfiguration")
    }

    render(){
        const emailList = this.state.emailList.sort((a, b) => b.EmailId - a.EmailId)
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
                                    <button className='rounded-corners customer-profile-button'>Edit Flight</button> <button className='rounded-corners customer-profile-button' onClick={this.setComponent}>Add Email</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='Component-Element-Container'>
                    {emailList.length > 0 ? this.buildEmailTable(emailList, this.editEmail) : null}
                </div>
            </div>
        )
    }
}

export default FlightPage;