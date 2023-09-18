import React, { useEffect, useState } from "react";
import {IUser } from "../../../types/User";
import axios from "axios";
import {Fade } from "react-reveal";
import img from '../../../assets/images/laptop.png'

export interface IRequestedItems{
  user:IUser,
  query:string
}

const ApprovedItems: React.FC<IRequestedItems> = ({user,query}) => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/list-approved-item');
        console.log("requestdatahere",response.data);
        setRequests(response.data);
        console.log(requests)
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center py-1">
        <div className={`flex-1 ${user.role=="USER"?'hidden':'solid'}`}>User</div>
        <div className={`flex-1`}>Item</div>
        <div className="flex-1">Date</div>
      </div>
      <div className="h-[3px] bg-[#444444]  mb-3"></div> 
      {!loading ? (
        requests.map((item, idx) => (
          <div key={idx}>
            {(user.role==='ADMIN')?<Fade>
            <div key={idx} className={`flex flex-col justify-between py-5 ${item.productInfo.name.toLowerCase().includes(query)?'solid':'hidden'}`}>
              <div className="flex justify-between items-center">
                <div className="flex-1">{item.userName}</div>
                <img src={img} className="h-8 w-10 mr-2"/>
                <div className="flex-1">{item.productInfo.name}</div>
                <div className="flex-1">{item.date}</div>
              </div>
              <div className=" mt-2 h-[0.8px] bg-[#444444]"></div>
            </div>
            </Fade>
            :
            <Fade>
            <div key={idx} className={`flex flex-col justify-between py-3 ${(item.userName.toLowerCase().includes(user.userName.toLowerCase()) && item.productInfo.name.toLowerCase().includes(query))?"solid":"hidden"}`}>
              <div className="flex justify-between items-center">
              <img src={img} className="h-8 w-10 mr-2"/>
              <div className="flex-1">{item.productInfo.name}</div>
              <div className="flex-1">{item.date}</div>
              </div>
              <div className={`h-[0.8px] bg-[#444444]`}></div>
            </div>
            </Fade>
            }     
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ApprovedItems;