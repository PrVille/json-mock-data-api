import Overview from "./pages/Overview"
import GetSeveralPosts from "./pages/Posts/GetSeveralPosts"
import Posts from "./pages/Posts/Posts"
import Quickstart from "./pages/Quickstart"
import ReleaseNotes from "./pages/ReleaseNotes"
import CreateUser from "./pages/Users/CreateUser"
import DeleteUser from "./pages/Users/DeleteUser"
import GetSeveralUsers from "./pages/Users/GetSeveralUsers"
import GetUser from "./pages/Users/GetUser"
import GetUserComments from "./pages/Users/GetUserComments"
import GetUserPosts from "./pages/Users/GetUserPosts"
import UpdateUser from "./pages/Users/UpdateUser"
import Users from "./pages/Users/Users"

const routes = {
  general: [
    {
      path: "overview",
      name: "Overview",
      component: Overview,
      exact: true,
    },
    {
      path: "quickstart",
      name: "Quickstart",
      component: Quickstart,
      exact: true,
    },
    {
      path: "release-notes",
      name: "Release Notes",
      component: ReleaseNotes,
      exact: true,
    },
  ],
  api: [
    {
      path: "users",
      name: "Users",
      component: Users,
      exact: true,
      routes: [
        {
          path: "get-several-users",
          name: "Get several users",
          badge: "get",
          component: GetSeveralUsers,
          exact: true,
        },
        {
          path: "create-user",
          name: "Create user",
          badge: "post",
          component: CreateUser,
          exact: true,
        },
        {
          path: "get-user",
          name: "Get user",
          badge: "get",
          component: GetUser,
          exact: true,
        },
        {
          path: "update-user",
          name: "Update user",
          badge: "put",
          component: UpdateUser,
          exact: true,
        },
        {
          path: "delete-user",
          name: "Delete user",
          badge: "delete",
          component: DeleteUser,
          exact: true,
        },
        {
          path: "get-user-posts",
          name: "Get user posts",
          badge: "get",
          component: GetUserPosts,
          exact: true,
        },
        {
          path: "get-user-comments",
          name: "Get user comments",
          badge: "get",
          component: GetUserComments,
          exact: true,
        },
      ],
    },
    {
      path: "posts",
      name: "Posts",
      component: Posts,
      exact: true,
      routes: [
        {
          path: "get-several-posts",
          name: "Get several posts",
          badge: "get",
          component: GetSeveralPosts,
          exact: true,
        },
      ],
    },
  ],
}

export type ApiRoute = (typeof routes.api)[0]

export default routes
