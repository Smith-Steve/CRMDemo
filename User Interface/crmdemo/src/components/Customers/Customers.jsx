import React from 'react';
import { variables } from '../../Library/API_URLS';
import HeaderComponent from '../HelperComponents/ComponentHeaders'
import { API_CALL_HEADER_GET_REQUEST } from '../../Library/API_Call_Headers';
// import { variables } from '../Components/Library/API_URLS'

export default class Customers extends React.Component {
    constructor(props){
        super(props);
        this.state = { component: 'Customers', customerList: [], firstPage: 0, lastPage: 5}
        //since this application is a demo, we will be making a complete API call for all the customers, and then controlling
        //the display of the list by slicing it.
    }

    componentDidMount(){
        this.getListOfCustomers();
    }

    getListOfCustomers() {
        fetch(variables.API_URL + 'CustomerAPI', API_CALL_HEADER_GET_REQUEST)
            .then(response => response.json())
            .then(returnedResponse => {
                this.setState({customerList: returnedResponse})
            }).catch(error => {
                if (error) console.log(error)
            })
    }

    renderCustomerRow(customer){
        return(
            <div className='Component-Element-Container'>
                <h3>{customer.CustomerName}</h3>
                <p>{customer.CustomerStreet1}</p>
            </div>
        )
    }


    render(){
        const CustomerList = this.state.customerList.slice(0,5)
        return(
            <div className='Customers'>
                <HeaderComponent component={this.state.component}/>
                <div className='Component-Body'>
                    {CustomerList.length > 0 ? CustomerList.map(this.renderCustomerRow) : <div>No number</div>}
                    <div className='component-element-container'>
                        <div className='center'>
                            <button className='beige forward-button'>Forward</button>
                            <button className='beige forward-button'>Backward</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}