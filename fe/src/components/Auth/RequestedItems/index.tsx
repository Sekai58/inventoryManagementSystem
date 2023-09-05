// import { useEffect, useState } from "react";
// import { IUser } from "../../../types/User"
// import axios from "axios";

// const RequestedItems:React.FC<IUser> =({userName,role})=>{
//     const[requests,setRequests] = useState()

//     useEffect(() => {
//         axios.get('http://localhost:7000/api/user/requests/list')
//        .then(response => {
//            console.log(response.data)
//          setRequests(response.data);
//        })
//        .catch(error => {
//          console.error('Error:', error);
//        });
//      }, []);
//      console.log(requests,userName,role)
//     return<></>

// }

// export default RequestedItems