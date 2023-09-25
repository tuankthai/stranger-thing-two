import React, { useEffect } from "react"

import { useState } from 'react';
import { patchPost, deletePost } from "./API"
import { getAuthToken } from "./Helper"

export default function SendMsg() {
    const restoredPost = JSON.parse(localStorage.getItem("post"));
    console.log("ViewPost estoredPost = ", restoredPost)

    const [post, setPost] = useState(restoredPost)
    console.log("in SendMsg, post =  ", post);

    const [expand, setExpand] = useState(false)
    const [errormsg, setErrormsg] = useState(null)
    const [message, setMessage] = useState(null)

    function handleSendMsg() {
        console.log("in handleSendMsg, you click send")

    }

    
    function xxxxexpandMsgForm() {
        return (
            <div>
                <label htmlFor="title"> Title: </label><br />
                <input value={editPost.title}
                    onChange={(e) => {
                        setEditPost({ ...editPost, title: editPost.title = e.target.value })
                    }}
                    type="text" name="title" id="title"
                    placeholder="title" required
                /><br />

                < button onClick={() => {
                    console.log("you click SEND BUTTON")
                    handleSend()
                }
                }>
                    SEND MESSAGE  </button>
                <p>{errormsg}</p>

            </div>
        )
    }

    return (
        <div>
            <h2>{post.title}</h2>
            <h4> {post.description}</h4>
            <h4>price: {post.price}</h4>
            <h4>seller: {post.author.username}</h4>
            <h4>Location: {post.location}</h4>
            <br /><br /><br /><br />
            <h1>Message User about This Post</h1>
            <label htmlFor="title"> Title: </label><br />
            <input value={message}
                onChange={(e) => {
                    setMessage(e.target.value )
                }}
                type="message" name="message" id="message" size="70"
                placeholder="message" required
            /><br />
            < button onClick={() => {
                handleSendMsg()
            }}
            > SEND MESSAGE</button>
            <hr />

        </div>
    )

}