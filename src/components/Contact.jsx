import React from 'react';
import swal from 'sweetalert';

const ButtonDelete = (props) => (
    <div className='rounded-circle d-inline-block ml-3'
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
    <div className='rounded-circle d-inline-block ml-3'>
        <i className='fa fa-pencil'></i>
    </div>
);

const Contact = (props) => (
    <div className={'d-flex justify-content-between list-group-item list-group-item-action list-group-item-' + (props.id % 2 === 1 ? 'secondary': 'dark')} 
        
    >
        { props.user.name } { props.user.surname } ({ props.user.phone })
        <div className='d-inline-block'>
            <ButtonEdit 
                id = {props.user.id}
                
            />
            <ButtonDelete 
                id = {props.user.id}
                removeContact={props.removeContact}
            />
        </div>
    </div>
);



export default Contact;