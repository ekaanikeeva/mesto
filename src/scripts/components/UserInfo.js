export class UserInfo {
    constructor (userName, userStatus, userAvatar, id) {
        this._userName = userName;
        this._userStatus = userStatus;
        this._profileAvatar = userAvatar;
        this.id = id;

    }

    // данные для отображения в попапе
    getUserInfo () {
        const userInfo = {
            name: this._userName.textContent,
            status: this._userStatus.textContent
        }
        return userInfo;
    }

    // данные для отправки на страницу
    setUserInfo ({name, status}) {
        this._userName.textContent = name;
        this._userStatus.textContent = status;
    }

    setUserAvatar (avatar) {
        this._profileAvatar.src = avatar;
    }

    setUserId (id) {
        this.id = id;
    }
}