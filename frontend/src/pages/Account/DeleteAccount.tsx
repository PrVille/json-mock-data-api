import { NavigateFunction } from "react-router-dom"
import { useState } from "react"
import Modal from "../../components/Modal"
import { Dialog } from "@headlessui/react"
import accountService from "../../services/accountService"
import Spinner from "../../components/Spinner"
import axios from "axios"
import { NotificationType } from "../../typings/enums"
import { ApiUser } from "../../typings/interfaces"

type DeleteAccountProps = {
  user: ApiUser
  clearUser: () => void
  notify: (
    message: string,
    type?: NotificationType | undefined,
    duration?: number | undefined
  ) => void
  navigate: NavigateFunction
}

const DeleteAccount = ({
  user,
  clearUser,
  notify,
  navigate,
}: DeleteAccountProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const deleteAccount = async () => {
    try {
      setLoading(true)
      await accountService.deleteById(user.id, user.token)
      clearUser()
      notify("Account deleted successfully.")
      navigate("/")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
        notify("Something went wrong.", NotificationType.error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="mt-6 flex justify-between items-center">
        <div>
          <h1 className="font-medium">Delete your account</h1>
          <p className="text-sm mt-1 mb-4 text-gray-600">
            Delete your account and all related data.
          </p>
        </div>
        <div>
          <button
            onClick={() => setOpen(true)}
            className="px-2 py-1 font-medium text-sm text-gray-600 border rounded-md shadow-sm hover:shadow-md transition-all"
          >
            Delete account
          </button>
        </div>
      </div>

      <Modal open={open} setOpen={setOpen}>
        <Dialog.Title as="h3" className="text-lg font-medium text-gray-800">
          Delete your account
        </Dialog.Title>
        <div className="mt-2">
          <p className="text-sm text-gray-600">
            Deleting your account will result in the permanent loss of all your
            data and access. This action cannot be undone.
          </p>
        </div>

        <div className="mt-4 flex gap-2 justify-end">
          <button
            onClick={() => setOpen(false)}
            disabled={loading}
            className="px-2 py-1 font-medium text-sm text-gray-600 border rounded-md shadow-sm hover:shadow-md transition-all disabled:opacity-70 disabled:shadow-none"
          >
            Cancel
          </button>

          <div className="relative">
            <button
              onClick={deleteAccount}
              disabled={loading}
              className="px-2 py-1 font-medium text-sm text-white bg-red-600 border rounded-md shadow-sm hover:shadow-md transition-all"
            >
              Delete account
            </button>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-400 rounded-md border">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default DeleteAccount
