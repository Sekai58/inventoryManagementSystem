import { Navigate} from "react-router-dom";
import useAxios from "../../libs/useAxios"
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

const Users:React.FC =()=>{
    const {itemsCount,loading,error}  = useAxios('http://localhost:7000/api/admin/list-user')

    const theme = useSelector((state:any)=>{
        return state.theme.dark
      })

      const role = useSelector((status:any)=>{
        return status.role.role
      })

    return(
      <>
      {(role==='ADMIN')?
        <div className={`min-h-[300px] w-[95%] ${theme?'bg-[rgba(34,33,33,0.5)] shadow-black shadow-2xl':'bg-[#ededfc] shadow-xl'}  rounded-md`}>
            {!loading && !error?
            <div className={`p-3`}>
                <div className="flex">
                <div><button className={`px-3 py-1 mr-2 rounded-t-md text-[#636363] ${theme?'bg-[#232323]':'bg-[#ffffff]'}`}>All Users</button></div>
                <div><button className={`px-3 py-1 mr-2 rounded-t-md text-[#636363] ${theme?'bg-[#232323]':'bg-[#ffffff]'}`}>Manage roles</button></div>
                </div>
                <div className={`${theme?'bg-[#232323] text-[#c3c3c4]':'bg-[#ffffff] text-[#464646]'} py-2 px-3 rounded-b-md rounded-r-md`}>
                <div className='flex justify-between pb-2'>
                <p className='flex-1'>Username</p>
                <p className='flex-1'>Email</p>
                <p className='flex-1'>Gender</p>
                <p className='flex-1'>Role</p>
                </div>
                <div className={`h-[3px] ${theme?'bg-[#444444]':'bg-[#c3c3c4]'} mb-3`}></div>
                {itemsCount.map((user:any,idx:number)=>{return<div key={idx} className={`${theme?'text-[#c3c3c4]':'text-[#636363]'}`}>
                    <div key={idx} className={`flex flex-col justify-between py-5 `}>
                      <div className="flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                        <div className="flex-1 flex items-center"><img src={user.url} className="w-8 h-8 rounded-full mr-2" />{user.userName}</div>
                        <div className="flex-1 ">{user.email}</div>
                        <div className="flex-1 ">{user.gender.toUpperCase()}</div>
                        <div className="flex-1">{user.role}</div>
                      </div>
                      </div>
                      <div className={`mt-2 h-[0.8px] ${theme?'bg-[#444444]':'bg-[#c3c3c4]'}`}></div>
                    </div>
                    </div>
                })}
                </div>
            </div>
            :
            <div className="h-full flex justify-center items-center">
            <ClipLoader
              color='#7878bc'
              loading={loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
            }
        </div>
        :
        <Navigate to='/auth'></Navigate>
        }
        </>
    )
}

export default Users