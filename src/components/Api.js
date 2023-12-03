export default class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _checkResponse(response) {
      if (response.ok) {
          return response.json();
      }
      return Promise.reject(`Ошибка ${response.status}`);
    }

    _sendRequest(endpoint, options) {
        return fetch(`${this._url}${endpoint}`, options)
            .then(this._checkResponse);
    }

    getAllCards() {
        return this._sendRequest(`/cards`, {
            method: "GET",
            headers: this._headers,
        });
    }

    getApiUserInfo() {
        return this._sendRequest(`/users/me`, {
            method: "GET",
            headers: this._headers,
        });
    }

    editApiProfile(name, about) {
        return this._sendRequest(`/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        });
    }

    editAvatar(avatarUrl) {
        return this._sendRequest(`/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarUrl
            })
        });
    }

    addNewCardApi(name, link) {
        return this._sendRequest(`/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link,
            })
        });
    }

    changeLikeStatus(cardId, isLiked) {
        const method = !isLiked ? 'PUT' : 'DELETE';
        return this._sendRequest(`/cards/${cardId}/likes`, {
            method: method,
            headers: this._headers,
        });
    }

    deleteCardApi(cardId) {
        return this._sendRequest(`/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        });
    }
};
