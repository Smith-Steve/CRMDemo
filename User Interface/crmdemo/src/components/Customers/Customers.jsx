import React from 'react';
import HeaderComponent from '../HelperComponents/ComponentHeaders'
import {getContacts} from '../../Library/API_CALLS'

export default class Customers extends React.Component {
    constructor(props){
        super(props);
        this.state = { component: 'Customers', customerList: [], firstPage: 0, lastPage: 5}
        this.handleClick = this.handleClick.bind(this)
        this.setCustomer = this.setCustomer.bind(this);
        this.renderCustomerRow = this.renderCustomerRow.bind(this);
        //There is presently no way to set the state for active customer in this component.
        //This is because the entire customer set of information is not required on this page.
    }

    componentDidMount(){
        this.getListOfCustomers();
    }

    getListOfCustomers() {
        getContacts().then((this.getContactsListSuccess))
    }

    getContactsListSuccess = (returnedCustomerList) => {
        this.setState({customerList: returnedCustomerList})
    }

    setCustomer(customer){
        this.props.setActiveCustomer(customer.CustomerName)
        window.localStorage.setItem('Active-Customer', JSON.stringify(customer))
    }

    renderCustomerRow(customer){
        let customerCard = customer
        return(
            <div className='Component-Element-Container' onClick={() => this.setCustomer(customerCard)} key={customer.CustomerId}>
                <a href={`/Customer/${customer.CustomerName.replace(/\s/g, '')}`}><h3>{customer.CustomerName}</h3></a>
                <p>{customer.CustomerStreet1}</p>
            </div>
        )
        //treating customer name to replace spaces.
        //return to work here to continue. Trying to capture selected element so it can be passed into props/state.
    }

    handleClick() {
        this.manageList()
    }

    manageList(){
        let lowIndex = Math.floor(Math.random() * this.state.customerList.length - 5);
        let highIndex = lowIndex + 5;
        if(lowIndex <= 0){
            lowIndex = 0
            highIndex = 5
        }
        this.setState({firstPage: lowIndex, lastPage: highIndex})

        //Since we're working on this just as a prototype, we have configured it in such a way that the pages will randomly flip and return
        //a positive value that is within the list of pages.

        //in a full blown application, this would be managed systematically.
    }
    render(){
        const CustomerList = this.state.customerList.slice(this.state.firstPage,this.state.lastPage)
        return(
            <div className='Customers'>
                <HeaderComponent component={this.state.component}/>
                <div className='Component-Body'>
                    {CustomerList.length > 0 ? CustomerList.map(this.renderCustomerRow) : <div>No number</div>}
                    <div className='component-element-container'>
                        <div className='center'>
                                <button className='green forward-button' id='forward-button'onClick={this.handleClick.bind(this)}>Click</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}