import React from 'react';

function FlightTables({listOfFlights, deleteFlight, setActiveFlight}){
    const flightRow = listOfFlights.map(flight => {
        return(
        <tr>
            <td>
                <span className='green'>{flight.FlightName}</span>
            </td>
            <td>
                <button className='rounded-corners contact-button' onClick={function (){setActiveFlight(flight)}}>Flight Set Up</button>
                <button onClick={function () {deleteFlight(flight.FlightId)}} className='red rounded-corners contact-button'>Delete Flight</button>
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

function BlankTable(){
    return(
        <div className='row'>
            <div className='col'>
                <span className='green'>No Flights Exist</span>
            </div>
        </div>
    )
}

export {FlightTables, BlankTable}