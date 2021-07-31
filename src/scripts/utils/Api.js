
export class Api {
    constructor ({baseUrl, headers}) {

        this.baseUrl = baseUrl;
        this.headers = headers;

        this.cardId = this.cardId;
    }

    // получение карточек с сервера
    getInitialCards () {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: this.headers })
            .then(res => {
                if (res.ok) return res.json();
                else return Promise.reject(res.status);
              })
              
              .catch((err) => {
                  console.log(err)
              })   
}

    // получить информацию пользователя с сервера
    getUserInfo () {
        return fetch(`${this.baseUrl}/users/me `, {
            method: 'GET',
            headers: this.headers })
            .then(res => {
                if (res.ok) return res.json();
                else return Promise.reject(res.status);
              })

              .catch((err) => {
                  console.log(err)
              })    
    }

    //отправить новую информацию пользователя
    setUserInform (item) {
        {
            return fetch(`${this.baseUrl}/users/me `, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    name: item.name,
                    about: item.status
                  })
                })
                .then(res => {
                    if (res.ok) return res.json();
                    else return Promise.reject(res.status);
                  })
    
                  .catch((err) => {
                      console.log(err)
                  })    
        }
    }

    // отправить добавленную карточку на сервер
    addCard (item) {

        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: item.title,
                link: item.link
              }) 
            })
            .then(res => {
                if (res.ok) return res.json();
                else return Promise.reject(res.status);
              })

              .catch((err) => {
                  console.log(err)
              })   
    }


    // отправить лайк карточки на сервер
    postLike (cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.headers
            })
            .then(res => {
                if (res.ok) return res.json();
                else return Promise.reject(res.status);
              })
              
              
              .catch((err) => {
                  console.log(err)
              })   
    }

      // удалить лайк карточки с сервера
      deleteLike (cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
            })
            .then(res => {
                if (res.ok) return res.json();
                else return Promise.reject(res.status);
              })
              
              
              .catch((err) => {
                  console.log(err)
              })   
    }

    // удалить карточку с сервера
    deleteCard (cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(res => {
            if (res.ok) return res.json();
            else return Promise.reject(res.status);
        })
        .catch((err) => {
            console.log(err)
        }) 
    }  

    // сменить аватар
    changeAvatar (link) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({avatar: link}) 
        })
        .then(res => {
            if (res.ok) return res.json();
            else return Promise.reject(res.status);
        })
        .catch((err) => {
            console.log(err)
        }) 
    }
}