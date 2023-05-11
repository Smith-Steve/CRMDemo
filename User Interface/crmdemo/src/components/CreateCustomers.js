import React from 'react';
import { variables } from '../Library/API_URLS'
// import APICalls from '../Library/API_Calls'

export default class CreateCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind()
        this.state = { CustomerName: '', CustomerStreet1: '', CustomerCity: '', CustomerState: '', CustomerVertical: '', ComponentApiString: 'CustomerAPI'}
    }

    createNewCustomer(){
        this.setState({
            CustomerName: '',
            CustomerStreet1: '',
            CustomerCity: '',
            CustomerState: '',
            CustomerVertical: ''
        })
    }

    handleSubmit(){
        fetch(variables.API_URL + this.state.ComponentApiString,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    CustomerName: this.state.CustomerName,
                    CustomerStreet1: this.state.CustomerStreet1,
                    CustomerCity: this.state.CustomerCity,
                    CustomerState: this.state.CustomerState,
                    CustomerVertical: this.state.CustomerVertical
                })
            }).then(
                response => response.json()
            ).then((returnedResponse) => {
                if(returnedResponse){
                    alert('Submitted')
                    this.clearForm()
                } else {
                    alert('Not Submitted')
                }
            }).catch(error => {
                if (error) throw error;
            })
    }

    handleChange = (event) => {
        const name = event.target.name;
        this.setState({[name] : event.target.value})
    }

    // handleChange(event){
    //     const name = event.target.name;
    //     this.setState({ [name]: event.target.value})
    // }

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
                                    <input type="text" name="CustomerName" value={this.state.CustomerName} onChange={this.handleChange} required></input>
                                </div>
                                <div className='input-row'>
                                    <label>Customer Street 1</label>
                                    <input type="text" name="CustomerStreet1" value={this.state.CustomerStreet1} onChange={this.handleChange} required></input>
                                </div>
                                <div className='input-row'>
                                    <label>Customer City</label>
                                    <input type="text" name="CustomerCity" value={this.state.CustomerCity} onChange={this.handleChange} required></input>
                                </div>
                                <div className='input-row'>
                                    <label>Customer State</label>
                                    <input type="text" name="CustomerState" value={this.state.CustomerState} onChange={this.handleChange} required></input>
                                </div>
                                <div className='input-row'>
                                    <label>Customer Vertical</label>
                                    <input type="text" name="CustomerVertical" value={this.state.CustomerVertical} onChange={this.handleChange} required></input>
                                </div>
                                <div className='align-right'>
                                    <button onSubmit={this.createNewCustomerClick}>Enter Customer</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}