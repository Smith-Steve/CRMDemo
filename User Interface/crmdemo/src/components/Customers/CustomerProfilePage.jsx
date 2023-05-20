import React from 'react';
import HeaderComponent from '../HelperComponents/ComponentHeaders'
import { variables } from '../../Library/API_URLS';
import { API_CALL_HEADER_GET_REQUEST } from '../../Library/API_Call_Headers';

export default class CustomerProfilePage extends React.Component {
    constructor(props){
        super(props);
        this.state = { component: 'Customer Profile Page'}
    }

    componentDidMount(){

    }

    getCustomerInfo(){
        fetch(`${variables.API_URL}/CustomerAPI/Details/`)
    }

    render(){
        return(
            <div className={this.state.component}>
                <HeaderComponent component={this.state.component}/>
                <div className='Component-Body'>
                    <div className='Component-Element-Container'>
                        Test
                    </div>
                </div>
            </div>
        )
    }
}

{/* <div className='Component-Element-Container'>
<a href={`/Customer/${customer.CustomerName.replace(/\s/g, '')}`}><h3>{customer.CustomerName}</h3></a>
<p>{customer.CustomerStreet1}</p>
</div> */}