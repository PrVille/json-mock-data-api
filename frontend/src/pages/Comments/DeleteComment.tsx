import { Link } from "react-router-dom"
import Content from "../../components/Content"
import ExampleResponse from "../../components/ExampleResponse"
import Page from "../../components/Page"
import { Method } from "../../typings/enums"
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard"

const exampleCodeBlock = `fetch('https://json-mock-data.vercel.app/api/comments/1e562225-c8e9-450b-a5ae-7bdc7f4b8a0a', {
  method: 'DELETE'
})
  .then(response => response.json())
  .then(json => console.log(json))`

const exampleResponse = {
  id: "1e562225-c8e9-450b-a5ae-7bdc7f4b8a0a",
  content: "Hic reprehenderit.",
  userId: "7cdb0e7d-6885-4b06-a9de-76baa023d42c",
  postId: "00cffca1-6518-41f2-b03b-08bff8eb46ba",
  createdAt: "2023-09-04T11:01:34.616Z",
  updatedAt: "2023-09-04T11:01:34.616Z",
}

const DeleteComment = () => {
  const { copyToClipboard } = useCopyToClipboard()

  return (
    <Page>
      <Page.Section>
        <Page.Section.Title>Delete a comment</Page.Section.Title>

        <Page.Section.Body>
          <Page.Section.Content>
            <Content.Subtitle>Deletes a comment by it's id.</Content.Subtitle>
            <Content.Subtitle>
              <span className="font-bold text-gray-900">Note:</span> Please be
              aware that if you are not{" "}
              <Link
                to="/docs/authentication"
                className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
              >
                authenticated
              </Link>
              , any attempt to delete a comment will not result in actual
              changes on the server. Instead, the system will simulate a
              response for your convenience.
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
                    Unique identifier for the comment.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>
              </Content.Parameters.List>
            </Content.Parameters>

            <Content.Parameters>
              <Content.Parameters.Title>Returns</Content.Parameters.Title>
              <div className="py-3">
                <Content.Parameters.ListItemDescription>
                  Returns the deleted comment object on success. Otherwise, this
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
                  endpoint={"/api/comments/:id"}
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

export default DeleteComment
