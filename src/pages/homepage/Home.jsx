import React from 'react'
import UserDetails from '../../components/UserDetails'
import UploadPost from '../../components/UploadPost'
import UserFeed from '../../components/UserFeed'
import UserFriends from '../../components/UserFriends'
import {setLogout} from "../../state/index"
import { useEffect , useState } from 'react'
import { ImHome } from 'react-icons/im';
import {useNavigate} from "react-router-dom"
import {toast} from "react-hot-toast"
import { useDispatch, useSelector  } from 'react-redux'
import {BsFillCloudUploadFill } from "react-icons/bs"
import {Link} from "react-router-dom"

const Home = () => {

  
  const {user} = useSelector((state)=> state.auth);
  const [show,setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{

    if(user==null){
      navigate("/");
      dispatch(setLogout());
    }

  },[]);

  

  if(user!==null){
    
    return (
      <div className='flex lg:flex-row justify-evenly mx-auto w-11/12 md:flex-row sm:flex-col flex-col gap-3 relative '>

        <div className=' mx-auto w-max'>

      <div className='sticky top-4 left-4 right-auto bottom-auto flex flex-row lg:w-[100%] md:w-[100%]  lg:flex-col md:flex-col w-[100%] sm:flex-row gap-6   '>
            <Link to="/home"><ImHome className='self-end lg:hidden md:hidden sm:hidden visible'/></Link>
           
            <div className='md:w-[100%] lg:w-[100%] w-[100%] flex flex-row '>

            {/* userDetails widget */}
            <div className=' w-[100%]'>
                    

                    <UserDetails/>

            </div>

            </div>

              <div className='md:w-[100%] lg:w-[100%] w-[100%] flex flex-row justify-center h-max self-center'>
              {/* {user freinds} */}
              <UserFriends/>
              </div>
      </div>
        </div>

        {/* UploadPost */}
        <div className='md:w-[60%] lg:w-[60%] w-[100%] flex flex-col justify-center items-center'>
        <BsFillCloudUploadFill className='text-lg lg:hidden md:hidden sm:flex flex ' onClick={()=>setShow(!show)}/>
        <div className={`${show?"flex":"hidden"} lg:flex md:flex sm:${show?"flex":"hidden"}`}>
              

              <UploadPost/>

        </div>
        {/* user feed */}
        <UserFeed/>
        </div>
        
        
      </div>
    )
  }
  
}

export default Home