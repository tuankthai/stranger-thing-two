import { useEffect, useState } from "react";
import React from "react";

import isLoggedIn from "./Helper"
import PostBox from './PostBox'
import AddPost from './AddPost'

import Nav from './Nav'
import './Posts.css'
import './Login.css'
import { useNavigate } from "react-router-dom";
import NavProfile from "./NavProfile";

const cohortName = "2302-acc-pt-web-pt-e";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;



export default function Posts() {
    const [allposts, setAllposts] = useState([])
    const [posts, setPosts] = useState([])
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        const fetchPosts = async () => {
            try {
                const response = await fetch(`${BASE_URL}/posts`)

                const result = await response.json();
                console.log(result);
                console.log("posts = ", result.data.posts);
                setAllposts(result.data.posts)
                setPosts(result.data.posts)
            } catch (err) {
                console.error(err);
            }
        }
        fetchPosts()

    }, [])


    return (

        <div className="PostList">
            {
                isLoggedIn() ?
                    (< NavProfile />)
                    :
                    (<Nav />)

            }

            <h1> Posts</h1>

            <input value={searchText}
                onChange={(e) => {
                    setSearchText(e.target.value);
                    const srchText = e.target.value;
                    console.log("e value search text = ", e.target.value)
                    console.log("var value search text = ", srchText)
                    //filter the posts
                    // setPosts(prev=>prev.filter(function (post) {
                    setPosts(allposts.filter(function (post) {

                        //find post has text containing search text
                        return post.author.username.includes(srchText)
                            | post.description.includes(srchText)
                            | post.title.includes(srchText)
                            | post.price.includes(srchText)
                            | post.location.includes(srchText)

                    }));
                    console.log("new posts: ", posts)

                }}

                type="text" name="searchText" id="searchText"
                placeholder="searchText"
            />

            {/* <a href="/" id="signup">(ADD POST)</a> */}
            <h3 id="addpost-h3" onClick={() =>
                navigate(`/AddPost`)

            }>{"ADD POST"}</h3>

            {posts.map((post) => {
                // console.log("map post: ", post)
                // return <PuppyBox key={puppy.id} puppy={puppy} puppies={puppies} setPuppies={setPuppies}
                // />;
                return <PostBox key={post._id} post={post}
                />;

            })}
        </div>
    )
}