import { Link } from "react-router-dom"
import Content from "../../components/Content"
import ExampleResponse from "../../components/ExampleResponse"
import Page from "../../components/Page"
import { Method } from "../../typings/enums"
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard"

const exampleCodeBlock = `fetch('https://json-mock-data.vercel.app/api/users/513e1ed3-43cd-4f86-a0a8-3a61dfc35bc2', {
  method: 'DELETE'
})
  .then(response => response.json())
  .then(json => console.log(json))`

const exampleResponse = {
  id: "513e1ed3-43cd-4f86-a0a8-3a61dfc35bc2",
  username: "Martin.Bogisich",
  email: "Martin.Bogisich@gmail.com",
  firstName: "Martin",
  lastName: "Bogisich",
  age: 63,
  imageUrl: "https://avatars.githubusercontent.com/u/8046384",
  createdAt: "2023-09-05T06:10:33.112Z",
  updatedAt: "2023-09-05T06:10:33.112Z",
}

const DeleteUser = () => {
  const { copyToClipboard } = useCopyToClipboard()

  return (
    <Page>
      <Page.Section>
        <Page.Section.Title>Delete a user</Page.Section.Title>

        <Page.Section.Body>
          <Page.Section.Content>
            <Content.Subtitle>Deletes a user by it's id.</Content.Subtitle>
            <Content.Subtitle>
              <span className="font-bold text-red-900">Caution:</span> Deleting
              a user will result in the removal of all corresponding posts and
              comments on the user.
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
              , any attempt to delete a user will not result in actual changes
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
              <Content.Parameters.Title>Returns</Content.Parameters.Title>
              <div className="py-3">
                <Content.Parameters.ListItemDescription>
                  Returns the deleted user object on success. Otherwise, this
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
                  method={Method.delete}
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

export default DeleteUser
