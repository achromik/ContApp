import React from 'react';
import Contact from './Contact';

class ContactList extends React.Component {

    render() { 
        const contacts = this.props.users.map((user, id) => <Contact removeContact={this.props.removeContact} id={id} key={id} user={user} />);
        return (
            <div className="contact-list">
                <h2>Contact list</h2>
                <ul className="list-group">
                    { contacts }
                </ul>
            </div>
        );
    }
}

export default ContactList;