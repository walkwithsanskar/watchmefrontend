import React , {useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {AiOutlineUserAdd , AiOutlineUserDelete} from "react-icons/ai"
import { Link , NavLink, Navigate,useNavigate } from 'react-router-dom'
import { addFriendById , removeFriendById } from '../../services/operations/userApi'
import { toast } from 'react-hot-toast'
import { getUser } from '../../services/operations/userApi'
const ProfileFriends = ({friend}) => {

    const {userWithoutFriends} = useSelector((state)=>(state.auth));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [addFriend , setAddFriend] = useState(true);
    let [friends,setfriends] = useState(userWithoutFriends?.friends);
    
    const addFriendHandler = () =>{
            console.log("add")
            if(friends!==undefined){

                if(  addFriend===false  ){


                    if(!friends.includes(friend?._id)){

                        setAddFriend(!addFriend);
                        dispatch(addFriendById(friend?._id))
                    }else{
                        setAddFriend(addFriend)
                    }
                }
                else{
                    toast.error("already your friend");
                    setAddFriend(!addFriend)
                }

            }else{

                setAddFriend(!addFriend);
                dispatch(addFriendById(friend?._id));

            }
    }
    const removeFriendHandler = () =>{
            console.log("remove")
            if(friends!==undefined){
                if(    addFriend===true  ){
                    if(friends.includes(friend?._id) ){
                        setAddFriend(!addFriend);
                        dispatch(removeFriendById(friend?._id))

                    }else{
                        setAddFriend(addFriend)
                    }
                }else{
                    toast.error("already removed ")
                    setAddFriend(!addFriend)
                }
            }else{
                setAddFriend(!addFriend);
                dispatch(removeFriendById(friend?._id));
            }
            




    }
    useEffect(()=>{
            
            dispatch(getUser());
            setfriends(userWithoutFriends?.friends);
    }, [])

      
  return (
    <div className='flex lg:flex-row md:flex-col flex-row  gap-3'>

                <div className='flex flex-row justify-center items-center h-max w-max'>
                            <img src={friend?.profilePic} className='w-[50px] rounded-full aspect-square object-cover' />

                </div>
                <div className='flex flex-row justify-center items-center cursor-pointer'  >
                
                

                    <span>{friend?.email}</span>
          
           
                </div>
                <div className='flex flex-col items-centerjustify-center gap-1'>
                    
                    {


                    addFriend ?  <AiOutlineUserAdd className='self-center text-[30px]' onClick={addFriendHandler} />
                    :
                    <AiOutlineUserDelete className='self-center text-[30px]'
                    onClick={removeFriendHandler}/>
                  
                    }
                </div>
    </div>
  )
}

export default ProfileFriends