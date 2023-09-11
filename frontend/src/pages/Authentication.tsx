import ExampleResponse from "../components/ExampleResponse"
import Page from "../components/Page"
import Content from "../components/Content"
import { Link } from "react-router-dom"
import Highlight from "../components/Highlight"

const exampleCodeBlock = `fetch('https://json-mock-data.vercel.app/api/users', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer <YOUR_TOKEN>', // Replace <YOUR_TOKEN> with a reference to your token.
    'Content-Type': 'application/json'
  }, 
})
  .then(response => response.json())
  .then(json => console.log(json))`

const Authentication = () => {
  return (
    <Page>
      <Page.Section>
        <Page.Section.Title>Authentication</Page.Section.Title>

        <Page.Section.Body>
          <Page.Section.Content>
            <Content.Subtitle>
              Authentication for the Json Mock Data API is completely optional.
              Without authentication you will have access to all of the
              resources but creating, updating or deleting a resource will not
              result in actual changes on the server. Instead, the system will
              simulate a response for your convenience.
            </Content.Subtitle>

            <Content.Subtitle>
              If authenticated you will have your own instance of the resources
              and are free to make changes to them that will update on the
              server.
            </Content.Subtitle>

            <Content.Subtitle>
              The Json Mock Data API uses{" "}
              <a
                href="https://www.devopsschool.com/blog/what-is-bearer-token-and-how-it-works/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
              >
                Bearer tokens
              </a>{" "}
              to authenticate requests. You can view your token in{" "}
              <Link
                to=""
                className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
              >
                the Account settings
              </Link>
              .
            </Content.Subtitle>

            <Content.Subtitle>
              Tokens are sent using the <Highlight>Authorization</Highlight>{" "}
              header with the format{" "}
              <Highlight>Bearer {"<YOUR_TOKEN>"}</Highlight>. Replace{" "}
              <Highlight>{"<YOUR_TOKEN>"}</Highlight> with a reference to your
              token.
            </Content.Subtitle>

            <Content.Subtitle>
              Your token carries many privileges, so be sure to keep it secure.
              Don't share your secret token in publicly accessible areas such as
              GitHub, client-side code, and so forth.
            </Content.Subtitle>

            <Content.Subtitle>
              All API requests using tokens must be made over{" "}
              <a
                href="https://en.wikipedia.org/wiki/HTTPS"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
              >
                HTTPS
              </a>{" "}
              . Calls made over plain HTTP will fail.
            </Content.Subtitle>
          </Page.Section.Content>

          <Page.Section.Examples>
            <ExampleResponse darkMode>
              <ExampleResponse.TopBar darkMode>
                <ExampleResponse.TopBar.Title darkMode>
                  Authenticated request
                </ExampleResponse.TopBar.Title>
                <ExampleResponse.TopBar.CopyButton darkMode />
              </ExampleResponse.TopBar>
              <ExampleResponse.Javascript codeBlock={exampleCodeBlock} />
            </ExampleResponse>
          </Page.Section.Examples>
        </Page.Section.Body>
      </Page.Section>
    </Page>
  )
}

export default Authentication
