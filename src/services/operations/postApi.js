import {apiConnector} from "../apiConnector";
import {postEndpoints} from "../apis"
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
// import {toast} from "react-toastify";
const {
    createPostApi ,
    getFeedApi,
    createCommentApi ,
    createLikeApi,
    removeLikeApi,
    getUserPostByIdApi 


} = postEndpoints;


export function createPost(
    formData
){

        return async(dispatch)=>{
            const toastId = toast.loading("uploading file to server")
            try{
                const headers = {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
                const response = await apiConnector('POST' , createPostApi , formData , headers);

                if(response?.data?.success === true){
                    toast.dismiss(toastId);
                    toast.success("post created successfully");
                    // console.log(response?.data);
                }
                
            }catch(error){
                toast.error("unable to create post ")
                toast.dismiss(toastId);
            }
        }

} 

export function getFeedPosts(setFeedPosts , setLoading , feedPosts){

    return async(dispatch)=>{
        try{
            const headers = {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
       
            const response = await apiConnector("GET",getFeedApi,null, headers);
            if(response?.data?.success === true){
                setFeedPosts(response?.data?.posts);
                
            
                setLoading(false);
                // console.log(response);
            }else{
                toast.error("can not fetch posts man");
                setLoading(false);
            }

        }catch(error){
            toast.error("can't fetch posts at the moment");
            setLoading(false);
        }
    }
}


export function createComment(
    formData,
    post_id

){
        
        return async(dispatch)=>{
            const toastId = toast.loading("posting comment")
            try{
                const headers = {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }    
                const response = await apiConnector("POST" ,createCommentApi + `${post_id}`,formData,headers )

                if(response?.data?.success===true){
                    toast.dismiss(toastId);
                    toast.success("comment added successfully")
                    // console.log(response);
                }


            }catch(error){
                toast.dismiss(toastId);
                toast.error("couldn't post comment")
                toast.error("failed to post comment");
            }
        }
}

export function createLike (post_id){

    return async(dispatch)=>{
        const toastId = toast.loading("liking")
        try{

                const response = await apiConnector("POST" , createLikeApi + `${post_id}`,"",{
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                })
                if(response?.data?.success===true){
                    toast.dismiss(toastId);
                    toast.success("liked post ")
             
                }


        }catch(error){
            toast.dismiss(toastId);
            toast.error("couldn't like the post ")
        }
    }
}

export function removeLike (post_id){

    return async(dispatch)=>{
        const toastId = toast.loading("disliking")
        try{

                const response = await apiConnector("DELETE" , removeLikeApi + `${post_id}`,"",{
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                })
                if(response?.data?.success===true){
                    toast.dismiss(toastId);
                    toast.success("disliked post ")
                
                }


        }catch(error){
            toast.dismiss(toastId);
            toast.error("couldn't dislike the post ")
        }
    }
}