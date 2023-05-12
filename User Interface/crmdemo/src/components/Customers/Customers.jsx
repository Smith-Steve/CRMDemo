import React from 'react';
import { variables } from '../../Library/API_URLS';
import { API_CALL_HEADER_GET_REQUEST } from '../../Library/API_Call_Headers';
// import { variables } from '../Components/Library/API_URLS'

export default class Customers extends React.Component {
    constructor(props){
        super(props);
        this.state = { component: 'Customers', customerList: []}
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

    render(){
        const CustomerList = this.state.customerList
        return(
            <div className='Customers'>
                <div className='Component-Header'>
                    <div className='row'>
                        <div className='col'>
                            <div className='center'>
                                <h1 className='Component-Header-Text green'>Customers</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='Component-Body'>
                    <div className='Component-Element-Container'>
                        <h3>Title</h3>
                        <p>Component Container</p>
                    </div>
                    <div className='Component-Element-Container'>
                        <h3>Title</h3>
                        <p>Component Container</p>
                    </div>
                </div>
            </div>
        )
    }
}