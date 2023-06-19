import React from 'react'
import { useEffect , useState } from 'react'
import { setUserFeed } from '../state';
import Spinner from './Spinner';
import { getFeedPosts } from '../services/operations/postApi';
import { useDispatch , useSelector } from 'react-redux';
import PostCard from './userfeed/PostCard';
import { getUserFriends } from '../services/operations/userApi';

const UserFeed = () => {
  const { friendsOfUser } = useSelector((state) => state.auth);
  const [friends , setFriends] = useState(friendsOfUser);
  const [feedPosts,setFeedPosts] = useState([]);
  const [loading , setLoading] = useState(true);
  const [friendList , setFriendList] = useState(true);




  const dispatch = useDispatch();
  
  useEffect(()=>{
    
   
    dispatch(getUserFriends());
    dispatch(getFeedPosts(setFeedPosts,setLoading,feedPosts)); 

  }, [friends]);
  



  return (
    <div className='mt-6 w-[100%] flex flex-col' >
      

      {
        loading ? 

        (<Spinner/>) 
        :
        (<div className='mt-2  w-[100%] flex items-center flex-col'>
            {
              feedPosts.map((post,index)=>{
                return <PostCard post={post} key={index}  friends={friends} setFriends={setFriends} />
              })
            }
        </div>)
      }


    </div>
  )
}

export default UserFeed