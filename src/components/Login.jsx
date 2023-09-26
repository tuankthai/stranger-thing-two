
import React from "react"
import { useState } from "react"
import './Login.css'

const cohortName = "2302-acc-pt-web-pt-e";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

import { useNavigate } from "react-router-dom";
import Nav from './Nav'
import Register from './Register'
// import { loginUser } from './API';

export default function Login({ setToken }) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [errormsg, setErrormsg] = useState(null)
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("hello login handleSubmit")
        if (localStorage.getItem("token")) {
            console.log("you ")
        }

        try {
            //my code START HERE.....

            const playerObj = {
                user: {

                    username: username,
                    password: password
                }
            };

            console.log("before fetching: ", playerObj);

            const response = await fetch(`${BASE_URL}/users/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // body: JSON.stringify( playerObj ),
                    body: JSON.stringify(
                        {
                            user:
                            {
                                username: `${username}`,
                                password: `${password}`
                            }
                        }
                    ),
                }
            );
            console.log("response: ", response)

            const result = await response.json();
            console.log("after json: result", result);

            console.log("after json: result.data ", result.data);
            console.log("after json: result.data.token ", result.data.token);
            //update token

            setToken(result.data.token);
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("username", username);
            
            //my code END HERE.....
            
            console.log("local store token is ", localStorage.getItem("token"))

            //clear input form fields
            setUsername("")
            setPassword("")

            //navigate to UserProfile page
            navigate(`/Profile?src=profile`);

        } catch (error) {
            console.log("error: ", error)
            setError(error.message)
            setErrormsg("Please sign up.  You don't have an account.")
        }
    }

    return (
        <div>
            <Nav />

        

        <div className="login_page_div">
                <h3 id="form-h3">Login:</h3><br></br>
                {/* <h1 >Login:</h1><br></br> */}

            <form onSubmit={handleSubmit}>
                <label htmlFor="username"> User Name: </label><br />

                <input value={username}
                    onChange={(e) => { setUsername(e.target.value) }}
                    type="text" name="username" id="username"
                    placeholder="username" required
                /><br /><br />               
                
                <label htmlFor="password"> Password: </label><br />
                <input value={password} onChange={(e) => { setPassword(e.target.value) }}
                    type="text" name="password" id="password" placeholder="password" required
                /><br /><br />               
                
                <button >Login</button>

            </form>

            <a href="/Register" id="signup">Don't have an account? Sign Up</a>
            <br /><br />
            
            <h4>{errormsg}</h4>

        </div>
        </div>
    )
}
