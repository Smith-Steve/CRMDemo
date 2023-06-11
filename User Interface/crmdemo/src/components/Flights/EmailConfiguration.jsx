import React from 'react';
import HeaderComponent from '../HelperComponents/ComponentHeaders';

export default class EmailConfiguration extends React.Component {
    constructor(props){
        super(props);
        this.state = {Component: 'EmailConfiguration'}
    }

    //Handle Submit Click
    handleSubmit = (event) => {
        console.log(event)
    }

    handleChange = (event) => {
        const name = event.target.name;
        this.setState({[name] : event.target.value})
    }

    render(){
        return(
            <div className={this.state.Component}>
                <div className='center'>
                    <h1 className='green'>Add Email</h1>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className='form-container rounded-corners lg'>
                            <form onSubmit={this.handleSubmit}>
                                <div className='input-row'>
                                    <label>Email Name</label>
                                    <input className='rounded-corners' type='text' name='EmailName' value={this.state.EmailName} onChange={this.handleChange} required></input>
                                </div>
                                <div className='input-row'>
                                    <label>Email Subject Title</label>
                                    <input className='rounded-corners' type='text' name='EmailSubjectTitle' value={this.state.EmailSubjectTitle} onChange={this.handleChange} required></input>
                                </div>
                                <div className='input-row'>
                                    <label>Email Body</label>
                                    <textarea className='rounded-corners' type='text' rows="6" name='EmailBody' value={this.state.EmailBody} onChange={this.handleChange} required></textarea>
                                </div>
                                <div className='input-row'>
                                    <label>Send On</label>
                                    <input className='rounded-corners' type='date' name='SendOn' value={this.state.SendOn} onChange={this.handleChange} required></input>
                                </div>
                                <div className='input-row'>
                                    <label>Email Number In Sequence</label>
                                    <input className='rounded-corners' type='text' name='EmailNumberInSequence' value={this.state.EmailNumberInSequence} onChange={this.handleChange} required></input>
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