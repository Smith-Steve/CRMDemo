const baseUrl = 'http://localhost:37844/api/'

const removeContact = (contactId) => {
    const init = { method: 'DELETE', headers: {'Content-Type': 'application/json'}}
    fetch('http://localhost:37844/api/' + 'Contact/Delete/' + contactId, init)
        .then(response => {
            if(response) alert('contact removed')
        }).catch(error => console.error(error))
}

export {removeContact}