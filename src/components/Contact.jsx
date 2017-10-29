import React from 'react';
import swal from 'sweetalert';

const Contact = (props) => (
    <div className={'list-group-item list-group-item-action list-group-item-' + (props.id % 2 === 1 ? 'secondary': 'primary')} 
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
                props.removeContact(props.user.id);
                swal({
                    title: "Your contact is deleted!",
                    icon: 'success' });    
            } else {
                swal("Your contact is safe!");
            }
        })
    }}
    >
        { props.user.name } { props.user.surname } ({ props.user.phone })
    </div>
);

export default Contact;