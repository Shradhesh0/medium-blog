import { BrowserRouter,Route,Routes } from "react-router-dom"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Blog from "./pages/Blog"
import Blogs from "./pages/Blogs"
import { Publish } from "./pages/Publish"
import { useRecoilValue } from "recoil"
import { loginAtom } from "./recoil/LoggedOrNot"



const App = () => {

  const user = useRecoilValue(loginAtom)
  
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={user?<Blogs/>:<Signup/>} />
        <Route path="/signup" element={user?<Blogs/>:<Signup/>} />
        <Route path="/signin" element={user?<Blogs/>:<Signin/>} />
        <Route path="/blog/:id" element={user?<Blog/>:<Signin/>} />
        <Route path="/blogs" element={user?<Blogs/>:<Signin/>} />
        <Route path="/publish" element={user?<Publish/>:<Signin/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
