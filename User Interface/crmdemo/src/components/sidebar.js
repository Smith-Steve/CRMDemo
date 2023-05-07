import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar(){
    return (
        <div className="side-bar grey rounded-corners">
            <a href="">Home</a>
            <a href='/Customers'>Customers</a>
            <a href='/Contacts'>Contacts</a>
            <a href='/Flights'>Flights</a>
            <a href="/Emails">Emails</a>
        </div>
    )
}