import React from 'react';
import HeaderComponent from '../HelperComponents/ComponentHeaders'
import { variables } from '../../Library/API_URLS';
import { API_CALL_HEADER_GET_REQUEST, API_CALL_HEADER_DELETE_REQUEST } from '../../Library/API_Call_Headers';

export default class CustomerProfilePage extends React.Component {
    constructor(props){
        super(props);
        this.setComponent = this.setComponent.bind(this);
        this.state = { component: 'Customer Profile Page', activeCustomer: this.props.activeCustomer.CustomerName, activeContactList:[] }
    }

    componentDidMount(){
        this.getListOfContacts()
    }

    getListOfContacts() {
        fetch(variables.API_URL + 'Contact/CustomerContacts/' + this.props.activeCustomer.CustomerId , API_CALL_HEADER_GET_REQUEST)
            .then(response => response.json())
            .then(returnedResponse => {
                this.setState({activeContactList: returnedResponse})
            }).catch(error => {
                if (error) console.log(error)
            })
    }

    removeContact(contactId){
        const init = {method: 'Delete', headers: {'Content-Type': 'application/json'}}
        fetch(`${variables.API_URL}Contact/Delete/${contactId}`, init)
            .then(response => {
                if(response) alert('contact removed')
                this.getListOfContacts()
            }).catch(error => console.error(error))
    }

    setComponent(){
        this.props.setComponent('CreateContact')
    }

    convertDate = (entryDate) => {
        let originalDate = new Date(entryDate)
        let returnDate = originalDate.getFullYear()
        return returnDate
    }

    buildContactTable(customerContactList){
        const contactRow = customerContactList.map(contact => {
            return <tr><td><span>{contact.FirstName + ' ' + contact.LastName}</span></td><td>{contact.Email}</td><td>{contact.PhoneNumber}</td><td><button className='rounded-corners contact-button'>Edit</button><button className='red rounded-corners contact-button' onClick={() => this.removeContact(contact.ContactId)}> Delete</button></td></tr>
        })

        return(
            <div className='row'>
                <div className='col'>
                    <table>
                        <thead>
                            <tr className='green'>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contactRow}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    render(){
        const renderedDate = this.convertDate(this.props.activeCustomer.CustomerJoin)
        const contactList = this.state.activeContactList;
        return(
            <div className={this.state.component}>
                <HeaderComponent component={this.state.component} activeCustomer={this.props.activeCustomer.CustomerName}/>
                <div className='Component-Body'>
                    <div className='Component-Element-Container'>
                        <div className='row'>
                            <div className='col'>
                                <div className='center Component-Header-Text green'>
                                    <h3>{this.props.activeCustomer.CustomerName}</h3>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                This Organization's profile is below
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <b>Organization Detail:</b>
                                <div className='center'>
                                    <button className='rounded-corners customer-profile-button'>Edit Customer</button> <button onClick={this.setComponent} className='rounded-corners customer-profile-button'>Add Contact</button> <button className='red rounded-corners customer-profile-button'> Delete Customer</button>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Hello</th>
                                            <th>Contact</th>
                                            <th>Country</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><b>Organization Name:</b> {this.props.activeCustomer.CustomerName}</td>
                                            <td><b>Phone: </b></td>
                                            <td><b>Fax: </b></td>
                                        </tr>
                                        <tr>
                                            <td><b>Primary Contact: </b></td>
                                            <td><b></b></td>
                                            <td><b></b></td>
                                        </tr>
                                        <tr>
                                            <td><b>Default Language: </b></td>
                                            <td><b>Fiscal Year Starts: </b></td>
                                            <td><b>Newsletter?: </b></td>
                                        </tr>
                                        <tr>
                                            <td><b>Customer Street:</b>{this.props.activeCustomer.CustomerStreet1}</td>
                                            <td><b>Customer Street 2: </b></td>
                                            <td><b>City: </b>{this.props.activeCustomer.CustomerCity}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Customer State: </b>{this.props.activeCustomer.CustomerCity}</td>
                                            <td><b>Customer Acquisition Date: </b>{renderedDate}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><b>Created By: </b></td>
                                            <td><b>Modified By: </b></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='Component-Element-Container'>
                        {contactList.length > 0 ? this.buildContactTable(contactList) : null}
                    </div>
                </div>
            </div>
        )
    }
}