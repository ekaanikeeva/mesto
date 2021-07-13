export class UserInfo {
    constructor (userName, userStatus) {
        this.userName = userName;
        this.userStatus = userStatus;
    }

    // данные для отображения в попапе
    getUserInfo () {
        const userInfo = {
            name: this.userName.textContent,
            status: this.userStatus.textContent
        }
        return userInfo;
    }

    // данные для отправки на страницу
    setUserInfo ({name, status}) {
        this.userName.textContent = name;
        this.userStatus.textContent = status;
    }
}