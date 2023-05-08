import React from 'react';

export default function Sidebar(){
    return (
        <div className="side-bar grey rounded-corners">
            <a href="/Home">Home</a>
            <a href='/Customers'>Customers</a>
            <a href='/CreateContacts'>Create Contacts</a>
            <a href='/Contacts'>Contacts</a>
            <a href='/Flights'>Flights</a>
            <a href="/Emails">Emails</a>
        </div>
    )
}