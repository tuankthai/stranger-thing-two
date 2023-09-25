const COHORT_NAME = '2302-ACC-PT-WEB-PT-E'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

// export const fetchPosts = async () => {
//     try {
//         const response = await fetch(`${BASE_URL}/posts`)
//         const result = await response.json();
//         return result.data.posts;
//     } catch (err) {
//         console.error(err);
//     }
// }

export const fetchPosts_withHeaders = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/posts`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }

        });
        const result = await response.json();
        return result.data.posts;

    } catch (err) {
        console.error(err);
    }
}

export const registerUser = async (username, password) => {
    try {
        const response = await fetch(
            `${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                }
            })
        });
        const result = await response.json();
        return result.data.token;
    } catch (err) {
        console.error(err);
    }
}

//instructor micheal code START HERE ... NOT WORKING!!!!
// export const loginUser = async (username, password) => {
//     try {
//         const response = await fetch(
//             `${BASE_URL}/users/login`, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 user: {
//                     username,
//                     password
//                 }
//             })
//         });
//         const result = await response.json();
//         return result.data.token;
//     } catch (err) {
//         console.error(err);
//     }
// }

// export const makePost = async (post, token) => {
//     try {
//         const response = await fetch(`${BASE_URL}/posts`, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({
//                 post
//             })
//         });
//         const result = await response.json();
//         console.log(result);
//         return result
//     } catch (err) {
//         console.error(err);
//     }
// }

export const patchPost = async (id, post, token) => {

    console.log("in patchPost, post = ", post)
    // const minPost = { ...post, title, description, price, location, willDeliver }

    const minPost = {
        // post: {
        title: `${post.title}`,
        description: `${post.description}`,
        price: `${post.price}`,
        location: `${post.location}`,
        willDeliver: `${post.willDeliver}`,
        // }
    }
    console.log("minPost = ", minPost)

    try {
        const response = await fetch(`${BASE_URL}/posts/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(minPost
            )
        });
        console.log("response: ", response)
        const result = await response.json();
        console.log("after json: result", result);
        return result;
    } catch (error) {
        console.log("error: ", error)
        // setError(error.message)
        // setErrormsg("Sorry, cann't add new posts!!")
    }
}

export const deletePost = async (id, token) => {
    try {
        const response = await fetch(`${BASE_URL}/posts/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}
