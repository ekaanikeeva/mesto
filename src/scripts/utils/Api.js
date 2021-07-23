
export class Api {
    constructor ({baseUrl, headers}) {

        this.baseUrl = baseUrl;
        this.headers = headers;

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

    addCard (item) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: item.name,
                link: item.link
              }) })
            .then(res => {
                if (res.ok) return res.json();
                else return Promise.reject(res.status);
              })
              
              .catch((err) => {
                  console.log(err)
              })   
    }

}