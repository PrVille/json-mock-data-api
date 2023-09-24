import { Link } from "react-router-dom"
import Content from "../../components/Content"
import ExampleResponse from "../../components/ExampleResponse"
import Page from "../../components/Page"
import { Method } from "../../typings/enums"
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard"

const exampleCodeBlock = `fetch('https://json-mock-data.vercel.app/api/posts/74e84024-cb29-4769-a3bd-abe0ae32ebfd', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: "updatedTitle",
  })
})
  .then(response => response.json())
  .then(json => console.log(json))`

const exampleResponse = {
  id: "74e84024-cb29-4769-a3bd-abe0ae32ebfd",
  title: "updatedTitle",
  content:
    "Officia minima illo amet. Explicabo nulla distinctio. Ipsam perferendis facilis sequi aliquam quam numquam.\nBlanditiis culpa fuga suscipit fuga est. Quas tempora deleniti repellendus. Fugiat possimus quos.",
  userId: "2fb46dc7-17db-4102-af8e-421d9d892efe",
  createdAt: "2023-09-04T11:01:34.527Z",
  updatedAt: "2023-09-04T11:04:00.017Z",
}

const UpdatePost = () => {
  const { copyToClipboard } = useCopyToClipboard()

  return (
    <Page>
      <Page.Section>
        <Page.Section.Title>Update a post</Page.Section.Title>

        <Page.Section.Body>
          <Page.Section.Content>
            <Content.Subtitle>
              Updates the specific post by setting the values of the parameters
              passed. Any parameters not provided will be left unchanged.
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
              , any attempt to update a post will not result in actual changes
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
                    Unique identifier for the post.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>
              </Content.Parameters.List>
            </Content.Parameters>

            <Content.Parameters>
              <Content.Parameters.Title>
                Body parameters
              </Content.Parameters.Title>
              <Content.Parameters.List>
                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="title"
                    type="string"
                    optional
                  />
                  <Content.Parameters.ListItemDescription>
                    Title of the post.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="content"
                    type="string"
                    optional
                  />
                  <Content.Parameters.ListItemDescription>
                    Content of the post.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>
              </Content.Parameters.List>
            </Content.Parameters>

            <Content.Parameters>
              <Content.Parameters.Title>Returns</Content.Parameters.Title>
              <div className="py-3">
                <Content.Parameters.ListItemDescription>
                  Returns the updated post object on success. Otherwise, this
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
                  method={Method.put}
                  endpoint={"/api/posts/:id"}
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

export default UpdatePost
