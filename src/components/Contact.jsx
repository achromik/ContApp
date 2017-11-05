import React from 'react';
import swal from 'sweetalert';

import validatePhoneNumber from './extras';

const ButtonDelete = (props) => (
    <div className='button d-inline-block ml-3'
        onClick={() =>{ 
            swal({
                title: 'Are you sure?',
                text: "Once deleted, you will not be able to recover this contact!",
                icon: "warning",
                dangerMode: true,
                buttons: {
                    cancel: {
                        text: "Cancel",
                        value: false,
                        visible: true,
                        className: "",
                        closeModal: true,
                    },
                    confirm: {
                        text: "Yes",
                        value: true,
                        visible: true,
                        className: "",
                        closeModal: true
                    }
                }
            })
            .then((value) => { 
                if(value) {
                props.removeContact(props.id);
                swal({
                    title: "Your contact is deleted!",
                    icon: 'success' });    
                } else {
                    swal("Your contact is safe!");
                }
            })
        }}
    >
        <i className='fa fa-trash-o'></i>
    </div>
);

const ButtonEdit = (props) => (
    <div className='button d-inline-block ml-3'   
        onClick={props.handleSelectItemEdit}>
        <i className='fa fa-pencil'></i>
    </div>
);

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // isEdit: this.props.isEditItem,
            editedContact : {
                id: this.props.user.id,
                name: this.props.user.name,
                surname: this.props.user.surname,
                phone: this.props.user.phone
            },
            isSubmitDisabled: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.isSubmitDisabled = this.isSubmitDisabled.bind(this)
        // this.handleSelectItemEdit = this.props.handleSelectItemEdit
    }

    handleChange() {
        this.setState({
            editedContact: {
                id: this.props.user.id,
                name : this.name.value,
                surname: this.surname.value,
                phone: this.phone.value
            }    
        });
    } 
    
    isSubmitDisabled(event) {
        this.setState({
            isSubmitDisabled: !(this.name.value.trim() !== '' &&  validatePhoneNumber(this.phone.value)) 
        });
    }

    isEditHandler() {
        if(this.props.isEditItem) {
            this.contactItem.classList.remove('list-group-item-secondary','list-group-item-dark','list-group-item-action','opacity-75'); 
            this.contactItem.className += ' mb-0 list-group-item-primary border border-danger';
            return (
                <form 
                    className='d-flex flex-column'
                    onChange = {this.isSubmitDisabled}               
                >
                    <div className='d-flex justify-content-between mb-3'>
                    <input className = "form-control w-30 d-inline"
                        type = 'text'
                        value = {this.state.editedContact.name}
                        ref = {(input) => this.name = input}
                        onChange = {this.handleChange}
                    />
                    <input className = "form-control w-30 d-inline"
                        type = 'text'
                        value = {this.state.editedContact.surname}
                        ref = {(input) => this.surname = input}
                        onChange = {this.handleChange}
                    />
                    <input className = "form-control w-30 d-inline"
                        type = 'text' 
                        value = {this.state.editedContact.phone}
                        ref = {(input) => this.phone = input}
                        onChange = {this.handleChange}
                    />
                    </div>
                    <div className='mx-auto'>
                        <button className='btn btn-success'
                            type='submit'
                            onClick= { (e) =>{
                                e.preventDefault();
                                this.props.handleSelectItemEdit(-1);
                                this.props.editContact(this.state.editedContact)
                            } }
                            disabled = {this.state.isSubmitDisabled}
                        >
                            Save changes
                        </button>
                        <button className='ml-4 btn btn-danger'
                            type='button'
                            onClick= { (e) =>{
                                e.preventDefault();
                                this.props.handleSelectItemEdit(-1);
                            } }
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )
        } else {
            if (this.contactItem) { 
                this.contactItem.classList.remove('list-group-item-primary','mb-0','border-danger','border'); 
                this.contactItem.className += ' opacity-75 list-group-item-action list-group-item-' + (this.props.id % 2 === 1 ? 'secondary': 'dark');
            }
            return (
                <div className='d-flex justify-content-between'>
                    <p className='d-inline-block w-75 mb-0'
                        onClick = { () => this.setState({isEdit: true})}
                    >
                        { this.props.user.name + ' ' + this.props.user.surname } ({ this.props.user.phone })
                    </p>
                    <div className='d-inline-block'>
                        <ButtonEdit 
                            id = {this.props.user.id}
                            handleSelectItemEdit = {() =>  this.props.handleSelectItemEdit(this.props.user.id)}
                        />
                        <ButtonDelete 
                            id = {this.props.user.id}
                            removeContact={this.props.removeContact}
                        />
                    </div>
                </div>
            )
        }
    } 
    
    render () {
        return (
            <div 
                className={' opacity-75 list-group-item list-group-item-action list-group-item-' + (this.props.id % 2 === 1 ?          'secondary': 'dark')}
                ref = {(div) => this.contactItem = div}
            >
                {this.isEditHandler()}
            </div>
        );
    }
}

export default Contact;