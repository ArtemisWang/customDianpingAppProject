import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './style.css'

class LoginHeader extends Component {
    render() {
        return (
            <div>
                <Link to='/' className="loginHeader__back"></Link>
                <div className="loginHeader__title">账号密码登录</div>
            </div>
        );
    }
}

export default LoginHeader;