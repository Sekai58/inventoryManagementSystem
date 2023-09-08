import PieChart from "../Chart"

const Home=()=>{
    const a = 10
    const r = 5
    return(
        <div className="flex justify-between px-10 gap-8">
            <div className="flex flex-grow">
                <div className="flex-1 bg-[rgba(36,36,59,0.5)] shadow-2xl shadow-black rounded-md">
                <div><h2 className="text-[#ffffff] py-5 px-2">Inventory Items</h2><div className="h-[0.8px] bg-[#444444]"></div></div>

                </div>
            </div>
            <div className="bg-[rgba(36,36,59,0.5)] shadow-2xl shadow-black rounded-md">
                <div><h2 className="text-[#ffffff] py-5 px-2">Inventory Items</h2><div className="h-[0.8px] bg-[#444444]"></div></div>
                <div className="p-5"><PieChart available={a} reserved={r}/></div>
            </div>
        </div>
    )
}

export default Home