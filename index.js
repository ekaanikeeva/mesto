(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e){var n=e.data,r=e.userId,o=e.cardSelector,i=e.handleCardClick,a=e.handleLikeClick,c=e.handleDeleteIconClick;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=n.name,this._link=n.link,this._id=n.id,this._cardSelector=o,this._handleCardClick=i,this._handleLikeClick=a,this._handleDeleteIconClick=c,this._likes=n.likes,this._creatorId=n.owner._id,this._userId=r,this._activeLike=this._activeLike.bind(this),this._removeLike=this._removeLike.bind(this),this.deletePhotoElement=this.deletePhotoElement.bind(this),this.setLike=this.setLike.bind(this),this._hiddenBasket=this._hiddenBasket.bind(this)}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".figure").cloneNode(!0)}},{key:"_activeLike",value:function(){this._likeButton.classList.add("figure__like_active")}},{key:"_removeLike",value:function(){this._likeButton.classList.remove("figure__like_active")}},{key:"deletePhotoElement",value:function(){this._element.remove()}},{key:"_hiddenBasket",value:function(e){void 0!==this._creatorId&&null!==this._creatorId&&this._creatorId&&this._creatorId!==e&&this._deleteButton.classList.add("figure__basket_hide")}},{key:"setLike",value:function(e){var t=this;return this.isLiked=e.filter((function(e){return e._id===t._userId})).length>0,this.isLiked?this._activeLike():this._removeLike(),this._likeCounter.textContent=e.length,0===e.length&&(this._likeCounter.textContent=""),this.isLiked}},{key:"_setEventListeners",value:function(){var e=this;this._likeButton.addEventListener("click",(function(t){t.target.classList.contains("figure__like_active")?e._handleLikeClick(!0):e._handleLikeClick(!1)})),this._deleteButton.addEventListener("click",(function(){e._handleDeleteIconClick(e._id)})),this._picture.addEventListener("click",(function(){e._handleCardClick()}))}},{key:"createPhotoCard",value:function(e){return this._element=this._getTemplate(),this._likeButton=this._element.querySelector(".figure__like"),this._deleteButton=this._element.querySelector(".figure__basket"),this._likeCounter=this._element.querySelector(".figure__like-counter"),this._picture=this._element.querySelector(".figure__pic"),this._pictureName=this._element.querySelector(".figure__name"),this._setEventListeners(),this._hiddenBasket(e),this.setLike(this._likes),this._picture.src=this._link,this._picture.alt=this._name,this._pictureName.textContent=this._name,this._element}}])&&e(n.prototype,r),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formElement=t,this._formSelector=n.formSelector,this._inputSelector=n.inputSelector,this._buttonElement=n.buttonSelector,this._buttonElementInactiveClass=n.inactiveButtonClass,this._inputErrorClass=n.inputErrorClass,this._errorClass=n.errorClass}var t,r;return t=e,(r=[{key:"_showInputError",value:function(e,t){var n=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.add(this._inputErrorClass),n.textContent=t,n.classList.add(this._errorClass)}},{key:"_removeInputError",value:function(e){var t=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._inputErrorClass),t.textContent="",t.classList.remove(this._errorClass)}},{key:"_inputValidity",value:function(e){e.validity.valid?this._removeInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_hasInvalidInput",value:function(e){return e.some((function(e){return!e.validity.valid}))}},{key:"_toggleBtnCondition",value:function(e,t){this._hasInvalidInput(e)?(t.classList.add(this._buttonElementInactiveClass),t.disabled=!0):(t.classList.remove(this._buttonElementInactiveClass),t.disabled=!1)}},{key:"inactiveButton",value:function(e){e.classList.add(this._buttonElementInactiveClass),e.disabled=!0}},{key:"_setEventListeners",value:function(){var e=this,t=Array.from(this._formElement.querySelectorAll(this._inputSelector)),n=this._formElement.querySelector(this._buttonElement);this._toggleBtnCondition(t,n),t.forEach((function(r){r.addEventListener("input",(function(){e._inputValidity(r),e._toggleBtnCondition(t,n)}))})),this._formElement.addEventListener("reset",(function(){e.inactiveButton(n),t.forEach((function(t){e._removeInputError(t)}))}))}},{key:"enableValidation",value:function(){this._formElement.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}}])&&n(t.prototype,r),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=r,this._renderer=o,this._container=n}var t,n;return t=e,(n=[{key:"addItem",value:function(e){this._container.append(e)}},{key:"addCard",value:function(e){this._container.prepend(e)}},{key:"renderItems",value:function(){var e=this;this._items.forEach((function(t){e._renderer(t)}))}}])&&o(t.prototype,n),e}();function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupElement=t,this._handleEscClose=this._handleEscClose.bind(this),this._closeByAir=this._closeByAir.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popupElement.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popupElement.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_closeByAir",value:function(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__btn-close"))&&this.close()}},{key:"setEventListeners",value:function(){this._popupElement.addEventListener("click",this._closeByAir)}}])&&a(t.prototype,n),e}();function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e,t,n){return(f="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=d(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function h(e,t){return(h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var _=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=d(r);if(o){var n=d(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return p(this,e)});function a(){return u(this,a),i.apply(this,arguments)}return t=a,(n=[{key:"open",value:function(e){var t=e.name,n=e.link;f(d(a.prototype),"open",this).call(this);var r=this._popupElement.querySelector(".popup__img"),o=this._popupElement.querySelector(".popup__name");r.src=n,r.alt=t,o.textContent=t}}])&&l(t.prototype,n),a}(c);function y(e){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(e,t,n){return(v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=E(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function b(e,t){return(b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function k(e,t){return!t||"object"!==y(t)&&"function"!=typeof t?g(e):t}function g(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function E(e){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var S=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&b(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=E(r);if(o){var n=E(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return k(this,e)});function a(e){var t,n=e.popupElement,r=e.submitCallback;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,n)).buttonSubmit=n.querySelector(".form__btn-save"),t._submitCallback=r,t._formElement=n.querySelector(".form"),t.buttonSubmitChangeText=t.buttonSubmitChangeText.bind(g(t)),t}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;return this._inputList=this._formElement.querySelectorAll(".form__info"),this.inputValue={},this._inputList.forEach((function(t){e.inputValue[t.name]=t.value})),this.inputValue}},{key:"setEventListeners",value:function(){var e=this;v(E(a.prototype),"setEventListeners",this).call(this),this._formElement.addEventListener("submit",(function(t){t.preventDefault(),e._submitCallback(e._getInputValues())}))}},{key:"buttonSubmitChangeText",value:function(){console.log(this._buttonSubmit),this._buttonSubmit.textcontent="Сохранение..."}},{key:"close",value:function(){v(E(a.prototype),"close",this).call(this),this._formElement.reset()}}])&&m(t.prototype,n),a}(c);function C(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var L=function(){function e(t,n,r,o){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userName=t,this._userStatus=n,this._profileAvatar=r,this.id=o}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._userName.textContent,status:this._userStatus.textContent}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.status;this._userName.textContent=t,this._userStatus.textContent=n}},{key:"setUserAvatar",value:function(e){this._profileAvatar.src=e}},{key:"setUserId",value:function(e){this.id=e}}])&&C(t.prototype,n),e}();function w(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var O=function(){function e(t){var n=t.baseUrl,r=t.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.baseUrl=n,this.headers=r,this.cardId=this.cardId}var t,n;return t=e,(n=[{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject(e.status)}},{key:"getInitialCards",value:function(){return fetch("".concat(this.baseUrl,"/cards"),{method:"GET",headers:this.headers}).then(this._checkResponse)}},{key:"getUserInfo",value:function(){return fetch("".concat(this.baseUrl,"/users/me "),{method:"GET",headers:this.headers}).then(this._checkResponse)}},{key:"setUserInform",value:function(e){return fetch("".concat(this.baseUrl,"/users/me "),{method:"PATCH",headers:this.headers,body:JSON.stringify({name:e.name,about:e.status})}).then(this._checkResponse)}},{key:"addCard",value:function(e){return fetch("".concat(this.baseUrl,"/cards"),{method:"POST",headers:this.headers,body:JSON.stringify({name:e.title,link:e.link})}).then(this._checkResponse)}},{key:"postLike",value:function(e){return fetch("".concat(this.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:this.headers}).then(this._checkResponse)}},{key:"deleteLike",value:function(e){return fetch("".concat(this.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:this.headers}).then(this._checkResponse)}},{key:"deleteCard",value:function(e){return fetch("".concat(this.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this.headers}).then(this._checkResponse)}},{key:"changeAvatar",value:function(e){return fetch("".concat(this.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this.headers,body:JSON.stringify({avatar:e})}).then(this._checkResponse)}}])&&w(t.prototype,n),e}(),I=document.querySelector(".popups"),P=document.querySelector(".profile"),j=(Array.from(I.querySelectorAll(".popup")),document.querySelector(".figures")),q=P.querySelector(".profile__edit-btn"),R=document.querySelector(".popup_type_edit"),B=P.querySelector(".profile__add-btn"),U=document.querySelector(".popup_type_add-card"),x=document.querySelector(".popup_type_delete-card"),T=document.querySelector(".popup_type_photo"),A=(Array.from(I.querySelectorAll(".popup__btn-close")),U.querySelector(".form__btn-save"),document.querySelector(".profile__change-avatar-btn")),D=(I.querySelector(".popup__img"),document.querySelector(".popup_type_change-avatar")),V=(I.querySelector(".popup__name"),document.querySelector(".profile__name")),N=document.querySelector(".profile__status"),J=document.querySelector(".profile__avatar"),G=document.querySelector("#photo-card"),H=(document.querySelector("figure__basket"),document.forms.edit),M=document.forms.add,z=document.forms.avatar,$=(document.forms.delete,H.elements.name),F=H.elements.status,K=(M.elements.title,M.elements.link,{formSelector:".form",inputSelector:".form__info",buttonSelector:".form__btn-save",inactiveButtonClass:"form__btn-save_inactive",inputErrorClass:"form__info_type_error",errorClass:".form__input-error_active"});function Q(e){return(Q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function W(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function X(e,t,n){return(X="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=te(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function Y(e,t){return(Y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function Z(e,t){return!t||"object"!==Q(t)&&"function"!=typeof t?ee(e):t}function ee(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function te(e){return(te=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var ne=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Y(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=te(r);if(o){var n=te(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return Z(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e)).buttonSubmit=e.querySelector(".form__btn-save"),t._formElement=e.querySelector(".form"),t.setSubmit=t.setSubmit.bind(ee(t)),t._handleSubmitCallback=t.setSubmit,t}return t=a,(n=[{key:"open",value:function(e){X(te(a.prototype),"open",this).call(this),this._id=e}},{key:"setSubmit",value:function(e){return this._handleSubmitCallback=e}},{key:"setEventListeners",value:function(){var e=this;X(te(a.prototype),"setEventListeners",this).call(this),this._formElement.addEventListener("submit",(function(t){t.preventDefault(),e._handleSubmitCallback(e._id)}))}}])&&W(t.prototype,n),a}(c);function re(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var oe=new r(H,K),ie=new r(M,K),ae=new r(z,K);oe.enableValidation(),ie.enableValidation(),ae.enableValidation();var ce=new O({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-26",headers:{authorization:"afc7dc1f-babd-4dc3-b15d-b745eab59c3f","Content-Type":"application/json"}}),se=function(e){e.textContent="Сохранение..."},ue=function(e,n,r,o,i,a){var c=new t({data:{name:e,link:n,id:o,likes:i,owner:r},userId:a,cardSelector:"#".concat(G.id),handleCardClick:function(){de.open({name:e,link:n})},handleLikeClick:function(e){1==e?ce.deleteLike(o).then((function(e){return c.setLike(e.likes)})).catch((function(e){console.log("Лайк не удален ".concat(e))})):0==e?ce.postLike(o).then((function(e){return c.setLike(e.likes)})).catch((function(e){console.log("Не удалось поставить лайк ".concat(e))})):console.log("проблема с лайком")},handleDeleteIconClick:function(e){le.buttonSubmit.textContent="Да",le.open(e),le.setSubmit((function(){le.buttonSubmit.textContent="Удаление...",ce.deleteCard(e).then((function(){c.deletePhotoElement(),le.close()})).catch((function(e){console.log("Не удалось удалить карточку ".concat(e))}))}))}});return c.createPhotoCard(a)},le=new ne(x);le.setEventListeners();var fe=new L(V,N,J),he=[],pe=null;Promise.all([ce.getInitialCards(),ce.getUserInfo()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,c=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(c)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return re(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?re(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],a=r[1];console.log("Информация о пользователе получена с сервера."),console.log(a);var c=a.name,s=a.about,u=a.avatar,l=a._id;fe.setUserInfo({name:c,status:s}),fe.setUserAvatar(u),fe.setUserId(l),he=o.map((function(e){return e})),pe=new i({items:he,renderer:function(e){var t=e.name,n=e.link,r=e._id,o=e.likes,i=e.owner,c=a._id;pe.addItem(ue(t,n,i,r,o,c))}},j),console.log(he),pe.renderItems()})).catch((function(e){console.log("Не удалось загрузить информацию с сервера ".concat(e))}));var de=new _(T),_e=new S({popupElement:R,submitCallback:function(e){se(_e.buttonSubmit),ce.setUserInform(e).then((function(e){var t=e.name,n=e.about;fe.setUserInfo({name:t,status:n}),_e.close()})).catch((function(e){console.log("Не удалось обновить данные пользователя ".concat(e))}))}}),ye=new S({popupElement:D,submitCallback:function(e){var t=e.link;se(ye.buttonSubmit),ce.changeAvatar(t).then((function(){fe.setUserAvatar(t),ye.close()})).catch((function(e){console.log("Не удалось сменить аватар пользователя ".concat(e))}))}}),me=new S({popupElement:U,submitCallback:function(e){se(me.buttonSubmit),ce.addCard(e).then((function(e){console.log(e);var t=e.name,n=e.link,r=e._id,o=e.owner,i=e.likes;pe.addCard(ue(t,n,o,r,i,fe.id)),me.close()})).catch((function(e){console.log("Не удалось добавить картинку на страницу ".concat(e))}))}});me.setEventListeners(),de.setEventListeners(),_e.setEventListeners(),ye.setEventListeners(),q.addEventListener("click",(function(){_e.open(),$.value=fe.getUserInfo().name,F.value=fe.getUserInfo().status,_e.buttonSubmit.textContent="Сохранить"})),B.addEventListener("click",(function(){me.open(),me.buttonSubmit.textContent="Создать"})),A.addEventListener("click",(function(){ye.open(),ye.buttonSubmit.textContent="Сохранить"}))})();