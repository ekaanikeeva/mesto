import { Popup } from "./Popup.js";

import {
    popupImgName, 
    popupImgPicture 
} from "../utils/constants.js"


export class PopupWithImage extends Popup {

    activePopup ({name, link}) {
        super.activePopup();
        popupImgPicture.src = link;
        popupImgPicture.alt = name;
        popupImgName.textContent = name;
    }
    
}