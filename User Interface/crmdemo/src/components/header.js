import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header(){

    return (
        <React.Fragment>
        <div className='header yblue'>
            <h3 className='white'>Demo CRM</h3>
        </div>
        <nav className='navbar navbar-expand-sm bg-light yblue'>
            <ul className='navbar-nav yblue'>
                <li>
                    <NavLink className="btn btn-light btn-outline-primary" to="/home">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink className="btn btn-light btn-outline-primary" to="/Customers">
                        Customers
                    </NavLink>
                </li>
                <li>
                    <NavLink className="btn btn-light btn-outline-primary" to="/Contacts">
                        Contacts
                    </NavLink>
                </li>
                <li>
                    <NavLink className="btn btn-light btn-outline-primary" to="/Flights">
                        Flight
                    </NavLink>
                </li>
                <li>
                    <NavLink className="btn btn-light btn-outline-primary" to="/Emails">
                        Email
                    </NavLink>
                </li>
            </ul>
        </nav>
        {/* <Routes>
            <Route path="/Customers" Component={Customers}/>
            <Route path="/Contacts" Component={Contacts}/>
            <Route path="/Flights" Component={Flights}/>
            <Route path="/Emails" Component={Emails}/>
        </Routes> */}
        </React.Fragment>
    )
}