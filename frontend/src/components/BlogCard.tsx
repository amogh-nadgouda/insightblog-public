import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName : string;
  title: string;
  content: string;
  publishedDate : string;
  id:string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate
}: BlogCardProps)=>{
  return <Link to={`/blog/${id}`}>
  <div className="border-b border-slate-200 pb-4 p-4 w-screen max-w-screen-md cursor-pointer">
      <div className="flex">
        <div className="flex flex-col justify-center">
          <Avatar size ={"small"} name={authorName} />
        </div>
          <div className="flex flex-col justify-center">
            <div className="flex justify-center">
              <div className="font-extralight pl-2 text-sm">
                {authorName}
              </div>
              <div className="pl-2 text-xs flex flex-col justify-center">
              <Circle></Circle>
              </div>
              <div className="pl-2 font-thin text-slate-500 text-sm">
              {publishedDate}
              </div>
          </div>
        </div>
      </div>
      <div className="text-xl font-semibold">
        {title}
      </div>
      <div className="text-md font-thin ">
        {content.slice(0,100) + "..."}
      </div>
      <div className="text-sm font-thin text-slate-400">
        { `${Math.ceil(content.length/100)}minute(s)`}
      </div>
      
  </div>
  </Link>
}

export function Circle(){

  return <div className="h-1 w-1 rounded-full bg-slate-400">

  </div>
}
export const Avatar = function Avatar({ name, size }:{ name :string , size:"small"|"big"}){
return <div className={`relative inline-flex items-center justify-center ${size==="small"?"w-6 h-6":"w-10 h-10"} overflow-hidden bg-gray-600  dark:bg-gray-600 rounded-full`}>
      <span className={`${size==="small"?" text-xs ":" text-xl "}font-thin text-gray-600 dark:text-gray-300`}>{name[0]+name[1]}</span>
  </div>

}