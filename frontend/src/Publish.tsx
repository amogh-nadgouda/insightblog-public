import { ChangeEvent, useState } from "react";
import { Appbar } from "./components/Appbar"
import { BACKEND_URL } from "./config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

 export const Publish = ()=>{
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  return <div>
    <Appbar>
      
    </Appbar>
    
    <input onChange={(e)=>{setTitle(e.target.value)}} type="text" className=" w-full px-20 pt-10 focus:border-l border-l-gray-300 text-gray-900 text-5xl  block p-2.5 focus:outline-none" placeholder="Title.."/>
    <TextEditor onChange={(e)=>{
      setContent(e.target.value)
    }}/>
      <button onClick={async()=>{
       const response =  await axios.post(`${BACKEND_URL}/api/v1/blog`,{
          title:title,
          content:content
        },{
          headers:{
            Authorization:localStorage.getItem("token")
          }
        });
        navigate(`/blog/${response.data.id}`)
      }} type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-black rounded-lg  bg-gray-50 border mt-2 mx-20 ">
              Publish post
      </button>
    </div>
  

 }

function TextEditor({onChange}:{onChange:(e: ChangeEvent<HTMLTextAreaElement>)=> void}){
  return <div>
      <div className=" w-full px-20 pt-10" >
        
        
        <form>   
          <div className="w-full  border-gray-300 text-gray-900 text-sm rounded-lg  block p-2.5 border">
            <textarea onChange={onChange} id="editor" rows={8} className="block w-full text-xl focus:outline-none pt-2.5" placeholder="Write an article..." required ></textarea>
            
          </div>       
        </form>     
      </div>    
  </div>
 }