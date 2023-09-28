import { useEffect, useState } from "react"
import Modal from "../../components/Modal"
import { Dialog } from "@headlessui/react"
import accountService from "../../services/accountService"
import Spinner from "../../components/Spinner"
import axios from "axios"
import { NotificationType } from "../../typings/enums"
import { ApiUser, Resource } from "../../typings/interfaces"

type ResetDatabaseProps = {
  user: ApiUser
  notify: (
    message: string,
    type?: NotificationType | undefined,
    duration?: number | undefined
  ) => void
}

const ResetDatabase = ({ user, notify }: ResetDatabaseProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fetchingResources, setFetchingResources] = useState(false)
  const [resources, setResources] = useState<Resource[] | null>(null)

  useEffect(() => {
    if (open) {
      fetchResources()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const fetchResources = async () => {
    setResources(null)

    try {
      setFetchingResources(true)
      const fetchedResources = await accountService.getResources(
        user.id,
        user.token
      )
      setResources(fetchedResources)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
        notify("Something went wrong.", NotificationType.error)
      }
      setOpen(false)
    } finally {
      setFetchingResources(false)
    }
  }

  const resetDatabase = async () => {
    try {
      setLoading(true)
      await accountService.resetResources(user.id, user.token)
      notify("Database was reset successfully.")
      setOpen(false)
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
          <h1 className="font-medium">Reset your database</h1>
          <p className="text-sm mt-1 mb-4 text-gray-600">
            Delete all of your data and generate a new instance.
          </p>
        </div>
        <div>
          <button
            onClick={() => {
              setOpen(true)
            }}
            className="px-2 py-1 font-medium text-sm text-gray-600 border rounded-md shadow-sm hover:shadow-md transition-all"
          >
            Reset database
          </button>
        </div>
      </div>

      <Modal open={open} setOpen={setOpen}>
        <Dialog.Title as="h3" className="text-lg font-medium text-gray-800">
          Reset your database
        </Dialog.Title>
        <div className="mt-2">
          <p className="text-sm text-gray-600">
            Resetting your database will permanently delete all of your current
            data and create a new instance of randomly generated data. This
            action cannot be undone.
          </p>
        </div>

        <div className="mt-2">
          {!fetchingResources && resources !== null ? (
            <div className="text-sm text-gray-600 divide-y">
              {resources.every((resource) => resource.count === 0) ? (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    It looks like you don't have any existing data, so there is
                    nothing to delete. Continue to create a new instance of
                    randomly generated data.
                  </p>
                </div>
              ) : (
                resources
                  .filter((resource) => resource.count !== 0)
                  .map((resource, i) => (
                    <div key={i} className="grid grid-cols-2 py-2 font-medium">
                      <p>{resource.name}</p>
                      <p>
                        {resource.count}{" "}
                        {resource.count === 1 ? "object" : "objects"}
                      </p>
                    </div>
                  ))
              )}
            </div>
          ) : (
            <div className="p-8 flex justify-center items-center">
              <Spinner color="gray-600" />
            </div>
          )}
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
              onClick={resetDatabase}
              disabled={loading || fetchingResources}
              className="px-2 py-1 font-medium text-sm text-white bg-red-600 border rounded-md shadow-sm hover:shadow-md transition-all disabled:opacity-70"
            >
              Reset database
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

export default ResetDatabase
