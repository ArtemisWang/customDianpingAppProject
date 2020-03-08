import React, { Component } from 'react';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';

class Login extends Component {
    render() {
        return (
            <div>
                <LoginHeader/>
                <LoginForm/>
            </div>
        );
    }
}

export default Login;