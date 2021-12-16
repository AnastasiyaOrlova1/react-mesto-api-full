import success from '../images/success.svg';
import fail from '../images/fail.svg';

function InfoTooltip(props) {

    return (
        <div className={`popup ${props.status && 'popup_opened'}`}>
            <div className='popup__container popup__container_img'>
            <button className='popup__close-button' type='button' id='close-edit-popup' onClick={props.onClose} />
                <img
                    className='popup__img-status'
                    src={`${props.status === 'success' ? success : fail}`} alt={`${props.status === 'success' ? 'Успешная регистрация' : 'Ошибка'}`} />
                <h2 className='popup__title'>{`${props.status === 'success' ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}`}</h2>
            </div>


        </div>
    )
}

export default InfoTooltip;