import React, { useState } from 'react';
// import {useSelector} from "react-redux";
import { setLogout } from '../state';
import { Navigate, useNavigate } from 'react-router-dom';
import {BiLogOut} from "react-icons/bi"
import {useDispatch , useSelector} from "react-redux"
import {toast} from "react-hot-toast"

import {GiHamburgerMenu} from "react-icons/gi"
import {AiOutlineMenuUnfold , AiOutlineMenuFold} from "react-icons/ai"

const UserDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const {user} = useSelector((state)=> state.auth);
    const logOutHandler=()=>{
      toast.success("logged out")
     
      dispatch(setLogout());
      navigate("/")
    }

    const [menu , setMenu ] = useState(false);
    

  return (

    <div className='flex flex-col items-center relative z-40'>

    {
      
      menu?<AiOutlineMenuFold  className='lg:hidden md:hidden sm:visible visible text-xl' onClick={()=>setMenu(!menu)} />:<AiOutlineMenuUnfold  className='lg:hidden md:hidden sm:visible visible text-xl' onClick={()=>setMenu(!menu)}/>
    }
    


    <div className={`lg:flex lg:flex-row md:flex md:flex-row  gap-3  bg-zinc-800 h-min  px-2 py-3 rounded-md border-2 w-fit  flex-wrap justify-center sm:${menu?'flex':'hidden'}    ${menu?'flex':'hidden'} lg:relative md:relative sm:absolute absolute top-5 left-auto right-auto bottom-auto  `}>
    <div className='w-[100%] flex justify-center self-center '>

        <img src={user.profilePic} alt=""  className='rounded-[50%] aspect-square object-cover w-[50px] animate-pulse md:animate-pulse sm:animate-pulse lg:animate-bounce  '/>
    </div>
        <div className="flex flex-col justify-center items-center ">

        <h1>welcome ! {`${user.firstName +" " + user.lastName} `}</h1>
        
        <h1>{user.email}</h1>
        </div>
        <div>
        <span  onClick={logOutHandler} className='py-[3px] bg-neutral-800 border-2 border-neutral-600 border-solid rounded-[5px] w-[120px] hover:scale-95 transition hover:bg-white hover:text-neutral-900 hover:border-gray-500 capitalize font-medium text-sm box-border flex flex-row justify-evenly sm:text-sm lg:text-lg md:text-md lg:hidden md:hidden sm:visible  '> <span >logout</span> <BiLogOut className="self-center animate-pulse"/> 
                </span>
        </div>



    </div>

    </div>

  )
}

export default UserDetails