
import './Profile.css'
import React, { useEffect, useState } from "react"
import { fetchMyData } from "./API"
import { getAuthToken } from "./Helper"
import { Link } from 'react-router-dom'
import NavProfile from './NavProfile'

export default function UserProfile() {

    // const [posts, setPosts] = useState([])
    const [userObj, setUserObj] = useState({})
    const [posts, setPosts] = useState([])
    const [messages, setMessages] = useState([])
    const [src, setSrc] = useState("")
    const [errormsg, setErrormsg] = useState("")

    const searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams.has('src'));
    //if has src query string, then it is from nav bar. 
    //it should have one of three values login, logout, profile
    //otherwise, it is from /Profile route
    if (searchParams.has('src')) {
        console.log(searchParams.get('src'))
        searchParams.get('src');
    }


    function expandOneMsgToMe(msg, post) {
        console.log("inside expandOneMsgToMe , msg=", msg)
        return (
            <div>
                <h4>From: {msg.fromUser.username}</h4>
                <h4>{msg.content}</h4>
                {/* <h4>VIEW MY POST: {post.title}</h4> */}
                <h3>My Post Title: {post.title}</h3>
                <hr />
            </div>
        )
    }

    function expandMsgsToMe(post) {
        console.log("inside expandMsgsToMe, post=", post)
        return (
            <div>
                {post.messages.map((msg) => {
                    console.log("map msg: ", msg)
                    return expandOneMsgToMe(msg, post)
                })} 
                {/* <h4>VIEW MY POST: {post.title}</h4> */}
                {/* <Link to="/Posts">VIEW MY POST: { post.title}</Link> */}
            </div>
        )
    }

    function expandSentByMe(msg) {
        console.log("expandSentByMe, msg=", msg)
        return (
            <div>
                <h4>(Sent By Me)</h4>
                <h4>{msg.content}</h4>
                {/* <h4>MESSAGE AGAIN: {msg.post.title}</h4> */}
                <h3>Post Title: {msg.post.title}</h3>               
                {/* <Link to="/Posts">MESSAGE AGAIN: {msg.title}</Link> */}
                <hr />
            </div>
        )
    }

    async function fetchProfileData() {
        const token = getAuthToken();
        console.log("fetchProfileData token =", token)

        try {
            const result = await fetchMyData(token);
            console.log("after fetchMyData, result = ", result)
            setPosts(result.posts)
            setMessages(result.messages)
        } catch (error) {
            console.log("error: ", error)
            // setError(error.message)
            setErrormsg("Sorry, fetchMyData fails!!")
        }

    }

    useEffect(() => {
        fetchProfileData();
    }, []);

    console.log("messages = ", messages)
    console.log("posts = ", posts)

    return (

        <div>
            <NavProfile />
            {/* <h1>User Profile</h1> */}
            <h1>Messages To Me:</h1>    
            {posts.map((post) => {
                console.log("map post: ", post)
                return expandMsgsToMe(post)               
            })} 

            <hr />
            <h1>Messages From Me:</h1>    

            {messages.map((msg) => {
                console.log("map msg: ", msg)
                return expandSentByMe(msg)
            })} 

            <hr />
            <p>{errormsg}</p>               
        </div>
    )
}
