import React from 'react';

function FlightTables(flightList){
    const flightRow = flightList.map(flight => {
        <tr><td><span>{flight.FlightName}</span></td></tr>
    })
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

export {BlankTable}