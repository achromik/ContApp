import React from 'react';
import Contact from './Contact';

class ContactList extends React.Component {

    render() { 
        const contacts = this.props.users.map((user, id) => <Contact removeContact={this.props.removeContact} id={id} key={id} user={user} />);
        return (
            <div className="contact-list">
                <h2 className="text-center">Contact list</h2>
                <div className="list-group">
                    <div className="list-group-box">
                        { contacts }
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactList;