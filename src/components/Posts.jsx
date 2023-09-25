import { useEffect, useState } from "react";
import React from "react";

import PostBox from './PostBox'
import AddPost from './AddPost'
import ViewPost from './ViewPost.jsx'

import Nav from './Nav'
import './Posts.css'
import './Login.css'
import { useNavigate } from "react-router-dom";
import NavProfile from "./NavProfile";
import isLoggedIn, { getAuthToken } from "./Helper"

// const cohortName = "2302-acc-pt-web-pt-e";
// const BASE_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

// import { fetchPosts, fetchPosts_withHeaders } from './API';
import { fetchPosts_withHeaders } from './API';


export default function Posts() {
    const [allposts, setAllposts] = useState([])
    const [posts, setPosts] = useState([])
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    //instructor michael new code START HERE ...WORKING!!!
    async function fetchData() {
        const posts = await fetchPosts_withHeaders(getAuthToken());
        // const posts = await fetchPosts();
        console.log("posts = ", posts);
        setAllposts(posts)
        setPosts(posts);
    }
    useEffect(() => {
        fetchData();
    }, []);
    //instructor michael new code END HERE ...WORKING!!!

    // my old working code START HERE ...
    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         try {
    //             const response = await fetch(`${BASE_URL}/posts`)
    //             const result = await response.json();
    //             console.log(result);
    //             console.log("posts = ", result.data.posts);
    //             setAllposts(result.data.posts)
    //             setPosts(result.data.posts)
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    //     fetchPosts()
    // }, [])


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
                // return <PostBox key={post._id} post={post} />;     
                return (
                    <div>
                        <h2>{post.title}</h2>
                        <h4> {post.description}</h4>
                        <h4>price: {post.price}</h4>
                        <h4>seller: {post.author.username}</h4>
                        <h4>Location: {post.location}</h4>

                        {isLoggedIn() && post.isAuthor &&
                            < button onClick={() =>{
                                console.log("you click VIEW")
                                localStorage.setItem("post", JSON.stringify(post));
                                navigate(`/ViewPost`)
                            }
                            
                            }
                            > VIEW</button>
                        }
                        {isLoggedIn() && post.isAuthor === false &&
                            < button onClick={() => {                                                      
                                console.log("you click MESSAGE")
                                localStorage.setItem("post", JSON.stringify(post));
                                navigate(`/SendMsg`)
                            } 
                            }
                            > SEND MESSAGE  </button>
                        }
                    </div>
                )
            })}
        </div>
    )
}