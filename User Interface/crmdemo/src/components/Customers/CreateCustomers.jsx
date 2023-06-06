import React from 'react';
import {createCustomer} from '../../Library/API_CALLS'

export default class CreateCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.clearForm = this.clearForm.bind(this)
        this.state = { CustomerName: '', CustomerStreet1: '', CustomerCity: '', CustomerState: '', CustomerVertical: '', ComponentApiString: 'CustomerAPI'}
    }

    handleSubmit = (event) => {
        createCustomer(event, this.state)
        this.clearForm()
    }

    handleChange = (event) => {
        const name = event.target.name;
        this.setState({[name] : event.target.value})
    }

    clearForm() {
        this.setState({CustomerName: '', CustomerStreet1: '', CustomerCity: '', CustomerState: '', CustomerVertical: ''})
    }

    render() {
        return(
            <div className='CreateCustomer'>
                <div className='center'>
                    <h1 className='green'>Add Customer</h1>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className='form-container rounded-corners lg'>
                            <form onSubmit={this.handleSubmit}>
                                <div className='input-row'>
                                    <label>Customer Name</label>
                                    <input className="rounded-corners" type="text" name="CustomerName" value={this.state.CustomerName} onChange={this.handleChange} required></input>
                                </div>
                                <div className='input-row'>
                                    <label>Customer Street 1</label>
                                    <input className="rounded-corners" type="text" name="CustomerStreet1" value={this.state.CustomerStreet1} onChange={this.handleChange} required></input>
                                </div>
                                <div className='input-row'>
                                    <label>Customer City</label>
                                    <input className="rounded-corners" type="text" name="CustomerCity" value={this.state.CustomerCity} onChange={this.handleChange} required></input>
                                </div>
                                <div className='input-row'>
                                    <label>Customer State</label>
                                    <input className="rounded-corners" type="text" name="CustomerState" value={this.state.CustomerState} onChange={this.handleChange} required></input>
                                </div>
                                <div className='input-row'>
                                    <label>Customer Vertical</label>
                                    <input className="rounded-corners" type="text" name="CustomerVertical" value={this.state.CustomerVertical} onChange={this.handleChange} required></input>
                                </div>
                                <div className='align-right'>
                                    <button onSubmit={this.handleSubmit}>Enter Customer</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}