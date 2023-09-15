import { useEffect, useState } from 'react'
import axios from "axios"

const useAxios = (url:string) => {
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
    }, [url]);
    return {itemsCount,error,loading}
}

export default useAxios