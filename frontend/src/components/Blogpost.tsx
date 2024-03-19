import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const Blogpost = ({blog}:{blog:Blog})=>{
  return <div>
    <Appbar/>
  <div className="grid grid-cols-12 px-10 w-full pt-2 max-w-screen-xl">

    <div className=" col-span-8">
      <div className="text-3xl font-extrabold">
        {blog.title}
      </div>
      <div className="text-xl">
        {blog.content}
      </div>
    </div>

    <div className=" col-span-4 pl-10">
      Author
      
      <div className=" max-w-90">
        <div className="flex">
          <div className="flex flex-col justify-center">
            <Avatar name={blog.author.name} size="big"/>
          </div>
          <div className="flex flex-col">
            
            <div className="text-xl font-bold pl-2 ">
              {blog.author.name}
            </div>
            <div className=" col-span-4 pl-2 pt-0 text-slate-500">
              I am Groot.
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
  </div> 
}