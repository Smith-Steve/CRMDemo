import ClientError from './client-error';

const baseUrl = 'http://localhost:37844/api/'
const API_GET_HEADER = {
    method: 'GET', headers: { 'Content-Type': 'application/json'}
}

export function removeContact(contactId) {
    if(typeof contactId !== 'number'){
        throw new ClientError('400', 'Please return a number.')
    }
    const init = { method: 'DELETE', headers: {'Content-Type': 'application/json'}}
    fetch('http://localhost:37844/api/Contact/Delete/' + contactId, init)
        .then(response => {
            if(response) alert('contact removed')
        }).catch(error => console.error(error))
}

export function createFlight(newFlightName){
    if(typeof newFlightName !== "string"){
        throw new ClientError('400', 'Please enter text')
    }
    fetch(`${baseUrl}Flight`, { method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({FlightName: newFlightName})})
        .then(response => {
            if(response) alert('Flight Added')
        }).catch(error => console.error(error))
}

export function getFlights(){
    const init = {method: 'GET', headers: {'Content-Type': 'application/json'}}
    return fetch(`${baseUrl}Flight`, init)
        .then((response) => response.json())
        .then((returnedResponse) => {
            return returnedResponse
        }).catch(error => console.error(error))
}

export function getListOfContacts(customerId){
    const init = {method: 'GET', headers: {'Content-Type': 'application/json'}}
    return fetch(`${baseUrl}Contact/CustomerContacts/` + customerId, init)
        .then(response => response.json())
        .then((returnedResponse) => {
            return returnedResponse
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