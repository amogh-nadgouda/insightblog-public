import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";


export interface Blog {
    "content": string;
    "title": string;
    "id": string
    "author": {
        "name": string
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>(); // Initialize with an empty Blog object


    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                console.log(response.data);
                setLoading(false);
            })
           
    }, [id])

    return {
        loading,
        blog
    }

}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blogs
    }
}
export const useQuote = () => {
    const [loading, setLoading] = useState(true);
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
        axios.get(`https://api.quotable.io/random`, 
            ).then(response => {
                setQuote(response.data.content);
                setAuthor(response.data.author);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        quote,
        author
    }
}