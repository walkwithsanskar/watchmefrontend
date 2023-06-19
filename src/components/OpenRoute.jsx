import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {  Navigate } from 'react-router-dom'
import {toast } from "react-hot-toast"
const OpenRoute = ({children}) => {
        // const navigate = useNavigate();
        const authState = useSelector((state)=>state.auth);
       

      
        
       
        if(authState.token!=="null"){

            return children

        }else{
           
            return <Navigate to="/"/>
            


        }

}

export default OpenRoute




