import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Register from './Register';
import Login from './Login';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [tooltipStatus, setTooltipStatus] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      api.getProfileInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.error(err);
        });

      api.getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            history.push('/');
          }
        })
        .catch((err) => console.log(err));
    }
  }, [history]);

  //LIKE CARD
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //DELETE CARD
  function handleCardDelete(deleteCard) {
    api.removeCard(deleteCard._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((card) => card._id !== deleteCard._id)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setTooltipStatus('');
  }
  function handleCardClick(Card) {
    setSelectedCard(Card);
  }

  function handleUpdateUser(formData) {
    api.editProfile(formData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateAvatar(formData) {
    api.updateAvatar(formData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //ADD CARD
  function handleAddPlaceSubmit(newCard) {
    api.postCard(newCard).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    });
  }

  //REGISTRATION
  function onRegister(email, password) {
    auth.register(email, password)
      .then((res) => {
        if (res._id) {
          setTooltipStatus('success');
          history.push('/sign-in');
        }
      })
      .catch((err) => setTooltipStatus('fail'));
  }

  //SIGN IN
  function onLogin({ password, email }) {
    auth.authorize({ password, email })
      .then((data) => {
        if (data.token) {
          setEmail(email);
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => setTooltipStatus('fail'));
  }

  //SIGN OUT

  function onSignOut() {
    localStorage.removeItem('jwt');
    setCurrentUser('');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path='/'
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            component={Main}
          ></ProtectedRoute>
          <Route exact path='/sign-up'>
            <Register onRegister={onRegister} />
          </Route>
          <Route exact path='/sign-in'>
            <Login onLogin={onLogin} />
          </Route>
        </Switch>
        <Footer />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <InfoTooltip status={tooltipStatus} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
