import React from "react";
import { createContactAPI } from '../../../Library/API_CALLS'
import HeaderComponent from "../../HelperComponents/ComponentHeaders";

class CreateContact extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.clearForm = this.clearForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {firstName: '', lastName: '', PhoneNumber: '', Email: ''}
    }

    handleChange(event){
        const name = event.target.name;
        this.setState({ [name]: event.target.value})
    }

    clearForm(){
        this.setState({firstName: '', lastName: '', PhoneNumber: '', Email: ''})
    }

    handleSubmit(event){
        event.preventDefault();
        createContactAPI(this.props.activeCustomer.CustomerId, this.state)
        this.clearForm()
    }

    render(){
        return(
            <div>
                <HeaderComponent component={'Create Contact'}/>
                <div className="component-body">
                    <div className="row">
                        <div className="col">
                            <form onSubmit={this.handleSubmit}>
                                <div className="input-row">
                                    <label>First Name</label>
                                    <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} required/>
                                </div>
                                <div className="input-row">
                                    <label>Last Name</label>
                                    <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} required/>
                                </div>
                                <div className="input-row">
                                    <label>Phone Number</label>
                                    <input type="text" name="PhoneNumber" value={this.state.PhoneNumber} onChange={this.handleChange} required/>
                                </div>
                                <div className="input-row">
                                    <label>Email</label>
                                    <input type="text" name="Email" value={this.state.Email} onChange={this.handleChange} required/>
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
//
export default CreateContact