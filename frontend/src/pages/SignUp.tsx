import { useState } from "react"
import authService from "../services/authService"
import { Link, useNavigate } from "react-router-dom"
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

const schema = yup
  .object({
    email: yup
      .string()
      .required("Please enter your email.")
      .matches(REGEX_EMAIL, "Invalid email address."),
    password: yup
      .string()
      .required("Please enter your password.")
      .length(5, "Your password must be at least 5 characters."),
    passwordConfirmation: yup
      .string()
      .required("Please confirm your password.")
      .oneOf([yup.ref("password")], "Your passwords do not match."),
  })
  .required()

type FormData = yup.InferType<typeof schema>

const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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

  const onSubmit = (data: FormData) => {
    setLoading(true)

    setTimeout(() => {
      authService
        .signUp(data.email, data.password)
        .then(() => {
          authService.signIn(data.email, data.password).then((user) => {
            setUser(user)
            storage.saveUser(user)
            navigate("/")
          })
        })
        .catch((error) => {
          const emailInUse = error?.response?.data?.errors?.some(
            (err: { msg: string }) =>
              err.msg.includes("'email' field is already in use.")
          )
          if (emailInUse) {
            setError("email", {
              message: "An account already exists with this email.",
            })
          } else {
            setError("root", { message: "Something went wrong!" })
          }
        })
        .finally(() => setLoading(false))
    }, 3000)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-800">
      <div className="max-w-lg w-full">
        <div className="mb-10 ml-6">
          <Logo />
        </div>
        <div className="bg-white shadow-2xl rounded-2xl px-12 py-14">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-5 flex flex-col"
          >
            <h2 className="text-2xl font-medium">Create your account</h2>

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

            <div className="mt-6 flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                Password confirmation
              </label>
              <input
                className="mt-2 border rounded-md px-4 py-2 shadow-sm focus:ring-indigo-600 focus:border-indigo-600"
                type="password"
                {...register("passwordConfirmation")}
              />
            </div>

            {errors.passwordConfirmation && (
              <div className="mt-3 flex items-center gap-2">
                <ExclamationTriangleIcon className="h-4 w-4 text-white fill-red-600" />
                <span className="-mt-0.5 text-red-600 font-medium text-sm">
                  {errors.passwordConfirmation.message}
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

            <button
              className={classNames(
                "mt-10 py-3 px-4 grid place-items-center text-sm text-white rounded-md w-full font-medium",
                loading ? "bg-indigo-400" : "bg-indigo-600"
              )}
              type="submit"
              disabled={loading}
            >
              {loading ? <Spinner /> : <span>Create account</span>}
            </button>
          </form>
        </div>

        <div className="mt-10 ml-6">
          <p className="text-sm">
            Have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
