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
        this.handleClick = this.handleClick.bind(this)
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

    handleClick(event) {
        const targetElement = event.target.id
        this.manageList()
    }

    manageList(){
        let lowIndex = Math.floor(Math.random() * this.state.customerList.length - 5);
        let highIndex = lowIndex + 5;
        console.log('low index: ', lowIndex)
        console.log('high index: ', highIndex)
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
                                <button className='green forward-button' id='forward-button'onClick={this.handleClick.bind(this)}>Forward</button>
                                <button className='green backward-button' id='backward-button' onClick={this.handleClick.bind(this)}>Backward</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}