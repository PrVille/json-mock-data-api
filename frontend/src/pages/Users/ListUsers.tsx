import { Link } from "react-router-dom"
import Content from "../../components/Content"
import ExampleResponse from "../../components/ExampleResponse"
import Page from "../../components/Page"
import { Method } from "../../typings/enums"
import Highlight from "../../components/Highlight"
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard"

const exampleCodeBlock = `fetch('https://json-mock-data.vercel.app/api/users?take=3&sortBy=lastName')
  .then(response => response.json())
  .then(json => console.log(json))`

const exampleResponse = {
  data: [
    {
      id: "3d1d85a0-fd9d-4e18-9071-811523d984c5",
      username: "Chelsie.Armstrong81",
      email: "Chelsie18@gmail.com",
      firstName: "Chelsie",
      lastName: "Armstrong",
      age: 49,
      imageUrl: "https://avatars.githubusercontent.com/u/17875247",
      jobTitle: "International Operations Executive",
      bio: "designer, author, foodie ♌",
      country: "New Zealand",
      height: 203.5,
      weight: 84.6,
      createdAt: "2023-06-18T09:13:18.290Z",
      updatedAt: "2023-06-18T09:13:18.290Z",
    },
    {
      id: "b99364f8-8c72-4369-b33e-b8fc5f86fd0f",
      username: "Arvid_Balistreri22",
      email: "Arvid.Balistreri2@hotmail.com",
      firstName: "Arvid",
      lastName: "Balistreri",
      age: 84,
      imageUrl: "https://avatars.githubusercontent.com/u/22288753",
      jobTitle: "Chief Accountability Manager",
      bio: "carter supporter",
      country: "Zimbabwe",
      height: 204.8,
      weight: 71.5,
      createdAt: "2023-08-13T07:19:32.331Z",
      updatedAt: "2023-08-13T07:19:32.331Z",
    },
    {
      id: "30727614-3d9c-4be2-ad4e-eed747ab4e4a",
      username: "Karelle85",
      email: "Karelle61@hotmail.com",
      firstName: "Karelle",
      lastName: "Batz",
      age: 85,
      imageUrl: "https://avatars.githubusercontent.com/u/17377460",
      jobTitle: "Direct Markets Coordinator",
      bio: "article fan, philosopher",
      country: "Georgia",
      height: 113.6,
      weight: 181.5,
      createdAt: "2023-08-25T16:45:59.347Z",
      updatedAt: "2023-08-25T16:45:59.347Z",
    },
  ],
  total: 100,
  skip: 0,
  take: 3,
}

const ListUsers = () => {
  const { copyToClipboard } = useCopyToClipboard()

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
                    type="integer"
                    optional
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
                    type="integer"
                    optional
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
                    type="string"
                    optional
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
                    <Highlight>jobTitle</Highlight>, <Highlight>bio</Highlight>,{" "}
                    <Highlight>country</Highlight>,{" "}
                    <Highlight>height</Highlight>, <Highlight>weight</Highlight>
                    , <Highlight>updatedAt</Highlight>,{" "}
                    <Highlight>createdAt</Highlight>
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="sortOrder"
                    type="string"
                    optional
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

export default ListUsers
