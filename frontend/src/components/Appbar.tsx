import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { loginAtom } from "../recoil/LoggedOrNot";


const Appbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const setuser = useSetRecoilState(loginAtom) ;
  return (
    <div className="border-b flex justify-between px-10 py-4 items-center">
      <Link to={"/blogs"} className="flex flex-col justify-center cursor-pointer text-2xl font-bold">
        Medium
      </Link>
      <div className="flex items-center">
        <div>
          <Link to={"/publish"}>
            <button
              type="button"
              className="mr-3 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-1.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              New
            </button>
          </Link>
        </div>
        <div className="relative">
          <div className="items-center mb-2 cursor-pointer" onClick={toggleDropdown}>
            <Avatar size={10} name={"harikirat"} />
          </div>
          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <ul className="py-1">
                <li>
                  <button
                    onClick={() => {
                      // Handle logout logic here
                      console.log("Logout clicked");
                      setuser(false)
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left font-semibold"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}



export default Appbar
