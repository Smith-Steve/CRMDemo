import React from 'react';
import HeaderComponent from '../HelperComponents/ComponentHeaders'
import { variables } from '../../Library/API_URLS';
import { API_CALL_HEADER_GET_REQUEST } from '../../Library/API_Call_Headers';

export default class CustomerProfilePage extends React.Component {
    constructor(props){
        super(props);
        this.state = { component: 'Customer Profile Page', activeCustomer: this.props.activeCustomer.CustomerName}
    }

    //Not sure that I will need to be able to pull this information, but it might be good to retain in state in case
    // it needs to be changed.
    // getCustomerInfo(){
    //     fetch(`${variables.API_URL}/CustomerAPI/Details/${this.props.activeCustomer.customerId}`, API_CALL_HEADER_GET_REQUEST)
    //         .then(response => response.json())
    //         .then(returnedResponse => {
    //             this.setState({ activeCustomer: returnedResponse})
    //         }).catch(error => console.error(error))
    // }

    convertDate = (entryDate) => {
        let originalDate = new Date(entryDate)
        let returnDate = originalDate.getFullYear()
        return returnDate
    }

    render(){
        const renderedDate = this.convertDate(this.props.activeCustomer.CustomerJoin)
        console.log(renderedDate)
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
                                    <button className='rounded-corners customer-profile-button'>Edit Customer</button> <button className='rounded-corners customer-profile-button'>Add Contact</button> <button className='red rounded-corners customer-profile-button'> Delete Customer</button>
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
                </div>
            </div>
        )
    }
}