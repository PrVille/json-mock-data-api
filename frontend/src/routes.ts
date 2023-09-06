import Authentication from "./pages/Authentication"
import Errors from "./pages/Errors"
import Overview from "./pages/Overview"
import ListPosts from "./pages/Posts/ListPosts"
import Posts from "./pages/Posts/Posts"
import Quickstart from "./pages/Quickstart"
import Changelog from "./pages/Changelog"
import CreateUser from "./pages/Users/CreateUser"
import DeleteUser from "./pages/Users/DeleteUser"
import ListUsers from "./pages/Users/ListUsers"
import RetrieveUser from "./pages/Users/RetrieveUser"
import ListUserComments from "./pages/Users/ListUserComments"
import ListUserPosts from "./pages/Users/ListUserPosts"
import UpdateUser from "./pages/Users/UpdateUser"
import Users from "./pages/Users/Users"
import { Method } from "./typings/enums"
import CreatePost from "./pages/Posts/CreatePost"
import RetrievePost from "./pages/Posts/RetrievePost"
import UpdatePost from "./pages/Posts/UpdatePost"
import DeletePost from "./pages/Posts/DeletePost"
import ListPostComments from "./pages/Posts/ListPostComments"
import Comments from "./pages/Comments/Comments"
import ListComments from "./pages/Comments/ListComments"
import CreateComment from "./pages/Comments/CreateComment"

const routes = {
  general: [
    {
      path: "overview",
      name: "Overview",
      component: Overview,
    },
    {
      path: "quickstart",
      name: "Quickstart",
      component: Quickstart,
    },
    {
      path: "authentication",
      name: "Authentication",
      component: Authentication,
    },
    {
      path: "errors",
      name: "Errors",
      component: Errors,
    },
    {
      path: "changelog",
      name: "Changelog",
      component: Changelog,
    },
  ],
  api: [
    {
      path: "users",
      name: "Users",
      component: Users,

      routes: [
        {
          path: "list",
          name: "List all users",
          method: Method.get,
          component: ListUsers,
        },
        {
          path: "create",
          name: "Create a user",
          method: Method.post,
          component: CreateUser,
        },
        {
          path: "retrieve",
          name: "Retrieve a user",
          method: Method.get,
          component: RetrieveUser,
        },
        {
          path: "update",
          name: "Update a user",
          method: Method.put,
          component: UpdateUser,
        },
        {
          path: "delete",
          name: "Delete a user",
          method: Method.delete,
          component: DeleteUser,
        },
        {
          path: "list-posts",
          name: "List all user posts",
          method: Method.get,
          component: ListUserPosts,
        },
        {
          path: "list-comments",
          name: "List all user comments",
          method: Method.get,
          component: ListUserComments,
        },
      ],
    },
    {
      path: "posts",
      name: "Posts",
      component: Posts,
      routes: [
        {
          path: "list",
          name: "List all posts",
          method: Method.get,
          component: ListPosts,
        },
        {
          path: "create",
          name: "Create a post",
          method: Method.post,
          component: CreatePost,
        },
        {
          path: "retrieve",
          name: "Retrieve a post",
          method: Method.get,
          component: RetrievePost,
        },
        {
          path: "update",
          name: "Update a post",
          method: Method.put,
          component: UpdatePost,
        },
        {
          path: "delete",
          name: "Delete a post",
          method: Method.delete,
          component: DeletePost,
        },
        {
          path: "list-comments",
          name: "List all post comments",
          method: Method.get,
          component: ListPostComments,
        },
      ],
    },
    {
      path: "comments",
      name: "Comments",
      component: Comments,
      routes: [
        {
          path: "list",
          name: "List all comments",
          method: Method.get,
          component: ListComments,
        },
        {
          path: "create",
          name: "Create a comment",
          method: Method.post,
          component: CreateComment,
        },
      ],
    },
  ],
}

export type ApiRoute = (typeof routes.api)[0]

export default routes
