import ExampleResponse from "../components/ExampleResponse"
import Page from "../components/Page"
import Content from "../components/Content"

const Introduction = () => {
  return (
    <Page>
      <Page.Section>
        <Page.Section.Title>API Reference</Page.Section.Title>

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
            <ExampleResponse darkMode>
              <ExampleResponse.TopBar darkMode>
                <ExampleResponse.TopBar.Title darkMode>
                  Base url
                </ExampleResponse.TopBar.Title>
                <ExampleResponse.TopBar.CopyButton darkMode />
              </ExampleResponse.TopBar>
              <div className="px-5 py-3 text-[13px]/[22px] text-white font-medium font-mono max-h-[75vh] overflow-auto">
                <span>https://json-mock-data.vercel.app/api/</span>
              </div>
            </ExampleResponse>
          </Page.Section.Examples>
        </Page.Section.Body>
      </Page.Section>
    </Page>
  )
}

export default Introduction
