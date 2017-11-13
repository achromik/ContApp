import React, { Component } from 'react';
import ContactForm from './ContactForm';

import isValidPhoneNumber from './extras'

const ContactDetail = (props) => {
    let contact = props.contact;   
    return (
        <div className='Modal'>
            <fieldset>
                <form onChange={() => props.onChange(contact)}>
                    <div className = "form-group">
                        <label>Name:</label>
                        <input className = "form-control" 
                            value = {contact.name} 
                            readOnly = {!props.modeEdit}
                            onChange= {(e) => contact.name = e.target.value }
                        />
                    </div>
                    <div className = "form-group">
                        <label>Surname:</label>
                        <input className = "form-control" 
                            value = {contact.surname} 
                            readOnly = {!props.modeEdit}
                            onChange= {(e) => contact.surname = e.target.value }
                        />
                    </div>
                    <div className = "form-group">
                        <label>Phone:</label>
                        <input className = "form-control" 
                            value = {contact.phone} 
                            readOnly = {!props.modeEdit}
                            onChange= {(e) => contact.phone = e.target.value }
                        />
                    </div>
                    <div className='d-flex '>
                        {props.modeEdit ? 
                            <button type="button" 
                                className = "mx-auto btn btn-success"
                                onClick = {
                                    (e) => {
                                        props.onSave(contact);
                                        props.onCloseModal(); 
                                        swal({
                                            title: "Changes saved!",
                                            icon: 'success',
                                            buttons: false,
                                            timer: 1500
                                        });
                                    }
                                }
                                disabled = { 
                                    !(contact.name.trim() !== '' &&  isValidPhoneNumber(contact.phone))
                                }
                            >
                                Save
                            </button> :
                            null       
                        }
                        <button type="button" 
                            className = "mx-auto btn btn-danger" 
                            onClick = {
                                (e) => props.onCloseModal()
                            }
                        >
                            Close
                        </button>
                    </div>    
                </form>
            </fieldset>
        </div>
    );
}

export default ContactDetail;