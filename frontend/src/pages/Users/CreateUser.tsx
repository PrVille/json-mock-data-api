import { Link } from "react-router-dom"
import Content from "../../components/Content"
import ExampleResponse from "../../components/ExampleResponse"
import Page from "../../components/Page"
import { Method } from "../../typings/enums"
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard"

const exampleCodeBlock = `fetch('https://json-mock-data.vercel.app/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: "username",
    email: "example@email.com",
    firstName: "first",
    lastName: "last",
    age: 24,
  })
})
  .then(response => response.json())
  .then(json => console.log(json))`

const exampleResponse = {
  id: "c790f9a1-5160-478a-8508-3877964a5721",
  username: "username",
  email: "example@email.com",
  firstName: "first",
  lastName: "last",
  age: 24,
  imageUrl: null,
  createdAt: "2023-09-05T06:11:26.919Z",
  updatedAt: "2023-09-05T06:11:26.919Z",
}

const bodyParameters = [
  {
    name: "username",
    type: "string",
    description: "Username of the user.",
    required: true,
  },
  {
    name: "email",
    type: "string",
    description: "Email address of the user.",
    required: true,
  },
  {
    name: "firstName",
    type: "string",
    description: "First name of the user.",
    required: true,
  },
  {
    name: "lastName",
    type: "string",
    description: "Last name of the user.",
    required: true,
  },
  {
    name: "age",
    type: "integer",
    description: "Age of the user.",
    required: false,
  },
  {
    name: "imageUrl",
    type: "string",
    description: "URL to the user's profile image.",
    required: false,
  },
]

const CreateUser = () => {
  const { copyToClipboard } = useCopyToClipboard()

  return (
    <Page>
      <Page.Section>
        <Page.Section.Title>Create a user</Page.Section.Title>

        <Page.Section.Body>
          <Page.Section.Content>
            <Content.Subtitle>Creates a new user object.</Content.Subtitle>
            <Content.Subtitle>
              <span className="font-bold text-gray-900">Note:</span> Please be
              aware that if you are not{" "}
              <Link
                to="/docs/authentication"
                className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
              >
                authenticated
              </Link>
              , any attempt to create a user will not result in actual changes
              on the server. Instead, the system will simulate a response for
              your convenience.
            </Content.Subtitle>

            <Content.Parameters>
              <Content.Parameters.Title>
                Body parameters
              </Content.Parameters.Title>
              <Content.Parameters.List>
                {bodyParameters.map((attribute, index) => (
                  <Content.Parameters.ListItem key={index}>
                    <Content.Parameters.ListItemLabel
                      name={attribute.name}
                      type={attribute.type}
                      required={attribute.required}
                      optional={!attribute.required}
                    />
                    <Content.Parameters.ListItemDescription>
                      {attribute.description}
                    </Content.Parameters.ListItemDescription>
                  </Content.Parameters.ListItem>
                ))}
              </Content.Parameters.List>
            </Content.Parameters>

            <Content.Parameters>
              <Content.Parameters.Title>Returns</Content.Parameters.Title>
              <div className="py-3">
                <Content.Parameters.ListItemDescription>
                  Returns the created user object on success. Otherwise, this
                  call returns{" "}
                  <Link
                    to="/docs/errors"
                    className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
                  >
                    an error
                  </Link>
                  .
                </Content.Parameters.ListItemDescription>
              </div>
            </Content.Parameters>
          </Page.Section.Content>

          <Page.Section.Examples>
            <ExampleResponse darkMode>
              <ExampleResponse.TopBar darkMode>
                <ExampleResponse.TopBar.EndpointTitle
                  method={Method.post}
                  endpoint={"/api/users"}
                />
                <ExampleResponse.TopBar.CopyButton
                  darkMode
                  onClick={() => copyToClipboard(exampleCodeBlock)}
                />
              </ExampleResponse.TopBar>
              <ExampleResponse.Javascript codeBlock={exampleCodeBlock} />
            </ExampleResponse>

            <ExampleResponse>
              <ExampleResponse.TopBar>
                <ExampleResponse.TopBar.Title>
                  Response
                </ExampleResponse.TopBar.Title>
                <ExampleResponse.TopBar.CopyButton
                  onClick={() =>
                    copyToClipboard(JSON.stringify(exampleResponse, null, 2))
                  }
                />
              </ExampleResponse.TopBar>
              <ExampleResponse.Json object={exampleResponse} />
            </ExampleResponse>
          </Page.Section.Examples>
        </Page.Section.Body>
      </Page.Section>
    </Page>
  )
}

export default CreateUser
