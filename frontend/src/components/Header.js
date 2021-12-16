import React from 'react';
import projectLogo from '../images/logo.svg';
import { Route, Link } from 'react-router-dom';

function Header(props) {
    return (
        <header className='header' >
            <img src={projectLogo} alt='Логотип' className='header__logo' />
            <Route exact path='/sign-in'>
            <Link className='header__link' to='/sign-up'>Зарегистрироваться</Link>
            </Route>
            <Route exact path='/sign-up'>
            <Link className='header__link' to='/sign-in'>Войти</Link>
            </Route>
            <Route exact path='/'>
            <p className='header__text'>{props.email}<Link className='header__link' to='/sign-in' onClick={props.onSignOut}>Выйти</Link></p> 
            </Route>
        </header>
    )
}
export default Header;