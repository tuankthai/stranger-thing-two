import React, { useEffect } from "react"

import { useState } from 'react';
import { postMessage } from "./API"
import { getAuthToken } from "./Helper"

export default function SendMsg() {
    const restoredPost = JSON.parse(localStorage.getItem("post"));
    console.log("SendMsg estoredPost = ", restoredPost)

    const [post, setPost] = useState(restoredPost)
    console.log("in SendMsg, post =  ", post);

    // const [expand, setExpand] = useState(false)
    const [errormsg, setErrormsg] = useState("")
    const [message, setMessage] = useState("")

    async function handleSendMsg() {
        const token = getAuthToken();
        console.log("handleSave token =", token)
        console.log("in handleSendMsg, you click send")

        //call send msg api ...TO DO....
        try {
            const result = await postMessage(post._id, message, token);
            console.log("after postMessage, result = ", result)
            setErrormsg("Your message sent successfully!!")
        } catch (error) {
            console.log("error: ", error)
            // setError(error.message)
            setErrormsg("Sorry, postMessaget fails!!")
        }

    }

    return (
        <div>
            <h2>{post.title}</h2>
            <h4> {post.description}</h4>
            <h4>price: {post.price}</h4>
            <h4>seller: {post.author.username}</h4>
            <h4>Location: {post.location}</h4>
            <br /><br /><br /><br />
            <h4>Message User about This Post</h4>
            <label htmlFor="message"> Message: </label><br />
            <input value={message}
                onChange={(e) => {
                    setMessage(e.target.value)
                }}
                type="message" name="message" id="message" size="70"
                placeholder="message" required
            /><br />
            < button onClick={() => {
                handleSendMsg()
            }}
            > SEND MESSAGE</button>
            <hr />
            <p>{errormsg}</p>               

        </div>
    )

}

