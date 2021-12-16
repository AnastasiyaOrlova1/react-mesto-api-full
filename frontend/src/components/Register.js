import React, { useState } from 'react';
import AuthUser from './AuthUser';


function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

 
    function handleInputEmail(e) {
        setEmail(e.target.value);
    }

    function handleInputPassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e){
   
        e.preventDefault();
        props.onRegister(email, password);
      }

    return (
        <AuthUser
        onSubmit={handleSubmit}
        valueEmail={email}
        valuePassword={password}
        changeEmail={handleInputEmail}
        changePassword={handleInputPassword}
        name='sign-up'
        title='Регистрация'
        textButton='Зарегистрироваться'>
    </AuthUser>
    )
}

export default Register;
