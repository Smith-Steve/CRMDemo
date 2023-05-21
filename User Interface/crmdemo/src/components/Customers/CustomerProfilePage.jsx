import React from 'react';
import HeaderComponent from '../HelperComponents/ComponentHeaders'
import { variables } from '../../Library/API_URLS';
import { API_CALL_HEADER_GET_REQUEST } from '../../Library/API_Call_Headers';

export default class CustomerProfilePage extends React.Component {
    constructor(props){
        super(props);
        this.state = { component: 'Customer Profile Page', activeCustomer: this.props.activeCustomer.CustomerName}
    }
    componentDidMount(){
        this.getCustomerInfo()
    }

    //Not sure that I will need to be able to pull this information, but it might be good to retain in state in case
    // it needs to be changed.
    getCustomerInfo(){
        fetch(`${variables.API_URL}/CustomerAPI/Details/${this.props.activeCustomer.customerId}`, API_CALL_HEADER_GET_REQUEST)
            .then(response => response.json())
            .then(returnedResponse => {
                this.setState({ activeCustomer: returnedResponse})
            }).catch(error => console.error(error))
    }

    render(){
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
                                    <button>Edit Customer</button> <button>Edit Customer 2</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}