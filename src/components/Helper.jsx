
export function login(token) {

    localStorage.setItem("token", token);
    console.log("local store token is ", localStorage.getItem("token"))

}
 
export function logout() {  
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    console.log("local store token is ", localStorage.getItem("token"))
}

export function getAuthToken() {
    return localStorage.getItem("token");
}

export function getUsername() {
    return localStorage.getItem("username");
}

export default function isLoggedIn() {
    if (localStorage.getItem("token")) {
        return true;
    } else
    { return false }

}  
