import React  , {useState , useEffect} from 'react'
import { useSelector , useDispatch  } from 'react-redux'
import {createPost} from "../services/operations/postApi"
import {BsCloudUploadFill} from "react-icons/bs"
import LazyLoad from 'react-lazy-load'
import { FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const UploadPost = () => {
    const {user} = useSelector((state)=>state.auth);
    const [file,setFile] = useState();
    const [caption,setCaption] = useState("");
    const [preview , setPreview] = useState(null);//this will contain image url that can    be    used to preview the image to user 
    const [previewPosts,setPreviewPosts] = useState([]);
    const dispatch = useDispatch();

   
    const previewHandler= async ()=>{

            if(file){
              const render = new FileReader();
    
              render.onload = () =>{
                       
                      setPreview(render.result);
                      setPreviewPosts((prev)=>[...prev , preview]);
              }

              render.readAsDataURL(file);

        
              

            }

    }


    const postHandler =(event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("postFile",file);
        formData.append("caption",caption);
        dispatch(createPost(formData));
    }

    useEffect(() => {
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }, [file]);


  return (
    <div>
        <h1 className='lg:text-2xl md:text-xl sm:text-lg text-base mb-2 text-center'>Hi ! {`${user.firstName}`} let's share something wonderful </h1>
        <form onSubmit={postHandler} className='flex flex-col items-start gap-3'>
                

                <input type="file"  className='appearance-none   text-sm text-neutral-400'  onChange={(event)=> setFile(event.target.files[0])} required/>
                
               
               {/* newly added */}
                

                <input type = "text" className='self-stretch focus:outline-none  border-2 border-neutral-900
                 border-b-neutral-700 border-solid '  placeholder='enter caption for you post' onChange={(event)=> setCaption(event.target.value)} value={caption} required />
                <button type="submit" className='py-[3px] bg-neutral-800 border-2 border-neutral-600 border-solid rounded-[5px] w-[130px] hover:scale-95 transition hover:bg-white hover:text-neutral-900 hover:border-gray-500 capitalize font-semibold lg:text-md md:text-base sm:text-sm text-sm box-border flex flex-row justify-around sm:self-center lg:self-start md:self-start self-center' onClick={previewHandler}> <span > create post  </span>
                <BsCloudUploadFill className="self-center animate-bounce"/> 
                </button>
             
        </form>
      {
        previewPosts.length > 0 && previewPosts.map((imgurl,index)=>{

          return   <div key={index} className='mt-4'>
        <div className="flex flex-row justify-between w-[100%] border-[1px]
      border-neutral-900 self-center
      py-1 px-2">
      <div className='flex flex-row gap-3'>

        

       
        
        <LazyLoad once threshold={0.99}>

        <img src={user?.profilePic} alt="" className="rounded-[50%] aspect-square object-cover w-[40px]  cursor-pointer border-2"/>

        </LazyLoad>
          
    
        

        <div>

        <Link to={`/profile/${user?._id}`}>
            
              <h1 className="text-yellow-200">{user?.email}</h1>

        </Link>

          
        <Link to={`/profile/${user?._id}`}>
          <span>{user?.firstName}</span>

        </Link>
      
            
         
        </div>

      </div>
        <FaUserPlus />
      </div>
      <div className="flex flex-row justify-center items-center shadow-2xl w-[100%]">
      

        <LazyLoad once threshold={0.99}>
       
          <img src={imgurl} alt="post image" className="w-[400px] aspect-auto object-cover cursor-pointer" loading="lazy" />

       
        </LazyLoad>
      
      </div>
      <div className='self-start w-[80%]'>
        <p> 
        <span className="font-bold"> {user?.firstName+ " "+user?.lastName +" "}</span>
        <span className="font-extralight">
          
        {caption}
        </span>
        </p>
      </div>
        </div>

        })
      }
    </div>

  )
}

export default UploadPost