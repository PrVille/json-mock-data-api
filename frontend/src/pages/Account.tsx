import { Link } from "react-router-dom"
import Page from "../components/Page"
import { useUser } from "../hooks/useUser"
import { ClipboardIcon } from "@heroicons/react/24/outline"

const Account = () => {
  const { user } = useUser()

  if (!user) return null // TODO: Handle case when accessing account page without auth

  return (
    <Page>
      <Page.Section>
        <Page.Section.Title>Profile</Page.Section.Title>
      </Page.Section>

      <Page.Divider />

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
              <span className="break-words col-span-3">{user.token}</span>
              <span>{user.createdAt.slice(0,10)}</span>
            </div>
          </div>
        </div>
      </Page.Section>

      <Page.Divider />

      <Page.Section>
        <Page.Section.Title>Data</Page.Section.Title>

        {/* TODO: Clear data, seed data */}
      </Page.Section>

      <Page.Divider />

      <Page.Section>
        <Page.Section.Title>Settings</Page.Section.Title>

        {/* TODO: Delete account */}
      </Page.Section>
    </Page>
  )
}

export default Account
