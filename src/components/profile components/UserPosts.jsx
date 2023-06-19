import React from 'react'
import {useState , useEffect} from "react"
import { useSelector , useDispatch } from 'react-redux';
import PostCard from '../userfeed/PostCard';
import { getUserFriends } from '../../services/operations/userApi';
import { getFeedPosts } from '../../services/operations/postApi';
const UserPosts = () => {

  const {userFetchedById} = useSelector((state)=>state.auth);
  // const [posts , setPosts] = useState(userFetchedById?.posts);
  const posts=userFetchedById?.posts;

  const { friendsOfUser } = useSelector((state) => state.auth);
  const [friends , setFriends] = useState(friendsOfUser);
  const [feedPosts,setFeedPosts] = useState([]);
  const [loading , setLoading] = useState(true);
  




  const dispatch = useDispatch();
  
  useEffect(()=>{
    
    
    dispatch(getUserFriends());
    dispatch(getFeedPosts(setFeedPosts,setLoading,feedPosts));

   

  }, [friends]);
  

  

  return (
    <div >
   
    <div className='mt-2  '>
            {
               posts!==undefined && posts.length>0 && posts.map((post,index)=>{
                return <PostCard post={post} key={index}  friends={friends} setFriends={setFriends}/>
              })
            }
        </div>

    
    </div>
  )
}

export default UserPosts