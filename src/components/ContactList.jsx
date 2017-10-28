import React from 'react';
import Contact from './Contact';

const uuid = require('uuid4');

class ContactList extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {
            users: this.props.users
        };
    }

    // componentWillReceiveProps(nextProps) {
    //     if (Object.keys(nextProps.newUser).length) {
    //         const users = this.state.users.concat([nextProps.newUser]);
    //         this.setState({users});
    //     }
    // }

    render() { 
        const contacts = this.state.users.map(user => <Contact key={uuid()} user={user} />);
        console.log(JSON.stringify(this.props.users));
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