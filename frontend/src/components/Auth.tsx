import { SignupInput } from "@shradhesh0/medium-blog";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { backendurl } from "../config";
import { useSetRecoilState } from "recoil";
import { loginAtom } from "../recoil/LoggedOrNot";


const Auth = ({type}:{type:"signup" | "signin"}) => {
  
  const navigate = useNavigate() ;
  const [postInputs,setPostInputs] = useState<SignupInput>({
    name:"",
    username:"",
    password:""
  })
  
  const setuser = useSetRecoilState(loginAtom)


  async function sendRequest(){

    try{

      console.log(postInputs);
      const response = await axios.post(`${backendurl}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs);
      const jwt= response.data ;
      
      localStorage.setItem("token",jwt.token) ;
      localStorage.setItem('user',"true");
      setuser(true) ;
      navigate("/blogs")

    }catch(e){
      console.log(e);
      alert("failed!")
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
         <div>
         <div className="px-10">
           <div className="text-3xl font-extrabold">
            Create an account 
           </div>
           <div className="text-slate-400">
            {type==="signup" ? "Already have an account ?":"Don't have an account ?"}
             <Link className="pl-2 underline" to={ type==="signup"? "/signin":"/signup"}>{type==="signup"?"Login":"Signup"}</Link>
           </div>
         </div>
         <div className="pt-8">
         {type==="signup"? <LabelInput label="Name" placeholder="shradhesh..." onChange={(e)=>{
          setPostInputs(c=>({
            ...c,
            name:e.target.value
          }))
         }} />:null}
         <LabelInput label="Username" placeholder="shradhesh@gmail.com..." onChange={(e)=>{
          setPostInputs(c=>({
            ...c,
            username:e.target.value
          }))
         }} />
         <LabelInput label="Password" placeholder="*****" type="password" onChange={(e)=>{
          setPostInputs(c=>({
            ...c,
            password:e.target.value
          }))
         }} />
         <button onClick={sendRequest} type="button" className="text-white mt-8 w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup" ?"SIGN UP":"SIGN IN"}</button>
         </div>
         </div>
      </div>
    </div>
  )
}

interface LabelInputType {
  label: string;
  placeholder:string;
  onChange:(e: ChangeEvent<HTMLInputElement>) => void;type?:string
}

function LabelInput({label ,placeholder,onChange,type}:LabelInputType){

  return(
    <div>
        <label className="block mb-2 text-sm text-black font-bold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold" placeholder={placeholder} required />
    </div>
  )
}

export default Auth
