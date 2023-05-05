import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar(){
    return (
        <div className='side-bar lg rounded-corners'>
            <React.Fragment>
                <div className='col'>
                    <div className='sidenav'>
                        <a href="">Home</a>
                        <a href='/Customers'>Customers</a>
                        <a href='/Contacts'>Contacts</a>
                        <a href='/Flights'>Flights</a>
                        <a href="/Emails">Emails</a>
                    </div>
                </div>
            </React.Fragment>
        </div>
    )
}