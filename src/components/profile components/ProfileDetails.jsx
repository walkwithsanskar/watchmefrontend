import React, { useEffect } from 'react'
import {useLocation} from "react-router-dom"
import { useState } from 'react';
import {useSelector , useDispatch} from "react-redux"
import {addFriendById , removeFriendById} from "../../services/operations/userApi"
const ProfileDetails = () => {
  
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.auth);
 
  const {userFetchedById} = useSelector((state)=> state.auth);
  const friendsOfUser = [];

  if(userFetchedById!==null && userFetchedById?.freinds!==[]){
    userFetchedById?.friends.forEach((friend)=>{
      friendsOfUser.push(friend?._id)
    })
  }




  const[isFriend , setIsFriend] = useState(friendsOfUser?.includes(user._id));

  const addFriend = () =>{

    dispatch(addFriendById(userFetchedById?._id));
    setIsFriend(!isFriend);
    
  }
  const removeFriend = () =>{
    dispatch(removeFriendById(userFetchedById?._id));
    setIsFriend(!isFriend);
  }

  return (
    <div className='flex flex-col bg-neutral-600 h-min px-2 py-4 rounded-md border-2'>

    <div className="flex flex-row gap-3 ">
        <img src={userFetchedById?.profilePic} alt=""  className='rounded-[50%] aspect-square object-cover w-[50px] animate-bounce self-start border-2 border-neutral-800 transition hover:animate-none'/>
        <div className="flex flex-col ">

        <h1>{`${userFetchedById?.firstName +" " + userFetchedById?.lastName} `}</h1>
        
        <h1>{userFetchedById?.email}</h1>

        
        </div>



    </div>
    <div className='flex lg:flex-row md:flex-row gap-2 sm:flex-col flex-col justify-center items-center'>
      
      {

      isFriend 
      ?
      <button className='text-sm font-bold border-2 border-neutral-200 rounded-md px-2 py-1 bg-black transition-all duration-100 hover:scale-95 text-white' onClick={removeFriend}>Remove Friend</button> :

      <button className='text-sm font-bold border-2 border-neutral-200 rounded-md px-2 py-1 bg-blue-500 transition-all duration-100 hover:scale-95 text-black ' onClick={addFriend}>Add Friend</button>

      }
      
      
    </div>
    </div>
  )
}

export default ProfileDetails