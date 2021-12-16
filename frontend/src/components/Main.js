import React, { useContext } from 'react';
import Card from './Card.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

    const currentUser = useContext(CurrentUserContext);


    return (
        <main className="content">
            <section className="profile">
                <div className="profile__wrapper-avatar">
                    <img src={currentUser.avatar} alt="Профиль" className="profile__avatar" />
                    <button className="profile__edit-avatar" onClick={props.onEditAvatar} />
                </div>
                <div className="profile__wrapper">
                    <div className="profile__wrapper-text">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__button-edit" type="button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button className="profile__button-add" type="button" onClick={props.onAddPlace} />
            </section>

            <section className="galery">
                {props.cards.map((item) => {
                    return (<Card card={item} key={item._id} onCardClick={props.onCardClick} onCardDelete={props.onCardDelete} onRemoveCard={props.onRemoveCard} onCardLike={props.onCardLike}
                    />)
                })}
            </section>
        </main>
    )
}
export default Main;
