import { Blogpost } from "../components/Blogpost";
import { BlogpostSkeleton } from "../components/BlogpostSkeleton";
import{ useBlog } from "../hooks"
import { useParams } from "react-router-dom";
export const Blog = ()=>{
  const {id} = useParams<{ id: string }>();
    const {loading,blog} = useBlog({
      id: id||""
    });
    if(loading){
      return <div>
       
       <BlogpostSkeleton></BlogpostSkeleton>
      </div>
    }
    if (!blog) {
      return <div>Blog not found</div>;
  }
    else 
    return <div>
      <Blogpost blog={blog}/>
      </div>
} 