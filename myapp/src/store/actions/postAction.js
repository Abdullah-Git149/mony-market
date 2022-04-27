import axios from "axios"
// const token = localStorage.getItem('mytoken')


export const createPostAction = (formData) => {
    return async (dispatch, getState) => {
        dispatch({ type: "SET_LOADER" })
        const { AuthReducer: { token } } = getState()
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            await axios.post(process.env.REACT_APP_API_URL+"addPost", formData, config).then((res) => {
                console.log("Db data", res)

                dispatch({ type: "CLOSE_LOADER" })
                dispatch({ type: "REDIRECT_TRUE" })
                // dispatch({ type: "REMOVE_ERRORS" })
                dispatch({ type: "SET_MESSAGE", payload: res.data.msg })

            }).catch((error) => {
                // console.log("mainnnn error", e)
                dispatch({ type: "CLOSE_LOADER" })
                const errors = error.response.data
                console.log(errors)
                dispatch({ type: "CREATE_ERROR", payload: errors })
                console.log(error.response.data);
                console.log(error.message)
            })


        } catch (error) {

        }
    }
}

export const fetchPosts = (id) => {
    return async (dispatch, getState) => {
        const { AuthReducer: { token } } = getState()
        dispatch({ type: "SET_LOADER" })
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        await axios.get(`${process.env.REACT_APP_API_URL}fetchPosts/${id}`, config).then((res) => {
            dispatch({ type: "CLOSE_LOADER" })
            const myPosts = res.data.response
            dispatch({ type: "SET_POSTS", payload: myPosts })

        }).catch((err) => {

            dispatch({ type: "CLOSE_LOADER" })
            console.log(err);

        })
    }
}


export const fetchPost = (id) => {
    return async (dispatch, getState) => {
        const { AuthReducer: { token } } = getState()
        dispatch({ type: "SET_LOADER" })
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        dispatch({ type: "SET_LOADER" })
        await axios.get(`${process.env.REACT_APP_API_URL}fetchPost/${id}`, config).then((res) => {
            dispatch({ type: "CLOSE_LOADER" })
            const mypost = res.data.post
            console.log(res)
            dispatch({ type: "SET_SINGLE_POST", payload: mypost })
            dispatch({ type: "POST_REQUEST" })

            console.log(res.data.post)
        }).catch((err) => {
            dispatch({ type: "CLOSE_LOADER" })
            console.log(err.response);
        })

    }
}

export const updateAction = (editData) => {
    return async (dispatch, getState) => {
        const { AuthReducer: { token } } = getState()
        dispatch({ type: "SET_LOADER" })
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        dispatch({ type: "SET_LOADER" })
        await axios.post(process.env.REACT_APP_API_URL+'updatePost', editData, config).then((res) => {
            dispatch({ type: "CLOSE_LOADER" })
            dispatch({ type: "REDIRECT_TRUE" })
            dispatch({ type: "SET_MESSAGE", payload: res.data.msg })
            console.log(res)
        }).catch((err) => {
            dispatch({ type: "CLOSE_LOADER" })
            dispatch({ type: "SET_EDIT_ERROR", payload: err.response.data.errors })
            console.log(err.response);
        })
    }
}

export const allPostsAction = (page) => {
    return async (dispatch, getState) => {
        dispatch({ type: "SET_LOADER" })
        await axios.get(`${process.env.REACT_APP_API_URL}homePosts/${page}`).then((res) => {
            console.log(res.data);
            let count = res.data.count
            let perPage = res.data.perPage
            let posts = res.data.posts
            dispatch({ type: "CLOSE_LOADER" })
            dispatch({ type: "SHOW_ALLPOSTS", payload: { count, perPage, posts } })

        }).catch((err) => {
            dispatch({ type: "CLOSE_LOADER" })
            console.log(err)
        })
    }
}
export const postDetailAction = (id) => {
    return async (dispatch, getState) => {
        dispatch({ type: "SET_LOADER" })
        await axios.get(`${process.env.REACT_APP_API_URL}details/${id}`).then((res) => {
            dispatch({ type: "CLOSE_LOADER" })
            console.log(res)
            const postDetail = res.data.post
            dispatch({ type: "SET_DETAIL", payload: postDetail })
        }).catch((err) => {
            dispatch({ type: "CLOSE_LOADER" })
            console.log(err)

        })
    }
}
export const buyAdAction = (formData) => {
    return async (dispatch, getState) => {
        dispatch({ type: "SET_LOADER" })
        console.log("actionfrom", formData)
        await axios.post(`${process.env.REACT_APP_API_URL}purchaseAd`, formData).then((res) => {
            const msg = res.data.msg
            console.log(res)
            console.log(msg)
            dispatch({ type: "PURCHASE_AD", payload: msg })
        }).catch((err) => {
            console.log(err);
        })

    }
}