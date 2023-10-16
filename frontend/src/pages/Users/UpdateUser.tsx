import { Link } from "react-router-dom"
import Content from "../../components/Content"
import ExampleResponse from "../../components/ExampleResponse"
import Page from "../../components/Page"
import { Method } from "../../typings/enums"
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard"

const exampleCodeBlock = `fetch('https://json-mock-data.vercel.app/api/users/43297cad-a9e4-4d95-93d1-9c9d8a2b68a6', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: "updatedFirstName",
    lastName: "updatedLastName",
  })
})
  .then(response => response.json())
  .then(json => console.log(json))`

const exampleResponse = {
  id: "43297cad-a9e4-4d95-93d1-9c9d8a2b68a6",
  username: "Odell.Bernier",
  email: "Odell.Bernier@hotmail.com",
  firstName: "updatedFirstName",
  lastName: "updatedLastName",
  age: 21,
  imageUrl: "https://avatars.githubusercontent.com/u/72280135",
  jobTitle: "Global Communications Assistant",
  bio: "designer, entrepreneur, entrepreneur",
  country: "Jordan",
  height: 141.4,
  weight: 187.7,
  createdAt: "2022-11-03T21:34:19.685Z",
  updatedAt: "2023-10-16T18:18:47.595Z",
}

const bodyParameters = [
  {
    name: "username",
    type: "string",
    description: "Username of the user.",
  },
  {
    name: "email",
    type: "string",
    description: "Email address of the user.",
  },
  {
    name: "firstName",
    type: "string",
    description: "First name of the user.",
  },
  {
    name: "lastName",
    type: "string",
    description: "Last name of the user.",
  },
  {
    name: "age",
    type: "integer",
    description: "Age of the user.",
  },
  {
    name: "imageUrl",
    type: "string",
    description: "URL to the user's profile image.",
  },
  {
    name: "jobTitle",
    type: "string",
    description: "Job title of the user.",
  },
  {
    name: "bio",
    type: "string",
    description: "Bio of the user.",
  },
  {
    name: "country",
    type: "string",
    description: "Country of the user.",
  },
  {
    name: "height",
    type: "float",
    description: "Height of the user in centimeters.",
  },
  {
    name: "weight",
    type: "float",
    description: "Weight of the user in kilograms.",
  },
]

const UpdateUser = () => {
  const { copyToClipboard } = useCopyToClipboard()

  return (
    <Page>
      <Page.Section>
        <Page.Section.Title>Update a user</Page.Section.Title>

        <Page.Section.Body>
          <Page.Section.Content>
            <Content.Subtitle>
              Updates the specific user by setting the values of the parameters
              passed. Any parameters not provided will be left unchanged.
            </Content.Subtitle>
            <Content.Subtitle>
              <span className="font-bold text-gray-900">Note:</span> Please be
              aware that if you are not{" "}
              <Link
                to="/docs/authentication"
                className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
              >
                authenticated
              </Link>
              , any attempt to update a user will not result in actual changes
              on the server. Instead, the system will simulate a response for
              your convenience.
            </Content.Subtitle>

            <Content.Parameters>
              <Content.Parameters.Title>
                Path parameters
              </Content.Parameters.Title>
              <Content.Parameters.List>
                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="id"
                    type="string"
                    required
                  />
                  <Content.Parameters.ListItemDescription>
                    Unique identifier for the user.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>
              </Content.Parameters.List>
            </Content.Parameters>

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
                      optional
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
                  Returns the updated user object on success. Otherwise, this
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
                  method={Method.put}
                  endpoint={"/api/users/:id"}
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

export default UpdateUser
