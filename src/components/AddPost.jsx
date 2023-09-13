
import isLoggedIn, { getAuthToken } from "./Helper"
import './AddPost.css'
import { useNavigate } from "react-router-dom";
import Nav from './Nav'
import { useState } from "react"

const cohortName = "2302-acc-pt-web-pt-e";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;


export default function AddPost() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [location, setLocation] = useState("")
    const [willdeliver, setWilldeliver] = useState(false)

    const [error, setError] = useState(null)
    const [errormsg, setErrormsg] = useState(null)
    const navigate = useNavigate();
    console.log("addpost token =", getAuthToken())

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("hello addpost handleSubmit,type of willDeliver= ", typeof(willdeliver));

        if (!isLoggedIn()) {
            console.log("not logged in ")
            setErrormsg("Please sign in to add a new post!!!")
            return;
        }

        const makePost = async () => {

            try {
                const response = await fetch(`${BASE_URL}/posts`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getAuthToken()}`
                    },
                    body: JSON.stringify({
                        post: {
                            title: `${title}`,
                            description: `${description}`,
                            price: `${price}`,
                            location: `${location}`,
                            willDeliver: `${willdeliver}`,
                            // title: "My favorite stuffed animal",
                            // description: "This is a pooh doll from 1973. It has been carefully taken care of since I first got it.",
                            // price: "$480.00",
                            // willDeliver: true
                        }
                    })
                });
                // const result = await response.json();
                // console.log(result);

                console.log("response: ", response)
                const result = await response.json();
                console.log("after json: result", result);

                //clear input form fields
                setTitle("")
                setDescription("")
                setPrice("")
                setLocation("")
                setWilldeliver(false)

                //add new post to posts array TO DO.....

                //navigate to UserProfile page
                navigate(`/Posts`);

            } catch (error) {
                console.log("error: ", error)
                setError(error.message)
                setErrormsg("Sorry, cann't add new posts!!")

            }
        }
        makePost();

    }

    return (
        <div className="new-post-form">
            <Nav />

            <h3 id="post-form-h3">Add New Post</h3><br></br>

            <form onSubmit={handleSubmit}>
                <label htmlFor="title"> Title: </label><br />

                <input value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                    type="text" name="title" id="title"
                    placeholder="title" required
                />
                <br />
                <br />

                <label htmlFor="decription"> Description : </label><br />
                <input value={description} onChange={(e) => { setDescription(e.target.value) }}
                    type="text" name="description" id="description" placeholder="description" required
                />
                <br />
                <br />

                <label htmlFor="price"> Price: </label><br />
                <input value={price} onChange={(e) => { setPrice(e.target.value) }}
                    type="text" name="price" id="price" placeholder="price" required
                />
                <br />
                <br />

                <label htmlFor="location"> Location: </label><br />
                <input value={location} onChange={(e) => { setLocation(e.target.value) }}
                    type="text" name="location" id="location" placeholder="location " required
                />
                <br />
                <br />

                <label htmlFor="willdeliver"> Willing to Deliver? </label><br />
                <input value={willdeliver} onChange={(e) => {
                    setWilldeliver ( e.target.checked )
                }}
                    type="checkbox" name="willdeliver" id="willdeliver"
                    placeholder="willdeliver " 
                />
                <br />
                <br />


                <button >Create</button>

            </form>

            <br />
            <br />
            <h4>{errormsg}</h4>
        </div>

    )
}