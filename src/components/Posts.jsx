import { useEffect, useState } from "react";
import React from "react";

import PostBox from './PostBox'
import Nav from './Nav'
import './Posts.css'
import './Login.css'

const cohortName = "2302-acc-pt-web-pt-e";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;



export default function Posts() {
    const [allposts, setAllposts] = useState([])
    const [posts, setPosts] = useState([])
    const [searchText, setSearchText] = useState("");

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
            <Nav />
            <h1> Posts</h1>
          
            <input value={searchText}
                onChange={(e) => {
                    setSearchText(e.target.value);
                    console.log("search text = ", searchText)
                    //filter the posts
                    setPosts(allposts.filter(function (post) {
                        //find post has text containing search text
                        return post.author.username.includes(searchText)
                            | post.description.includes(searchText)
                            | post.title.includes(searchText)
                            | post.price.includes(searchText)
                            | post.location.includes(searchText)
                            
                    }));
                    console.log("new posts: ", posts)

                }}

                type="text" name="searchText" id="searchText"
                placeholder="searchText"
            />

            <a href="/" id="signup">(ADD POST)</a>
            <br />

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