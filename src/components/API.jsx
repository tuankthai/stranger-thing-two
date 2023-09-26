const COHORT_NAME = '2302-ACC-PT-WEB-PT-E'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

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

export const patchPost = async (id, post, token) => {

    console.log("in patchPost, post = ", post)

    const minPost = {
        post: {
        title: post.title,
        description: post.description,
        price: post.price,
        location: post.location,
        willDeliver: post.willDeliver,
        }
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


export const postMessage = async (id, content, token) => {

    console.log("in postMessage, content = ", content)
   
    try {
        const response = await fetch(`${BASE_URL}/posts/${id}/messages`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message: {
                    content
                }
            }
            )
        });
        console.log("response: ", response)
        const result = await response.json();
        console.log("after json: result", result);
        return result;
    } catch (error) {
        console.log("error: ", error)
    }
}


export const fetchMyData = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }

        });
        const result = await response.json();
        console.log("after fetch, result.data=", result.data)
        return result.data;

    } catch (err) {
        console.error(err);
    }
}
