import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import {  verify } from "hono/jwt";
import {  createBlogInput, updateBlogInput } from "@amogh.nadgouda/medium-common/src";

export const blogRouter = new Hono<{
  Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
  },
  Variables:{
    userId: string
  }
}>();
blogRouter.use("/*",async (c,next)=>{
  const authHeader = c.req.header("Authorization")||"";
  try{
    const user = await verify(authHeader, c.env.JWT_SECRET)
  if(user){
    c.set("userId",user.id);
    await next();
  }else{
    c.status(403)
    return c.json({
      message: "you are not logged in "
    })
  }
  }catch(e){
    c.status(403)
    return c.json({
      error:"invalid creds"
    });
  }
  
  

  //extract the user id 
  //pass it down to the route hand
});

blogRouter.post('/', async (c) => {
	const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
const body =await c.req.json();
const {success} = createBlogInput.safeParse(body);
  if(!success){
    c.status(411)//wrong inputs
    return c.json({
      error: "wrong inputs"
    })}
const userId = c.get("userId");
  const post = await prisma.post.create({
    data:{
      title: body.title,
      content : body.content,
      authorId :  userId


    }
  })
	return c.json({
		id: post.id
	});
})
blogRouter.put('/', async (c) => {
	const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
const body =await c.req.json();
const {success} = updateBlogInput.safeParse(body);
  if(!success){
    c.status(411)//wrong inputs
    return c.json({
      error: "wrong inputs"
    })}
  const post = await prisma.post.update({
    where:{
      id:body.id
    },

    data:{
      title: body.title,
      content : body.content,
    }
  })
	return c.json({
		id: post.id
	});
});
blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

 const posts  = await prisma.post.findMany({
  select:{
    content: true,
    title: true,
    id:true,
    author:{
      select:{
        name:true,
    }
  }
 }});

	return c.json({
    blogs:posts
  }   )
})



blogRouter.get('/:id', async (c) => {
	
	const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

try{
  const blog = await prisma.post.findFirst({
    where:{
      id:c.req.param("id")
      },
    select:{
      id:true,
      title:true,
      content:true,
      author:{
        select:{
          name:true,
        }
      }

    }
  })
  
	return c.json({
		blog
	});
}
  catch(e){
    c.status(411)
    return c.json({
      error:"could not retrieve blog post"
    })
  }
})
//Todo: add paginataion
