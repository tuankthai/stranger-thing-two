
import React from "react";
import './Profile.css'

// import { useNavigate } from "react-router-dom";
// import { removePlayer } from "./delete.js"


export default function PostBox({ post }) {

    return (
        <div>
            <h2>{post.title}</h2>
            <h4> {post.description}</h4>
            <h4>price: {post.price}</h4>
            <h4>seller: {post.author.username}</h4>
            <h4>Location: {post.location}</h4>
            {
                post.isAuthor &&
                < button > VIEW</button>
            }
            {post.isAuthor === false &&
                < button > MESSAGE  </button>
            }
        </div>

    );
}