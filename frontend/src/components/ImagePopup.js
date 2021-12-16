import React from 'react';


function ImagePopup(props) {
    return (
        <div className={`popup ${props.card.link.length && 'popup_opened'}`} >
            <div className="popup__image-container" >
                <figure className="popup__figure" >
                    <img src={props.card.link} alt={props.card.name} className="popup__image" />
                    <figcaption className="popup__caption" > {props.card.name} </figcaption>
                </figure>
                <button className="popup__close-button"
                    type="button"
                    id="close-image-popup"
                    onClick={props.onClose} />
            </div>
        </div>
    )
}
export default ImagePopup;