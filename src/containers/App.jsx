import React from 'react';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';

const fs = require('fs');
const config = require('../config');
const contactFile = config.DATA_FILE;
const dataFolder = config.DATA_FOLDER;
const filePath = './' + dataFolder + '/' + contactFile;



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contactsList: [],
            currentId: 1
        };

        this.onContactFormSuccess = this.onContactFormSuccess.bind(this);
        this.removeContact = this.removeContact.bind(this);
    }

    componentWillMount() {
        //if file whit contacts exist load contacts from file
        if (fs.existsSync( filePath)) { 
            try{ 
                let contacts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                this.setState({
                    contactsList: contacts,
                    currentId: contacts[contacts.length - 1].id + 1
                })
            }
            catch(e) { console.log(e);}
        } else {
            //create empty data file
            fs.mkdirSync('./' + dataFolder);
            fs.openSync(filePath, 'w');
        }
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
        console.log(id);
        let remainderContacts = this.state.contactsList.filter((item) => {return item.id !== id});
        console.log(remainderContacts);
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

    render() {
        return (
            <div>
                <ContactForm id={this.state.currentId}  onSuccess={ this.onContactFormSuccess } />
                <ContactList removeContact={this.removeContact} users={this.state.contactsList} />
            </div>
        );
    }
}

export default App;