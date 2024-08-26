import { Blog } from "../hooks";
import Appbar from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  console.log(blog);
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl  pt-12 ">
          <div className="col-span-8">
            <div className="text-3xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">Post on 2nd December 2023</div>
            <div className="pt-4">{blog.content}</div>
          </div>
          <div className="col-span-4 ">
            <div className="text-slate-600 font-semibold text-lg ">Author</div>
            <div className="flex items-center">
              <div className="  mr-4">
                <Avatar name={blog.author.name || "anonymous"}></Avatar>
              </div>
              <div>
                <div className="text-xl font-bold ">
                  {blog.author.name}
                </div>
                <div className="pt-2 text-slate-500">
                  Random catch phrase about the authors to grab users attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
