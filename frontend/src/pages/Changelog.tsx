import { Link } from "react-router-dom"
import Page from "../components/Page"

//https://stripe.com/docs/changelog

const Highlight = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="px-1 py-0.5 bg-gray-100 rounded-md whitespace-nowrap">
      {children}
    </span>
  )
}

const Heading = ({ children }: { children: React.ReactNode }) => {
  return <h3 className="mt-8 font-medium text-sm">{children}</h3>
}

const ChangeList = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul className="mt-3 ml-8 list-disc text-gray-600 text-sm">{children}</ul>
  )
}

const ChangeListItem = ({ children }: { children: React.ReactNode }) => {
  return <li className="py-1">{children}</li>
}
const ChangeListSubItem = ({ children }: { children: React.ReactNode }) => {
  return <li className="py-1 ml-8">{children}</li>
}

const Changelog = () => {
  return (
    <Page>
      <Page.Section>
        <Page.Section.Title>Changelog</Page.Section.Title>

        <p className="mt-6 text-gray-600">
          This changelog lists all additions and updates to the JSON Mock Data
          API, in chronological order.
        </p>

        <Heading>September 9, 2023</Heading>
        <ChangeList>
          <ChangeListItem>
            Added optional{" "}
            <Link
              to="/docs/authentication"
              className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
            >
              Authentication
            </Link>{" "}
            to allow API users to have their own instances of the resources.
          </ChangeListItem>
        </ChangeList>

        <Heading>September 6, 2023</Heading>
        <ChangeList>
          <ChangeListItem>
            Added the following new endpoint for{" "}
            <Link
              to="/docs/users"
              className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
            >
              Users:
            </Link>{" "}
          </ChangeListItem>

          <ChangeListSubItem>
            <Highlight>GET /api/users/:id/comments</Highlight> to list all user
            comments.
          </ChangeListSubItem>

          <ChangeListItem>
            Added the following new endpoint for{" "}
            <Link
              to="/docs/posts"
              className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
            >
              Posts:
            </Link>{" "}
          </ChangeListItem>

          <ChangeListSubItem>
            <Highlight>GET /api/posts/:id/comments</Highlight> to list all post
            comments.
          </ChangeListSubItem>
        </ChangeList>

        <Heading>September 4, 2023</Heading>
        <ChangeList>
          <ChangeListItem>
            Added a new{" "}
            <Link
              to="/docs/comments"
              className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
            >
              Comments
            </Link>{" "}
            resource.
          </ChangeListItem>

          <ChangeListItem>
            Added the following new endpoints for{" "}
            <Link
              to="/docs/comments"
              className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
            >
              Comments:
            </Link>{" "}
          </ChangeListItem>

          <ChangeListSubItem>
            <Highlight>GET /api/comments</Highlight> to list all comments.
          </ChangeListSubItem>
          <ChangeListSubItem>
            <Highlight>POST /api/comments</Highlight> to create a comment.
          </ChangeListSubItem>
          <ChangeListSubItem>
            <Highlight>GET /api/comments/:id</Highlight> to retrieve a comment.
          </ChangeListSubItem>
          <ChangeListSubItem>
            <Highlight>PUT /api/comments/:id</Highlight> to update a comment.
          </ChangeListSubItem>
          <ChangeListSubItem>
            <Highlight>DELETE /api/comments/:id</Highlight> to delete a comment.
          </ChangeListSubItem>
        </ChangeList>

        <Heading>August 29, 2023</Heading>
        <ChangeList>
          <ChangeListItem>
            Added the following new endpoint for{" "}
            <Link
              to="/docs/users"
              className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
            >
              Users:
            </Link>{" "}
          </ChangeListItem>

          <ChangeListSubItem>
            <Highlight>GET /api/users/:id/posts</Highlight> to list all user
            posts.
          </ChangeListSubItem>
        </ChangeList>

        <Heading>August 22, 2023</Heading>
        <ChangeList>
          <ChangeListItem>
            Added a new{" "}
            <Link
              to="/docs/posts"
              className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
            >
              Posts
            </Link>{" "}
            resource.
          </ChangeListItem>

          <ChangeListItem>
            Added the following new endpoints for{" "}
            <Link
              to="/docs/posts"
              className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
            >
              Posts:
            </Link>{" "}
          </ChangeListItem>

          <ChangeListSubItem>
            <Highlight>GET /api/posts</Highlight> to list all posts.
          </ChangeListSubItem>
          <ChangeListSubItem>
            <Highlight>POST /api/posts</Highlight> to create a post.
          </ChangeListSubItem>
          <ChangeListSubItem>
            <Highlight>GET /api/posts/:id</Highlight> to retrieve a post.
          </ChangeListSubItem>
          <ChangeListSubItem>
            <Highlight>PUT /api/posts/:id</Highlight> to update a post.
          </ChangeListSubItem>
          <ChangeListSubItem>
            <Highlight>DELETE /api/posts/:id</Highlight> to delete a post.
          </ChangeListSubItem>
        </ChangeList>

        <Heading>August 16, 2023</Heading>
        <ChangeList>
          <ChangeListItem>
            Added a new{" "}
            <Link
              to="/docs/users"
              className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
            >
              Users
            </Link>{" "}
            resource.
          </ChangeListItem>

          <ChangeListItem>
            Added the following new endpoints for{" "}
            <Link
              to="/docs/users"
              className="font-medium text-indigo-600 hover:text-gray-800 transition-all"
            >
              Users:
            </Link>{" "}
          </ChangeListItem>

          <ChangeListSubItem>
            <Highlight>GET /api/users</Highlight> to list all users.
          </ChangeListSubItem>
          <ChangeListSubItem>
            <Highlight>POST /api/users</Highlight> to create a user.
          </ChangeListSubItem>
          <ChangeListSubItem>
            <Highlight>GET /api/users/:id</Highlight> to retrieve a user.
          </ChangeListSubItem>
          <ChangeListSubItem>
            <Highlight>PUT /api/users/:id</Highlight> to update a user.
          </ChangeListSubItem>
          <ChangeListSubItem>
            <Highlight>DELETE /api/users/:id</Highlight> to delete a user.
          </ChangeListSubItem>
        </ChangeList>
      </Page.Section>
    </Page>
  )
}

export default Changelog
