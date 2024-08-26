import Appbar from "../components/Appbar"
import BlogCard from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";

import { useBlogs } from "../hooks"

let id=0;
const Blogs = () => {

  const {blogs,loading} = useBlogs();
  console.log({blogs,loading})
  if(loading){

    return (
      <div>
        <Appbar></Appbar>
        <div className="flex justify-center">
        <div>
        <BlogSkeleton/>
        <BlogSkeleton/>
        <BlogSkeleton/>
        </div>
        </div>
      </div>
    )
  }
  return (
    <div>
    <div>
      <Appbar/>
    </div>
    <div className="flex justify-center">
  <div className="justify-center max-w-xl">
    {blogs.map((blog) => (
      <BlogCard
        key={++id} // assuming each blog has a unique `id` property
        id={blog.id}
        authorName={blog.author.name || "a"}
        title={blog.title}
        content={blog.content}
        publishedDate="2nd Feb 2024"
      />
    ))}
  </div>
</div>


    </div>
  )
}

export default Blogs
