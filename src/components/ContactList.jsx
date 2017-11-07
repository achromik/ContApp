import React from 'react';
import Contact from './Contact';

class ContactList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editItemIndex: -1
        }
        this.handleSelectItemEdit = this.handleSelectItemEdit.bind(this);
    }

    handleSelectItemEdit(id) {
        this.setState({editItemIndex: id});
    }

    render() { 
        const contacts = this.props.users.map((user, id) => (
            <Contact 
                removeContact={this.props.removeContact} 
                editContact ={ this.props.editContact}
                id={id} 
                key={id} 
                user={user} 
                isEditItem = {this.state.editItemIndex === user.id ? true : false  }
                handleSelectItemEdit = {this.handleSelectItemEdit}
            />
        ));
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