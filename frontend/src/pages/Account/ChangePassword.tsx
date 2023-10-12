import { ExclamationTriangleIcon } from "@heroicons/react/20/solid"
import { useState } from "react"
import Modal from "../../components/Modal"
import { Dialog } from "@headlessui/react"
import accountService from "../../services/accountService"
import Spinner from "../../components/Spinner"
import axios from "axios"
import { NotificationType } from "../../typings/enums"
import { ApiUser } from "../../typings/interfaces"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const passwordSchema = yup
  .object({
    oldPassword: yup.string().required("Please enter your old password."),
    newPassword: yup
      .string()
      .required("Please enter your new password.")
      .min(5, "Your new password must be at least 5 characters."),
    newPasswordConfirmation: yup
      .string()
      .required("Please confirm your new password.")
      .oneOf([yup.ref("newPassword")], "Your new passwords do not match."),
  })
  .required()

type ChangePasswordFormData = yup.InferType<typeof passwordSchema>

type ChangePasswordProps = {
  user: ApiUser
  notify: (
    message: string,
    type?: NotificationType | undefined,
    duration?: number | undefined
  ) => void
}

const ChangePassword = ({ user, notify }: ChangePasswordProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(passwordSchema),
    mode: "onSubmit",
  })

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      setLoading(true)
      await accountService.updatePasswordById(
        user.id,
        user.token,
        data.oldPassword,
        data.newPassword
      )
      
      notify("Password changed successfully.")
      setOpen(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
        const wrongPassword = error?.response?.data?.errors.some(
          (err: { msg: string }) =>
            err.msg.includes("The specified password for the 'oldPassword' field is incorrect.")
        )
        if (wrongPassword) {
          setError("oldPassword", {
            message: "Incorrect old password.",
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
      <div className="mt-6 flex flex-col sm:flex-row justify-between sm:items-center">
        <div>
          <h1 className="font-medium">Change your password</h1>
          <p className="text-sm mt-1 mb-4 text-gray-600">
            Change your password.
          </p>
        </div>
        <div>
          <button
            onClick={() => {
              reset()
              setOpen(true)
            }}
            className="px-2 py-1 font-medium text-sm text-gray-600 border rounded-md shadow-sm hover:shadow-md transition-all"
          >
            Change password
          </button>
        </div>
      </div>

      <Modal open={open} setOpen={setOpen}>
        <Dialog.Title as="h3" className="text-lg font-medium text-gray-800">
          Change your password
        </Dialog.Title>
        <div className="mt-2">
          <div className="mt-6 flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Old password
            </label>
            <input
              type="password"
              className="mt-2 border rounded-md px-4 py-2 shadow-sm focus:ring-indigo-600 focus:border-indigo-600"
              {...register("oldPassword")}
            />
          </div>

          {errors.oldPassword && (
            <div className="mt-3 flex items-center gap-2">
              <ExclamationTriangleIcon className="h-4 w-4 text-white fill-red-600" />
              <span className="-mt-0.5 text-red-600 font-medium text-sm">
                {errors.oldPassword.message}
              </span>
            </div>
          )}

          <div className="mt-6 flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              New password
            </label>
            <input
              type="password"
              className="mt-2 border rounded-md px-4 py-2 shadow-sm focus:ring-indigo-600 focus:border-indigo-600"
              {...register("newPassword")}
            />
          </div>

          {errors.newPassword && (
            <div className="mt-3 flex items-center gap-2">
              <ExclamationTriangleIcon className="h-4 w-4 text-white fill-red-600" />
              <span className="-mt-0.5 text-red-600 font-medium text-sm">
                {errors.newPassword.message}
              </span>
            </div>
          )}

          <div className="mt-6 flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              New password confirmation
            </label>
            <input
              type="password"
              className="mt-2 border rounded-md px-4 py-2 shadow-sm focus:ring-indigo-600 focus:border-indigo-600"
              {...register("newPasswordConfirmation")}
            />
          </div>

          {errors.newPasswordConfirmation && (
            <div className="mt-3 flex items-center gap-2">
              <ExclamationTriangleIcon className="h-4 w-4 text-white fill-red-600" />
              <span className="-mt-0.5 text-red-600 font-medium text-sm">
                {errors.newPasswordConfirmation.message}
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
              Change password
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

export default ChangePassword
