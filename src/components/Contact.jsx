import React from 'react';

const Contact = (props) => (
    <li className={'list-group-item list-group-item-action list-group-item-' + (props.id % 2 === 1 ? 'secondary': 'primary')} 
        onClick={() =>{ 
            if (confirm('Are You sure?')) {
                props.removeContact(props.user.id)
            } else {
                return
            }
        }} 
    >
        { props.user.name } { props.user.surname } ({ props.user.phone })
    </li>
);

export default Contact;