import React , {useEffect,useState} from 'react'
import ProfileDetails from '../../components/profile components/ProfileDetails'
import UserPosts from "../../components/profile components/UserPosts"
import UserFriends from '../../components/profile components/UserFriends'
import { useLocation } from 'react-router-dom'
import { useDispatch , useSelector} from 'react-redux'
import { setUserFetchedById } from '../../state'
import {GiHamburgerMenu} from "react-icons/gi"
import {TbFriends} from "react-icons/tb"
import {AiOutlineHome} from "react-icons/ai"
import {fetchUserDetails} from "../../services/operations/userApi"
import { Link } from 'react-router-dom'
const ProfilePage = () => {
  const location = useLocation();
  const {userFetchedById} = useSelector((state)=>state.auth);
  const [userId , setuserId] = useState(location.pathname.split("/")[2]);
  
  const dispatch = useDispatch();
  const [showMenu , setShowMenu] = useState(false);
  const [showFriends, setShowFreinds] = useState(false);
  

  useEffect(()=>{
        
        
        dispatch(fetchUserDetails(userId));
        setuserId(userId);
     
        


  } , [userId])
 
  return (
    <div className='flex lg:flex-row md:flex-row flex-col  justify-evenly'>

      <div className='flex  lg:flex-col md:flex-col lg:gap-10 md:gap-10  flex-row  lg:justify-start md:justify-start justify-center gap-3 relative '>

                <Link to="/home">
                        <AiOutlineHome className='lg:hidden   md:hidden sm:hidden flex text-xl'/>

                </Link>
                      <GiHamburgerMenu className='lg:hidden   md:hidden flex text-xl'  onClick={()=>setShowMenu(!showMenu)}/>
                      <TbFriends className='lg:hidden   md:hidden flex text-xl'  onClick={()=>setShowFreinds(!showFriends)}/>
                    <div className={`lg:flex md:flex  ${showMenu?"flex":"hidden"} lg:relative md:relative absolute  top-5`}  >

                    {/* userdetails page */}
                    <ProfileDetails/>
                    </div>

                  <div className={`lg:flex md:flex  ${showFriends?"flex":"hidden"} sm:bg-gray-600 bg-gray-600 lg:bg-transparent md:bg-transparent lg:relative md:relative absolute top-5 rounded-md px-2 py-2 overflow-y-scroll overflow-x-hidden max-h-[70vh] max-w-fit`}>
                  
                  {/* user ke frands */}
                  <UserFriends userId = {userId}/>

                  </div>
      </div>

      {/* user ki posts */}
      <UserPosts/>

    </div>
  )
}

export default ProfilePage