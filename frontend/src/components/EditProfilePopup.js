import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function changeName(e) {
    setName(e.target.value);
  }

  function changeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="edit-profile-form"
      title="Редактирование профиля"
      textButton="Сохранить"
    >
      <input
        type="text"
        /*defaultValue={name}*/
        value={name || ""}
        className="popup__input"
        name="name"
        id="name"
        required
        minLength="2"
        maxLength="40"
        onChange={changeName}
      />
      <span id="name-error" className="error"></span>
      <input
        type="text"
        /*defaultValue={description}*/
        value={description || ""}
        className="popup__input"
        name="about"
        id="about-me"
        required
        minLength="2"
        maxLength="200"
        onChange={changeDescription}
      />
      <span id="about-me-error" className="error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;