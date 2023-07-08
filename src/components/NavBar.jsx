import React, { useEffect } from 'react'
import { useState } from "react";
import { setLogout } from '../state';
import {useDispatch , useSelector} from "react-redux"
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {toast} from "react-hot-toast"
import {ImHome} from "react-icons/im"
import {FiSearch} from "react-icons/fi"
import {BiLogOut} from "react-icons/bi"
import { search } from '../services/operations/authApi';
import {Link} from "react-router-dom"
import {AiOutlineCloudUpload , AiOutlineMenu} from "react-icons/ai"
import {TbFriends} from "react-icons/tb"

const NavBar = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  let {user} = useSelector((state)=>state.auth);
  
  const logOutHandler=()=>{
    toast.success("logged out")
    // console.log("logging out");
    dispatch(setLogout());
    navigate("/")
  }

  
  // new code
  const [loading,setLoading] = useState(true);
  const [formData , setFormData] = useState({
    email:""
  })

  const[showDiv , setShowDiv] = useState(false);
  const [searchResults , setSearchResults] = useState([]);
  const changeHandler=(event)=>{
 
    setFormData((prev)=>{
      return {...prev , [event.target.name]:event.target.value}
    })
    setLoading(true);
    setShowDiv(true);
    dispatch(search(formData?.email , setSearchResults ));
    if(searchResults===[]){
      setLoading(true);
      setShowDiv(true);
    }else{
      setLoading(false);

    }
  }
  
  useEffect(()=>{
    if(formData?.email!=""){

      setLoading(true);
      dispatch(search(formData?.email , setSearchResults));
      setLoading(false);
    }else{
      setLoading(true);//just now
      setSearchResults([]);
    }

  } , [formData?.email])

  return (

    <>
      {
        user===null?(<>
          <div className='flex justify-around items-center flex-row '>
          <h1 className='from-neutral-800 text-4xl '>ShareSphere</h1>
          </div>
        </>):(<>
                <div className='  flex justify-around items-center lg:flex-row  md:flex-row 
                sm:flex-col sm:gap-3
                flex-col gap-2
                border-[1px] border-neutral-900
                border-b-neutral-600 py-[2px] flex-wrap  '>
                <Link to="/home">

                <h1 className='from-neutral-800 text-4xl '>ShareSphere</h1>
                </Link>
                
                <div className="flex flex-row gap-3 items-center lg:relative md:relative sm:relative relative "> 
                <div className='relative flex lg:flex-row md:flex-row sm:flex-row flex-col'>
                <Link to="/home"><ImHome className='self-end lg:flex md:flex sm:flex hidden'/></Link>
                
                
                </div>


                <input type='text' name="email" placeholder='Search'  className='self-center focus:outline-none font-medium  ' autoComplete="off"  
                onFocus={(event)=>{
                  setShowDiv(true); 
                  if(event.target.value==""){
                    setLoading(true);
                  }else{
                    setLoading(false);
                  }
                
                }}  onBlur={()=>{
                 
                  setLoading(true);
                  }} onChange={changeHandler} />

                
                
                <FiSearch className="text-2xl animate-pulse" onClick={()=>setShowDiv(!showDiv)} />
               
                {
                  
                     showDiv && 
                     <div className="absolute  top-7 lg:top-9 left-0 right-0 min-h-min max-h-56 h-max bg-neutral-300  overflow-y-scroll scroll-smooth  rounded-[5px] scrollbar-thin scrollbar-transparent shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]  overflow-x-hidden z-10">
                          {


                            loading &&
                            <div className='w-[100%] flex justify-center'>
                            <div class="custom-loader "></div>

                            </div>

                          }
                          {
                            searchResults.length===0 && formData?.email!=="" && <div>

                              <p className='text-xl px-2 py-3 text-center'>No users Found</p>
                            </div>
                          }

                          {
                            searchResults.map((user,index)=>{
                              return <div  key={index} className="flex flex-row w-[100%]   px-2 py-2 rounded-sm gap-2  border-b
                                 border-b-slate-200">
                                <div className='w-[40px] min-w-[40px]'>
                                  <img src={`${user?.profilePic}`} className='border-2 border-slate-500 w-[40px] object-cover aspect-square rounded-[50%]' alt="" />
                                </div>
                                <Link to={`/profile/${user?._id}`}>
                                <div className=' text-slate-950 text-sm self-center w-fit max-w-[80px]  ' onClick={()=> navigate(`/profile/${user?._id}`)}>
                                  {user?.email}
                                </div>

                                </Link>
                              </div>
                    
                            })
                          }
                          
                     </div>
                }


                </div>
                
                <span  onClick={logOutHandler} className='py-[3px] bg-neutral-800 border-2 border-neutral-600 border-solid rounded-[5px] w-[120px] hover:scale-95 transition hover:bg-white hover:text-neutral-900 hover:border-gray-500 capitalize font-medium text-sm box-border hidden flex-row justify-evenly sm:text-sm lg:text-lg md:text-md lg:flex md:flex sm:hidden'> <span >logout</span> <BiLogOut className="self-center animate-pulse"/> 
                </span>
              </div>
              
        </>)
      }
    

    </>

  )
}

export default NavBar