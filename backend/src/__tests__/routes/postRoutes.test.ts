import supertest from "supertest"
import app, { server } from "../../index"
import {
  createTestApiUser,
  createTestAuth,
  createTestDb,
  createTestPost,
  createTestTokenForApiUser,
  createTestUser,
  deleteTestApiUser,
  deleteTestPost,
  deleteTestUser,
} from "../../utils/testHelpers"
import { SortCommentsBy, SortOrder, SortPostsBy } from "../../typings/enums"
import { CreatePostBody, UpdatePostBody } from "../../typings/bodies"

const api = supertest(app)
const baseUrl = "/api/posts"

afterAll(() => {
  server.close()
})

describe(`GET ${baseUrl}`, function () {
  it("should respond with json", async () => {
    const response = await api.get(baseUrl)

    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.status).toBe(200)
  })

  it("should return posts with default parameters", async () => {
    const response = await api.get(baseUrl)
    const expectedProperties = {
      id: expect.any(String),
      title: expect.any(String),
      content: expect.any(String),
      userId: expect.any(String),
    }

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.data).toBeDefined()
    expect(response.body.data).toContainEqual(
      expect.objectContaining(expectedProperties)
    )
  })

  it("should return meta data with posts", async () => {
    const response = await api.get(baseUrl)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.data).toBeDefined()
    expect(response.body.skip).toBeDefined()
    expect(response.body.take).toBeDefined()
    expect(response.body.total).toBeDefined()
  })

  it("should return posts for an authenticated user", async () => {
    const { token, removeTestAuth } = await createTestAuth()

    const response = await api
      .get(baseUrl)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.data).toBeDefined()
    expect(response.body.data).toHaveLength(0)
    expect(response.body.data).toEqual([])

    await removeTestAuth()
  })

  it("should return posts with valid query parameters", async () => {
    const response = await api.get(baseUrl).query({
      skip: 2,
      take: 5,
      sortOrder: SortOrder.ASC,
      sortBy: SortPostsBy.TITLE,
    })

    const expectedProperties = {
      id: expect.any(String),
      title: expect.any(String),
      content: expect.any(String),
      userId: expect.any(String),
    }

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.data).toHaveLength(5)
    expect(response.body.data).toContainEqual(
      expect.objectContaining(expectedProperties)
    )
  })

  it("should return error 400 with invalid properties", async () => {
    const response = await api.get(baseUrl).query({
      skip: "invalidSkip",
      take: "invalidTake",
      sortOrder: "invalidSortOrder",
      sortBy: "invalidSortBy",
    })

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "invalidSkip",
          msg: "The 'skip' field must be an integer greater than or equal to 0.",
          path: "skip",
          location: "query",
        },
        {
          type: "field",
          value: "invalidTake",
          msg: "The 'take' field must be an integer greater than or equal to 0.",
          path: "take",
          location: "query",
        },
        {
          type: "field",
          value: "invalidSortBy",
          msg: "The 'sortBy' field must be one of 'id', 'title', 'updatedAt' or 'createdAt'.",
          path: "sortBy",
          location: "query",
        },
        {
          type: "field",
          value: "invalidSortOrder",
          msg: "The 'sortOrder' field must be either 'asc' or 'desc'.",
          path: "sortOrder",
          location: "query",
        },
      ],
    })
  })
})

