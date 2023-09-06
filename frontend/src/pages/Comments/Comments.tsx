import ExampleResponse from "../../components/ExampleResponse"
import Page from "../../components/Page"
import Content from "../../components/Content"
import { Method } from "../../typings/enums"
import Highlight from "../../components/Highlight"
import { Link } from "react-router-dom"

const schema = `Comment {
  id        string
  content   string
  userId    string
  postId    string
  createdAt string
  updatedAt string
}`

const example = {
  id: "059ca493-251e-4ef0-8b59-bcf89e6616a0",
  content: "Vitae quo magnam.",
  userId: "ec1d6f82-1947-4547-985e-f959eb5c3524",
  postId: "c4104a1d-5d56-487f-a941-0fbef80a5f17",
  createdAt: "2023-09-04T11:01:34.631Z",
  updatedAt: "2023-09-04T11:01:34.631Z",
}

const endpoints = [
  {
    method: Method.get,
    endpoint: "/api/comments",
    url: "/docs/comments/list",
  },
  {
    method: Method.post,
    endpoint: "/api/comments",
    url: "/docs/comments/create",
  },
  {
    method: Method.get,
    endpoint: "/api/comments/:id",
    url: "/docs/comments/retrieve",
  },
  {
    method: Method.put,
    endpoint: "/api/comments/:id",
    url: "/docs/comments/update",
  },
  {
    method: Method.delete,
    endpoint: "/api/comments/:id",
    url: "/docs/comments/delete",
  },
]

const Comments = () => {
  return (
    <Page>
      <Page.Section>
        <Page.Section.Title>Comments</Page.Section.Title>

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
        <Page.Section.Title>The comment object</Page.Section.Title>

        <Page.Section.Body>
          <Page.Section.Content>
            <Content.Parameters>
              <Content.Parameters.Title>Attributes</Content.Parameters.Title>
              <Content.Parameters.List>
                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel name="id" type="string" />
                  <Content.Parameters.ListItemDescription>
                    Unique identifier for the comment.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="content"
                    type="string"
                  />
                  <Content.Parameters.ListItemDescription>
                    Content of the comment.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="userId"
                    type="string"
                  />
                  <Content.Parameters.ListItemDescription>
                    Unique identifier of{" "}
                    <Link
                      to="/docs/users"
                      className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
                    >
                      the user
                    </Link>{" "}
                    who owns this comment.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="postId"
                    type="string"
                  />
                  <Content.Parameters.ListItemDescription>
                    Unique identifier of{" "}
                    <Link
                      to="/docs/posts"
                      className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
                    >
                      the post
                    </Link>{" "}
                    to which this comment belongs.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="createdAt"
                    type="string"
                  />
                  <Content.Parameters.ListItemDescription>
                    A timestamp indicating when the comment was created in ISO
                    8601 format: <Highlight>YYYY-MM-DDTHH:MM:SSZ</Highlight>.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="updatedAt"
                    type="string"
                  />
                  <Content.Parameters.ListItemDescription>
                    A timestamp indicating when the comment last updated in ISO
                    8601 format: <Highlight>YYYY-MM-DDTHH:MM:SSZ</Highlight>.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>
              </Content.Parameters.List>
            </Content.Parameters>
          </Page.Section.Content>

          <Page.Section.Examples>
            <ExampleResponse>
              <ExampleResponse.TopBar>
                <ExampleResponse.TopBar.Title>
                  Comment schema
                </ExampleResponse.TopBar.Title>
                <ExampleResponse.TopBar.CopyButton />
              </ExampleResponse.TopBar>
              <ExampleResponse.Schema schema={schema} />
            </ExampleResponse>

            <ExampleResponse>
              <ExampleResponse.TopBar>
                <ExampleResponse.TopBar.Title>
                  Comment example
                </ExampleResponse.TopBar.Title>
                <ExampleResponse.TopBar.CopyButton />
              </ExampleResponse.TopBar>
              <ExampleResponse.Json object={example} />
            </ExampleResponse>
          </Page.Section.Examples>
        </Page.Section.Body>
      </Page.Section>
    </Page>
  )
}

export default Comments
