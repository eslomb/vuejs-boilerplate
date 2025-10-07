import Cookies from "js-cookie"; // https://github.com/js-cookie/js-cookie

export function getCookie(name) {
    return Cookies.get(name);
}
export function setCookie(name, value, options) {    
    Cookies.set(name, value, options);
}
export function removeCookie(name) {
    Cookies.remove(name);
}

