import React from 'react';

const Contact = (props) => (
    <li className="list-group-item">{ props.user.name } { props.user.surname } ({ props.user.phone })</li>
);

export default Contact;