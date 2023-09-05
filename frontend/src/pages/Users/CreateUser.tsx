import { useEffect } from "react"
import Content from "../../components/Content"
import ExampleResponse from "../../components/ExampleResponse"
import Page from "../../components/Page"
import { Method } from "../../typings/enums"

const createUserCodeBlock = `fetch('https://json-mock-data.vercel.app/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: "username",
    email: "example@email.com",
    firstName: "first",
    lastName: "last",
    age: 24,
    imageUrl: "https://avatars.githubusercontent.com/u/61087508"
  })
})
  .then(response => response.json())
  .then(json => console.log(json))`

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
  useEffect(() => {
    fetch("https://json-mock-data.vercel.app/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "username",
        email: "example@email.com",
        firstName: "first",
        lastName: "last",
        age: 24,
        imageUrl: "https://avatars.githubusercontent.com/u/61087508",
      }),
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
  }, [])

  return (
    <Page>
      <Page.Section>
        <Page.Section.Title>Create user</Page.Section.Title>

        <Page.Section.Body>
          <Page.Section.Content>
            <Content.Subtitle>Creates a new user object.</Content.Subtitle>
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
            <ExampleResponse darkMode>
              <ExampleResponse.TopBar darkMode>
                <ExampleResponse.TopBar.EndpointTitle
                  method={Method.post}
                  endpoint={"/api/users"}
                />
                <ExampleResponse.TopBar.CopyButton darkMode />
              </ExampleResponse.TopBar>
              <ExampleResponse.Javascript codeBlock={createUserCodeBlock} />
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

export default CreateUser
