import {DoughnutChart,BarChart} from "../Chart"
// import {useSelector} from 'react-redux'

const Home=()=>{
    const a = 10
    const r = 5
    // const data = useSelector((c:any)=>{
    //     console.log("redux state here",c.show.value)
    // })
    return(<>
        {/* <div className="flex justify-between gap-10 px-10 text-white py-5 flex-wrap"> */}
        <div className="grid gap-5 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-5 px-2 sm:px-10 text-white">
            <div className="bg-[rgba(226,104,248,0.2)] min-h-32 shadow-md shadow-[rgba(226,104,248,1)] rounded-md hover:scale-105 flex flex-col justify-between">
                <div className="p-5 text-xl">AVAILABLE ITEMS</div>
                <div className="p-5  text-xl text-end">500</div>
            </div>
            <div className="bg-[rgba(137,251,103,0.2)] min-h-32 shadow-md shadow-[rgba(137,251,103,1)] rounded-md hover:scale-105 flex flex-col justify-between">
                <div className="p-5 text-xl">RESERVED ITEMS</div>
                <div className="p-5  text-xl text-end">500</div>
            </div>
            <div className=" bg-[rgba(106,106,249,0.2)] min-h-32 shadow-md shadow-[rgba(106,106,249,1)] rounded-md hover:scale-105 flex flex-col justify-between">
                <div className="p-5 text-xl">TOTAL USERS</div>
                <div className="p-5  text-xl text-end">500</div>
            </div>
            <div className=" bg-[rgba(250,228,103,0.2)] min-h-32 shadow-md shadow-[rgba(250,228,103,1)] rounded-md hover:scale-105 flex flex-col justify-between">
                <div className="p-5 text-xl">CATEGORIES</div>
                <div className="p-5  text-xl text-end">500</div>
            </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-between sm:px-10 gap-8">
            <div className="flex flex-grow">
                <div className="flex-1 bg-[rgba(36,36,59,0.5)] shadow-2xl shadow-black rounded-md">
                <div><h2 className="text-[#ffffff] py-5 px-2">Inventory Items</h2><div className="h-[0.8px] bg-[#444444]"></div></div>
                    <div className="p-3"><BarChart/></div>
                </div>
            </div>
            <div className="bg-[rgba(36,36,59,0.5)] shadow-2xl shadow-black rounded-md">
                <div><h2 className="text-[#ffffff] py-5 px-2">Inventory Items</h2><div className="h-[0.8px] bg-[#444444]"></div></div>
                <div className="p-5 flex items-end"><DoughnutChart available={a} reserved={r}/></div>
                <div className="h-[0.8px] bg-[#444444] mx-4"></div>
                <div className="flex text-[#c3c3fc] justify-between text-2xl px-4 py-1 lg:px-5 lg:py-10">
                    <div className="flex flex-col">70%<div className="flex gap-1 items-center text-sm"><div className="h-3 w-3 rounded-full bg-[#44df78]"></div>Unallocated</div></div>
                    <div className="">30%<div className="flex gap-1 items-center text-sm"><div className="h-3 w-3 rounded-full bg-[#c83737]"></div>Reserved</div></div>
                </div>
                <div className="h-[0.8px] bg-[#444444] mx-4"></div>
            </div>
        </div>
        </>
    )
}

export default Home