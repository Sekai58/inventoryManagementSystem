import { useEffect, useState } from 'react'
import axios from "axios"

const useAxios = (url:string,title?:any,change?:any) => {
    const [itemsCount, setData] = useState<any>();
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);
      
   useEffect(() => {
      axios
      .get(url)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => {
      setLoading(false);
      });
    }, [url,title,change]);
    return {itemsCount,error,loading}
}

export default useAxios