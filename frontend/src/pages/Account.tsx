import { Link, useNavigate } from "react-router-dom"
import Page from "../components/Page"
import { useUser } from "../hooks/useUser"
import { ClipboardIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { classNames } from "../utils"
import Modal from "../components/Modal"
import { Dialog } from "@headlessui/react"
import accountService from "../services/accountService"
import Spinner from "../components/Spinner"
import axios from "axios"
import { useNotification } from "../hooks/useNotification"
import { NotificationType } from "../typings/enums"

type DeleteAccountConfirmationProps = {
  open: boolean
  setOpen: React.Dispatch<boolean>
  loading: boolean
  deleteAccount: () => Promise<void>
}

const DeleteAccountConfirmation = ({
  open,
  setOpen,
  loading,
  deleteAccount,
}: DeleteAccountConfirmationProps) => {
  return (
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
          className="px-2 py-1 font-medium text-sm text-gray-600 border rounded-md shadow-sm hover:shadow-md transition-all"
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
  )
}

const Account = () => {
  const navigate = useNavigate()
  const { user, clearUser } = useUser()
  const { notify } = useNotification()
  const [showKey, setShowKey] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!user) return null // TODO: Handle case when accessing account page without auth

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
      <Page>
        <div className="px-16 pt-16">
          <h1 className="font-medium text-3xl">Your account</h1>
          <p className="text-sm mt-1 text-gray-600">{user.email}</p>
        </div>

        <Page.Section>
          <div className="flex justify-between items-center">
            <Page.Section.Title>API token</Page.Section.Title>
            <Link
              to="/docs/authentication"
              className="text-sm font-medium text-indigo-600 hover:text-gray-800 transition-all"
            >
              Learn more about API authentication &rarr;
            </Link>
          </div>

          <div className="mt-6">
            <h1 className="font-medium">Your API token</h1>
            <p className="text-sm mt-1 mb-4 text-gray-600">
              This token will allow you to authenticate API requests.{" "}
              <Link
                to="/docs/authentication"
                className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
              >
                Learn more &rarr;
              </Link>
            </p>
          </div>

          <div className="mt-6">
            <div className="border rounded-lg">
              <div className="grid grid-cols-5 gap-x-10 text-gray-800 font-medium px-4 py-2 bg-gray-100 border-b rounded-t-lg">
                <h6>Name</h6>
                <h6 className="col-span-3">
                  Token{" "}
                  <ClipboardIcon className="-mt-1 ml-1 h-4 w-4 inline-block text-gray-600 cursor-pointer" />
                </h6>
                <h6>Created</h6>
              </div>
              <div className="grid grid-cols-5 gap-x-10 text-gray-600 text-sm px-4 py-2 rounded-lg">
                <span className="font-medium">DEFAULT_TOKEN</span>

                <div className="break-words col-span-3 relative">
                  {!showKey && (
                    <div className="absolute z-10 w-full h-full flex items-center justify-center">
                      <div>
                        <button
                          onClick={() => setShowKey(true)}
                          className="px-2 py-1 select-none font-medium text-sm text-gray-600 bg-white border rounded-md shadow-sm hover:shadow-md transition-all"
                        >
                          Reveal token
                        </button>
                      </div>
                    </div>
                  )}

                  <span
                    className={classNames(
                      showKey ? "blur-none select-auto" : "blur-sm select-none"
                    )}
                  >
                    {user.token}
                  </span>

                  {showKey && (
                    <div className="mt-2">
                      <button
                        onClick={() => setShowKey(false)}
                        className="px-2 py-1 select-none font-medium text-sm text-gray-600 bg-white border rounded-md shadow-sm hover:shadow-md transition-all"
                      >
                        Hide token
                      </button>
                    </div>
                  )}
                </div>
                {/* TODO: Format date */}
                <span>{user.createdAt.slice(0, 10)}</span>
              </div>
            </div>
          </div>
        </Page.Section>

        <Page.Divider />

        <Page.Section>
          <Page.Section.Title>Data</Page.Section.Title>

          {/* TODO: Clear data, seed data */}
          <div className="mt-6 flex justify-between items-center">
            <div>
              <h1 className="font-medium">Clear your database</h1>
              <p className="text-sm mt-1 mb-4 text-gray-600">
                Delete all of your data in one fell swoop.
              </p>
            </div>
            <div>
              <button className="px-2 py-1 font-medium text-sm text-gray-600 border rounded-md shadow-sm hover:shadow-md transition-all">
                Clear database
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div>
              <h1 className="font-medium">Reset your database</h1>
              <p className="text-sm mt-1 mb-4 text-gray-600">
                Delete all your data and create a new instance.
              </p>
            </div>
            <div>
              <button className="px-2 py-1 font-medium text-sm text-gray-600 border rounded-md shadow-sm hover:shadow-md transition-all">
                Reset database
              </button>
            </div>
          </div>
        </Page.Section>

        <Page.Divider />

        <Page.Section>
          <Page.Section.Title>Settings</Page.Section.Title>

          {/* TODO: Delete account & change pw & change email*/}
          <div className="mt-6 flex justify-between items-center">
            <div>
              <h1 className="font-medium">Change your email</h1>
              <p className="text-sm mt-1 mb-4 text-gray-600">
                Change your email.
              </p>
            </div>
            <div>
              <button className="px-2 py-1 font-medium text-sm text-gray-600 border rounded-md shadow-sm hover:shadow-md transition-all">
                Change email
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div>
              <h1 className="font-medium">Change your password</h1>
              <p className="text-sm mt-1 mb-4 text-gray-600">
                Change your password.
              </p>
            </div>
            <div>
              <button className="px-2 py-1 font-medium text-sm text-gray-600 border rounded-md shadow-sm hover:shadow-md transition-all">
                Change password
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div>
              <h1 className="font-medium">Delete your account</h1>
              <p className="text-sm mt-1 mb-4 text-gray-600">
                Delete your account and all related data.
              </p>
            </div>
            <div>
              <button
                onClick={() => setModalOpen(true)}
                className="px-2 py-1 font-medium text-sm text-gray-600 border rounded-md shadow-sm hover:shadow-md transition-all"
              >
                Delete account
              </button>
            </div>
          </div>

          <DeleteAccountConfirmation
            open={modalOpen}
            setOpen={setModalOpen}
            loading={loading}
            deleteAccount={deleteAccount}
          />
        </Page.Section>
      </Page>
    </>
  )
}

export default Account
