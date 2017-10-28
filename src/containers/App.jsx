import React from 'react';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';

const fs = require('fs');

const contactFile = './contacts.json';
let contacts = [];


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: [],
            currentId: 1
        };

        this.onContactFormSuccess = this.onContactFormSuccess.bind(this);
    }

    componentWillMount() {
        //check if file whit contacts exist
        if (fs.existsSync(contactFile)) { 
            try{ 
                contacts = JSON.parse(fs.readFileSync(contactFile, 'utf-8'));
                this.setState({
                    currentId: contacts[contacts.length-1].id+1
                })
                console.log(contacts[contacts.length-1].id +' current id ' + this.state.currentId);
            
            }
            catch(e) { console.log(e);}
        } 
    }

    onContactFormSuccess(event, user) {
        event.preventDefault();        
        contacts.push(user);

        this.setState({
            currentUser: user,
        });

        try { 
            fs.writeFileSync(contactFile, JSON.stringify(contacts, null, '\t'), 'utf-8'); 
        }
        catch(e) { 
            alert('Failed to save the file !'); 
            console.error(e);
        }
    }

    render() {
        return (
            <div>
                <ContactForm id={this.state.currentId} onSuccess={ this.onContactFormSuccess } />
                <ContactList users={contacts} newUser={this.state.currentUser}/>
            </div>
        );
    }
}

export default App;