describe(`GET ${baseUrl}/:id`, function () {
  it("should respond with json", async () => {
    const { post, removeTestDb } = await createTestDb()

    const response = await api.get(`${baseUrl}/${post.id}`)

    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.status).toBe(200)

    await removeTestDb()
  })

  it("should return post for an authenticated user", async () => {
    const { apiUser, token, removeTestAuth } = await createTestAuth()
    const { post, removeTestDb } = await createTestDb(apiUser.id)
   
    const response = await api
      .get(`${baseUrl}/${post.id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.id).toBe(post.id)

    await removeTestDb()
    await removeTestAuth()
  })

  it("should return error 400 when the post doesn't exist", async () => {
    const response = await api.get(`${baseUrl}/nonExistingPostId`)
    
    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "nonExistingPostId",
          msg: "The specified post for the 'id' field does not exist.",
          path: "id",
          location: "params",
        },
      ],
    })
  })
})

describe(`GET ${baseUrl}/:id/comments`, function () {
  it("should respond with json", async () => {
    const { post, removeTestDb } = await createTestDb()

    const response = await api.get(`${baseUrl}/${post.id}/comments`)

    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.status).toBe(200)

    await removeTestDb()
  })

  it("should return error 400 when the post doesn't exist", async () => {
    const response = await api.get(`${baseUrl}/nonExistingId/comments`)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "nonExistingId",
          msg: "The specified post for the 'id' field does not exist.",
          path: "id",
          location: "params",
        },
      ],
    })
  })

  it("should return comments for post with default parameters", async () => {
    const { post, removeTestDb } = await createTestDb()

    const response = await api.get(`${baseUrl}/${post.id}/comments`)

    const expectedProperties = {
      id: expect.any(String),
      content: expect.any(String),
      userId: expect.any(String),
      postId: expect.any(String),
    }

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.data).toBeDefined()
    expect(response.body.data).toContainEqual(
      expect.objectContaining(expectedProperties)
    )

    await removeTestDb()
  })

  it("should return meta data with comments for post", async () => {
    const { post, removeTestDb } = await createTestDb()
    const response = await api.get(`${baseUrl}/${post.id}/comments`)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.data).toBeDefined()
    expect(response.body.skip).toBeDefined()
    expect(response.body.take).toBeDefined()
    expect(response.body.total).toBeDefined()

    await removeTestDb()
  })

  it("should return comments for post for an authenticated user", async () => {
    const { apiUser, token, removeTestAuth } = await createTestAuth()
    const { post, removeTestDb } = await createTestDb(apiUser.id)

    const response = await api
      .get(`${baseUrl}/${post.id}/comments`)
      .set("Authorization", `Bearer ${token}`)

    const expectedProperties = {
      id: expect.any(String),
      content: expect.any(String),
      userId: expect.any(String),
      postId: expect.any(String),
    }

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.data).toBeDefined()
    expect(response.body.data).toHaveLength(1)
    expect(response.body.data).toContainEqual(
      expect.objectContaining(expectedProperties)
    )

    await removeTestDb()
    await removeTestAuth()
  })

  it("should return comments with valid query parameters", async () => {
    const { post, removeTestDb } = await createTestDb()

    const response = await api.get(`${baseUrl}/${post.id}/comments`).query({
      skip: 0,
      take: 5,
      sortOrder: SortOrder.ASC,
      sortBy: SortCommentsBy.CREATED_AT,
    })

    const expectedProperties = {
      id: expect.any(String),
      content: expect.any(String),
      userId: expect.any(String),
      postId: expect.any(String),
    }

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.data).toHaveLength(1)
    expect(response.body.data).toContainEqual(
      expect.objectContaining(expectedProperties)
    )

    await removeTestDb()
  })

  it("should return error 400 with invalid properties", async () => {
    const { post, removeTestDb } = await createTestDb()

    const response = await api.get(`${baseUrl}/${post.id}/comments`).query({
      skip: "invalidSkip",
      take: "invalidTake",
      sortOrder: "invalidSortOrder",
      sortBy: "invalidSortBy",
    })

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "invalidSkip",
          msg: "The 'skip' field must be an integer greater than or equal to 0.",
          path: "skip",
          location: "query",
        },
        {
          type: "field",
          value: "invalidTake",
          msg: "The 'take' field must be an integer greater than or equal to 0.",
          path: "take",
          location: "query",
        },
        {
          type: "field",
          value: "invalidSortBy",
          msg: "The 'sortBy' field must be one of 'id', 'updatedAt' or 'createdAt'.",
          path: "sortBy",
          location: "query",
        },
        {
          type: "field",
          value: "invalidSortOrder",
          msg: "The 'sortOrder' field must be either 'asc' or 'desc'.",
          path: "sortOrder",
          location: "query",
        },
      ],
    })

    await removeTestDb()
  })
})

// TODO: Refactor
describe("POST /api/posts", function () {
  it("should respond with json", async () => {
    const response = await api.post(baseUrl).send({})

    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.status).toBe(400)
  })

  it("should return created post with valid request body", async () => {
    const testUser = await createTestUser()
    const postToCreate: CreatePostBody = {
      title: "title",
      content: "content",
      userId: testUser.id,
    }

    const response = await api.post(baseUrl).send(postToCreate)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        content: expect.any(String),
        userId: expect.any(String),
      })
    )

    await deleteTestUser(testUser.id)
  })

  it("should mock creating post when not authenticated", async () => {
    const testUser = await createTestUser()
    const postToCreate: CreatePostBody = {
      title: "title",
      content: "content",
      userId: testUser.id,
    }

    const postsBefore = await api.get(baseUrl)
    const response = await api.post(baseUrl).send(postToCreate)

    expect(postsBefore.status).toBe(200)
    expect(postsBefore.body.total).toBeDefined()

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()

    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("title")
    expect(response.body).toHaveProperty("content")
    expect(response.body).toHaveProperty("userId")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")

    const postsAfter = await api.get(baseUrl)

    expect(postsAfter.status).toBe(200)
    expect(postsAfter.body.total).toBeDefined()
    expect(postsAfter.body.total).toBe(postsBefore.body.total)

    await deleteTestUser(testUser.id)
  })

  it("should save post when authenticated", async () => {
    const testApiUser = await createTestApiUser()
    const token = createTestTokenForApiUser(testApiUser.id)

    const testUser = await createTestUser(testApiUser.id)
    const postToCreate: CreatePostBody = {
      title: "title",
      content: "content",
      userId: testUser.id,
    }

    const postsBefore = await api
      .get(baseUrl)
      .set("Authorization", `Bearer ${token}`)
    const response = await api
      .post(baseUrl)
      .send(postToCreate)
      .set("Authorization", `Bearer ${token}`)

    expect(postsBefore.status).toBe(200)
    expect(postsBefore.body.total).toBeDefined()

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()

    const postsAfter = await api
      .get(baseUrl)
      .set("Authorization", `Bearer ${token}`)

    expect(postsAfter.status).toBe(200)
    expect(postsAfter.body.total).toBeDefined()
    expect(postsAfter.body.total).toBe(postsBefore.body.total + 1)

    await deleteTestUser(testUser.id)
    await deleteTestApiUser(testApiUser.id)
  })

  it("should return error 400 with invalid request body", async () => {
    const postToCreate: CreatePostBody = {
      title: "",
      content: "",
      userId: "",
    }

    const response = await api.post(baseUrl).send(postToCreate)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "",
          msg: "The 'title' field must be a non-empty string.",
          path: "title",
          location: "body",
        },
        {
          type: "field",
          value: "",
          msg: "The 'content' field must be a non-empty string.",
          path: "content",
          location: "body",
        },
        {
          type: "field",
          value: "",
          msg: "The 'userId' field must be a non-empty string.",
          path: "userId",
          location: "body",
        },
      ],
    })
  })

  it("should return error 400 when user doesn't exist", async () => {
    const postToCreate: CreatePostBody = {
      title: "title",
      content: "content",
      userId: "nonExistingUser",
    }

    const response = await api.post(baseUrl).send(postToCreate)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "nonExistingUser",
          msg: "The specified user for the 'userId' field does not exist.",
          path: "userId",
          location: "body",
        },
      ],
    })
  })
})

//TODO: Refactor
describe("PUT /api/posts/:id", function () {
  it("should respond with json", async () => {
    const testUser = await createTestUser()
    const testPost = await createTestPost(testUser.id)
    const updatedPostData: UpdatePostBody = {
      title: "UpdatedTitle",
      content: "UpdatedContent",
    }

    const response = await api
      .put(`/api/posts/${testPost.id}`)
      .send(updatedPostData)

    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.status).toBe(200)

    await deleteTestPost(testPost.id)
    await deleteTestUser(testUser.id)
  })

  it("should return error 400 when the post doesn't exist", async () => {
    const nonExistingPostId = "nonExistingUserId"
    const updatedPostData: UpdatePostBody = {
      title: "UpdatedTitle",
      content: "UpdatedContent",
    }

    const response = await api
      .put(`/api/posts/${nonExistingPostId}`)
      .send(updatedPostData)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: nonExistingPostId,
          msg: "The specified post for the 'id' field does not exist.",
          path: "id",
          location: "params",
        },
      ],
    })
  })

  it("should return updated post with valid request body", async () => {
    const testUser = await createTestUser()
    const testPost = await createTestPost(testUser.id)
    const updatedPostData: UpdatePostBody = {
      title: "UpdatedTitle",
      content: "UpdatedContent",
    }

    const response = await api
      .put(`/api/posts/${testPost.id}`)
      .send(updatedPostData)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual(
      expect.objectContaining({
        id: testPost.id,
        title: updatedPostData.title,
        content: updatedPostData.content,
        userId: testUser.id,
      })
    )

    await deleteTestPost(testPost.id)
    await deleteTestUser(testUser.id)
  })

  it("should mock updating post when not authenticated", async () => {
    const testUser = await createTestUser()
    const testPost = await createTestPost(testUser.id)
    const updatedPostData: UpdatePostBody = {
      title: "UpdatedTitle",
      content: "UpdatedContent",
    }

    const response = await api
      .put(`/api/posts/${testPost.id}`)
      .send(updatedPostData)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()

    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("title")
    expect(response.body).toHaveProperty("content")
    expect(response.body).toHaveProperty("userId")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")

    expect(response.body.id).toBe(testPost.id)
    expect(response.body.title).toBe(updatedPostData.title)
    expect(response.body.content).toBe(updatedPostData.content)

    const testPostAfter = await api.get(`/api/posts/${testPost.id}`)

    expect(testPostAfter.status).toBe(200)
    expect(testPostAfter.body).toBeDefined()
    expect(testPostAfter.body.id).toBe(testPost.id)
    expect(testPostAfter.body.title).toBe(testPost.title)
    expect(testPostAfter.body.content).toBe(testPost.content)

    await deleteTestPost(testPost.id)
    await deleteTestUser(testUser.id)
  })

  it("should mock updating post correctly when request body is empty", async () => {
    const { post, removeTestDb } = await createTestDb()

    const updatedData: UpdatePostBody = {}

    const response = await api.put(`${baseUrl}/${post.id}`).send(updatedData)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()

    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("title")
    expect(response.body).toHaveProperty("content")
    
    expect(response.body.id).toBe(post.id)
    expect(response.body.title).toBe(post.title)
    expect(response.body.content).toBe(post.content)

    await removeTestDb()
  })

  it("should save updated post when authenticated", async () => {
    const testApiUser = await createTestApiUser()
    const token = createTestTokenForApiUser(testApiUser.id)

    const testUser = await createTestUser(testApiUser.id)
    const testPost = await createTestPost(testUser.id, testApiUser.id)
    const updatedPostData: UpdatePostBody = {
      title: "UpdatedTitle",
      content: "UpdatedContent",
    }

    const response = await api
      .put(`/api/posts/${testPost.id}`)
      .send(updatedPostData)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()

    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("title")
    expect(response.body).toHaveProperty("content")
    expect(response.body).toHaveProperty("userId")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")

    expect(response.body.id).toBe(testPost.id)
    expect(response.body.title).toBe(updatedPostData.title)
    expect(response.body.content).toBe(updatedPostData.content)

    const testPostAfter = await api
      .get(`/api/posts/${testPost.id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(testPostAfter.status).toBe(200)
    expect(testPostAfter.body).toBeDefined()
    expect(testPostAfter.body.id).toBe(testPost.id)
    expect(testPostAfter.body.title).toBe(updatedPostData.title)
    expect(testPostAfter.body.content).toBe(updatedPostData.content)

    await deleteTestPost(testPost.id)
    await deleteTestUser(testUser.id)
    await deleteTestApiUser(testApiUser.id)
  })

  it("should return error 400 with invalid request body", async () => {
    const testUser = await createTestUser()
    const testPost = await createTestPost(testUser.id)
    const updatedPostData: UpdatePostBody = {
      title: "",
      content: "",
    }

    const response = await api
      .put(`/api/posts/${testPost.id}`)
      .send(updatedPostData)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "",
          msg: "The 'title' field must be a non-empty string.",
          path: "title",
          location: "body",
        },
        {
          type: "field",
          value: "",
          msg: "The 'content' field must be a non-empty string.",
          path: "content",
          location: "body",
        },
      ],
    })

    await deleteTestPost(testPost.id)
    await deleteTestUser(testUser.id)
  })
})

