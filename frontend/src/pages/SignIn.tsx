import { useState } from "react"
import authService from "../services/authService"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import { classNames } from "../utils"
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { REGEX_EMAIL } from "../constants"
import { useUser } from "../hooks/useUser"
import storage from "../services/storage"
import Logo from "../components/Logo"
import { useNotification } from "../hooks/useNotification"

const schema = yup
  .object({
    email: yup
      .string()
      .required("Please enter your email.")
      .matches(REGEX_EMAIL, "Invalid email address."),
    password: yup.string().required("Please enter your password."),
  })
  .required()

type FormData = yup.InferType<typeof schema>

const SignIn = () => {
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const { notify } = useNotification()
  const navigate = useNavigate()
  const location = useLocation()
  const { setUser } = useUser()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  })

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      const user = await authService.signIn(data.email, data.password)
      setUser(user)
      if (rememberMe) storage.saveUser(user)
      navigate(location?.state?.prevUrl || "/account")
      notify("Welcome back!")
    } catch (error) {
      // TODO: check response and add correct error msg
      setError("root", { message: "Incorrect email or password." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-800">
      <div className="sm:max-w-lg w-full">
        <div className="mb-10 ml-6">
          <Logo />
        </div>
        <div className="bg-white sm:shadow-2xl rounded-2xl px-0 sm:px-12 py-14">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 flex flex-col"
          >
            <h2 className="text-2xl font-medium">Sign in to your account</h2>

            <div className="mt-6 flex flex-col">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                className="mt-2 border rounded-md px-4 py-2 shadow-sm focus:ring-indigo-600 focus:border-indigo-600"
                {...register("email")}
              />
            </div>

            {errors.email && (
              <div className="mt-3 flex items-center gap-2">
                <ExclamationTriangleIcon className="h-4 w-4 text-white fill-red-600" />
                <span className="-mt-0.5 text-red-600 font-medium text-sm">
                  {errors.email.message}
                </span>
              </div>
            )}

            <div className="mt-6 flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                className="mt-2 border rounded-md px-4 py-2 shadow-sm focus:ring-indigo-600 focus:border-indigo-600"
                type="password"
                {...register("password")}
              />
            </div>

            {errors.password && (
              <div className="mt-3 flex items-center gap-2">
                <ExclamationTriangleIcon className="h-4 w-4 text-white fill-red-600" />
                <span className="-mt-0.5 text-red-600 font-medium text-sm">
                  {errors.password.message}
                </span>
              </div>
            )}

            {errors.root && (
              <div className="mt-3 flex items-center gap-2">
                <ExclamationTriangleIcon className="h-4 w-4 text-white fill-red-600" />
                <span className="-mt-0.5 text-red-600 font-medium text-sm">
                  {errors.root.message}
                </span>
              </div>
            )}

            <div className="mt-6 flex items-center gap-2">
              <input
                type="checkbox"
                onChange={() => setRememberMe(!rememberMe)}
                checked={rememberMe}
                className="rounded border text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <span className="text-sm font-medium text-gray-700">
                Remember me
              </span>
            </div>

            <button
              className={classNames(
                "mt-6 py-3 px-4 grid place-items-center text-sm text-white rounded-md w-full font-medium",
                loading ? "bg-indigo-400" : "bg-indigo-600"
              )}
              type="submit"
              disabled={loading}
            >
              {loading ? <Spinner /> : <span>Continue</span>}
            </button>
          </form>
        </div>

        <div className="mt-10 ml-6 text-sm text-gray-600">
          <p>
            Don't have an account?{" "}
            <Link
              to="/signup"
              state={{ prevUrl: location?.state?.prevUrl }}
              className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
            >
              Sign up
            </Link>
          </p>

          <div className="mt-8 font-medium text-gray-500">
            <Link to="/" className="hover:text-gray-800 transition-all">
              Home
            </Link>
            <span className="px-2 select-none">·</span>
            <Link to="/docs" className="hover:text-gray-800 transition-all">
              Docs
            </Link>
            <span className="px-2 select-none">·</span>
            <a
              href="https://github.com/PrVille/json-mock-data-api"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-800 transition-all"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
