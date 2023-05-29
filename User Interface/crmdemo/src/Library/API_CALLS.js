const baseUrl = 'http://localhost:37844/api/'

export function removeContact(contactId) {
    const init = { method: 'DELETE', headers: {'Content-Type': 'application/json'}}
    fetch('http://localhost:37844/api/' + 'Contact/Delete/' + contactId, init)
        .then(response => {
            if(response) alert('contact removed')
        }).catch(error => console.error(error))
}

export function createFlight(newFlightName){
    fetch(`${baseUrl}Flight`, { method: 'POST', headers: {'Content-Type': 'application/json'},
body: JSON.stringify({FlightName: newFlightName})})
        .then(response => {
            if(response) alert('Flight Added')
        }).catch(error => console.error(error))
}