'use client'
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter()
  const { login, error, isLoading} = useAuthStore()

  const [username, SetUsername] = useState('')
  const [password, SetPassword] = useState('')

  console.log(username,password,'sss');
  

  async function handleSubmit(e:any) {
    e.preventDefault()
    await login({username,password})
    router.replace('/dashboard')
  }

  return (
    <div className="min-h-screen bg-black text-gray-900 flex justify-center">
      <div className="max-w-6xl m-0 sm:m-10 bg-black border-yellow-500 border-2 shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl text-yellow-500 font-extrabold">
              Login
            </h1>
            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleSubmit}>
              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  value={username}
                  onChange={(e) => SetUsername(e.target.value)}
                  type="text"
                  placeholder="Username"
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  value={password}
                  onChange={(e) => SetPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
                <button className="mt-5 tracking-wide font-semibold bg-yellow-500 text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <span className="text-xl text-center text-neutral-800 ">
                    login
                  </span>
                </button>
              </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-gray-200 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
