import { Link } from "react-router-dom"
import Content from "../../components/Content"
import ExampleResponse from "../../components/ExampleResponse"
import Page from "../../components/Page"
import { Method } from "../../typings/enums"
import Highlight from "../../components/Highlight"

const exampleCodeBlock = `fetch('https://json-mock-data.vercel.app/api/comments?take=5')
  .then(response => response.json())
  .then(json => console.log(json))`

const exampleResponse = {
  data: [
    {
      id: "1e562225-c8e9-450b-a5ae-7bdc7f4b8a0a",
      content: "Hic reprehenderit.",
      userId: "7cdb0e7d-6885-4b06-a9de-76baa023d42c",
      postId: "00cffca1-6518-41f2-b03b-08bff8eb46ba",
      createdAt: "2023-09-04T11:01:34.616Z",
      updatedAt: "2023-09-04T11:01:34.616Z",
    },
    {
      id: "8522a421-f30c-4168-b729-e5b400bf087c",
      content: "Tempora numquam fugit corrupti facilis.",
      userId: "ba5a9792-6d06-4827-aac7-ae4f067abd97",
      postId: "d0c5e148-f056-462e-9c87-e6fa8509912f",
      createdAt: "2023-09-04T11:01:34.619Z",
      updatedAt: "2023-09-04T11:01:34.619Z",
    },
    {
      id: "a4f6baf7-1c66-4350-a0c1-eb1706a7e6d5",
      content: "Ad facilis adipisci dolorem repudiandae.",
      userId: "267df888-081b-44b2-a266-128d6abc15ae",
      postId: "98c7895f-bafe-4ae9-b083-9036f0aec51a",
      createdAt: "2023-09-04T11:01:34.620Z",
      updatedAt: "2023-09-04T11:01:34.620Z",
    },
    {
      id: "4e433092-fdf4-4027-a165-97a0a9df9993",
      content: "Officiis.",
      userId: "2fb46dc7-17db-4102-af8e-421d9d892efe",
      postId: "682630d4-bcc1-456c-b87f-852524ef5d36",
      createdAt: "2023-09-04T11:01:34.621Z",
      updatedAt: "2023-09-04T11:01:34.621Z",
    },
    {
      id: "6d3d96a5-47f9-4728-94a8-877e32e246b2",
      content: "Aspernatur aliquam libero velit enim.",
      userId: "3cc5f7b4-9573-435b-a0f9-84742b0fcd2c",
      postId: "471c601f-4c10-47b9-ae23-ee039c1b5444",
      createdAt: "2023-09-04T11:01:34.622Z",
      updatedAt: "2023-09-04T11:01:34.622Z",
    },
  ],
  total: 20,
  skip: 0,
  take: 5,
}

const ListComments = () => {
  return (
    <Page>
      <Page.Section>
        <Page.Section.Title>List all comments</Page.Section.Title>

        <Page.Section.Body>
          <Page.Section.Content>
            <Content.Subtitle>Returns a list of comments.</Content.Subtitle>
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
                  <Highlight>take</Highlight> comments, starting after{" "}
                  <Highlight>skip</Highlight>, sorted by{" "}
                  <Highlight>sortBy</Highlight> in the direction of{" "}
                  <Highlight>sortOrder</Highlight>. Each entry in the array is a
                  separate comment object. If no comments are available, the
                  resulting array will be empty. The return object also contains
                  meta data <Highlight>total</Highlight>,{" "}
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
                  endpoint={"/api/comments"}
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

export default ListComments
