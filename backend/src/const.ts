export const routes = {
  routes: {
    users: {
      listAllUsers: {
        method: "GET",
        route: "/api/users",
      },
      createAUser: {
        method: "POST",
        route: "/api/users",
      },
      retrieveAUser: {
        method: "GET",
        route: "/api/users/:id",
      },
      updateAUser: {
        method: "PUT",
        route: "/api/users/:id",
      },
      deleteAUser: {
        method: "DELETE",
        route: "/api/users/:id",
      },
      listAllUserPosts: {
        method: "GET",
        route: "/api/users/:id/posts",
      },
      listAllUserComments: {
        method: "GET",
        route: "/api/users/:id/comments",
      },
    },
    posts: {
      listAllPosts: {
        method: "GET",
        route: "/api/posts",
      },
      createAPost: {
        method: "POST",
        route: "/api/posts",
      },
      retrieveAPost: {
        method: "GET",
        route: "/api/posts/:id",
      },
      updateAPost: {
        method: "PUT",
        route: "/api/posts/:id",
      },
      deleteAPost: {
        method: "DELETE",
        route: "/api/posts/:id",
      },
      listAllPostComments: {
        method: "GET",
        route: "/api/posts/:id/comments",
      },
    },
    comments: {
      listAllComments: {
        method: "GET",
        route: "/api/comments",
      },
      createAComment: {
        method: "POST",
        route: "/api/comments",
      },
      retrieveAComment: {
        method: "GET",
        route: "/api/comments/:id",
      },
      updateAComment: {
        method: "PUT",
        route: "/api/comments/:id",
      },
      deleteAComment: {
        method: "DELETE",
        route: "/api/comments/:id",
      },
    },
  },
}
