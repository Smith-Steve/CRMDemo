import React from 'react';

export function FlightTables(listOfFlights){
    const flightRow = listOfFlights.map(flight => {
        return(
        <tr>
            <td>
                <span className='green'>{flight.FlightName}</span>
            </td>
            <td>
                <button className='rounded-corners contact-button'>Flight Set Up</button>
                <button className='red rounded-corners contact-button'>Delete Flight</button>
            </td>
        </tr>)
    })

    return(
        <div className='row'>
            <div className='col'>
                <table>
                    <thead>
                        <tr>Flight Name</tr>
                    </thead>
                    <tbody>
                        {flightRow}
                    </tbody>
                </table>
            </div>
        </div>
    )
}