import React from "react";
import { createContactAPI, updateContact } from '../../../Library/API_CALLS'
import HeaderComponent from "../../HelperComponents/ComponentHeaders";

class CreateContact extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.clearForm = this.clearForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {FirstName: '', LastName: '', PhoneNumber: '', Email: ''}
    }

    componentDidMount(){
        // On mounting this function checks for
        // whether or not there is an active contact.
        // If there is an active contact present in props, then the form is configured with the values entered.
        if(this.props.activeContact != null){
            this.setForm()
        }
    }

    setForm = () => {
        const {ContactId, CustomerId, Email, FirstName, LastName, PhoneNumber} = this.props.activeContact
        this.setState((prevState) => {
            return {... prevState, ContactId, CustomerId, Email, FirstName, LastName, PhoneNumber}
        }, this.stateChange)
    }

    handleChange(event){
        const name = event.target.name;
        this.setState({ [name]: event.target.value})
    }

    clearForm(){
        this.setState({FirstName: '', LastName: '', PhoneNumber: '', Email: ''})
    }

    handleSubmit(event){
        event.preventDefault();
        createContactAPI(this.props.activeCustomer.CustomerId, this.state)
        this.clearForm()
        this.props.setComponent('CreateContact')
    }

    handleUpdate = (event) => {
        event.preventDefault()
        console.log('Handle Update: ', this.state)
        updateContact(this.state)
    }

    render(){
        //This form is now fully dynamic. It handles both contact editing and contact creation.
        //The forms functionality/UI is impacted by 'ActiveContact' in props.
        //Depending upon the value there, both visuals and functions are changed.
        return(
            <React.Fragment>
            <div>
                <HeaderComponent component={'Create Contact'}/>
                <div className="component-body">
                    <div className="row">
                        <div className="col">
                            <form onSubmit={this.props.ActiveContact != null ? this.handleUpdate : this.handleSubmit}>
                                <div className="input-row">
                                    {
                                        //Form dynamic in case where there is an update.
                                        this.props.activeContact != null ?
                                        (<React.Fragment>
                                            <label>Update First Name</label>
                                        </React.Fragment>)
                                        :
                                        (<React.Fragment>
                                            <label>First Name</label>
                                        </React.Fragment>)
                                        //Form dynamic in case where there is a new entry.
                                    }
                                    <input type="text" name="FirstName" value={this.state.FirstName} onChange={this.handleChange} required/>
                                </div>
                                <div className="input-row">
                                    {
                                        this.props.activeContact != null ?
                                        (<React.Fragment>
                                            <label>Update Last Name</label>
                                        </React.Fragment>)
                                        :
                                        (<React.Fragment>
                                            <lable>Last Name</lable>
                                        </React.Fragment>)
                                    }
                                    <input type="text" name="LastName" value={this.state.LastName} onChange={this.handleChange} required/>
                                </div>
                                <div className="input-row">
                                    {
                                        this.props.activeContact != null ?
                                        (<React.Fragment>
                                            <label>Update Phone Number</label>
                                        </React.Fragment>)
                                        :
                                        (<React.Fragment>
                                            <label>Phone Number</label>
                                        </React.Fragment>)
                                    }
                                    <input type="text" name="PhoneNumber" value={this.state.PhoneNumber} onChange={this.handleChange} required/>
                                </div>
                                <div className="input-row">
                                    {
                                        this.props.activeContact != null ?
                                        (<React.Fragment>
                                            <label>Update Email</label>
                                        </React.Fragment>)
                                        :
                                        (<React.Fragment>
                                            <label>Email</label>
                                        </React.Fragment>)
                                    }
                                    <input type="text" name="Email" value={this.state.Email} onChange={this.handleChange} required/>
                                </div>
                                <div className='align-right'>
                                    {
                                        this.props.activeContact != null
                                        ? (<button onSubmit={this.handleUpdate}>Update Customer</button>)
                                        : (<button onSubmit={this.handleSubmit}>Enter Customer</button>)
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}
//
export default CreateContact
