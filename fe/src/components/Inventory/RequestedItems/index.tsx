import React, { useEffect, useState } from "react";
import { IRequest, IUser } from "../../../types/User";
import axios from "axios";
import { Zoom,Fade } from "react-reveal";

const RequestedItems: React.FC<IUser> = ({userName,role}) => {
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/list-requested-item');
        console.log(response.data);
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();

  }, []);

  console.log(requests);

  return (
    <div>
      {!loading ? (
        requests.map((item, idx) => (
          <div>
            {(role==='ADMIN')?<Fade right delay={500}>
            <div key={idx} className={`flex justify-between items-center py-1`}>
              <div className="flex-1">{item.name}</div>
              <div className="flex-1">{item.userName}</div>
            </div>
            </Fade>
            :
            <Zoom delay={600}>
            <div key={idx} className={`flex justify-between items-center py-1 ${item.userName.toLowerCase().includes(userName)?"solid":"hidden"}`}>
              <div className="flex-1">{item.name}</div>
            </div>
            </Zoom>
            }
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default RequestedItems;
