const baseUrl = 'http://localhost:37844/api/'

export function removeContact(contactId) {
    const init = { method: 'DELETE', headers: {'Content-Type': 'application/json'}}
    fetch('http://localhost:37844/api/Contact/Delete/' + contactId, init)
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

export function createCustomer(event, customer){
    event.preventDefault();
    fetch(`${baseUrl}CustomerAPI`, { method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        CUstomerName: customer.CustomerName,
        CustomerStreet1: customer.CustomerStreet1,
        CustomerCity: customer.CustomerCity,
        CustomerState: customer.CustomerState,
        CustomerVertical: customer.CustomerVertical})
    }).then(response => response.json()
    ).then((returnedResponse) => {
        if(returnedResponse){
            alert('Submitted')
        } else {
            alert('Not Submitted')
        }
    }).catch(error => {
        if(error) throw error;
    })
}