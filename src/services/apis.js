const BASE_URL = process.env.REACT_APP_BASE_URL || "https://watchmebackendapi.onrender.com"


// auth api
export const  authEndpoints = {
    signUpApi : BASE_URL + "/auth/signUp",
    logInApi : BASE_URL + "/auth/logIn"
}

// user endpoints
export const userEndpoints = {
    getUserApi: BASE_URL + "/user/",
    userFriendsApi: BASE_URL + "/user/friend",
    getUserByIdApi : BASE_URL + "/user/friend/",
    addFriendApi: BASE_URL + "/user/addfriend/",
    removeFriendApi : BASE_URL + "/user/removefriend/"
}

//post endpoint 

export const postEndpoints = {
    createPostApi : BASE_URL + "/post/createPost",
    getFeedApi: BASE_URL + "/post/getFeed",
    createCommentApi : BASE_URL + "/post/comment/",
    createLikeApi: BASE_URL + "/post/like/",
    removeLikeApi: BASE_URL + "/post/removeLike/",
    getUserPostByIdApi : BASE_URL + "/post/user/:userid"


}


//search endpoints

export const searchEndPoints = {

    SEARCH_BY_EMAIL : BASE_URL + "/search/user/"
}