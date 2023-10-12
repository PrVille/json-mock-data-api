import { ChevronRightIcon, PlayIcon } from "@heroicons/react/24/outline"
import ExampleResponse from "../components/ExampleResponse"
import Page from "../components/Page"
import { Method, NotificationType } from "../typings/enums"
import { Link } from "react-router-dom"
import { useState } from "react"
import { classNames } from "../utils"
import userService from "../services/userService"
import { useCopyToClipboard } from "../hooks/useCopyToClipboard"
import postService from "../services/postService"
import { AllRoutes } from "./Introduction"
import Logo from "../components/Logo"
import bgImage from "../assets/bg.svg"
import commentService from "../services/commentService"
import { useNotification } from "../hooks/useNotification"

const Background = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          zIndex: "-2",
          height: "350px",
          width: "100%",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          zIndex: "-1",
          backgroundImage: "radial-gradient(rgba(0, 0, 0, 0) 1.5px, #FFF 1px)",
          backgroundSize: "14px 14px",
          height: "100vh",
          width: "100%",
          top: 0,
          left: 0,
        }}
      ></div>
    </>
  )
}

type RunRequestButtonProps = {
  loading: boolean
  onClick: () => void
}

const RunRequestButton = ({
  loading = true,
  onClick,
}: RunRequestButtonProps) => {
  return (
    <button
      id="runRequestButton"
      className={classNames(
        "flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 rounded-md font-medium text-sm text-white px-2 py-1",
        loading ? "animate-pulse" : "animate-none"
      )}
      onClick={onClick}
      disabled={loading}
    >
      <PlayIcon className="w-3 h-3 fill-white" />
      <span>Run request</span>
    </button>
  )
}

type TabItemProps = {
  index: number
  activeTab: number
  changeTab: React.Dispatch<number>
  name: string
}

const TabItem = ({ activeTab, index, changeTab, name }: TabItemProps) => {
  return (
    <button
      className={classNames(
        "text-left font-medium p-2.5 rounded-lg",
        activeTab === index
          ? "text-indigo-500 bg-white shadow-md"
          : "text-gray-500 hover:bg-white"
      )}
      onClick={() => changeTab(index)}
    >
      {name}
    </button>
  )
}

const listPostsCodeBlock = `fetch('https://json-mock-data.vercel.app/api/posts')
  .then(response => response.json())
  .then(json => console.log(json))`

const listCommentsCodeBlock = `fetch('https://json-mock-data.vercel.app/api/comments')
  .then(response => response.json())
  .then(json => console.log(json))`

const listUsersCodeBlock = `fetch('https://json-mock-data.vercel.app/api/users')
  .then(response => response.json())
  .then(json => console.log(json))`

const createUserCodeBlock = `fetch('https://json-mock-data.vercel.app/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: "ville.prami@email.com",
    username: "PrVille",
    firstName: "Ville",
    lastName: "Prami",
    age: 27
  })
})
  .then(response => response.json())
  .then(json => console.log(json))`

const tabs: Tab[] = [
  {
    name: "Create user",
    method: Method.post,
    endpoint: "/api/users",
    codeBlock: createUserCodeBlock,
    learnMoreUrl: "/docs/users",
    learnMoreName: "Learn more about users",
    runRequest: () =>
      userService.create({
        email: "ville.prami@email.com",
        username: "PrVille",
        firstName: "Ville",
        lastName: "Prami",
        age: 27,
      }),
  },
  {
    name: "List users",
    method: Method.get,
    endpoint: "/api/users",
    codeBlock: listUsersCodeBlock,
    learnMoreUrl: "/docs/users",
    learnMoreName: "Learn more about users",
    runRequest: userService.getAll,
  },
  {
    name: "List posts",
    method: Method.get,
    endpoint: "/api/posts",
    codeBlock: listPostsCodeBlock,
    learnMoreUrl: "/docs/posts",
    learnMoreName: "Learn more about posts",
    runRequest: postService.getAll,
  },
  {
    name: "List comments",
    method: Method.get,
    endpoint: "/api/comments",
    codeBlock: listCommentsCodeBlock,
    learnMoreUrl: "/docs/comments",
    learnMoreName: "Learn more about comments",
    runRequest: commentService.getAll,
  },
]

interface Tab {
  name: string
  method: Method
  endpoint: string
  codeBlock: string
  learnMoreUrl: string
  learnMoreName: string
  runRequest: () => Promise<object[]>
}

