import ExampleResponse from "../components/ExampleResponse"
import Page from "../components/Page"
import Content from "../components/Content"
import { Link } from "react-router-dom"
import routes from "../routes"

const Introduction = () => {
  return (
    <Page>
      <Page.Section>
        <Page.Section.Title>API Reference</Page.Section.Title>

        <Page.Section.Body>
          <Page.Section.Content>
            <Content.Description>
              The JSON Mock Data API is a versatile tool designed to simplify
              the process of generating and managing mock data for developers.
              Whether you're creating a new application, conducting tests, or
              need placeholder data, this API has you covered.
            </Content.Description>
            <Content.Subtitle>
              The JSON Mock Data API is organized around{" "}
              <a
                href="https://en.wikipedia.org/wiki/REST"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
              >
                REST
              </a>
              . The API has predictable resource-oriented URLs, returns{" "}
              <a
                href="https://www.json.org/json-en.html"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
              >
                JSON-encoded
              </a>{" "}
              responses, and uses standard HTTP response codes, authentication,
              and verbs.
            </Content.Subtitle>

            <Content.Subtitle>
              <Link
                to="/docs/authentication"
                className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
              >
                Authentication
              </Link>{" "}
              is not required for basic usage of the API. However, if you wish
              to manipulate and update mock data on the server, you can
              authenticate your requests to gain full control over your mock
              data environment.
            </Content.Subtitle>
          </Page.Section.Content>

          <Page.Section.Examples>
            <ExampleResponse darkMode>
              <ExampleResponse.TopBar darkMode>
                <ExampleResponse.TopBar.Title darkMode>
                  Base url
                </ExampleResponse.TopBar.Title>
                <ExampleResponse.TopBar.CopyButton darkMode />
              </ExampleResponse.TopBar>
              <div className="px-5 py-3 text-[13px]/[22px] text-white font-medium font-mono max-h-[75vh] overflow-auto">
                <span>https://json-mock-data.vercel.app/api/</span>
              </div>
            </ExampleResponse>
          </Page.Section.Examples>
        </Page.Section.Body>
      </Page.Section>

      <Page.Divider></Page.Divider>

      <Page.Section>
        <Page.Section.Title>All Resources</Page.Section.Title>

        <div className="mt-5 grid grid-cols-4">
          {routes.api.map((route, index) => (
            <ul key={index} className="flex flex-col mt-1">
              <Link
                to={"/docs/" + route.path}
                className="py-2 pr-1 text-lg font-semibold transition-all bg-inherit text-gray-600 hover:text-gray-800"
              >
                {route.name}
              </Link>
              {route.routes.map((childRoute, index) => (
                <Link
                  key={index}
                  to={"/docs/" + route.path + "/" + childRoute.path}
                  className="py-1 pr-1 text-sm font-medium transition-all bg-inherit text-gray-500 hover:text-gray-800"
                >
                  <span>{childRoute.name}</span>
                </Link>
              ))}
            </ul>
          ))}
        </div>
      </Page.Section>
    </Page>
  )
}

export default Introduction
