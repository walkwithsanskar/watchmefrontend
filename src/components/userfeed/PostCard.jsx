import React, { useEffect, useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import LazyLoad from 'react-lazy-load';
import Comment from './Comment';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../services/operations/postApi';
import {AiOutlineUserAdd , AiOutlineUserDelete} from "react-icons/ai"
import { FaCommentMedical } from 'react-icons/fa';
import {Link , useNavigate} from "react-router-dom";
import { addFriendById,removeFriendById } from '../../services/operations/userApi';
import {FcLike , FcDislike , FcLikePlaceholder} from "react-icons/fc"
import { createLike , removeLike } from '../../services/operations/postApi';
const PostCard = ({ post , friends , setFriends }) => {
  const { user } = useSelector((state) => state.auth);
  const userLikesOnCurrentPost = [];
  post?.likes.forEach((like)=>{
    userLikesOnCurrentPost.push(like?.user_id);
  })


  // const friends = user?.friends;





  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likeCount , setLikeCount] = useState(post?.likes.length);
  const [liked,setLiked] = useState(userLikesOnCurrentPost.includes(user?._id));
  const {friendsOfUser} = useSelector((state)=>state.auth);
  const [addFriend , setAddFriend] = useState(userLikesOnCurrentPost.includes(post?.user_id?._id));
  
  const [showComments, setShowComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({
    comment: '',
  });
  const [visibleComments, setVisibleComments] = useState(3); // Number of initially visible comments
  

  const formHandler = (event) => {
    setFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const commentHandler = (event) => {
    event.preventDefault();
    dispatch(createComment(formData, post?._id));
  };

  const addComment = () => {
    if (formData.comment !== '') {
      setComments((prev) => {
        return [...prev, formData.comment];
      });
      if(showComments==false){
        setShowComment(true);
      }
    }
  };

  const handleShowComments = () => {
    setShowComment(!showComments);
    setVisibleComments(3); // Reset the number of visible comments
  };

  const handleLoadMore = () => {
    setVisibleComments((prevVisibleComments) => prevVisibleComments + 3); // Increase the number of visible comments
  };

  const profileImageClick=()=>{

              navigate(`/profile/${post?.user_id?._id}`)

  }

  useEffect(()=>{
      setFriends(friends);
  } , [friends])

  return (
    <div className="flex flex-col items-start  mb-8   lg:w-[35vw] md:w-[35vw] sm:w-[100%] w-[100%] border-[2px] border-neutral-900 border-b-neutral-500">
      <div className="flex flex-row justify-between w-[100%] border-[1px]
      border-neutral-900 self-center
      py-1 px-2">
      <div className='flex flex-row gap-3'>

        

       
        <span className='coursor-pointer'  onClick={profileImageClick} >
        <LazyLoad once threshold={0.99}>

        <img src={post?.user_id?.profilePic} alt="" className="rounded-[50%] aspect-square object-cover w-[40px]  min-w-[40px] cursor-pointer border-2"/>

        </LazyLoad>

        </span>
        

        <div>
          <Link to={`/profile/${post?.user_id?._id}`}>
                    <h1 className="text-yellow-200">{post?.user_id?.email}</h1>

          </Link>
          <Link to={`/profile/${post?.user_id?._id}`}>
          <span>{post?.user_id?.firstName}</span>
            
            </Link>
        </div>

      </div>
                <div>
                    
                {
                  
                 !friends.includes(post?.user_id?._id) ?  <AiOutlineUserAdd className='text-white text-2xl' 
                    onClick={(event)=> {
                      
                    setFriends((prev)=>{
                      return [...prev , post?.user_id?._id]
                    })
                    dispatch(addFriendById(post?.user_id._id,setAddFriend,addFriend))}
                    }
                />: <AiOutlineUserDelete className='text-white  text-2xl' 
                onClick={(event)=> {
                  setFriends((prev)=>{
                    return prev.filter((curr)=> curr!=post?.user_id?._id)
                  })
                dispatch(removeFriendById(post?.user_id._id,setAddFriend,addFriend))}
                } 
                />
                }
                  </div>
                  


               
      </div>
      <div className="flex flex-row justify-center items-center shadow-2xl w-[100%]">
      

        <LazyLoad once threshold={0.99}>
       
          <img src={post?.postUrl} alt="post image" className="w-[400px] aspect-auto object-cover cursor-pointer" loading="lazy" />

       
        </LazyLoad>
      
      </div>
      <div className='self-start w-[80%]'>
            {
              liked?<FcLike  className='text-[30px]' onClick={()=>{
                 
                 setLiked(!liked);
                 setLikeCount(likeCount - 1);
                dispatch(removeLike(post?._id));
              }}/>:<FcLikePlaceholder className='text-[30px]'
              onClick={()=>{
                setLiked(!liked);
                setLikeCount(likeCount + 1);
                dispatch(createLike(post?._id));
              }}
              />
            }
            <span className='text-[12px] '>liked by  {likeCount} others </span>
        <p> 
        <span className="font-bold"> {post?.user_id?.firstName+ " "+post?.user_id?.lastName +" "}</span>
        <span className="font-extralight">
          
        {post?.caption}
        </span>
        </p>
      </div>
      <div className="flex flex-col items-start w-[100%]">
        <h1 onClick={handleShowComments} className="cursor-pointer">
          Comments
        </h1>
        {showComments && (
          <div className="flex flex-col items-start w-[100%] h-[20vh] overflow-y-auto ">
            {post?.comments.slice(0, visibleComments).map((comment,index) => {
              return <Comment comment={comment}  key={index}  setComments={setComments} />;
            })}
            {showComments && comments.length !== 0 && (
          <div className="w-[100%] flex flex-col gap-0">
            {comments.map((comment, index) => {
              return (
                <div className="flex lg:flex-row md:flex-row flex-col lg:gap-[20px] md:gap-[20px] gap-2 w-[100%] " key={index}>
                  <div className="flex flex-row gap-1 w-[30%]">

                  <div  className='h-[40px] min-w-[40px] flex justify-between items-center self-center'>
                  <Link to={`/profile/${post?.user_id?._id}`}>
                 
                    <img src={user?.profilePic} className="rounded-[50%] w-[30px]    min-w-[30px] aspect-square object-cover" alt="" />

                  </Link>
                  </div>
                  <Link to={`/profile/${post?.user_id?._id}`}>
                    <h1 className='text-[12px] min-w-fit font-bold pt-2 '>{user?.email.split('@')[0]}</h1>

                  </Link>
                  </div>
                  <h1 className="w-[100%] overflow-x-hidden whitespace-pre-wrap break-words  bg-neutral-800 px-1 self-center py-1 rounded-[3px] text-[12px] ">{comment}</h1>
                </div>
              );
            })}
          </div>
        )}
          </div>
        )}
        {showComments && post?.comments.length > 0 && visibleComments < post?.comments.length && (
          <button className="text-blue-500 mt-2" onClick={handleLoadMore}>
            Load More
          </button>
        )}
        {showComments && post?.comments.length === 0 && <div>No comments lately</div>}
        
      </div>
      <div className="w-[100%] mb-3">        <form onSubmit={commentHandler} className="w-[100%] flex lg:flex-row md:flex-row sm-flex-col flex-col justify-between items-center">
          <input
            type="text"
            name="comment"
            placeholder="Enter comment"
            className="comment rounded-lg px-[4px] py-[5px] appearance-none w-[70%] bg-transparent focus:outline-none text-yellow-300 self-stretch "
            onChange={formHandler}
            required title="Plase fill out this field"
            maxLength = "300"/>
          <button className="className='py-[3px] bg-neutral-800 border-2 border-neutral-600 border-solid rounded-[5px] px-2 py-1 hover:scale-95 transition hover:bg-white hover:text-neutral-900 hover:border-gray-500 capitalize font-medium lg:text-lg md:text-base sm:text-sm text-sm box-border flex flex-row gap-3  '" onClick={addComment} >
            <span >Comment  </span> <FaCommentMedical className='self-center text-[18px] animate-pulse'/>
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCard;
