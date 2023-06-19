import React ,{useEffect , useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FriendBar from '../userfeed/FriendBar';
import { fetchUserDetails } from '../../services/operations/userApi';
import { useLocation } from 'react-router-dom';
import ProfileFriends from "./ProfileFriends";
const UserFriends = () => {
  //this is previous code
    const {userFetchedById} = useSelector((state)=>state.auth);

    


    const dispatch = useDispatch();
    const location = useLocation();
    const [userId , setUserId] = useState("");
    const [friends , setFriends] = useState(undefined);
    
    useEffect(()=>{
      
      
      setUserId(location.pathname.split("/")[2])
      setFriends(userFetchedById?.friends);  
      
      


    } , [location.pathname , friends , userFetchedById]);
    
  return (
    <div>
      <h1 className='text-center border-b'>{userFetchedById?.firstName}'s Friends</h1>
      <div className='flex flex-col gap-3'>


          {

             friends!==undefined && friends.map((friend,index)=>{

                  return   <div key={index} className='flex flex-col gap-4 md:border-b'>

                  <ProfileFriends friend={friend} key={index} />
                 
                  </div>

            })


          }


      </div>
    </div>
  )


}

export default UserFriends