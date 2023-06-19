import React , {useEffect, useState} from 'react'
import {AiOutlineUserAdd , AiOutlineUserDelete} from "react-icons/ai";
import {useSelector , useDispatch} from "react-redux"
import { Link } from 'react-router-dom';
import { addFriendById , removeFriendById } from '../../services/operations/userApi';
const FriendBar = ({friend , friends,setFriends}) => {
    const [addFriend , setAddFriend] = useState(false);
    const dispatch = useDispatch();

  return (
    <div className='flex flex-row w-[300px] border-b-2 '>
        <div className='w-[60px]'>
        <img src={friend.profilePic} alt=""  className='rounded-[50%] aspect-square object-cover w-[50px] animate-pulse self-start'/>

        </div>
        <div className='flex flex-col self-center w-[80%] '>
            {/* userName , name */}
            <span className='text-[12px]'>{friend?.firstName}</span>
            <Link to={  `/profile/${friend?._id}`}>
            <span className='cursor-pointer' >{friend?.email}</span>
             </Link>
        </div>
        <div className="flex  justify-self-end self-center">
            {/* add frand icon  */}
             {
               friends.includes(friend?._id) && addFriend?<AiOutlineUserAdd className='text-white text-2xl ' 
                    onClick={(event)=> {
                      
                     
                      setFriends((prev)=>{
                        return [...prev , friend];
                      })

                      dispatch(addFriendById(friend?._id,setAddFriend,addFriend));
                    }}
                />:<AiOutlineUserDelete className='text-white  text-2xl self-end' 
                onClick={(event)=> {
                  setFriends((prev)=>{
                        return  prev.filter((curr)=> curr._id!==friend?._id);
                      })
                  dispatch(removeFriendById(friend?._id,setAddFriend,addFriend));
                }}
                />
             }
        </div>
    </div>
  )
}

export default FriendBar