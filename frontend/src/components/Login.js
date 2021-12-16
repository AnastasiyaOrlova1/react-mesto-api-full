import React, { useState } from 'react';
import AuthUser from './AuthUser';


function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    function handleInputEmail(e) {
        setEmail(e.target.value);
    }

    function handleInputPassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
    e.preventDefault();
      props.onLogin({password, email})
    }


    return (
        <AuthUser
            onSubmit={handleSubmit}
            valueEmail={email}
            valuePassword={password}
            changeEmail={handleInputEmail}
            changePassword={handleInputPassword}
            name='sign-in'
            title='Вход'
            textButton='Войти'>
        </AuthUser>
    )
}

export default Login
