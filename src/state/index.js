import {createSlice} from "@reduxjs/toolkit";

const initialState = {

    user:null,
    token:localStorage.getItem("token")!=="null"?localStorage.getItem("token"):"null",
    userposts:[],
    userFeed:[],
    userFetchedById:null,
    friendsOfUser:[],
    specificUsersProfileFriends:[],
    userWithoutFriends:null,
}


export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
       
        setLogin:(state,action)=>{
            state.user = action.payload.user;
            localStorage.setItem("token" , action.payload.token); 
            //  state.user = action.payload   
           
            state.token=action.payload.token;
        }
        ,
        setLogout:(state)=>{
            state.user = null;
            state.token =  null;
            state.posts = [];
            localStorage.setItem("token","null");
        }
        ,
        setFriends :(state,action)=>{

            state.friendsOfUser = action.payload;

        }
        ,
        setPosts : (state,action) => {
            state.posts = action.payload.posts;
        }
        ,
        setUserFeed : (state,action) =>{
                state.userFeed = action.payload.post;
        },
        setUserFetchedById : (state,action) =>{
            if(action.payload!==null){

                state.userFetchedById = action.payload.user
            }
            else{
                state.userFetchedById = null;
            }
            // console.log(state.userFetchedById)
        }
        ,
        setSpecificUsersProfileFriends : (state,action) =>{
            state.specificUsersProfileFriends = action.payload
        } ,
        setUserWithoutFriends : (state,action) =>{
            state.userWithoutFriends = action.payload
        }
    }
})

export const {setLogin,setLogout,setFriends,setPosts,setUserFeed ,setUserFetchedById ,   setSpecificUsersProfileFriends ,setUserWithoutFriends } = authSlice.actions;

export default authSlice.reducer;