//TODO: Refactor
describe("DELETE /api/posts/:id", function () {
  it("should respond with json", async () => {
    const testUser = await createTestUser()
    const testPost = await createTestPost(testUser.id)
    const response = await api.delete(`/api/posts/${testPost.id}`)

    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.status).toBe(200)

    await deleteTestUser(testUser.id)
  })

  it("should return error 400 when the post doesn't exist", async () => {
    const response = await api.delete("/api/posts/nonExistingPostId")

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "nonExistingPostId",
          msg: "The specified post for the 'id' field does not exist.",
          path: "id",
          location: "params",
        },
      ],
    })
  })

  it("should mock deleting post when not authenticated", async () => {
    const testUser = await createTestUser()
    const testPost = await createTestPost(testUser.id)

    const postsBefore = await api.get(baseUrl)
    const response = await api.delete(`/api/posts/${testPost.id}`)

    expect(postsBefore.status).toBe(200)
    expect(postsBefore.body.total).toBeDefined()

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()

    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("title")
    expect(response.body).toHaveProperty("content")
    expect(response.body).toHaveProperty("userId")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")

    const postsAfter = await api.get(baseUrl)

    expect(postsAfter.status).toBe(200)
    expect(postsAfter.body.total).toBeDefined()
    expect(postsAfter.body.total).toBe(postsBefore.body.total)

    await deleteTestUser(testUser.id)
  })

  it("should delete post when authenticated", async () => {
    const testApiUser = await createTestApiUser()
    const token = createTestTokenForApiUser(testApiUser.id)
    const testUser = await createTestUser(testApiUser.id)
    const testPost = await createTestPost(testUser.id, testApiUser.id)

    const postsBefore = await api
      .get(baseUrl)
      .set("Authorization", `Bearer ${token}`)

    const response = await api
      .delete(`/api/posts/${testPost.id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(postsBefore.status).toBe(200)
    expect(postsBefore.body.total).toBeDefined()

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
   
    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("title")
    expect(response.body).toHaveProperty("content")
    expect(response.body).toHaveProperty("userId")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")

    const postsAfter = await api
      .get(baseUrl)
      .set("Authorization", `Bearer ${token}`)

    expect(postsAfter.status).toBe(200)
    expect(postsAfter.body.total).toBeDefined()
    expect(postsAfter.body.total).toBe(postsBefore.body.total - 1)

    await deleteTestUser(testUser.id)
    await deleteTestApiUser(testApiUser.id)
  })
})
