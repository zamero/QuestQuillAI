import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useGoogleLogin } from "@react-oauth/google"
// import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios"

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // const [isUserOpen, setIsUserOpen] = useState(false);
  const [userAvatar, setuserAvatar] = useState(localStorage.getItem("avatar"))
  const [userEmail, setuserEmail] = useState(localStorage.getItem("email"))
  const [userName, setuserName] = useState(localStorage.getItem("name"))
  const [userId, setuserId] = useState(localStorage.getItem("userId"))

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen)
  }

  async function AddEmailToDB(data: any, subData: any) {
    const response = await fetch("https://chatlabs.up.railway.app/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data, sub: subData }),
    })
    return response.json()
  }

  async function getUserId(sub: string) {
    let data

    try {
      const response = await fetch(
        `https://chatlabs.up.railway.app/getid/${sub}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      data = await response.json()
    } catch (error) {
      console.log(error)
    }

    if (data && data.userId) {
      setuserId(data.userId)
      localStorage.setItem("userId", data.userId)
    }
  }

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const info = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        )
        console.log(info)
        AddEmailToDB(info.data.email, info.data.sub)
        getUserId(info.data.sub)
        localStorage.setItem("avatar", info.data.picture)
        localStorage.setItem("email", info.data.email)
        localStorage.setItem("name", info.data.given_name)
        setuserId(localStorage.getItem("userId"))
        setuserAvatar(localStorage.getItem("avatar"))
        setuserEmail(localStorage.getItem("email"))
        setuserName(localStorage.getItem("name"))
      } catch (err) {
        console.log(err)
      }
    },
  })

  const handleLoginClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    login()
  }

  const navigate = useNavigate()

  const logOut = () => {
    navigate("/")
    localStorage.clear()
    location.reload()
  }

  return (
    <nav className="p-3 border-gray-200 bg-neutral-900">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
        <Link to="/" className="flex items-center">
          <img
            src="https://drive.google.com/uc?id=1NJrgM8zoisyIYc_hE66zxhEEOA4Po76h"
            className="h-10"
            alt="Chatlabs Logo"
          />
          <span className="self-center text-2xl font-semibold text-white">
            <span className="text-violet-500">Chat</span> Labs
          </span>
        </Link>

        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-violet-500 rounded-lg md:hidden hover:bg-neutral-600"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-solid-bg"
        >
          <ul className="flex flex-col items-start mt-4 font-medium rounded-lg bg-neutral-900 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent ">
            <li></li>
            <li>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 text-white rounded hover:text-violet-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="*"
                className="block py-2 pl-3 pr-4 text-white rounded hover:text-violet-500"
              >
                Docs
              </Link>
            </li>
            {userId && (
              <li>
                <Link
                  to="/dashboard"
                  className="block py-2 pl-3 pr-4 text-white rounded hover:text-violet-500"
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li></li>
            {userAvatar && (
              <li>
                <h2 className="block py-2 pl-3 pr-4 text-white rounded">
                  <img
                    src={userAvatar}
                    className="h-8 inline mr-2 rounded-full"
                    alt="User Avatar"
                  />
                  <h4 className="hidden">{userEmail}</h4>
                  <h4 className="hidden">{userId}</h4>
                  {userName}
                </h2>
              </li>
            )}
            {!userEmail && (
              <li>
                <button
                  onClick={handleLoginClick}
                  className="text-white flex items-center bg-violet-700 hover:bg-violet-600 rounded ml-3 p-1.5"
                >
                  Log in with
                  <svg
                    className="h-5 inline ml-2"
                    fill="whitesmoke"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                  </svg>
                </button>
              </li>
            )}
            {userEmail && (
              <li>
                <button
                  onClick={logOut}
                  className="text-white flex items-center bg-violet-700 hover:bg-violet-600 rounded ml-3 p-1.5"
                >
                  Log out
                </button>
              </li>
            )}
            {/* {isLoggedin !== false &&
            isLoggedin !== undefined &&
            userAvatar &&
            userAvatar ? (
              <>
                <h2 className="block py-2 pl-3 pr-4 text-white rounded">
                  {" "}
                  <img
                    src={userAvatar}
                    className="h-8 inline mr-2 rounded-full"
                  />
                  {userName}
                </h2>
              </>
            ) : (
              <>
                <li>
                  <button
                    className="block py-2 pl-3 pr-4 text-white rounded hover:text-violet-500"
                    onClick={login}
                  >
                    Login
                  </button>
                </li>
              </>
            )} */}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
