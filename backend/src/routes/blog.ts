import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign,verify} from 'hono/jwt'
import {createBlogInput,updateBlogInput} from '@shradhesh0/medium-blog'



//declare types of variable inside .env 
const blogRouter = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  },
  Variables:{
    userId:string ;
  }
}>() ;


type User = {
  id:string ;
}

blogRouter.use("/*",async (c,next)=>{

  const token = c.req.header("authorization") ||"" ;
  try{
    const user = <User>await  verify(token , c.env.JWT_SECRET) ;


  if(user){
    //user variables in blogrouter for userId
    c.set("userId",user.id ) ;
    await next();
  }
  else{
    c.status(403) ;
    return c.json({
      message:"you are not logged in !"
    })
  }
  }catch(e){
    c.status(403) ;
    return c.json({
      message:"you are not logged in !"
    })
  }
   
})


blogRouter.post('/',async (c) => {
  const body = await c.req.json() ;
  
  const {success} = createBlogInput.safeParse(body);
  if(!success){
    c.status(411) ;
    return c.json({
      message:"invalid input"
    })
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  
  const userId = c.get("userId")
  const blog = await prisma.post.create({
    data:{
      title:body.title,
      content:body.content,
      authorId:Number(userId), 
    }
  })
  return c.json({
    id:blog.id
  })
})

blogRouter.put('/', async(c) => {
  
  const body = await c.req.json() ;
  
  const {success} = updateBlogInput.safeParse(body);
  if(!success){
    c.status(411) ;
    return c.json({
      message:"invalid input"
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  

  await prisma.post.update({
    where: {
       id: body.id
    },
    data:{
      title:body.title,
      content:body.content,
    }
  })
  return c.json({
    id:body.id
  })
})

// add pagination
blogRouter.get('/bulk',async(c)=>{
  try{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate()) 
    console.log("hello")
    const blogs = await prisma.post.findMany({
      select:{
        content:true,
        title:true,
        id:true,
        author:{
          select:{
            name:true
          }
        }
      }
    }) ;
    console.log(blogs);
    return c.json({
      blogs 
    })
  }catch(e:any){
    console.log(e);
    return c.json({
      error:e.message
    })
  }
})

blogRouter.get('/:id', async(c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  
  const id = c.req.param('id');
  try{
    const blog=await prisma.post.findFirst({
      where: {
         id:Number(id)
      },
      select:{
        id:true,
        title:true,
        content:true,
        author:{
          select:{
            name:true
          }
        }
      }
    })
    console.log(blog);
    return c.json({
      blog
    })
  }catch(e){
    c.status(411)
    return c.json({
      error:"error while fetching blog post !"
    })
  }
  
})




export default blogRouter ;