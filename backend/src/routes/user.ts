import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupInput} from "@amogh.nadgouda/medium-common/src";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
  const {success} = signupInput.safeParse(body);
  if(!success){
    c.status(411)//wrong inputs
    return c.json({
      error: "wrong inputs"
    })
  }
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    })

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
  
    return c.text(
      token
    )
})
  
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
    //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
  if(!success){
    c.status(411)//wrong inputs
    return c.json({
      error: "wrong inputs"
    })}
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    });

    if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.text(jwt);
})
