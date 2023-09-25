
import React, { useEffect } from "react"

import { useState } from 'react';
import { patchPost, deletePost } from "./API"
import { getAuthToken } from "./Helper"
import { useNavigate } from "react-router-dom";

// export default function ViewPost(post) {
export default function ViewPost() {
    const restoredPost = JSON.parse(localStorage.getItem("post"));
    console.log("ViewPost estoredPost = ", restoredPost)

    const [post, setPost] = useState(restoredPost)
    console.log("in viewpost, post =  ", post);

    const [editPost, setEditPost] = useState(post)
    const [expand, setExpand] = useState(false)
    const [edit_name, setEditName] = useState("EDIT")
    // const [errormsg, setErrormsg] = useState("no error message!!!!")
    const [errormsg, setErrormsg] = useState(null)
    const navigate = useNavigate();

    async function handleDelete() {
        console.log("you click DELETE")
        const token = getAuthToken();
        console.log("handleSave token =", token)

        try {
            const result = await deletePost(post._id, token);
            console.log("after deletePost, result = ", result)
            navigate(`/Posts`)

        } catch (error) {
            console.log("error: ", error)
            // setError(error.message)
            setErrormsg("Sorry, delete post fails!!")

        }    //call post delete API

    }

    async function handleSave() {
        console.log("you click SAVE")

        // const [error, setError] = useState(null)
        const token = getAuthToken();
        console.log("handleSave token =", token)

        setExpand(false)
        setEditName("EDIT")
        console.log("editPost = ", editPost)
        localStorage.removeItem("post")
        localStorage.setItem("post", JSON.stringify(editPost));
        setPost(editPost)

        // //call post change API  ...TO DO....

        try {
            const result = await patchPost(post._id, editPost, token);
            console.log("after patchPost, result = ", result)

        } catch (error) {
            console.log("error: ", error)
            // setError(error.message)
            setErrormsg("Sorry, edit post fails!!")

        }

    }

    function handleTestMe() {
        console.log("in handleTestMe")
    }

    function expandMe() {
        // return <h1>you expand me!!!!</h1>
        return (
            <div>
            // <form onSubmit={handleTestMe}>
                    <label htmlFor="xx"></label>
                    <input type="text" name="" id="" />
                    <button onClick={handleTestMe()}>test me</button>
            // </form>
            </div>
        )
    }

    function expandEditForm() {
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

                <label htmlFor="decription"> Description : </label><br />
                <input value={editPost.description} onChange={(e) => {
                    setEditPost({ ...editPost, description: editPost.description = e.target.value })
                }}
                    type="text" name="description" id="description" placeholder="description" required
                /><br />
                <label htmlFor="price"> Price: </label><br />
                <input value={editPost.price} onChange={(e) => {
                    setEditPost({ ...editPost, price: editPost.price = e.target.value })
                }}
                    type="text" name="price" id="price" placeholder="price" required
                /><br />     
                <label htmlFor="location"> Location: </label><br />
                <input value={editPost.location} onChange={(e) => {
                    setEditPost({ ...editPost, price: editPost.location = e.target.value })
                }}
                    type="text" name="location" id="location" placeholder="location " required
                /><br />
                <label htmlFor="willdeliver"> Willing to Deliver? </label><br />
                <input value={editPost.willDeliver} onChange={(e) => {
                    // setWilldeliver(e.target.checked)
                    setEditPost({ ...editPost, willDeliver: editPost.willDeliver = e.target.checked })
                }}
                    type="checkbox" name="willdeliver" id="willdeliver"
                    placeholder="willdeliver "
                /><br />

                < button onClick={() => {
                    console.log("you click SAVE BUTTON")
                    handleSave()
                }
                }>
                    Save  </button>
                <p>{errormsg}</p>               
            </div>
        )
    }

    function handleEditPost() {
        setExpand(true)
        setEditName("EDITTING")
    }

    return (
        <div>
            <h2>{post.title}</h2>
            <h4> {post.description}</h4>
            <h4>price: {post.price}</h4>
            <h4>seller: {post.author.username}</h4>
            <h4>Location: {post.location}</h4>
            < button onClick={() => {
                handleDelete()
            }
            }
            > DELETE</button>
            < button onClick={() => {
                handleEditPost()
            }
            }
            > {edit_name}</button>

            <hr />
            {expand && expandEditForm()}
            

            {/* <label htmlFor="title"> Title: </label><br />
            <input value={editPost.title}
                onChange={(e) => {
                    setEditPost({ ...editPost, title: editPost.title = e.target.value })
                }}
                type="text" name="title" id="title"
                placeholder="title" required
            /><br /> */}

            {/* <label htmlFor="decription"> Description : </label><br />
            <input value={editPost.description} onChange={(e) => {
                setEditPost({ ...editPost, description: editPost.description = e.target.value })
            }}
                type="text" name="description" id="description" placeholder="description" required
            /><br />
            <label htmlFor="price"> Price: </label><br />
            <input value={editPost.price} onChange={(e) => {
                setEditPost({ ...editPost, price: editPost.price = e.target.value })
            }}
                type="text" name="price" id="price" placeholder="price" required
            /><br /> */}
            {/* <label htmlFor="location"> Location: </label><br />
            <input value={editPost.location} onChange={(e) => {
                setEditPost({ ...editPost, price: editPost.location = e.target.value })
            }}
                type="text" name="location" id="location" placeholder="location " required
            /><br />
            <label htmlFor="willdeliver"> Willing to Deliver? </label><br />
            <input value={editPost.willDeliver} onChange={(e) => {
                // setWilldeliver(e.target.checked)
                setEditPost({ ...editPost, willDeliver: editPost.willDeliver = e.target.checked })
            }}
                type="checkbox" name="willdeliver" id="willdeliver"
                placeholder="willdeliver "
            /><br /> */}

            {/* < button onClick={() => {
                console.log("you click SAVE BUTTON")
                handleSave()
            }
            }>
                Save  </button>                     
            <p>{errormsg}</p> */}
        </div>
    )
}

