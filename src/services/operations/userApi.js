import {apiConnector} from "../apiConnector";
import {userEndpoints} from "../apis"
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { setUserWithoutFriends , setUserFetchedById } from "../../state";
import { setFriends } from "../../state";


const{
    getUserApi,
    userFriendsApi,
    getUserByIdApi ,
    addFriendApi,
    removeFriendApi,
} = userEndpoints;



export function fetchUserDetails(
    userid
){




    return async(dispatch)=>{
        const toastId= toast.loading("fetching profile details please wait");
        try{

            const headers = {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem("token")
            }
            const response = await apiConnector("GET", getUserByIdApi + `${userid}`,null,headers)

            if(response?.data?.success===true){
                // console.log(response);/
         
                await dispatch(setUserFetchedById(response?.data));
                
                toast.success("fetched profile details");
                
                toast.dismiss(toastId);
            }
            toast.dismiss(toastId);

        }catch(error){
            toast.dismiss(toastId);
            toast.error("couldn't fetch profile details")
            toast.error("error while fetching the user profile")
        }

    }
}


export function addFriendById(
    friendId,
    setAddFriend,addFriend
){

    return async(dispatch)=>{

       const  toastId = toast.loading("adding friend");

       try{

        const headers = {
            Authorization : localStorage.getItem("token")
        }

        const response = await apiConnector("PUT" , addFriendApi + friendId , "",headers);

        if(response?.data?.success == true){
            toast.dismiss(toastId);
            toast.success("friend added successfully");
            if(setAddFriend){
                setAddFriend(!addFriend);

            }
            
        }
        toast.dismiss(toastId);
       }catch(error){
        toast.dismiss(toastId);
        toast.error("not able to add friend");

       }

    }
}

export function removeFriendById(
    friendId ,
    setAddFriend,
    addFriend
){

    return async(dispatch)=>{

       const  toastId = toast.loading("removing friend");

       try{

        const headers = {
            Authorization : localStorage.getItem("token")
        }

        const response = await apiConnector("DELETE" , removeFriendApi + friendId , "",headers);

        if(response?.data?.success == true){
            toast.dismiss(toastId);
            toast.success("friend removed successfully");
            if(setAddFriend){

                setAddFriend(!addFriend);
            }
            
        }
        if(response?.data?.message ==="friend is already added"){
                    toast.error("friend is already added ");
                    toast.dismiss(toastId);
        }
        toast.dismiss(toastId);
       }catch(error){
        toast.dismiss(toastId);
        toast.error("not able to remove friend");

       }

    }
}



export function getUserFriends(){

    return async(dispatch)=>{

        try{

            const response = await apiConnector("GET" , userFriendsApi , "" , {
                                                                            Authorization : localStorage.getItem("token")
                                                                        })

            if(response?.data?.success===true){
                   
                        dispatch(setFriends(response?.data?.userFriends));
            }


        }catch(error){
            toast.error("couldnot fetch friends");
        }
    }
}



export function getUser(){


    return async(dispatch)=>{

        try{

            const response = await apiConnector("GET" , getUserApi , "",{
                Authorization: localStorage.getItem("token")
            })
            
            if(response?.data?.success===true){
                dispatch(setUserWithoutFriends(response?.data));
            }
        }catch(error){
            toast.error("couldnt fetch your data")
        }
    }
}