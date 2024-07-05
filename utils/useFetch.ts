import { useState, useEffect, useRef } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface QueryParams {
  [key: string]: string | number | undefined;
}

interface FetchResponse {
  data: any[]; // Adjust 'any' to the expected data type structure
}

const useFetch = (endpoint: string, query: QueryParams | null) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const options: AxiosRequestConfig = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "x-rapidapi-key": "aa83a74ae4mshf6930361d7a909fp1b564cjsnb0b7875a93fa",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
    params: query ? { ...query } : {},
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request<FetchResponse>(options);
      setData(response.data.data);
    } catch (error) {
      setError(error);
      // alert("There was an error fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (query) {
  //     if (debouncingRef.current) {
  //       clearTimeout(debouncingRef.current);
  //     }
  //     debouncingRef.current = setTimeout(() => {
  //       fetchData();
  //     }, 600);
  //   }
  //   return () => {
  //     if (debouncingRef.current) {
  //       clearTimeout(debouncingRef.current);
  //     }
  //   };
  // }, [query]);

  useEffect(()=>{
    const timer = setTimeout(() => {
      if(query?.query){
        fetchData()
      }  
    }, 600);

    return() => {
      clearTimeout(timer)
    }
  },[query?.query])

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
