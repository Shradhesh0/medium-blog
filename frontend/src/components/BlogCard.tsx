import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName:string;
  title:string;
  content:string;
  publishedDate:string,
  id:number
}

const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate
}:BlogCardProps) => {


  return (

    <Link to={`/blog/${id}`} >
    <div className="p-4 border-b border-slate-200 pb-4 font-medium w-screen max-w-screen-md cursor-pointer">
      <div className="flex items-center">
        <div className="flex justify-center flex-col">
          <div>
          <Avatar name={authorName} /> 
          </div>
        </div>
        <div className="font-extralight pl-2 flex justify-center flex-col" >{authorName}</div>
        <div className="pl-2 font-thin text-slate-500 flex justify-center flex-col">
          |
        </div>
        <div className="pl-2 font-thin text-slate-400 flex justify-center flex-col"> {publishedDate}</div>
      </div>
      <div className="text-xl font-semibold pt-2" >
        {title}
      </div>
      <div className="text-md font-thin">
        {content.slice(0,100)+  "..."}
      </div>
      <div className="text-slate-400 text-sm font-thin pt-4">
        {`${Math.ceil(content.length / 100)} minitue(s) read`}
      </div>
    </div>
  </Link>
  )
}

export function Avatar({name}:{name:string,size?:number}){
  return (
    <div>
      <div className={`w-7 h-7 relative inline-flex items-center justify-center  overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <div>
        <span className="font-medium text-gray-600 dark:text-gray-300">{name[0].toUpperCase()}</span>
        </div>
      </div>
    </div>
  )
}

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500">

  </div>
}

export default BlogCard
