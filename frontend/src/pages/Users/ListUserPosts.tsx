import { Link } from "react-router-dom"
import Content from "../../components/Content"
import ExampleResponse from "../../components/ExampleResponse"
import Page from "../../components/Page"
import { Method } from "../../typings/enums"
import Highlight from "../../components/Highlight"

const exampleCodeBlock = `fetch('https://json-mock-data.vercel.app/api/users/ba5a9792-6d06-4827-aac7-ae4f067abd97/posts?take=3&sortBy=title')
  .then(response => response.json())
  .then(json => console.log(json))`

const exampleResponse = {
  data: [
    {
      id: "008d68b3-539d-4336-80d3-2b209dadf1bd",
      title: "Accusantium vitae molestias distinctio.",
      content:
        "Nihil dolorum dolorum doloribus explicabo laudantium hic voluptatem. Iure dolor recusandae itaque recusandae temporibus sequi fugiat dolorem. Magni a temporibus corporis error animi fugiat.\nSequi sapiente mollitia harum dolor ex ad illo nemo inventore. Beatae facilis iste. Animi unde doloribus saepe accusantium hic.\nRepellat quisquam vero quos architecto quas expedita. Aliquid itaque earum accusamus dignissimos consequatur nihil. Quasi ut suscipit cupiditate necessitatibus tempore cupiditate perferendis error.\nIpsum veniam non suscipit quae. Dolor minima temporibus ab dolor et. Sequi fugiat ab dolorem.",
      userId: "ba5a9792-6d06-4827-aac7-ae4f067abd97",
      createdAt: "2023-09-04T11:01:34.502Z",
      updatedAt: "2023-09-04T11:01:34.502Z",
    },
    {
      id: "3542c8cc-b97d-4daf-b412-3aed417a6146",
      title:
        "Consectetur perspiciatis facilis ratione harum necessitatibus sequi.",
      content:
        "Nisi deleniti placeat dicta molestiae magnam. Cumque perspiciatis molestiae corporis rerum quam asperiores. Eos quam magni ipsam iure deleniti eaque a modi ducimus.",
      userId: "ba5a9792-6d06-4827-aac7-ae4f067abd97",
      createdAt: "2023-09-04T11:01:34.497Z",
      updatedAt: "2023-09-04T11:01:34.497Z",
    },
    {
      id: "b7be0359-11cc-4c45-baa3-cc0662f3ed5d",
      title: "Dolorum perspiciatis nam.",
      content:
        "Nulla consequuntur a ipsa officiis. Nisi rerum doloremque. Sunt suscipit recusandae.\nPlaceat facilis quisquam cumque ullam dolorum itaque veritatis architecto. Necessitatibus fuga labore. Blanditiis accusantium quo.\nExercitationem molestias placeat. Quos voluptatum quae nam beatae facere aut aperiam. Accusantium consequuntur molestias labore minus error vitae libero.",
      userId: "ba5a9792-6d06-4827-aac7-ae4f067abd97",
      createdAt: "2023-09-04T11:01:34.504Z",
      updatedAt: "2023-09-04T11:01:34.504Z",
    },
  ],
  total: 10,
  skip: 0,
  take: 3,
}

const ListUserPosts = () => {
  return (
    <Page>
      <Page.Section>
        <Page.Section.Title>List all user posts</Page.Section.Title>

        <Page.Section.Body>
          <Page.Section.Content>
            <Content.Subtitle>
              Returns a list of posts for the specific user.
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
                    <Highlight>title</Highlight>,{" "}
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
                  <Highlight>take</Highlight> posts for the specific user,
                  starting after <Highlight>skip</Highlight>, sorted by{" "}
                  <Highlight>sortBy</Highlight> in the direction of{" "}
                  <Highlight>sortOrder</Highlight>. Each entry in the array is a
                  separate post object. If no posts for the specific user are
                  available, the resulting array will be empty. The return
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
                  endpoint={"/api/users/:id/posts"}
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

export default ListUserPosts
