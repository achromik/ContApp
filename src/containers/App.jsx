import React from 'react';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';

const fs = require('fs');
const path = require('path');
const config = require('../config');
const contactFile = config.DATA_FILE;
const dataFolder = config.DATA_FOLDER;
let filePath = './' + dataFolder + '/' + contactFile;

const electron = require('electron')

const remote = electron.remote
const mainProcess = remote.require('./main')
const ipc = electron.ipcRenderer


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contactsList: []
        };
        this.onContactFormSuccess = this.onContactFormSuccess.bind(this);
        this.removeContact = this.removeContact.bind(this);
        this.editContact = this.editContact.bind(this);
    }

    componentDidMount() {
        ipc.on('file-opened', (event, file, content) => {
            let contacts = JSON.parse(content);
            filePath = file;
            this.setState({
                contactsList: contacts
            })  
        })

        ipc.on('save-file', (event) => {
            const contacts = JSON.stringify(this.state.contactsList, null, '\t')
            mainProcess.saveFile(filePath, contacts)
        })

        ipc.on('save-as-file', (event) => {
            const contacts = JSON.stringify(this.state.contactsList, null, '\t')
            mainProcess.saveAsFile(contacts)
        })
    }

    onContactFormSuccess(event, user) {
        event.preventDefault();        
        let contacts = this.state.contactsList;
        contacts.push(user);
        this.setState({
            contactsList: contacts
        });
        try { 
            fs.writeFileSync(filePath, JSON.stringify(contacts, null, '\t'), 'utf-8'); 
        }
        catch(e) { 
            alert('Failed to save the file !'); 
            console.error(e);
        }
    }

    removeContact (id) {
        let remainderContacts = this.state.contactsList.filter((item) => {return item.id !== id});
        try { 
            fs.writeFileSync(filePath, JSON.stringify(remainderContacts, null, '\t'), 'utf-8'); 
        }
        catch(e) { 
            alert('Failed to save the file !'); 
            console.error(e);
        }
        this.setState({
            contactsList: remainderContacts
        });
    }

    editContact(contact) {
        let newContactList = this.state.contactsList.map((user) => {
            if(user.id === contact.id) {
                user.id = contact.id;
                user.name = contact.name;
                user.surname = contact.surname;
                user.phone = contact.phone;
            }
            return user;
        });
        try { 
            fs.writeFileSync(filePath, JSON.stringify(newContactList, null, '\t'), 'utf-8'); 
        }
        catch(e) { 
            alert('Failed to save the file !'); 
            console.error(e);
        }
        this.setState({
            contactsList: newContactList
        });
    }

    render() {
        return (
            <div>
                <ContactForm onSuccess = {this.onContactFormSuccess} />
                <ContactList 
                    users = {this.state.contactsList} 
                    removeContact = {this.removeContact} 
                    editContact = {this.editContact}
                />
            </div>
        );
    }
}

export default App;