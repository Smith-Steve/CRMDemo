import React from 'react';

function FlightTables(flightList){
    const flightRow = flightList.map(flight => {
        
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