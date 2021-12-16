import React from 'react';
import {Link} from 'react-router-dom';


function AuthUser(props) {
    return (
        <form className='auth' name={props.name} onSubmit={props.onSubmit} noValidate>
        <h2 className='auth__title'>{props.title}</h2>
        <input  type="email" className="auth__input" name="email" value={props.valueEmail} id="email" placeholder="Email" required onChange={props.changeEmail} />
        <span id="email-error" className="error"></span>
        <input type="password" className="auth__input" name="password" value={props.valuePassword} id="password" autocomplete="current-password" placeholder="Пароль" required onChange={props.changePassword} />
        <span id="password-error" className="error"></span>
        <button className='auth__button' type='submit'>{props.textButton}</button>
        {props.name === 'sign-up'? <p className='auth__text'> Уже зарегистрированы?<Link className='auth__link' exact to='/sign-in'> Войти</Link></p> :''}
    </form>
    )
}

export default AuthUser;
