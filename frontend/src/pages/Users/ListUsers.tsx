import { Link } from "react-router-dom"
import Content from "../../components/Content"
import ExampleResponse from "../../components/ExampleResponse"
import Page from "../../components/Page"
import { Method } from "../../typings/enums"
import Highlight from "../../components/Highlight"

const exampleCodeBlock = `fetch('https://json-mock-data.vercel.app/api/users?take=3&sortBy=lastName&sortOrder=asc')
  .then(response => response.json())
  .then(json => console.log(json))`

const exampleResponse = {
  data: [
    {
      id: "513e1ed3-43cd-4f86-a0a8-3a61dfc35bc2",
      username: "Martin.Bogisich",
      email: "Martin.Bogisich@gmail.com",
      firstName: "Martin",
      lastName: "Bogisich",
      age: 63,
      imageUrl: "https://avatars.githubusercontent.com/u/8046384",
      createdAt: "2023-09-05T06:10:33.112Z",
      updatedAt: "2023-09-05T06:10:33.112Z",
    },
    {
      id: "d13c00be-3675-4b5a-aa47-72620f8c0a6c",
      username: "Jaquelin93",
      email: "Jaquelin73@gmail.com",
      firstName: "Jaquelin",
      lastName: "Gleichner",
      age: 63,
      imageUrl: "https://avatars.githubusercontent.com/u/92661990",
      createdAt: "2023-09-05T06:10:34.146Z",
      updatedAt: "2023-09-05T06:10:34.146Z",
    },
    {
      id: "17a2830f-e54b-476a-bdfa-bedbc3f28c79",
      username: "Rodolfo14",
      email: "Rodolfo86@yahoo.com",
      firstName: "Rodolfo",
      lastName: "Hoeger",
      age: 52,
      imageUrl: "https://avatars.githubusercontent.com/u/26474031",
      createdAt: "2023-09-05T06:10:37.247Z",
      updatedAt: "2023-09-05T06:10:37.247Z",
    },
  ],
  total: 10,
  skip: 0,
  take: 3,
}

const ListUsers = () => {
  return (
    <Page>
      <Page.Section>
        <Page.Section.Title>List all users</Page.Section.Title>

        <Page.Section.Body>
          <Page.Section.Content>
            <Content.Subtitle>Returns a list of users.</Content.Subtitle>
            <Content.Parameters>
              <Content.Parameters.Title>
                Query parameters
              </Content.Parameters.Title>
              <Content.Parameters.List>
                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="take"
                    type="optional"
                  />
                  <Content.Parameters.ListItemDescription>
                    A limit on the number of objects to be returned.
                  </Content.Parameters.ListItemDescription>
                  <Content.Parameters.ListItemDescription>
                    Default: <Highlight>10</Highlight>
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="skip"
                    type="optional"
                  />
                  <Content.Parameters.ListItemDescription>
                    The number of objects to skip in the results before
                    returning.
                  </Content.Parameters.ListItemDescription>
                  <Content.Parameters.ListItemDescription>
                    Default: <Highlight>0</Highlight>
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="sortBy"
                    type="optional"
                  />
                  <Content.Parameters.ListItemDescription>
                    The property to sort the returned objects by.
                  </Content.Parameters.ListItemDescription>
                  <Content.Parameters.ListItemDescription>
                    Default: <Highlight>createdAt</Highlight>
                  </Content.Parameters.ListItemDescription>
                  <Content.Parameters.ListItemDescription>
                    Can be one of: <Highlight>id</Highlight>,{" "}
                    <Highlight>username</Highlight>,{" "}
                    <Highlight>email</Highlight>,{" "}
                    <Highlight>firstName</Highlight>,{" "}
                    <Highlight>lastName</Highlight>, <Highlight>age</Highlight>,{" "}
                    <Highlight>updatedAt</Highlight>,{" "}
                    <Highlight>createdAt</Highlight>
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="sortOrder"
                    type="optional"
                  />
                  <Content.Parameters.ListItemDescription>
                    The direction to sort the returned objects by.
                  </Content.Parameters.ListItemDescription>
                  <Content.Parameters.ListItemDescription>
                    Default: <Highlight>asc</Highlight>
                  </Content.Parameters.ListItemDescription>
                  <Content.Parameters.ListItemDescription>
                    Can be one of: <Highlight>asc</Highlight>,{" "}
                    <Highlight>desc</Highlight>
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>
              </Content.Parameters.List>
            </Content.Parameters>

            <Content.Parameters>
              <Content.Parameters.Title>Returns</Content.Parameters.Title>
              <div className="py-3">
                <Content.Parameters.ListItemDescription>
                  An object with a <Highlight>data</Highlight> property that
                  contains an array of up to
                  <Highlight>take</Highlight> users, starting after{" "}
                  <Highlight>skip</Highlight>, sorted by{" "}
                  <Highlight>sortBy</Highlight> in the direction of{" "}
                  <Highlight>sortOrder</Highlight>. Each entry in the array is a
                  separate user object. If no users are available, the resulting
                  array will be empty. The return object also contains meta data{" "}
                  <Highlight>total</Highlight>, <Highlight>skip</Highlight> and{" "}
                  <Highlight>take</Highlight>. Otherwise, this call returns{" "}
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
                  method={Method.get}
                  endpoint={"/api/users"}
                />
                <ExampleResponse.TopBar.CopyButton darkMode />
              </ExampleResponse.TopBar>
              <ExampleResponse.Javascript codeBlock={exampleCodeBlock} />
            </ExampleResponse>

            <ExampleResponse>
              <ExampleResponse.TopBar>
                <ExampleResponse.TopBar.Title>
                  Response
                </ExampleResponse.TopBar.Title>
                <ExampleResponse.TopBar.CopyButton />
              </ExampleResponse.TopBar>
              <ExampleResponse.Json object={exampleResponse} />
            </ExampleResponse>
          </Page.Section.Examples>
        </Page.Section.Body>
      </Page.Section>
    </Page>
  )
}

export default ListUsers
