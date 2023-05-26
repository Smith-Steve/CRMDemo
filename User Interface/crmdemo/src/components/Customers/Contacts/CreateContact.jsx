import React from "react";
import { variables } from "../../../Library/API_URLS";
import { API_CALL_HEADER_POST_REQUEST } from "../../../Library/API_Call_Headers";
import HeaderComponent from "../../HelperComponents/ComponentHeaders";
import { json } from "react-router-dom";

class CreateContact extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.clearForm = this.clearForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {component: 'Create Contact', firstName: '', lastName: '', PhoneNumber: '', Email: ''}
    }

    handleChange(event){
        const name = event.target.name;
        this.setState({ [name]: event.target.value})
    }

    clearForm(){
        this.setState({firstName: '', lastName: '', PhoneNumber: '', Email: ''})
    }

    handleSubmit(event){
        event.preventDefault()
        let contact = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            PhoneNumber: this.state.PhoneNumber,
            Email: this.state.Email
        }
        const initMethod = {API_CALL_HEADER_POST_REQUEST , body: JSON.stringify(contact)};
        fetch(`${variables.API_URL}Contact`, initMethod)
            .then(response => response.json())
            .then(returnedResponse => {
                if (returnedResponse) alert('Contact Submitted');
                this.clearForm()
            }).catch(error => {
                console.error(error)
            })
    }

    render(){
        return(
            <div className={this.state.component}>
                <HeaderComponent component={this.state.component}/>
                <div className="component-body">
                    <div className="row">
                        <div className="col">
                            <form>
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