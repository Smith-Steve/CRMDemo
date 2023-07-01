import React from 'react';
import Customer from '../../Library/Customer'
import {createCustomer} from '../../Library/API_CALLS'

export default class CreateCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.clearForm = this.clearForm.bind(this)
        this.state = { CustomerName: '', CustomerStreet1: '', CustomerCity: '', CustomerState: '', CustomerVertical: ''}
    }
    
    componentDidMount(){
        localStorage.removeItem('Active-Customer')
    }

    setForm = () => {
        const { CustomerName, CustomerStreet1, CustomerCity, CustomerState, CustomerVertical } = this.state;
        this.setState((prevState) => {
            return {... prevState, CustomerName, CustomerStreet1, CustomerCity, CustomerState, CustomerVertical}
        }, this.stateChange)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const customerClass = JSON.stringify(new Customer(this.state.CustomerName, this.state.CustomerStreet1, this.state.CustomerCity, this.state.CustomerState, this.state.CustomerVertical))
        createCustomer(customerClass)
        this.clearForm()
    }

    handleChange = (event) => {
        const name = event.target.name;
        this.setState({[name] : event.target.value})
    }

    //handle update API submission.
    // handleUpdate = (event) => {
    //     event.preventDefault();
    //     const updateCustomer = new CustomerUpdate(this.state.CustomerId, this.state.CustomerName, this.state.CustomerStreet1, this.state.CustomerCity, this.state.CustomerState, this.state.CustomerVertical)
    //     console.log(updateCustomer)
    // }

    clearForm() {
        this.setState({CustomerName: '', CustomerStreet1: '', CustomerCity: '', CustomerState: '', CustomerVertical: ''})
    }

    render() {
        return(
            <div className='CreateCustomer'>
                <div className='center'>
                    {
                        this.props.activeCustomer != null ?
                        (<React.Fragment>
                            <h1 className='green'>Update Customer</h1>
                        </React.Fragment>)
                        :
                        (<React.Fragment>
                            <h1 className='green'>Add Customer</h1>
                        </React.Fragment>)
                    }
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className='form-container rounded-corners lg'>
                            <form onSubmit={this.props.activeCustomer != null ? this.handleUpdate : this.handleSubmit}>
                                <div className='input-row'>
                                    {
                                        this.props.activeCustomer != null ?
                                        (<React.Fragment>
                                            <label>Update Customer Name</label>
                                        </React.Fragment>)
                                        :
                                        (<React.Fragment>
                                            <label>Customer Name</label>
                                        </React.Fragment>)
                                    }
                                    <input className="rounded-corners" type="text" name="CustomerName" value={this.state.CustomerName} onChange={this.handleChange} required></input>
                                </div>
                                <div className='input-row'>
                                    {
                                        this.props.activeCustomer != null ?
                                        (<React.Fragment>
                                            <label>Update Customer Street #1</label>
                                        </React.Fragment>)
                                        :
                                        (<React.Fragment>
                                            <label>Customer Street #1</label>
                                        </React.Fragment>)
                                    }
                                    <input className="rounded-corners" type="text" name="CustomerStreet1" value={this.state.CustomerStreet1} onChange={this.handleChange} required></input>
                                </div>
                                <div className='input-row'>
                                    {
                                        this.props.activeCustomer != null ?
                                        (<React.Fragment>
                                            <label>Update Customer City</label>
                                        </React.Fragment>)
                                        :
                                        (<React.Fragment>
                                            <label>Customer City</label>
                                        </React.Fragment>)
                                    }
                                    <input className="rounded-corners" type="text" name="CustomerCity" value={this.state.CustomerCity} onChange={this.handleChange} required></input>
                                </div>
                                <div className='input-row'>
                                    {
                                        this.props.activeCustomer != null ?
                                        (<React.Fragment>
                                            <label>Update Customer State</label>
                                        </React.Fragment>)
                                        :
                                        (<React.Fragment>
                                            <label>Customer State</label>
                                        </React.Fragment>)
                                    }
                                    <input className="rounded-corners" type="text" name="CustomerState" value={this.state.CustomerState} onChange={this.handleChange} required></input>
                                </div>
                                <div className='input-row'>
                                    {
                                        this.props.activeCustomer != null ?
                                        (<React.Fragment>
                                            <label>Update Customer Vertical</label>
                                        </React.Fragment>)
                                        :
                                        (<React.Fragment>
                                            <label>Customer Vertical</label>
                                        </React.Fragment>)
                                    }
                                    <input className="rounded-corners" type="text" name="CustomerVertical" value={this.state.CustomerVertical} onChange={this.handleChange} required></input>
                                </div>
                                <div className='align-right'>
                                    {
                                        this.props.activeCustomer != null ?
                                        (<button onSubmit={this.handleUpdate}>Update Customer</button>)
                                        :
                                        (<button onSubmit={this.handleSubmit}>Enter Customer</button>)
                                    }
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}