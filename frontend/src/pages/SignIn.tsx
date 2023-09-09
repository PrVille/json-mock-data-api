import { useState } from "react"
import authService from "../services/authService"
import { Link } from "react-router-dom"
import Spinner from "../components/Spinner"
import { classNames } from "../utils"
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid"

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    // validate
    setLoading(true)
    setTimeout(() => {
      authService
        .signIn(email, password)
        .then((data) => console.log(data))
        .catch((err) => console.log(err.response.data.errors))
        .finally(() => setLoading(false))
    }, 3000)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-800">
      <div className="max-w-lg w-full">
        <div className="bg-white shadow-lg rounded-lg px-12 py-14">
          <div className="px-5 flex flex-col">
            <h2 className="text-2xl font-medium">Sign in to your account</h2>
            <div className="mt-6 flex flex-col">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                className="mt-2 border rounded-md px-4 py-2"
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
                className="mt-2 border rounded-md px-4 py-2"
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>

            <div className="mt-3 flex items-center gap-2">
              <ExclamationTriangleIcon className="h-4 w-4 text-white fill-red-600" />
              <span className="-mt-0.5 text-red-600 font-medium text-sm">
                Error message example
              </span>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm font-medium text-gray-700">
                Stay signed in checkbox here
              </span>
            </div>

            <button
              className={classNames(
                "mt-6 py-3 px-4 grid place-items-center text-sm text-white rounded-md w-full font-medium",
                loading ? "bg-indigo-400" : "bg-indigo-600"
              )}
              onClick={submit}
              disabled={loading}
            >
              {loading ? <Spinner /> : <span>Continue</span>}
            </button>
          </div>
        </div>
        <div className="mt-10 ml-6">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
