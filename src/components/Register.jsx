
import React from "react"
import { useState } from "react"
import './Login.css'

const cohortName = "2302-acc-pt-web-pt-e";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;
// const response = await fetch(`${BASE_URL}/api/${cohortName}/users/register`,


import Nav from './Nav'


export default function Register() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState("")
    const [error, setError] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errormsg, setErrormsg] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("hello register handleSubmit")
        //make sure password and confirm password are the same
        console.log("password = ", password);
        console.log("confirm password = ", confirmPassword);

        if (password.localeCompare(confirmPassword)) {
            setErrormsg("passwords do not match!!!");
            return;
        } 

        try {
            //need to read status field value. 

            const playerObj = {
                user: {

                    username: username,
                    password: password
                }
            };

            console.log("before fetching: ", playerObj);

            const response = await fetch(`${BASE_URL}/users/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // body: JSON.stringify( playerObj ),
                    body: JSON.stringify(
                        { user:

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
            console.log("local store token is ", localStorage.getItem("token"))

            //clear input form fields
            setUsername("")
            setPassword("")
            setConfirmPassword("")
            setErrormsg("You sign up successfully !!!");

        } catch (error) {
            console.log("error: ", error)
            setError(error.message)

        }

    }



    return (

        <div className="new-player-form">
            <Nav />

            <h3 id="form-h3">Register:</h3><br></br>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username"> User Name: </label><br />

                <input value={username}
                    onChange={(e) => { setUsername(e.target.value) }}
                    type="text" name="username" id="username"
                    placeholder="username" required
                />
                <br />
                <br />

                <label htmlFor="password"> Password: </label><br />
                <input value={password} onChange={(e) => { setPassword(e.target.value) }}
                    type="text" name="password" id="password" placeholder="password" required
                />
                <br />
                <br />

                <label htmlFor="confirmPassword"> Confirm Password: </label><br />
                <input value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }}
                    type="text" name="confirmPassword" id="confirmPassword" placeholder="confirm password" required
                />
                <br />
                <br />

                <button >Register</button>

            </form>

            <h4>{errormsg}</h4>

        </div>


    )
}

// export default AddNewPlayerForm