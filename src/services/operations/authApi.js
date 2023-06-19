import { setLogin  , setLogout } from "../../state/index";
import {toast} from "react-hot-toast";
import {apiConnector} from "../apiConnector";
import {authEndpoints} from "../apis"
import { searchEndPoints } from "../apis";
import { useSelector } from "react-redux";
const {signUpApi,logInApi} = authEndpoints;
const {SEARCH_BY_EMAIL} = searchEndPoints;
export function signUp(
    
        formdataup,
        haveAccount,
        setHaveAccount
){
    let  toastId = toast.loading("wait registering user ")
    return async(dispatch)=>{
      
        try{


            let responsedata = await apiConnector("POST" , signUpApi , formdataup);
            // console.log(responsedata);
            toast.dismiss(toastId);
            
            if(responsedata?.data?.success === true){
                    toast.success("registered successFully");
                    setHaveAccount(!haveAccount);
    
            }else{
                    toast.error(`${responsedata?.data?.message}`);
            } 
            
        }catch(error){
            // console.log(error);
            toast.error("encountered random error");
            toast.dismiss(toastId);
        }

}
}

export function logIn(
    formdata,
    navigate,
    authState
){

    return async(dispatch)=>{

        let toastId = toast.loading("logging in....");

        try{

            
    
            const response = await apiConnector("POST" , logInApi , formdata);
            
         
            if(response?.data?.success === true){
                toast.dismiss(toastId);
                
                toast.success("login successful");
                // console.log(response.data);
                dispatch(setLogin(response.data));
                
                navigate("/home");
               
              
            }else{
                toast.dismiss(toastId);
                toast.error(`${response?.data?.message}`);
            }
            toast.dismiss(toastId)
        }catch(error){

            toast.dismiss(toastId);
            toast.error("encountered error while login");
        }
    
        


    }
}

export function search(email , setSearchResults){

    return async(dispatch)=>{

        try{
            const headers ={
                Authorization:"Bearer " + localStorage.getItem("token")
            }

         const response = await apiConnector("GET",SEARCH_BY_EMAIL +`${email}` ,"" , headers);
         setSearchResults(response?.data?.users);
         

        }catch(error){
            
        }

    }
}