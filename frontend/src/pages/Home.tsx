import { ChevronRightIcon, PlayIcon } from "@heroicons/react/24/outline"
import ExampleResponse from "../components/ExampleResponse"
import Page from "../components/Page"
import { Method } from "../typings/enums"
import { Link } from "react-router-dom"
import { useState } from "react"
import { classNames } from "../utils"

const RunRequestButton = () => {
  return (
    <button className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 rounded-md font-medium text-sm text-white px-2 py-1">
      <PlayIcon className="w-3 h-3 fill-white" />
      <span>Run request</span>
    </button>
  )
}

type TabItemProps = {
  index: number
  activeTab: number
  setActiveTab: React.Dispatch<number>
  name: string
}

const TabItem = ({ activeTab, index, setActiveTab, name }: TabItemProps) => {
  return (
    <button
      className={classNames(
        "text-left font-medium p-3 rounded-lg",
        activeTab === index
          ? "text-indigo-500 bg-white shadow-md"
          : "text-gray-500 hover:bg-white"
      )}
      onClick={() => setActiveTab(index)}
    >
      {name}
    </button>
  )
}

const getSeveralUsersCodeBlock = `fetch('https://json-mock-data.vercel.app/api/users')
  .then(res => res.json())
  .then(json => console.log(json))`

const createPostCodeBlock = `fetch('https://json-mock-data.vercel.app/api/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: "Ducimus sint ratione nihil officiis.",
    content: "Sit aut ex voluptate aspernatur accusantium itaque in odio. Dignissimos commodi exercitationem accusantium excepturi cumque incidunt aperiam. Deleniti incidunt dolorum quod aliquam fuga vel possimus.",
    userId: "01e2f884-9f2f-4359-855e-8cddcfc7802f"
  })
})
  .then(res => res.json())
  .then(console.log)`

const getUserCodeBlock = `fetch('https://json-mock-data.vercel.app/api/user/01e2f884-9f2f-4359-855e-8cddcfc7802f')
  .then(res => res.json())
  .then(json => console.log(json))`

const tabs = [
  {
    name: "Get several users",
    method: Method.get,
    endpoint: "/api/users",
    codeBlock: getSeveralUsersCodeBlock,
    learnMoreUrl: "/docs/users",
    learnMoreName: "Learn more about users",
  },
  {
    name: "Create post",
    method: Method.post,
    endpoint: "/api/posts",
    codeBlock: createPostCodeBlock,
    learnMoreUrl: "/docs/posts",
    learnMoreName: "Learn more about posts",
  },
  {
    name: "Get user",
    method: Method.get,
    endpoint: "/api/users/:id",
    codeBlock: getUserCodeBlock,
    learnMoreUrl: "/docs/users",
    learnMoreName: "Learn more about users",
  },
  {
    name: "Get user",
    method: Method.get,
    endpoint: "/api/users/:id",
    codeBlock: getUserCodeBlock,
    learnMoreUrl: "/docs/users",
    learnMoreName: "Learn more about users",
  },
  {
    name: "Get user",
    method: Method.get,
    endpoint: "/api/users/:id",
    codeBlock: getUserCodeBlock,
    learnMoreUrl: "/docs/users",
    learnMoreName: "Learn more about users",
  },
  {
    name: "Get user",
    method: Method.get,
    endpoint: "/api/users/:id",
    codeBlock: getUserCodeBlock,
    learnMoreUrl: "/docs/users",
    learnMoreName: "Learn more about users",
  },
]

const Home = () => {
  const [activeTab, setActiveTab] = useState(0)
  const tab = tabs[activeTab]

  return (
    <div>
      <Page>
        <Page.Section>
          <div>
            <h1 className="text-4xl text-black font-bold">
              JSON Mock Data API
            </h1>
            <h5 className="text-2xl mt-4 text-gray-500">
              Easing development for free with placeholder data.
            </h5>

            <div className="flex items-center gap-6 mt-6">
              <Link
                to="/docs/overview"
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

          <div className="mt-5 grid grid-cols-1 gap-12 md:grid-cols-2 place-items-start">
            <div className="bg-gray-50 p-3 rounded-xl w-full">
              <div className="flex flex-col gap-1">
                {tabs.map((tab, index) => (
                  <TabItem
                    index={index}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    name={tab.name}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <ExampleResponse darkMode>
                <ExampleResponse.TopBar darkMode>
                  <ExampleResponse.TopBar.EndpointTitle
                    method={tab.method}
                    endpoint={tab.endpoint}
                  />
                  <div className="flex gap-4 items-center">
                    <RunRequestButton />
                    <ExampleResponse.TopBar.CopyButton darkMode />
                  </div>
                </ExampleResponse.TopBar>
                <ExampleResponse.Javascript codeBlock={tab.codeBlock} />
              </ExampleResponse>

              <div>
                <ExampleResponse>
                  <ExampleResponse.TopBar>
                    <ExampleResponse.TopBar.Title>
                      Response
                    </ExampleResponse.TopBar.Title>
                    <ExampleResponse.TopBar.CopyButton />
                  </ExampleResponse.TopBar>
                  <ExampleResponse.Json
                    object={{
                      name: "hello",
                      name2: "hello",
                      name3: "hello",
                      name4: "hello",
                      name5: "hello",
                      name6: "hello",
                    }}
                  />
                </ExampleResponse>
                <div className="mt-2 flex justify-end">
                  <Link
                    to={tab.learnMoreUrl}
                    className="font-medium text-indigo-500 hover:text-gray-800 text-sm"
                  >
                    {tab.learnMoreName} &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Page.Section>
      </Page>
    </div>
  )
}

export default Home
