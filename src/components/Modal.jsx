import React, { Component } from 'react';
import {createPortal}from 'react-dom';

class Modal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return createPortal(
            this.props.children,
            document.getElementById('modal-root')
        );
    }
}

export default Modal;