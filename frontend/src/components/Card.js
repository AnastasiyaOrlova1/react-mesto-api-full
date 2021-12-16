import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = props.card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `${isOwn ? 'galery__card-remove' : 'galery__card-remove_hidden'}`
    );

    const isLiked = props.card.likes.some((likes) => likes === currentUser._id);
    const cardLikeButtonClassName = `galery__card-like ${isLiked ? 'galery__card-like_active' : ''}`;

    function handleClick() {
        props.onCardClick({ name: props.card.name, link: props.card.link });
    }

    function handleLikeClick() {
        props.onCardLike(props.card)

    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    return (
        <div className="galery__card">
            <img src={props.card.link} alt={props.card.name} className="galery__card-image" onClick={handleClick} />
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <div className="galery__card-wrapper">
                <h2 className="galery__card-title">{props.card.name}</h2>
                <div className="galery__card-like-wrapper">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <p className="galery__card-like-number">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;