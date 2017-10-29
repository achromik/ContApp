import React from 'react';

const Contact = (props) => (
    <li className={'list-group-item list-group-item-action ' + (props.id % 2 === 1 ? 'list-group-item-secondary': 'list-group-item-primary')  }>{ props.user.name } { props.user.surname } ({ props.user.phone })</li>
);

export default Contact;