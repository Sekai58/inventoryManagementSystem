import {useEffect, useState} from 'react'
import {Zoom} from 'react-reveal'
import { Link } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {showRole, unauthenticate} from '../../features/showSlice';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const Navbar = () => {
  const [isClicked,setIsClicked] = useState('inventory')
  const [role,setRole] = useState('')
  const dispatch = useDispatch()
  const location = useLocation();

  console.log("pathname at navber",location.pathname)
  const data = useSelector((c:any)=>{
    return c.show.value
})

useEffect(() => {
  const fetchdata = async()=>{
    await axios.post('http://localhost:7000/api/user/auth',{}, {
      headers: {
        Authorization: `${(localStorage.getItem('token'))}`,
      },
    })
    .then(response => {
        console.log("user data here at navbar",response.data)
        // dispatch(showRole(response.data))
        setRole(response.data.role)
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  fetchdata()
}, [data]);

// const role = useSelector((status:any)=>{
//   console.log("redux state here",status.role)
//   return status.role
// })

  const handleLogout = ()=>{
    localStorage.removeItem('token')
    dispatch(unauthenticate())
  }

  return (
  <div className="fixed top-0 left-0 z-[99] w-full bg- transparent bg-gradient-to-r from-[#0b0b0b] via-[#383838] to-[#060606]">
  {/* <div className="fixed top-0 left-0 z-[99] w-full bg- transparent"> */}
    <div className={`flex px-3 py-3 justify-between sm:px-10 sm:py-5 items-center`}>
        <div className="flex gap-6 items-center">
          <div className="flex items-center">
            <i className="fa-regular fa-snowflake bg-transparent text-[#7878bc] text-2xl"></i>
            <div className="font-bold text:xl sm:text-2xl lg:text-3xl text-white">inventory</div>
          </div>
        </div>
        {data?
        <Zoom>
        <div className='flex'>
          <button className={`hidden ${(role==='ADMIN')?'sm:flex':'sm:hidden'} items-center pr-3 pl-1 mr-4 border-r-[3px] rounded-[4px] ${(location.pathname=='/')?'border-[#7878bc] text-[#7878bc]':'border-[#ababab] text-[#555555]'}  hover:border-[#7878bc] hover:text-[#7878bc] hover:shadow-sm hover:shadow-[#7878bc]`} onClick={()=>setIsClicked('home')}>
            {/* <i className="fa-regular fa-snowflake"></i> */}
            <i className="fa-solid fa-gauge"></i>
            <span className=' text-[#ababab]'><Link to='/'>Dashboard</Link></span>
          </button>
          <button className={`hidden ${(role==='ADMIN')?'sm:flex':'sm:hidden'} items-center pr-3 pl-1 mr-4 border-r-[3px] rounded-[4px] ${(location.pathname=='/users')?'border-[#7878bc] text-[#7878bc]':'border-[#ababab] text-[#555555]'}  hover:border-[#7878bc] hover:text-[#7878bc] hover:shadow-sm hover:shadow-[#7878bc]`} onClick={()=>setIsClicked('about')}>
            {/* <i className="fa-regular fa-snowflake"></i> */}
            <i className="fa-solid fa-users"></i>
            <span className=' text-[#ababab]'><Link to='/users'>Users</Link></span>
          </button>
          <button className={`hidden sm:flex items-center pr-3 pl-1 mr-4 border-r-[3px] rounded-[4px] ${(location.pathname=='/auth')?'border-[#7878bc] text-[#7878bc]':'border-[#ababab] text-[#555555]'}  hover:border-[#7878bc] hover:text-[#7878bc] hover:shadow-sm hover:shadow-[#7878bc]`} onClick={()=>setIsClicked('inventory')}>
            {/* <i className="fa-regular fa-snowflake"></i> */}
            <i className="fa-solid fa-boxes-stacked"></i>
            <span className=' text-[#ababab]'><Link to='/auth'>Inventory</Link></span>
          </button>
        </div>
        </Zoom>
        :<></>}

        {data?(
          <div>
            <Link to='/logout'>
              <button className=" px-4 py-1 mr-2 text-white border-[1.6px] border-[#7878bc] bg-transparent shadow-[#7878bc] shadow-sm hover:shadow-md hover:shadow-[#7878bc] rounded-md" onClick={handleLogout} >Log out</button>
            </Link>
          </div>
        ):(
          <div className="flex">
          <div>
            <Link to="/login">
              <button className=" px-4 py-1 mr-2 text-white border-[1.6px] border-[#7878bc] bg-transparent shadow-[#7878bc] shadow-sm hover:shadow-md hover:shadow-[#7878bc] rounded-md" >Log in</button>
            </Link>
          </div>
          <div>
            <Link to="/register">
              <button className="px-4 py-1 border-[1.5px] border-[#7878bc] bg-[#7878bc] shadow-[#ffffff] shadow-sm hover:shadow-md hover:shadow-[#ffffff] rounded-md text-white" >Sign up</button>
            </Link>
          </div>
        </div>  
        )}
    </div>
</div>
  )
  }
export default Navbar