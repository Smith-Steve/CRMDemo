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

    //front end pagination
    // pageChange = (firstPage, lastPage) => {
    //     console.log("I've been invoked.")
    //     const page1 = 6
    //     const page2 = 11
    //     this.setState({firstPage: page1, lastPage: page2})
    // }

    handleClick(event) {
        console.log(event.target.id)
        const targetElement = event.target.id
        const firstPage = this.state.firstPage + 5; const lastPage = this.state.lastPage + 5
        if(targetElement === 'forward-button'){
            
            this.setState({firstPage: firstPage, lastPage: lastPage})
        } else if(targetElement === 'backward-button'){

        }
        this.setState({firstPage: 6, lastPage: 11})
    }

    determinePage(){

    }//since we're just working with a front end page turner, we need to find a way to; a, change the page;b 
    // change the page in such a way we don't go beyond the total number of companies in the list.


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
                                <button className='green backward-button' id='backward-button'>Backward</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}