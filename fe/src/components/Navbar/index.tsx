import {useState,useEffect} from 'react'
import {Zoom} from 'react-reveal'
// import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const [isClicked,setIsClicked] = useState('inventory')

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = ()=>{
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  return (
  <div className="fixed top-0 left-0 z-[99] w-full bg- transparent bg-gradient-to-r from-[#0b0b0b] via-[#383838] to-[#060606]">
    <div className={`flex px-3 py-3 justify-between sm:px-10 sm:py-5 items-center`}>
        <div className="flex gap-6 items-center">
          <div className="flex items-center">
            <i className="fa-regular fa-snowflake bg-transparent text-[#7878bc] text-2xl"></i>
            <div className="font-bold text:xl sm:text-2xl lg:text-3xl text-white">inventory</div>
          </div>
        </div>
        <Zoom>
        <div className='flex'>
          <a href='/'>
          <button className={`flex items-center pr-3 pl-1 mr-4 border-r-[3px] rounded-[4px] ${(isClicked=='home')?'border-[#7878bc] text-[#7878bc]':'border-[#ababab] text-[#555555]'}  hover:border-[#7878bc] hover:text-[#7878bc] hover:shadow-sm hover:shadow-[#7878bc]`} onClick={()=>setIsClicked('home')}>
            <i className="fa-regular fa-snowflake"></i>
            <span className=' text-[#ababab]'>Home</span>
          </button>
          </a>
          <button className={`flex items-center pr-3 pl-1 mr-4 border-r-[3px] rounded-[4px] ${(isClicked=='about')?'border-[#7878bc] text-[#7878bc]':'border-[#ababab] text-[#555555]'}  hover:border-[#7878bc] hover:text-[#7878bc] hover:shadow-sm hover:shadow-[#7878bc]`} onClick={()=>setIsClicked('about')}>
            <i className="fa-regular fa-snowflake"></i>
            <span className=' text-[#ababab]'>About</span>
          </button>
          <a href='/auth'>
          <button className={`flex items-center pr-3 pl-1 mr-4 border-r-[3px] rounded-[4px] ${(isClicked=='inventory')?'border-[#7878bc] text-[#7878bc]':'border-[#ababab] text-[#555555]'}  hover:border-[#7878bc] hover:text-[#7878bc] hover:shadow-sm hover:shadow-[#7878bc]`} onClick={()=>setIsClicked('inventory')}>
            <i className="fa-regular fa-snowflake"></i>
            <span className=' text-[#ababab]'>Inventory</span>
          </button>
          </a>
        </div>
        </Zoom>

        {isAuthenticated?(
          <div>
            <a href='/logout'>
              <button className=" px-4 py-1 mr-2 text-white border-[1.6px] border-[#7878bc] bg-transparent shadow-[#7878bc] shadow-sm hover:shadow-md hover:shadow-[#7878bc] rounded-md" onClick={handleLogout} >Log out</button>
            </a>
          </div>
        ):(
          <div className="flex">
          <div>
            <a href="/login">
              <button className=" px-4 py-1 mr-2 text-white border-[1.6px] border-[#7878bc] bg-transparent shadow-[#7878bc] shadow-sm hover:shadow-md hover:shadow-[#7878bc] rounded-md" >Log in</button>
            </a>
          </div>
          <div>
            <a href="/register">
              <button className="px-4 py-1 border-[1.5px] border-[#7878bc] bg-[#7878bc] shadow-[#ffffff] shadow-sm hover:shadow-md hover:shadow-[#ffffff] rounded-md text-white" >Sign up</button>
            </a>
          </div>
        </div>  
        )}
    </div>
    {/* <hr className=" border-transparent border-0 h-[1px] bg-gradient-to-r from-[#0b0b0b] via-[#6e6e6e] to-[#060606]"></hr> */}
</div>
  )
  }
export default Navbar