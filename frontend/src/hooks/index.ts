import { useEffect, useState } from "react"
import { backendurl } from "../config";
import axios from "axios";

export interface Blog {
  content:string;
  title:string;
  author:{
    name:string
  };id:number
}


export const useBlog = ({id}:{id:string})=>{
  const [loading,setLoading] = useState(true) ;
  const [blog,setBlog] = useState<Blog>() ;

  useEffect(()=>{
    axios.get(`${backendurl}/api/v1/blog/${id}`,{
      headers:{
        authorization : localStorage.getItem("token")
      }
    })
     .then(response =>{
      
      setBlog(response.data.blog);
      setLoading(false) ;
     })
  },[])
  return {
    loading,blog
  }
}

export const useBlogs = () =>{

  const [loading,setLoading] = useState(true) ;
  const [blogs,setBlogs] = useState<Blog[]>([]) ;

  useEffect(()=>{
    console.log(localStorage.getItem("token"))
    axios.get(`${backendurl}/api/v1/blog/bulk`,{
      headers:{
        authorization : localStorage.getItem("token")
      }
    })
     .then(response =>{

      setBlogs(response.data.blogs);
      setLoading(false) ;
     })
  },[])

  return {
    loading,blogs
  }
}