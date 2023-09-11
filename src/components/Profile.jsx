
import React from "react"
import { useState } from "react"
import './Profile.css'

const cohortName = "2302-acc-pt-web-pt-e";
const BASE_URL = 'https://strangers-things.herokuapp.com/';

import Nav from './Nav'
import Login from './Login'
import UserProfile from './UserProfile'
import Home from './Home'


export default function Profile() {

    const [posts, setPosts] = useState([])
    const [messages, setMessages] = useState([])
    // const [username, setUsername] = useState("")
    // const [loggedIn, setLoggedIN] = useState(false)
    const [token, setToken] = useState("")
    let src = "";

    const searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams.has('src'));
    //if has src query string, then it is from nav bar. it should have one of three values login, logout, profile
    //otherwise, it is from /Profile route
    if (searchParams.has('src')) {
        console.log(searchParams.get('src'))
        src = searchParams.get('src');

    }




    function logIn(token) {
        setToken(token)
    }

    function logout() {
        setToken("")
    }

    function isLoggedIn() {
        if (token.length) {
            return true;
        }

    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("hello handleSubmit")

        try {
            console.log("before fetching: token >> ", localStorage.getItem("token"));
            console.log("before fetching: username >> ", localStorage.getItem("username"));

            const response = await fetch(`${BASE_URL}/api/${cohortName}/usesrs/me`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    },
                }
            );
            console.log("response: ", response)

            const result = await response.json();

            console.log("after json: ", result.data);
            //update token

            setPosts(result.data.posts);
            setMessages(result.data.messages);
            setUsername(result.data.username);


        } catch (error) {
            console.log("error: ", error)
            setError(error.message)

        }
    }

    return (

        <div>
            {/* <Nav />
            <h1>Profile {src} {typeof (src)}</h1> */}
            {
                src.includes('login') ?
                    (<Login setToken={setToken} />)
                    :
                    (   
                        src.includes('logout') ?
                            ( 
                                <Home />
                            )
                            :
                            (
                                <UserProfile />

                            )
                    )
            }


            {/* 
            <Nav />
            {posts.map((post) => {
                console.log("map post: ", post)
                return <PostBox key={post._id} post={post} 
                />;
            })}  */}

        </div>

    )
}

// export default AddNewPlayerForm