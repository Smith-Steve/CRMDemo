import React from 'react';
import HeaderComponent from '../HelperComponents/ComponentHeaders';
import {createEmail, updateEmail} from '../../Library/API_CALLS'
import Email from '../../Library/Email'


export default class EmailConfiguration extends React.Component {
    constructor(props){
        super(props);
        this.state = {Component: 'EmailConfiguration', EmailName: '', EmailSubjectTitle: '', EmailBody: '', SendOn: '', EmailNumberInSequence: '', ActiveEmail: window.localStorage.getItem('Active-Email') || null}
    }

    componentDidMount() {
        if (this.props.ActiveEmail != null) this.setForm()
    }

    setForm = () => {
        const { EmailId, FlightId, EmailName, EmailSubjectTitle, EmailBody, SendOn, SentAt } = this.props.ActiveEmail
        this.setState((prevState) => {
            return {... prevState, EmailId, FlightId, EmailName, EmailSubjectTitle, EmailBody, SendOn, SentAt}
        }, this.stateChange)
    }


    generateEmailObject = () => {
        const email = JSON.stringify(new Email(this.props.activeFlight.FlightId, this.state.EmailName, this.state.EmailSubjectTitle, this.state.EmailBody, this.state.SendOn, this.state.EmailNumberInSequence))
        return email
    }
    //Handle Submit Click
    handleSubmit = (event) => {
        event.preventDefault();
        const emailSubmission = this.generateEmailObject()
        createEmail(emailSubmission)
        this.clearForm()
    }

    handleChange = (event) => {
        const name = event.target.name;
        this.setState({[name] : event.target.value})
    }

    clearForm = () => {
        this.setState({ EmailName: '', EmailSubjectTitle: '', EmailBody: '', SendOn: '', EmailNumberInSequence: ''})
    }

    

    handleUpdate = (event) => {
        event.preventDefault()
        // updateEmail(email)
    }

    render(){
        //This form is going to have to be changed so that this form will be inaccessible if we
        //attempt to update an email that has already been sent.

        //Functionality will also have to exist to copy emails/flights etc.. so they
        //can be used again.
        return(
            <div className={this.state.Component}>
                <div className='center'>
                    {
                        this.props.activeEmail != null ?
                        (<React.Fragment>
                            <h1 className='green'>Update Email</h1>
                        </React.Fragment>)
                        :
                        (<React.Fragment>
                            <h1 className='green'>Add Email</h1>
                        </React.Fragment>)
                    }
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className='form-container rounded-corners lg'>
                            <form onSubmit={this.handleSubmit}>
                                <div className='input-row'>
                                    {
                                        this.props.activeEmail != null ?
                                        (<React.Fragment>
                                            <label>Update Email Name</label>
                                        </React.Fragment>)
                                        :
                                        (<React.Fragment>
                                            <label>Email Name</label>
                                        </React.Fragment>)
                                    }
                                    <input className='rounded-corners' type='text' name='EmailName' value={this.state.EmailName} onChange={this.handleChange} required></input>
                                </div>
                                <div className='input-row'>
                                    {
                                        this.props.activeEmail != null ?
                                        (<React.Fragment>
                                            <label>Update Subject Title</label>
                                        </React.Fragment>)
                                        :
                                        (<React.Fragment>
                                            <label>Email Subject Title</label>
                                        </React.Fragment>)
                                    }
                                    <input className='rounded-corners' type='text' name='EmailSubjectTitle' value={this.state.EmailSubjectTitle} onChange={this.handleChange} required></input>
                                </div>
                                <div className='input-row'>
                                    {
                                        this.props.activeEmail != null ?
                                        (<React.Fragment>
                                            <label>Update Email Body</label>
                                        </React.Fragment>)
                                        :
                                        (<React.Fragment>
                                            <label>Email Body</label>
                                        </React.Fragment>)
                                    }
                                    <textarea className='rounded-corners' type='text' rows="6" name='EmailBody' value={this.state.EmailBody} onChange={this.handleChange} required></textarea>
                                </div>
                                <div className='input-row'>
                                    {
                                        this.props.ActiveEmail != null ?
                                        (<React.Fragment>
                                            <label>Update Send On</label>
                                        </React.Fragment>)
                                        :
                                        (<React.Fragment>
                                            <label>Send On</label>
                                        </React.Fragment>)
                                    }
                                    <input className='rounded-corners' type='datetime-local' name='SendOn' value={this.state.SendOn} onChange={this.handleChange} required></input>
                                </div>
                                <div className='input-row'>
                                    {
                                        this.props.activeEmail != null ?
                                        (<React.Fragment>
                                            <label>Change Email Number In Sequence</label>
                                        </React.Fragment>)
                                        :
                                        (<React.Fragment>
                                            <label>Email Number In Sequence</label>
                                        </React.Fragment>)
                                    }
                                    <input className='rounded-corners' type='number' min="1" max="10" name='EmailNumberInSequence' value={this.state.EmailNumberInSequence} onChange={this.handleChange} required></input>
                                </div>
                                <div className='align-right'>
                                    <button onSubmit={this.handleSubmit}>Enter Email Into Flight</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}