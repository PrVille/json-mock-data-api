import ExampleResponse from "../../components/ExampleResponse"
import Page from "../../components/Page"
import Content from "../../components/Content"
import { Method } from "../../typings/enums"
import Highlight from "../../components/Highlight"
import { Link } from "react-router-dom"
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard"

const schema = `User {
  id        string
  username  string
  email     string
  firstName string
  lastName  string
  age       integer | null
  imageUrl  string  | null
  createdAt string
  updatedAt string
}`

const example = {
  id: "2fb46dc7-17db-4102-af8e-421d9d892efe",
  username: "Anabel_Huels-Ebert",
  email: "Anabel.Huels-Ebert@yahoo.com",
  firstName: "Anabel",
  lastName: "Huels-Ebert",
  age: null,
  imageUrl: "https://avatars.githubusercontent.com/u/61087508",
  createdAt: "2023-09-04T11:01:34.521Z",
  updatedAt: "2023-09-04T11:01:34.521Z",
}

const endpoints = [
  {
    method: Method.get,
    endpoint: "/api/users",
    url: "/docs/users/list",
  },
  {
    method: Method.post,
    endpoint: "/api/users",
    url: "/docs/users/create",
  },
  {
    method: Method.get,
    endpoint: "/api/users/:id",
    url: "/docs/users/retrieve",
  },
  {
    method: Method.put,
    endpoint: "/api/users/:id",
    url: "/docs/users/update",
  },
  {
    method: Method.delete,
    endpoint: "/api/users/:id",
    url: "/docs/users/delete",
  },
  {
    method: Method.get,
    endpoint: "/api/users/:id/posts",
    url: "/docs/users/list-posts",
  },
  {
    method: Method.get,
    endpoint: "/api/users/:id/comments",
    url: "/docs/users/list-comments",
  },
]

const attributes = [
  {
    name: "id",
    type: "string",
    description: "Unique identifier for the user.",
  },
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
    type: "integer | null",
    description: "Age of the user.",
  },
  {
    name: "imageUrl",
    type: "string | null",
    description: "URL to the user's profile image.",
  },
]

const Users = () => {
  const { copyToClipboard } = useCopyToClipboard()

  return (
    <Page>
      <Page.Section>
        <Page.Section.Title>Users</Page.Section.Title>

        <Page.Section.Body>
          <Page.Section.Content>
            <Content.Description>
              The user resource represents the individuals or entities within
              your mock data ecosystem. In scenarios where you need to simulate
              user interactions, registrations, or profiles, the user resource
              becomes indispensable. It's a fundamental tool for mimicking
              user-related activities in your development and testing processes.
            </Content.Description>
            <Content.Description>
              Related resources:{" "}
              <Link
                to="/docs/posts"
                className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
              >
                Posts
              </Link>
              ,{" "}
              <Link
                to="/docs/comments"
                className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
              >
                Comments
              </Link>
            </Content.Description>
          </Page.Section.Content>

          <Page.Section.Examples>
            <ExampleResponse>
              <ExampleResponse.TopBar>
                <ExampleResponse.TopBar.Title>
                  Endpoints
                </ExampleResponse.TopBar.Title>
              </ExampleResponse.TopBar>
              <ExampleResponse.Endpoints>
                {endpoints.map((endpoint, index) => (
                  <ExampleResponse.Endpoints.Endpoint
                    key={index}
                    method={endpoint.method}
                    endpoint={endpoint.endpoint}
                    url={endpoint.url}
                  />
                ))}
              </ExampleResponse.Endpoints>
            </ExampleResponse>
          </Page.Section.Examples>
        </Page.Section.Body>
      </Page.Section>

      <Page.Divider />

      <Page.Section>
        <Page.Section.Title>The user object</Page.Section.Title>

        <Page.Section.Body>
          <Page.Section.Content>
            <Content.Parameters>
              <Content.Parameters.Title>Attributes</Content.Parameters.Title>
              <Content.Parameters.List>
                {attributes.map((attribute, index) => (
                  <Content.Parameters.ListItem key={index}>
                    <Content.Parameters.ListItemLabel
                      name={attribute.name}
                      type={attribute.type}
                    />
                    <Content.Parameters.ListItemDescription>
                      {attribute.description}
                    </Content.Parameters.ListItemDescription>
                  </Content.Parameters.ListItem>
                ))}
                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="createdAt"
                    type="string"
                  />
                  <Content.Parameters.ListItemDescription>
                    A timestamp indicating when the post was created in ISO 8601
                    format: <Highlight>YYYY-MM-DDTHH:MM:SSZ</Highlight>.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="updatedAt"
                    type="string"
                  />
                  <Content.Parameters.ListItemDescription>
                    A timestamp indicating when the post last updated in ISO
                    8601 format: <Highlight>YYYY-MM-DDTHH:MM:SSZ</Highlight>.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>
              </Content.Parameters.List>
            </Content.Parameters>
          </Page.Section.Content>

          <Page.Section.Examples>
            <ExampleResponse>
              <ExampleResponse.TopBar>
                <ExampleResponse.TopBar.Title>
                  User schema
                </ExampleResponse.TopBar.Title>
                <ExampleResponse.TopBar.CopyButton
                  onClick={() => copyToClipboard(schema)}
                />
              </ExampleResponse.TopBar>
              <ExampleResponse.Schema schema={schema} />
            </ExampleResponse>

            <ExampleResponse>
              <ExampleResponse.TopBar>
                <ExampleResponse.TopBar.Title>
                  User example
                </ExampleResponse.TopBar.Title>
                <ExampleResponse.TopBar.CopyButton
                  onClick={() =>
                    copyToClipboard(JSON.stringify(example, null, 2))
                  }
                />
              </ExampleResponse.TopBar>
              <ExampleResponse.Json object={example} />
            </ExampleResponse>
          </Page.Section.Examples>
        </Page.Section.Body>
      </Page.Section>
    </Page>
  )
}

export default Users
