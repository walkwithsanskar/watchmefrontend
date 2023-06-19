import React from 'react'
import { useState } from 'react'
import {useDispatch , useSelector} from "react-redux"
import { signUp , logIn } from '../../services/operations/authApi'
import { useLocation, useNavigate} from "react-router-dom"
import { useEffect } from 'react'
import {toast} from "react-hot-toast"
const Login = () => {
  const authState = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const location =useLocation();
  const navigate = useNavigate();
  const [formData , setFormData] = useState({
    email:"",
    password:""
  })
  const [signUpData, setSignUpData] = useState({

    firstName:"",
    lastName:"",
    email:"",
    password:""


  })
  const [haveAccount,setHaveAccount] = useState(true);
  const [file, setFile] = useState();

  
  const handleImage = (event) =>{
    setFile(event.target.files[0]);
  }

  const changeHandler=(event)=>{
    setFormData((prevState)=>{

      return {...prevState,
      [event.target.name]:event.target.value};
    })


  }

  const signUpChangeHandler=(event)=>{
          
    setSignUpData((prev)=>{

            return {...prev,[event.target.name]:event.target.value}
          })

 }
  const handleSubmit=(event)=>{
    event.preventDefault();
    
    dispatch(logIn(formData,navigate,authState));
    

  }
  const handleSignUpSubmit = async (event)=>{
    event.preventDefault();

    
    const formdataup = new FormData();
    Object.entries(signUpData).forEach(([key, value]) => {
      formdataup.append(`${key}`, `${value}`);
    });

    formdataup.append("profilePic",file);
    

    dispatch(signUp(formdataup,haveAccount,setHaveAccount));

    

  
    // console.log(formdataup);
  //   const options = {
  //     method: 'POST',
  //     // headers: {
  //     //   'Content-Type': 'application/json',
        
  //     // }
  //     // ,
  //     body:formdataup,
  //   };
  //   const res = await fetch("http://localhost:4000/api/v1/auth/signUp",options);
  //   const resjson = await res.json();
  //   console.log(resjson);

  }

  
  return (


    <div className='flex flex-col items-center w-11/12 mx-auto'>

      {
        haveAccount?
        (<form className='flex justify-around mt-7 flex-col items-center h-[30vh] ' onSubmit={handleSubmit}>
              <h1 className='text-2xl'>Login</h1>
              <input type="email" placeholder='enter email' name="email" value={formData.email} onChange={changeHandler}  className='self-stretch focus:outline-none  border-2 border-neutral-900
                 border-b-neutral-700 border-solid ' required/>
              <input type="password" placeholder='enter password' name="password" value={formData.password} onChange={changeHandler} className='self-stretch focus:outline-none  border-2 border-neutral-900
                 border-b-neutral-700 border-solid '  required/>
              <button type='submit' className='py-[3px] bg-neutral-800 border-2 border-neutral-600 border-solid rounded-[5px]  hover:scale-95 transition hover:bg-white hover:text-neutral-900 hover:border-gray-500 capitalize font-semibold lg:text-md md:text-base sm:text-sm text-sm box-border flex flex-row justify-around  w-[100%]'>Submit</button>
    </form>)
    :
    (<form  className='flex gap-3  mt-7 flex-col items-center h-fit  ' onSubmit={handleSignUpSubmit}>

        <input type="text" name="firstName" value={signUpData.firstName} onChange={signUpChangeHandler}  className='self-stretch focus:outline-none  border-2 border-neutral-900
                 border-b-neutral-700 border-solid ' placeholder='first name' maxLength="15"   required/>

        <input type="text" name="lastName" value={signUpData.lastName} onChange={signUpChangeHandler}  className='self-stretch focus:outline-none  border-2 border-neutral-900
                 border-b-neutral-700 border-solid ' placeholder='last name' maxLength="15"  required/>

        <input type="email" name="email" value={signUpData.email} onChange={signUpChangeHandler}  maxLength="30" className='self-stretch focus:outline-none  border-2 border-neutral-900
                 border-b-neutral-700 border-solid ' placeholder='email' required/>

        <input type="password" name='password' value={signUpData.password} onChange={signUpChangeHandler}  className='self-stretch focus:outline-none  border-2 border-neutral-900
                 border-b-neutral-700 border-solid ' placeholder='password' required/>

        <label htmlFor="img" className='self-start opacity-20'>Upload Profile Pic</label>
        <input type="file" id='img' name="profilePic" onChange={handleImage}  className='self-stretch focus:outline-none  border-2 border-neutral-900
                 border-b-neutral-700 border-solid '  required/>

        <button type='submit' className='py-[3px] bg-neutral-800 border-2 border-neutral-600 border-solid rounded-[5px]  hover:scale-95 transition hover:bg-white hover:text-neutral-900 hover:border-gray-500 capitalize font-semibold lg:text-md md:text-base sm:text-sm text-sm box-border flex flex-row justify-around  w-[100%]' >Submit</button>




    </form>)
      }


    
    {
            haveAccount&& <span className='cursor-pointer  text-blue-300' onClick={()=>setHaveAccount(!haveAccount)}>
                  dont have account sign up here

         </span>
    }
    
    {
      !haveAccount && <span onClick={()=>setHaveAccount(!haveAccount)} className='cursor-pointer text-blue-300'> already have an account login here</span>
    }

    </div>
  )
}

export default Login