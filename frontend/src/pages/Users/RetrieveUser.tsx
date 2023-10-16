import { Link } from "react-router-dom"
import Content from "../../components/Content"
import ExampleResponse from "../../components/ExampleResponse"
import Page from "../../components/Page"
import { Method } from "../../typings/enums"
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard"

const exampleCodeBlock = `fetch('https://json-mock-data.vercel.app/api/users/43297cad-a9e4-4d95-93d1-9c9d8a2b68a6')
  .then(response => response.json())
  .then(json => console.log(json))`

const exampleResponse = {
  id: "43297cad-a9e4-4d95-93d1-9c9d8a2b68a6",
  username: "Odell.Bernier",
  email: "Odell.Bernier@hotmail.com",
  firstName: "Odell",
  lastName: "Bernier",
  age: 21,
  imageUrl: "https://avatars.githubusercontent.com/u/72280135",
  jobTitle: "Global Communications Assistant",
  bio: "designer, entrepreneur, entrepreneur",
  country: "Jordan",
  height: 141.4,
  weight: 187.7,
  createdAt: "2022-11-03T21:34:19.685Z",
  updatedAt: "2022-11-03T21:34:19.685Z",
}

const RetrieveUser = () => {
  const { copyToClipboard } = useCopyToClipboard()

  return (
    <Page>
      <Page.Section>
        <Page.Section.Title>Retrieve a user</Page.Section.Title>

        <Page.Section.Body>
          <Page.Section.Content>
            <Content.Subtitle>Retrieves a user by it's id.</Content.Subtitle>
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
              <Content.Parameters.Title>Returns</Content.Parameters.Title>
              <div className="py-3">
                <Content.Parameters.ListItemDescription>
                  Returns a user object if a valid identifier was provided.
                  Otherwise, this call returns{" "}
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

export default RetrieveUser
