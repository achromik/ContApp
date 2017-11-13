import React from 'react';
import swal from 'sweetalert';
import ContactDetail from './ContactDetail.jsx'
import ReactDOM from 'react-dom';

import isValidPhoneNumber from './extras';
import Modal from './Modal.jsx';

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
        <i className='text-danger fa fa-trash-o'></i>
    </div>
);

const ButtonEdit = (props) => (
    <div className='text-info button d-inline-block ml-3'   
        onClick={props.handleSelectItemEdit}>
        <i className='fa fa-pencil'></i>
    </div>
);

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editedContact : {
                id: this.props.user.id,
                name: this.props.user.name,
                surname: this.props.user.surname,
                phone: this.props.user.phone
            },
            showModal: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleHideContactInfoModal= this.handleHideContactInfoModal.bind(this);
        this.handleHideContactEditModal= this.handleHideContactEditModal.bind(this);
    }

    handleChange(object) {
        this.setState({
             editedContact: object   
        });
    } 

    isEditHandler() {
        if(this.props.isEditItem) {
            return ( 
                <Modal>
                    <ContactDetail 
                        modeEdit={true}
                        contact={this.state.editedContact}
                        onChange ={this.handleChange}
                        changedContact={this.changedContact}
                        onCloseModal ={this.handleHideContactEditModal}
                        onSave = {this.props.editContact}
                    />
                </Modal>
            )
        } 
    } 

    handleHideContactEditModal() {
        const el = document.querySelector('.Modal'); 
        el.style.opacity = 0;
        el.firstChild.style.opacity = 0;
        setTimeout(() => {
            this.props.handleSelectItemEdit(-1);
        }, 300);
    }

    handleHideContactInfoModal()  {
        const el = document.querySelector('.Modal'); 
        el.style.opacity = 0;
        el.firstChild.style.opacity = 0;
        setTimeout(() => {
            this.setState({ showModal: false})
        }, 300);
    }
    
    render () {
        const modal = this.state.showModal ? ( 
            <Modal>
                <ContactDetail 
                    onCloseModal={this.handleHideContactInfoModal}   
                    contact={this.props.user}
                />
            </Modal>
        ) : null;

        return (
            <div 
                className={' opacity-75 list-group-item list-group-item-action list-group-item-' + (this.props.id % 2 === 1 ?          'secondary': 'dark')}
                ref = {(div) => this.contactItem = div}
            >
                {this.isEditHandler()} 
                <div className='d-flex justify-content-between'>
                    <p className='font-weight-bold d-inline-block w-75 mb-0'
                        onClick = { () => this.setState({ showModal: true})}
                    >
                        {this.props.user.name + ' ' + this.props.user.surname + ' '}
                        <span className='font-weight-light font-italic ml-2'>
                            {this.props.user.phone }
                        </span>
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
                    {modal}
                </div>
            </div>
        );
    }
}

export default Contact;