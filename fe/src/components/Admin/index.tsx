// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { IUser } from '../../types/User';
// import {Zoom,Fade} from 'react-reveal'
// import InventoryItems from '../InventoryItems/User';

// const ProtectedRoute = () => {
//   const [data, setData] = useState<IUser>({userName:''});
//   const [field,setField] = useState('allitems')

//   useEffect(() => {
//      axios.post('http://localhost:7000/api/user/auth',{}, {
//       headers: {
//         Authorization: `${(localStorage.getItem('token'))}`,
//       },
//     })
//     .then(response => {
//         console.log(response.data)
//       setData(response.data);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
//   }, []);


//   return (
//     <div className='px-10'>
//       <Zoom>
//       <div className='min-h-[500px] bg-[rgba(34,33,33,0.5)] shadow-2xl shadow-black rounded-md'>
//         <div className='w-full rounded-t-md flex justify-between items-center px-2 py-1'>
//           <div className="relative text-[#818080]">
//             <span className="absolute left-2 top-1"><i className="fa-solid fa-magnifying-glass"></i></span>
//             <input type="text" className="pl-7 h-8 w-72 bg-transparent text-[#929191] rounded-full focus:border-2 focus:border-[#7878bc]"/>
//           </div>
//           <div className='flex gap-3'>
//             <i className="fa-regular fa-bell text-[#7878bc] text-2xl"></i>
//             <button className='px-3 py-1 border-x-2 border-[#555555] rounded-full text-[#7878bc] '>@<span className='mr-3 text-[#dbdada]'>{data.userName}</span>&#5167;</button>
//           </div>
//         </div>

//         <div className="flex items-center">
//           <div className="h-[0.8px] bg-gradient-to-r from-[#1c1c1c] via-[#3c3c54] to-[#7878bc] flex-grow shadow-md shadow-white"></div>
//           <span className="mx-2 text-white"><Zoom delay={800}>Inventory Items</Zoom></span>
//           <div className="h-[0.8px] bg-gray-400 bg-gradient-to-r to-[#1c1c1c] via-[#3c3c54] from-[#7878bc] flex-grow"></div>
//         </div>

//         <div className='p-4'>
//         <div className='flex gap-2 text-[#8a8a8b]'>
//           <button className={`px-3 py-1 rounded-t-md ${(field=='allitems')?'bg-[#232323]':'bg-[#24243b]'}`} onClick={()=>{setField("allitems")}}>All items</button>
//           <button className={`px-3 py-1 rounded-t-md ${(field=='requested')?'bg-[#232323]':'bg-[#24243b]'}`} onClick={()=>{setField("requested")}}>Requested</button>
//         </div>

//         {(field=='requested'?<>
//         </>
//         :<>
//             <div className='bg-[#232323] py-2 px-3 text-[#c3c3c4] rounded-b-md rounded-r-md'>
//             <div className='flex justify-between pb-2'>
//             <p className='flex-1'>Name</p>
//             <p className='flex-1'>Available</p>
//             <p className='flex-1'>Reserved</p>
//             <p className='flex-1'>Price</p>
//             <p className='flex-1'>Action</p>
//             <p className='flex-1'>Details</p>
//             </div>
//             <div className="h-[0.8px] bg-gradient-to-r to-[#343434] via-[#7878bc] from-[#343434] mb-3"></div>  
//             <InventoryItems/>    
//           </div>
//         </>
//         )}
          
//         </div>
//       </div>
//       </Zoom>
//     </div>
//   );
// };

// export default ProtectedRoute;
