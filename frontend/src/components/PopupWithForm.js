import React from 'react';


function PopupWithForm(props){
return(
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
    <form className={`popup__container`} name={props.name} onSubmit={props.onSubmit} /*noValidate*/>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button className="popup__save-button popup__button" type="submit">{props.textButton}</button>
        <button className="popup__close-button" type="button" id="close-edit-popup" onClick={props.onClose}/>
    </form>
</div>
)
}

export default PopupWithForm;