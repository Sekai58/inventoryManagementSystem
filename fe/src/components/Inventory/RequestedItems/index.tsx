import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {IUser } from "../../../types/User";
import axios from "axios";
import {Fade } from "react-reveal";
// import img from '../../../assets/images/laptop.png'
import { toast } from "react-toastify";

export interface IRequestedItems{
  user:IUser,
  query:string
}

const RequestedItems: React.FC<IRequestedItems> = ({user,query}) => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [approve,setApprove] =useState(false)

  const theme = useSelector((state:any)=>{
    return state.theme.dark
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/list-requested-item');
        console.log("requestdatahere",response.data);
        setRequests(response.data);
        console.log(requests)
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
    setApprove(false)
  }, [approve]);

  const handleApprove =(id:any,userName:string)=>{
    axios.delete(`http://localhost:7000/api/user/requests/${id}`,{data:{
      product_id:id,
      userName:userName
    }})
    .then(response => {
        console.log(response.data)
        toast.success("Item successfully approved",{theme:"dark"})
        setApprove(true)
    })
    .catch(error => {
      console.error('Error:', error);
      toast.error("Unauthorized",{theme:"dark"})
    })
  }

  return (
    <div >
      <div className="flex justify-between items-center py-1">
        <div className={`flex-1 ${user.role=="USER"?'hidden':'solid'}`}>User</div>
        <div className={`flex-1`}>Item</div>
        <div className={`flex-1 ${user.role=="USER"?'hidden':'solid'}`}>Action</div>
      </div>
      <div className={`h-[3px] ${theme?'bg-[#444444]':'bg-[#c3c3c4]'} mb-3`}></div> 
      <div className={`h-[400px] overflow-auto scrollbar-thin ${theme?'scrollbar-thumb-[#24243b]':'scrollbar-thumb-[#c3c3c4]'}  scrollbar-track-[#7878bc] overflow-x-hidden`}>
      {!loading ? (
        requests.map((item, idx) => (
          <div key={idx}>
            {(user.role==='ADMIN')?<Fade>
            <div key={idx} className={`flex flex-col justify-between py-5 ${item.productInfo.name.toLowerCase().includes(query)?'solid':'hidden'}`}>
              <div className="flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <div className="flex-1">{item.userName}</div>
                <div className="flex-1 flex"><img src={item.productInfo.url} className="h-8 w-10 mr-2"/>{item.productInfo.name}</div>
                <div className="flex-1"><button className={`px-2 py-1 border-2 ${theme?'bg-[#cbbf34] border-[#cbbf34] bg-opacity-10 hover:bg-opacity-30 hover:text-white':'bg-[#fae653] border-[#fae653] bg-opacity-90 hover:bg-opacity-100 hover:text-[#191919]'}  rounded-md  `} onClick={()=>{handleApprove(item._id,item.userName)}}>Approve</button></div>
              </div>
              </div>
              <div className={`mt-2 h-[0.8px] ${theme?'bg-[#444444]':'bg-[#c3c3c4]'}`}></div>
            </div>
            </Fade>
            :
            <Fade>
            <div key={idx} className={`flex flex-col justify-between py-3 ${(item.userName.toLowerCase().includes(user.userName.toLowerCase()) && item.productInfo.name.toLowerCase().includes(query))?"solid":"hidden"}`}>
              <div className="flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <div className="flex-1 flex"><img src={item.productInfo.url} className="h-8 w-10 mr-2"/>{item.productInfo.name}</div>
              </div>
              </div>
              <div className={` mt-2 h-[0.8px] ${theme?'bg-[#444444]':'bg-[#c3c3c4]'}`}></div>
            </div>
            </Fade>
            }     
          </div>
        ))
      ) : (
        <div>Loading... <img src='https://th.bing.com/th/id/OIP.Rs28iOxL2mhHWrvaDzQhTAHaHa?pid=ImgDet&rs=1'/></div>
      )}
      </div>
    </div>
  );
};

export default RequestedItems;
