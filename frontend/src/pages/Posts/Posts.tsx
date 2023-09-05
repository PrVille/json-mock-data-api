import ExampleResponse from "../../components/ExampleResponse"
import Page from "../../components/Page"
import Content from "../../components/Content"
import { Method } from "../../typings/enums"
import Highlight from "../../components/Highlight"
import { Link } from "react-router-dom"

const schema = `Post {
  id        string
  title     string
  content   string
  userId    string
  createdAt string
  updatedAt string
}`

const example = {
  id: "01766112-44de-4d16-8b2c-aad6063bc998",
  title: "Suscipit dignissimos corporis totam consectetur.",
  content:
    "Sit iusto impedit sunt. Voluptatum atque sit sapiente adipisci dolores incidunt amet sequi quo. Quae vel sunt voluptate porro dolore ut vitae deleniti eum.",
  userId: "7cdb0e7d-6885-4b06-a9de-76baa023d42c",
  createdAt: "2023-09-04T11:01:34.480Z",
  updatedAt: "2023-09-04T11:01:34.480Z",
}

const endpoints = [
  {
    method: Method.get,
    endpoint: "/api/posts",
    url: "/docs/posts/list",
  },
  {
    method: Method.post,
    endpoint: "/api/posts",
    url: "/docs/posts/create",
  },
  {
    method: Method.get,
    endpoint: "/api/posts/:id",
    url: "/docs/posts/retrieve",
  },
  {
    method: Method.put,
    endpoint: "/api/posts/:id",
    url: "/docs/posts/update",
  },
  {
    method: Method.delete,
    endpoint: "/api/posts/:id",
    url: "/docs/posts/delete",
  },
  {
    method: Method.get,
    endpoint: "/api/posts/:id/comments",
    url: "/docs/posts/list-comments",
  },
]

const Posts = () => {
  return (
    <Page>
      <Page.Section>
        <Page.Section.Title>Posts</Page.Section.Title>

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
        <Page.Section.Title>The post object</Page.Section.Title>

        <Page.Section.Body>
          <Page.Section.Content>
            <Content.Parameters>
              <Content.Parameters.Title>Attributes</Content.Parameters.Title>
              <Content.Parameters.List>
                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel name="id" type="string" />
                  <Content.Parameters.ListItemDescription>
                    Unique identifier for the post.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="title"
                    type="string"
                  />
                  <Content.Parameters.ListItemDescription>
                    Title of the post.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="content"
                    type="string"
                  />
                  <Content.Parameters.ListItemDescription>
                    Content of the post.
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
                    who owns this post.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="createdAt"
                    type="string"
                  />
                  <Content.Parameters.ListItemDescription>
                    A timestamp indicating when the post was created in ISO 8601
                    format: <Highlight>YYYY-MM-DDTHH:MM:SSZ</Highlight>.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="updatedAt"
                    type="string"
                  />
                  <Content.Parameters.ListItemDescription>
                    A timestamp indicating when the post last updated in ISO
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
                  Post schema
                </ExampleResponse.TopBar.Title>
                <ExampleResponse.TopBar.CopyButton />
              </ExampleResponse.TopBar>
              <ExampleResponse.Schema schema={schema} />
            </ExampleResponse>

            <ExampleResponse>
              <ExampleResponse.TopBar>
                <ExampleResponse.TopBar.Title>
                  Post example
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

export default Posts
