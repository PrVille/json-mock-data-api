import { Link, useNavigate } from "react-router-dom"
import Page from "../../components/Page"
import { useUser } from "../../hooks/useUser"
import { ClipboardIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { classNames } from "../../utils"
import { useNotification } from "../../hooks/useNotification"
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard"

import ClearDatabase from "./ClearDatabase"
import ResetDatabase from "./ResetDatabase"
import ChangeEmail from "./ChangeEmail"
import DeleteAccount from "./DeleteAccount"

const Account = () => {
  const navigate = useNavigate()
  const { user, clearUser, setUser } = useUser()
  const { notify } = useNotification()
  const [showKey, setShowKey] = useState(false)
  const { copyToClipboard } = useCopyToClipboard()

  if (!user) return null // TODO: Handle case when accessing account page without auth

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
                  <button onClick={() => copyToClipboard(user.token)}>
                    <ClipboardIcon className="-mt-1 ml-1 h-4 w-4 inline-block text-gray-600" />
                  </button>
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
          <ClearDatabase user={user} notify={notify} />
          <ResetDatabase user={user} notify={notify} />
        </Page.Section>

        <Page.Divider />

        <Page.Section>
          <Page.Section.Title>Settings</Page.Section.Title>

          {/* TODO: Change pw & change email*/}

          <ChangeEmail user={user} setUser={setUser} notify={notify} />

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

          <DeleteAccount
            user={user}
            clearUser={clearUser}
            notify={notify}
            navigate={navigate}
          />
        </Page.Section>
      </Page>
    </>
  )
}

export default Account
