import { Link } from "react-router-dom"

import Icon from "./Icon"

export const Appbar = ()=>{
  return <div className="border-b flex justify-between px-5 pt-2">
    <Link to= {'/blogs'}>
    <div className="flex flex-col justify-center cursor-pointer text-xl">
      <div className="flex">
      <div className="h-12 w-12 flex flex-col justify-center">
      <Icon></Icon>
      </div>
      <div className="flex flex-col justify-center pl-2">
      InsightBlog
      </div>
      </div>
    </div>
    </Link>
    <div>
   

    </div>
    <div>
      <Link to={'/publish'}>
        <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-3 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2 text-center me-2 mb-2">New</button>
    </Link>
      
    </div>    
  </div>
}