import React, { Component } from 'react'
import { Navigate } from 'react-router';

export class LogOut extends Component {
    state = {
        redirect: false,
    };

    componentDidMount() {
        localStorage.setItem("userToken", '');
        localStorage.clear();
        this.setState({ redirect: true });
    }

    render() {
        return this.state.redirect ?
            <Navigate to={'/'} /> :
            null;
    }
}

export default LogOut
