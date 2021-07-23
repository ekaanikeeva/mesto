// import { profileAvatar } from "../utils/constants";

export class UserInfo {
    constructor (userName, userStatus, userAvatar, id) {
        this.userName = userName;
        this.userStatus = userStatus;
        this.profileAvatar = userAvatar;
        this.id = id;

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

    setUserAvatar (avatar) {
        this.profileAvatar.src = avatar;
    }

    setUserId (id) {
        this.id = id;
    }
}