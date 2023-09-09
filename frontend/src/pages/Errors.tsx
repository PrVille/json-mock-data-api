import ExampleResponse from "../components/ExampleResponse"
import Page from "../components/Page"
import Content from "../components/Content"
import Highlight from "../components/Highlight"

const exampleCodeBlock = `// Request with an invalid body
fetch('https://json-mock-data.vercel.app/api/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: "title",
    // Missing required field "content"
    userId: "123" // Invalid "userId"
  })
})
  .then(response => response.json())
  .then(json => console.log(json))`

const example = {
  errors: [
    {
      type: "field",
      msg: "The 'content' field is a required field.",
      path: "content",
      location: "body",
    },
    {
      type: "field",
      value: "123",
      msg: "The specified user for the 'userId' field does not exist.",
      path: "userId",
      location: "body",
    },
  ],
}

const statusCodes = [
  {
    status: "200 - OK",
    definition: "Everything worked as expected.",
  },
  {
    status: "400 - Bad Request",
    definition:
      "The request was unacceptable, often due to missing a required parameter.",
  },
  {
    status: "401 - Unauthorized",
    definition: "Invalid API key provided.",
  },
  {
    status: "404 - Not Found",
    definition: "The requested resource doesn't exist.",
  },
  {
    status: "500 - Internal Server Error",
    definition: "Something went wrong on the server. (These are rare.)",
  },
]

const Errors = () => {
  return (
    <Page>
      <Page.Section>
        <Page.Section.Title>Errors</Page.Section.Title>

        <Page.Section.Body>
          <Page.Section.Content>
            <Content.Subtitle>
              JSON Mock Data API uses conventional HTTP response codes to
              indicate the success or failure of an API request. In general:
              Codes in the <Highlight>2xx</Highlight> range indicate success.
              Codes in the <Highlight>4xx</Highlight> range indicate an error
              that failed given the information provided (e.g., a required
              parameter was omitted, a path parameter doesn't exist, etc.).
              Codes in the <Highlight>5xx</Highlight>
              range indicate an internal error with the server (these are rare).
            </Content.Subtitle>

            <Content.Parameters>
              <Content.Parameters.Title>Attributes</Content.Parameters.Title>
              <Content.Parameters.List>
                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel name="type" type="string" />
                  <Content.Parameters.ListItemDescription>
                    The type of error returned.
                  </Content.Parameters.ListItemDescription>

                  <Content.Parameters.ListItemDescription>
                    Can be one of <Highlight>field</Highlight>,{" "}
                    <Highlight>auth</Highlight>
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="value"
                    type="string"
                    optional
                  />
                  <Content.Parameters.ListItemDescription>
                    Value related to the error.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel name="msg" type="string" />
                  <Content.Parameters.ListItemDescription>
                    A human-readable message providing more details about the
                    error.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel name="path" type="string" />
                  <Content.Parameters.ListItemDescription>
                    Path related to the error.
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>

                <Content.Parameters.ListItem>
                  <Content.Parameters.ListItemLabel
                    name="location"
                    type="string"
                  />
                  <Content.Parameters.ListItemDescription>
                    Request location related to the error.
                  </Content.Parameters.ListItemDescription>

                  <Content.Parameters.ListItemDescription>
                    Can be one of <Highlight>body</Highlight>,{" "}
                    <Highlight>cookies</Highlight>,{" "}
                    <Highlight>headers</Highlight>,{" "}
                    <Highlight>params</Highlight>, <Highlight>query</Highlight>
                  </Content.Parameters.ListItemDescription>
                </Content.Parameters.ListItem>
              </Content.Parameters.List>
            </Content.Parameters>

            <Content.Parameters>
              <Content.Parameters.Title>Returns</Content.Parameters.Title>
              <div className="py-3">
                <Content.Parameters.ListItemDescription>
                  An object with an <Highlight>errors</Highlight> property that
                  contains an array of error objects.
                </Content.Parameters.ListItemDescription>
              </div>
            </Content.Parameters>
          </Page.Section.Content>

          <Page.Section.Examples>
            <ExampleResponse>
              <ExampleResponse.TopBar>
                <ExampleResponse.TopBar.Title>
                  Http status code summary
                </ExampleResponse.TopBar.Title>
              </ExampleResponse.TopBar>

              <div className="py-3">
                <table className="text-[13px] text-gray-600 max-h-[75vh] overflow-auto">
                  {statusCodes.map((statusCode, index) => (
                    <tr key={index} className="table-row align-top">
                      <th className="px-5 py-2 table-cell w-[175px] text-right font-semibold">
                        <span>{statusCode.status}</span>
                      </th>

                      <td className="px-5 py-2 table-cell">
                        <span>{statusCode.definition}</span>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </ExampleResponse>

            <ExampleResponse darkMode>
              <ExampleResponse.TopBar darkMode>
                <ExampleResponse.TopBar.Title darkMode>
                  Error request
                </ExampleResponse.TopBar.Title>
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
              <ExampleResponse.Json object={example} />
            </ExampleResponse>
          </Page.Section.Examples>
        </Page.Section.Body>
      </Page.Section>
    </Page>
  )
}

export default Errors
