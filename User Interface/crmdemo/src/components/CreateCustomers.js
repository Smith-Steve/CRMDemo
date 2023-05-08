import React from 'react';

export default class CreateCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { CustomerName: '', CustomerStreet1: '', CustomerCity: '', CustomerState: '', CustomerVertical: ''}
    }

    clearForm() {
        this.setState({CustomerName: '', CustomerStreet1: '', CustomerCity: '', CustomerState: '', CustomerVertical: ''})
    }

    render() {
        return(
            <div className='CreateCustomer'>
                
            </div>
        )
    }
}