import ExampleResponse from "../../components/ExampleResponse"
import Page from "../../components/Page"
import Content from "../../components/Content"
import { Method } from "../../typings/enums"

const userSchema = `User {
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

const userExample = {
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
    url: "/docs/users/get-several-users",
  },
  {
    method: Method.post,
    endpoint: "/api/users",
    url: "/docs/users/create-user",
  },
  {
    method: Method.get,
    endpoint: "/api/users/:id",
    url: "/docs/users/get-user",
  },
  {
    method: Method.put,
    endpoint: "/api/users/:id",
    url: "/docs/users/update-user",
  },
  {
    method: Method.delete,
    endpoint: "/api/users/:id",
    url: "/docs/users/delete-user",
  },
  {
    method: Method.get,
    endpoint: "/api/users/:id/posts",
    url: "/docs/users/get-user-posts",
  },
  {
    method: Method.get,
    endpoint: "/api/users/:id/comments",
    url: "/docs/users/get-user-comments",
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
  {
    name: "createdAt",
    type: "string",
    description:
      "This is a timestamp indicating when the user was created in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.",
  },
  {
    name: "updatedAt",
    type: "string",
    description:
      "This is a timestamp indicating when the user last updated in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.",
  },
]

const Users = () => {
  // const [exampleUserObject, setExampleUserObject] = useState({})

  // const fetchUsers = async () => {
  //   const { data } = await userService.getAll()
  //   console.log(data)
  //   setExampleUserObject(data[4])
  // }

  // useEffect(() => {
  //   fetchUsers()
  // }, [])

  return (
    <Page>
      <Page.Section>
        <Page.Section.Title>Users</Page.Section.Title>

        <Page.Section.Body>
          <Page.Section.Content>
            <Content.Description>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              congue ante id ligula rutrum fringilla. Praesent ullamcorper nec
              nunc ac interdum. Aenean quis ultricies tortor. Aenean faucibus
              nisl pharetra, lacinia justo et, fermentum risus. Nunc et lacinia
              quam, accumsan tincidunt tellus. Maecenas ac feugiat tortor. Etiam
              pretium sodales metus, non maximus ligula cursus a. Nunc hendrerit
              consequat neque ut mattis.
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
              </Content.Parameters.List>
            </Content.Parameters>
          </Page.Section.Content>

          <Page.Section.Examples>
            <ExampleResponse>
              <ExampleResponse.TopBar>
                <ExampleResponse.TopBar.Title>
                  User schema
                </ExampleResponse.TopBar.Title>
                <ExampleResponse.TopBar.CopyButton />
              </ExampleResponse.TopBar>
              <ExampleResponse.Schema schema={userSchema} />
            </ExampleResponse>

            <ExampleResponse>
              <ExampleResponse.TopBar>
                <ExampleResponse.TopBar.Title>
                  User example
                </ExampleResponse.TopBar.Title>
                <ExampleResponse.TopBar.CopyButton />
              </ExampleResponse.TopBar>
              <ExampleResponse.Json object={userExample} />
            </ExampleResponse>
          </Page.Section.Examples>
        </Page.Section.Body>
      </Page.Section>
    </Page>
  )
}

export default Users
