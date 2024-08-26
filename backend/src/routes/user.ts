import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign,verify} from 'hono/jwt'
import {signupInput , signinInput} from "@shradhesh0/medium-blog" 

//declare types of variable inside .env 
const userRouter = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  }
}>()


userRouter.post('/signup',async (c)=>{
  
 
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())


  try{
    const {name, password,username} = await c.req.json<{
      name: string;password:string ;username:string
    }>() ;
    
    console.log({name,password,username})
    const {success} = signupInput.safeParse({name,password,username}) ;
    if(!success){
      c.status(411);
      return c.json({error:"Invalid input"})
    }
  
    const user = await prisma.user.create({
      data:{
        email:username,
        password,
        name
      }
    })
  
    const token = await sign({id:user.id},c.env.JWT_SECRET) ;
  
    return c.json({
      token
    }) ;
  }catch(e){
    c.status(411);
    return c.json({
      error:"Error occured !"
    })
  }
})

userRouter.post('/signin', async(c) => {


  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())


  const {password,username} = await c.req.json<{
    name: string;password:string ;username:string
  }>() ;


  const {success} = signinInput.safeParse({username,password})
  if(!success){
    c.status(411);
    return c.json({error:"Invalid input"})
  }
  const user = await prisma.user.findFirst({
    where:{
      email:username,
      password,
    }
  })

  if(!user){
    c.status(403);
    return c.json({
    error:'invalid email or password'
    })
  }
  
  
  const token = await sign({id:user.id},c.env.JWT_SECRET) ;
    
    c.status(200);
    return c.json({
      token
    }) ;
})

export default userRouter ;