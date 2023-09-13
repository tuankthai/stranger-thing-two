
export function login(token) {

    localStorage.setItem("token", token);
    console.log("local store token is ", localStorage.getItem("token"))

}

export function logout() {
    
    localStorage.setItem("token", "");
    console.log("local store token is ", localStorage.getItem("token"))

}

export  function getAuthToken() {
    return localStorage.getItem("token");

}

export default function isLoggedIn() {
    if (localStorage.getItem("token").length) {
        return true;
    }

}
