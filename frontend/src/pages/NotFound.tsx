import { Link } from "react-router-dom"
import Page from "../components/Page"
import { ChevronRightIcon } from "@heroicons/react/24/outline"

const NotFound = () => {
  return (
    <Page>
      <Page.Section>
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-800 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              to="/"
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 rounded-md font-medium text-white px-4 py-2"
            >
              <span>Go back home</span>
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Page.Section>
    </Page>
  )
}

export default NotFound
