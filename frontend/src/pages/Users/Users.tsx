import ExampleResponse from "../../components/ExampleResponse"
import Page from "../../components/Page"
import Content from "../../components/Content"
import { Method } from "../../typings/enums"
import { useEffect, useState } from "react"
import userService from "../../services/userService"

const userSchema = `User {
  id        string
  username  string
  email     string
  firstName string
  lastName  string
  age       integer?
  imageUrl  string?
  createdAt string
  updatedAt string
  posts     Post[]
}`

const Users = () => {
  const [exampleUserObject, setExampleUserObject] = useState({})

  const fetchUsers = async () => {
    const { data } = await userService.getAll()
    setExampleUserObject(data[0])
  }

  useEffect(() => {
    fetchUsers()
  }, [])

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
                <ExampleResponse.Endpoints.Endpoint
                  method={Method.get}
                  endpoint={"/api/users"}
                  url={"/users/get-several-users"}
                />
                <ExampleResponse.Endpoints.Endpoint
                  method={Method.post}
                  endpoint={"/api/users"}
                  url={"/users/create-user"}
                />
                <ExampleResponse.Endpoints.Endpoint
                  method={Method.get}
                  endpoint={"/api/users/:id"}
                  url={"/users/get-user"}
                />
                <ExampleResponse.Endpoints.Endpoint
                  method={Method.put}
                  endpoint={"/api/users/:id"}
                  url={"/users/update-user"}
                />
                <ExampleResponse.Endpoints.Endpoint
                  method={Method.delete}
                  endpoint={"/api/users/:id"}
                  url={"/users/delete-user"}
                />
              </ExampleResponse.Endpoints>
            </ExampleResponse>
          </Page.Section.Examples>
        </Page.Section.Body>
      </Page.Section>

      <Page.Divider />

      <Page.Section>
        <Page.Section.Title>The user schema</Page.Section.Title>

        <Page.Section.Body>
          <Page.Section.Content>
            <Content.Parameters>
              <Content.Parameters.Title>Attributes</Content.Parameters.Title>
              <Content.Parameters.List>
                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel name="id" type="string" />
                  <Content.Parameters.ListItemDescription>
                    Unique identifier for the user.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="username"
                    type="string"
                  />
                  <Content.Parameters.ListItemDescription>
                    Username of the user.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="email"
                    type="string"
                  />
                  <Content.Parameters.ListItemDescription>
                    Email address of the user.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="firstName"
                    type="string"
                  />
                  <Content.Parameters.ListItemDescription>
                    First name of the user.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="lastName"
                    type="string"
                  />
                  <Content.Parameters.ListItemDescription>
                    Last name of the user.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="age"
                    type="integer?"
                  />
                  <Content.Parameters.ListItemDescription>
                    Age of the user, can be null.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="imageUrl"
                    type="string?"
                  />
                  <Content.Parameters.ListItemDescription>
                    URL to the user's profile image, can be null.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="createdAt"
                    type="string"
                  />
                  <Content.Parameters.ListItemDescription>
                    This is a timestamp indicating when the user was created in
                    ISO 8601 format:{" "}
                    <span className="text-xs px-1 py-0.5 bg-gray-100 rounded-md whitespace-nowrap">
                      YYYY-MM-DDTHH:MM:SSZ
                    </span>
                    .
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="updatedAt"
                    type="string"
                  />
                  <Content.Parameters.ListItemDescription>
                    This is a timestamp indicating when the user last updated in
                    ISO 8601 format:{" "}
                    <span className="text-xs px-1 py-0.5 bg-gray-100 rounded-md whitespace-nowrap">
                      YYYY-MM-DDTHH:MM:SSZ
                    </span>
                    .
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="posts"
                    type="Post[]"
                    url="/posts"
                  />
                  <Content.Parameters.ListItemDescription>
                    This is a timestamp indicating when the user last updated in
                    ISO 8601 format:{" "}
                    <span className="text-xs px-1 py-0.5 bg-gray-100 rounded-md whitespace-nowrap">
                      YYYY-MM-DDTHH:MM:SSZ
                    </span>
                    .
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
              <ExampleResponse.Json object={exampleUserObject} />
            </ExampleResponse>
          </Page.Section.Examples>
        </Page.Section.Body>
      </Page.Section>
    </Page>
  )
}

export default Users
