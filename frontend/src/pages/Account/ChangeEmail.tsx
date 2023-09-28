import { ExclamationTriangleIcon } from "@heroicons/react/20/solid"
import { useState } from "react"
import Modal from "../../components/Modal"
import { Dialog } from "@headlessui/react"
import accountService from "../../services/accountService"
import Spinner from "../../components/Spinner"
import axios from "axios"
import { NotificationType } from "../../typings/enums"
import { ApiUser } from "../../typings/interfaces"
import { REGEX_EMAIL } from "../../constants"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import storage from "../../services/storage"

const emailSchema = yup
  .object({
    email: yup
      .string()
      .required("Please enter your new email.")
      .matches(REGEX_EMAIL, "Invalid email address."),
  })
  .required()

type ChangeEmailFormData = yup.InferType<typeof emailSchema>

type ChangeEmailProps = {
  user: ApiUser
  setUser: (user: ApiUser | null) => void
  notify: (
    message: string,
    type?: NotificationType | undefined,
    duration?: number | undefined
  ) => void
}

const ChangeEmail = ({ user, setUser, notify }: ChangeEmailProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ChangeEmailFormData>({
    resolver: yupResolver(emailSchema),
    mode: "onSubmit",
  })

  const onSubmit = async (data: ChangeEmailFormData) => {
    try {
      setLoading(true)
      const updatedUser = await accountService.updateEmailById(
        user.id,
        user.token,
        data.email
      )
      setUser(updatedUser)
      if (storage.loadUser() !== null) storage.saveUser(updatedUser)
      notify("Email changed successfully.")
      setOpen(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
        const emailInUse = error?.response?.data?.errors.some(
          (err: { msg: string }) =>
            err.msg.includes("'email' field is already in use.")
        )
        if (emailInUse) {
          setError("email", {
            message: "An account already exists with this email.",
          })
        } else {
          notify("Something went wrong.", NotificationType.error)
          setOpen(false)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="mt-6 flex justify-between items-center">
        <div>
          <h1 className="font-medium">Change your email</h1>
          <p className="text-sm mt-1 mb-4 text-gray-600">Change your email.</p>
        </div>
        <div>
          <button
            onClick={() => {
              reset()
              setOpen(true)
            }}
            className="px-2 py-1 font-medium text-sm text-gray-600 border rounded-md shadow-sm hover:shadow-md transition-all"
          >
            Change email
          </button>
        </div>
      </div>

      <Modal open={open} setOpen={setOpen}>
        <Dialog.Title as="h3" className="text-lg font-medium text-gray-800">
          Change your email
        </Dialog.Title>
        <div className="mt-2">
          <div className="mt-6 flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              New email
            </label>
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
        </div>

        <div className="mt-6 flex gap-2 justify-end">
          <button
            onClick={() => setOpen(false)}
            disabled={loading}
            className="px-2 py-1 font-medium text-sm text-gray-600 border rounded-md shadow-sm hover:shadow-md transition-all disabled:opacity-70 disabled:shadow-none"
          >
            Cancel
          </button>

          <div className="relative">
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              className="px-2 py-1 font-medium text-sm text-white bg-indigo-600 border rounded-md shadow-sm hover:shadow-md transition-all"
            >
              Change email
            </button>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-indigo-400 rounded-md border">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ChangeEmail
