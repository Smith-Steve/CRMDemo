import ClientError from './client-error';
import Contact from './Contact'

const baseUrl = 'http://localhost:37844/api/'

export function createFlight(newFlightName){
    if(typeof newFlightName !== "string"){
        throw new ClientError('400', 'Please enter text')
    }
    return fetch(`${baseUrl}Flight`, { method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({FlightName: newFlightName})})
        .then(response => {
            if(response) alert('Flight Added')
            return response
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

export function getOneFlight(flightId){
    const init = {method: 'GET', headers: {'Content-Type': 'application/json'}}
    return fetch(`${baseUrl}Flight/${flightId}`, init)
        .then((response) => response.json())
        .then((returnedResponse) => {
            return returnedResponse
        }).catch(error => console.error(error))
}

export function getContacts(){
    const init = {method: 'GET', headers: {'Content-Type': 'application/json'}}
    return fetch(`${baseUrl}CustomerAPI`, init)
        .then((response) => response.json())
        .then((returnedResponse) => {
            return returnedResponse
        }).catch(error => console.error(error))
}

export function getAllFromFlight(id){
    const init = {method : 'GET', headers: {'Content-Type': 'application/json'}}
    return fetch(`${baseUrl}Email/Flight/${id}`, init)
        .then((response) => response.json())
        .then((returnedResponse) => {
            if(returnedResponse.length === 0) returnedResponse.push(null)
            return returnedResponse
        }).catch(error => console.error(error))
}

export function deleteFlight(flightId) {
    if(typeof flightId !== 'number'){
        throw new ClientError('400', 'Please return a number.')
    }
    const init = { method: 'DELETE', headers: {'Content-Type': 'application/json'}}
    fetch('http://localhost:37844/api/Contact/Delete/' + flightId, init)
        .then(response => {
            if(response) alert('Flight Removed')
        }).catch(error => console.error(error))
}

export function getListOfContacts(customerId){
    if(typeof customerId !== 'number'){
        ClientError('400', 'Please enter a number')
    }
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

export function createContactAPI(customerId, customer){
    const contactSubmission = new Contact(customerId, customer.FirstName, customer.LastName, customer.PhoneNumber, customer.Email)
    const init = {method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(contactSubmission)}
    fetch(`${baseUrl}Contact`, init)
        .then(response => response.json())
        .then((returnedResponse) => {
            if(returnedResponse){
                alert('Submitted')
            } else {
                alert('Not Submitted')
            }
        }).catch(error => {
            if(error) throw error;
        })
}

export function createEmail(email) {
    const init = {method: 'POST', headers: {'Content-Type': 'application/json'},
                body: email}
    fetch(`${baseUrl}Email/`, init)
        .then(response => response.json())
        .then((returnedResponse) => {
            if(returnedResponse){
                alert('Submitted')
            } else {
                alert('Not Submitted')
            }
        }).catch(error => {
            if(error) throw error;
        })
}

export function updateContact(contact){
    const init = {method: 'PUT', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        ContactId: contact.ContactId,
        FirstName: contact.FirstName,
        LastName: contact.LastName,
        Email: contact.Email,
        PhoneNumber: contact.PhoneNumber
    })}
    fetch(`${baseUrl}Contact/Update`, init)
        .then(response => response.json())
        .then((returnedResponse) => {
            if(returnedResponse){
                alert('Contact Updated')
            } else {
                alert('Not Submitted')
            }
        }).catch(error => {
            if(error) throw error;
        })
}

export function removeFlight(flightId){
    if(typeof flightId !== 'number') throw new ClientError('400', 'Please return number')
    const init = {method: 'DELETE', headers: {'Content-Type': 'application/json'}}
    fetch(`${baseUrl}Flight/${flightId}`, init)
        .then(response => response.json())
        .then((returnedResponse) => {
            if(returnedResponse){
                alert('Flight Successfully Deleted')
                console.log(returnedResponse)
            } else {
                alert('Not Submitted')
            }
        }).catch(error => {
            if(error) throw error;
        })
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