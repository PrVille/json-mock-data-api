import { Link } from "react-router-dom"
import Content from "../../components/Content"
import ExampleResponse from "../../components/ExampleResponse"
import Page from "../../components/Page"
import { Method } from "../../typings/enums"
import Highlight from "../../components/Highlight"
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard"

const exampleCodeBlock = `fetch('https://json-mock-data.vercel.app/api/posts/d0c5e148-f056-462e-9c87-e6fa8509912f/comments')
  .then(response => response.json())
  .then(json => console.log(json))`

const exampleResponse = {
  data: [
    {
      id: "8522a421-f30c-4168-b729-e5b400bf087c",
      content: "Tempora numquam fugit corrupti facilis.",
      userId: "ba5a9792-6d06-4827-aac7-ae4f067abd97",
      postId: "d0c5e148-f056-462e-9c87-e6fa8509912f",
      createdAt: "2023-09-04T11:01:34.619Z",
      updatedAt: "2023-09-04T11:01:34.619Z",
    },
  ],
  total: 1,
  skip: 0,
  take: 10,
}

const ListPostComments = () => {
  const { copyToClipboard } = useCopyToClipboard()

  return (
    <Page>
      <Page.Section>
        <Page.Section.Title>List all user comments</Page.Section.Title>

        <Page.Section.Body>
          <Page.Section.Content>
            <Content.Subtitle>
              Returns a list of comments for the specific user.
            </Content.Subtitle>
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
                    <Highlight>updatedAt</Highlight>,{" "}
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
                  <Highlight>take</Highlight> comments for the specific user,
                  starting after <Highlight>skip</Highlight>, sorted by{" "}
                  <Highlight>sortBy</Highlight> in the direction of{" "}
                  <Highlight>sortOrder</Highlight>. Each entry in the array is a
                  separate comment object. If no comments for the specific user
                  are available, the resulting array will be empty. The return
                  object also contains meta data <Highlight>total</Highlight>,{" "}
                  <Highlight>skip</Highlight> and <Highlight>take</Highlight>.
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
                  endpoint={"/api/users/:id/comments"}
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

export default ListPostComments
