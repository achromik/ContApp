import React from 'react';
import uuidv1 from 'uuid/v1'

import validatePhoneNumber from './extras';

class ContactForm extends React.Component {
    constructor(props) {
        super(props);        

        this.state = {
             user: {
                id: uuidv1(),
                name: '',
                surname: '',
                phone: ''
            },
            isSubmitDisabled: true
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSuccessHandler = this.onSuccessHandler.bind(this);
        this.isSubmitDisabled = this.isSubmitDisabled.bind(this)
    }

    onChangeHandler(name, value) {      
        const prev = this.state.user;
        prev[name] = value;

        this.setState(Object.assign({}, this.state, prev));
    }

    onSuccessHandler(event) {
        this.props.onSuccess(event, this.state.user);
        this.setState({
             user: {
                id: this.props.id+1,
                name: '',
                surname: '',
                phone: ''
            },

            isSubmitDisabled: true
        });
    }

    isSubmitDisabled(event) {
        this.setState({
            isSubmitDisabled: !(this.nameInput.value.trim() !== '' &&  validatePhoneNumber(this.phoneInput.value)) 
        });
    }

    render() {
        return (
            <div className = "contact-form">
                <fieldset>
                    <form onChange = {this.isSubmitDisabled}>
                        <div className = "form-group">
                            <label>Name:</label>
                            <input className = "form-control" 
                                onChange = {(event) => this.onChangeHandler('name', event.target.value)} 
                                value = {this.state.user.name} 
                                ref = {(input) => this.nameInput = input} 
                            />
                        </div>
                        <div className = "form-group">
                            <label>Surname:</label>
                            <input className = "form-control" 
                                onChange = {(event) => this.onChangeHandler('surname', event.target.value)} 
                                value = {this.state.user.surname} 
                            />
                        </div>
                        <div className = "form-group">
                            <label>Phone:</label>
                            <input className = "form-control" 
                                type = "text" 
                                pattern = '[\+]\d{2,3}[\s]\d{3,5}[\s]\d{3,5}[\s]\d{3,5}'  /* dosent work on Electron */
                                onChange = {(event) => this.onChangeHandler('phone', event.target.value)} 
                                value = {this.state.user.phone} 
                                ref = {(input) => this.phoneInput = input}
                                placeholder = "+12 123 123 123 or 32-456-27-89 or 1234567890"
                            />
                        </div>
                        <button className = "btn btn-success" 
                            onClick = {(event) => this.onSuccessHandler(event)} 
                            disabled = {this.state.isSubmitDisabled}
                            
                        >
                            Add contact
                        </button>
                    </form>
                </fieldset>
            </div>
        );
    }
};



export default ContactForm;