const Home = () => {
  const { copyToClipboard } = useCopyToClipboard()
  const { notify } = useNotification()
  const [loadingRequest, setLoadingRequest] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [response, setResponse] = useState<object[] | null>(null)
  const tab = tabs[activeTab]

  const changeTab = (index: number) => {
    if (loadingRequest) return

    setActiveTab(index)
    setResponse(null)
  }

  const runRequest = async () => {
    if (loadingRequest) return

    try {
      setLoadingRequest(true)
      const data = await tab.runRequest()
      setResponse(data)
    } catch (error) {
      notify("Something went wrong.", NotificationType.error)
    } finally {
      setLoadingRequest(false)
    }
  }

  return (
    <div>
      <Background />

      <Page>
        <Page.Section>
          <div className="mt-8 md:mt-0 inline-block bg-white/75 shadow-[0_0_64px_64px] shadow-white/75">
            <h1 className="text-2xl md:text-4xl text-black font-bold">
              JSON Mock Data API
            </h1>
            <h5 className="text-lg md:text-2xl mt-4 text-gray-600">
              Easing development for free with placeholder data.
            </h5>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-6">
              <Link
                to="/docs"
                className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 rounded-md font-medium text-white px-4 py-2"
              >
                <span>Get started</span>
                <ChevronRightIcon className="w-4 h-4" />
              </Link>

              <a
                href="https://github.com/PrVille/json-mock-data-api"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-indigo-500 hover:text-gray-800"
              >
                View on GitHub &rarr;
              </a>
            </div>
          </div>
        </Page.Section>

        <Page.Section>
          <Page.Section.Title>Try it out</Page.Section.Title>

          <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-5 items-center">
            <div className="bg-gray-50 p-4 rounded-xl w-full">
              <div className="flex flex-col gap-1">
                {tabs.map((tab, index) => (
                  <TabItem
                    key={index}
                    index={index}
                    activeTab={activeTab}
                    changeTab={changeTab}
                    name={tab.name}
                  />
                ))}
              </div>
            </div>

            <div className="w-full col-span-2">
              <ExampleResponse darkMode>
                <ExampleResponse.TopBar darkMode>
                  <ExampleResponse.TopBar.EndpointTitle
                    method={tab.method}
                    endpoint={tab.endpoint}
                  />
                  <ExampleResponse.TopBar.CopyButton
                    darkMode
                    onClick={() => copyToClipboard(tab.codeBlock)}
                  />
                </ExampleResponse.TopBar>
                <ExampleResponse.Javascript
                  codeBlock={tab.codeBlock}
                  className="h-[25vh]"
                />
              </ExampleResponse>
            </div>

            <div className="w-full col-span-2">
              <ExampleResponse>
                <ExampleResponse.TopBar>
                  <ExampleResponse.TopBar.Title>
                    Response
                  </ExampleResponse.TopBar.Title>
                  {response !== null && (
                    <ExampleResponse.TopBar.CopyButton
                      onClick={() =>
                        copyToClipboard(JSON.stringify(response, null, 2))
                      }
                    />
                  )}
                </ExampleResponse.TopBar>

                <div className="relative">
                  {response === null && (
                    <div className="absolute z-10 inset-0 flex items-center justify-center bg-gray-50">
                      <RunRequestButton
                        onClick={runRequest}
                        loading={loadingRequest}
                      />
                    </div>
                  )}

                  <ExampleResponse.Json
                    object={response || {}}
                    className="h-[25vh]"
                  />
                </div>
              </ExampleResponse>
            </div>
          </div>

          <div className="mt-2 flex justify-end">
            <Link
              to={tab.learnMoreUrl}
              className="font-medium text-indigo-500 hover:text-gray-800 text-sm"
            >
              {tab.learnMoreName} &rarr;
            </Link>
          </div>
        </Page.Section>

        <AllRoutes />

        <Page.Divider />

        <Page.Section>
          <div className="flex flex-col gap-y-4 md:flex-row items-center justify-between">
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-500">
                © {new Date().getFullYear() + " "}
                <a
                  href="https://villeprami.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all bg-inherit hover:text-gray-800"
                >
                  Ville Prami
                </a>
              </p>
            </div>

            <div className="text-center">
              <Logo />

              <p className="mt-1 text-xs font-medium text-gray-500">
                Inspired by{" "}
                <a
                  href="https://jsonplaceholder.typicode.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all bg-inherit hover:text-gray-800"
                >
                  JSONPlaceholder
                </a>{" "}
                and{" "}
                <a
                  href="https://stripe.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all bg-inherit hover:text-gray-800"
                >
                  Stripe
                </a>
              </p>
            </div>

            <div>
              <a
                href="https://github.com/PrVille/json-mock-data-api"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-6 w-6 fill-gray-500 transition group-hover:fill-gray-800"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z"
                  ></path>
                </svg>
              </a>
            </div>

            <div className="block md:hidden">
              <p className="text-sm font-medium text-gray-500">
                © {new Date().getFullYear() + " "}
                <a
                  href="https://villeprami.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all bg-inherit hover:text-gray-800"
                >
                  Ville Prami
                </a>
              </p>
            </div>
          </div>
        </Page.Section>
      </Page>
    </div>
  )
}

export default Home
