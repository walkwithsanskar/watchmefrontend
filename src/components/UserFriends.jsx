import React ,{useEffect , useState} from 'react'
import { useSelector } from 'react-redux'
import FriendBar from './userfeed/FriendBar';
import {TbFriends} from "react-icons/tb"
const UserFriends = () => {
  //this is previous code
    const {user} = useSelector((state)=>state.auth);

    
    const [friends , setFriends] = useState(user?.friends);
    const [showFriends , setShowFreinds] = useState(false);
    
    useEffect(()=>{
        
        setFriends(friends);
        
    } , [friends])
    
  return (

    <div className='flex flex-col  w-[100%]  lg:bg-transparent md:bg-transparent   '>

    <TbFriends onClick={()=> setShowFreinds(!showFriends)} className='lg:hidden md:hidden sm:visible  visible  text-[25px]'/>
 
    
    <div className={`lg:flex md:flex flex-col sm:${showFriends?"visible":"hidden"} ${showFriends?"visible":"hidden"} lg:ml-0 md:ml-0  lg:relative md:relative absolute lg:bg-transparent md:bg-transparent sm:bg-zinc-800 bg-zinc-800  ml-[-100px] left-[-5px]  top-8 rounded-md lg:max-h-[40vh] md:max-h-[40vh] sm:max-h-[30vh] max-h-[30vh] overflow-y-scroll overflow-x-hidden scroll-smooth`}>
      <h1 className='sm:hidden lg:flex md:flex hidden'>Friend List</h1>

      <div className='flex flex-col gap-3 '>

      {
        friends!==undefined && friends.map((friend , index)=>{
           return <FriendBar key={index} friend={friend} setFriends ={setFriends} friends={friends}/>
        })
      }
      </div>
    </div>

    </div>

  )


}

export default UserFriends