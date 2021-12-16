export const baseUrl = 'https://api.mesto.orlovas.nomoredomains.rocks/';

export const register = (email, password) => {
    return fetch(`${baseUrl}signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, email })
        })
        .then(checkResponse)
}

export const authorize = ({ password, email }) => {
    return fetch(`${baseUrl}signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, email })
        })
        .then(checkResponse)
};

export const checkToken = (token) => {
    return fetch(`${baseUrl}users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(checkResponse)
        .then(data => data)
}

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`)