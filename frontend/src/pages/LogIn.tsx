import { useState } from "react"

const LogIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  return (
    <div className="flex items-center justify-center h-full text-gray-800">
      <div className="bg-white shadow-lg rounded-lg px-12 py-14 max-w-lg w-full">
        <div className="px-5 flex flex-col">
          <h2 className="text-2xl font-medium">Log in to your account</h2>
          <div className="mt-6 flex flex-col">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              className="mt-2 border rounded-md px-4 py-2 text-sm"
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div className="mt-6 flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              className="mt-2 border rounded-md px-4 py-2 text-sm"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700">
              Stay signed in checkbox here
            </p>
          </div>

          <button className="mt-6 py-2 px-4 text-sm bg-indigo-600 text-white rounded-md w-full font-medium">
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogIn
