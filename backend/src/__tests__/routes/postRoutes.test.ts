import supertest from "supertest"
import app, { server } from "../../index"
import {
  createTestApiUser,
  createTestPost,
  createTestTokenForApiUser,
  createTestUser,
  deleteTestApiUser,
  deleteTestPost,
  deleteTestUser,
} from "../../utils/testHelpers"
import { SortOrder, SortPostsBy } from "../../typings/enums"
import { CreatePostBody } from "../../typings/bodies"

const api = supertest(app)

afterAll(() => {
  server.close()
})

describe("GET /api/posts", function () {
  it("should respond with json", async () => {
    const response = await api.get("/api/posts")

    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.status).toBe(200)
  })

  it("should return posts with default parameters", async () => {
    const response = await api.get("/api/posts")
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
    const response = await api.get("/api/posts")

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.data).toBeDefined()
    expect(response.body.skip).toBeDefined()
    expect(response.body.take).toBeDefined()
    expect(response.body.total).toBeDefined()
  })

  it("should return posts for an authenticated user", async () => {
    const testApiUser = await createTestApiUser()
    const token = createTestTokenForApiUser(testApiUser.id)

    const response = await api
      .get("/api/posts")
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.data).toBeDefined()
    expect(response.body.data).toHaveLength(0)
    expect(response.body.data).toEqual([])

    await deleteTestApiUser(testApiUser.id)
  })

  it("should return posts with valid query parameters", async () => {
    const response = await api.get("/api/posts").query({
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
    const response = await api.get("/api/posts").query({
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

describe("GET /api/posts/:id", function () {
  it("should respond with json", async () => {
    const testUser = await createTestUser()
    const testPost = await createTestPost(testUser.id)

    const response = await api.get(`/api/posts/${testPost.id}`)

    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.status).toBe(200)

    await deleteTestPost(testPost.id)
    await deleteTestUser(testUser.id)
  })

  it("should return post for an authenticated user", async () => {
    const testApiUser = await createTestApiUser()
    const testUser = await createTestUser(testApiUser.id)
    const testPost = await createTestPost(testUser.id, testApiUser.id)
    const token = createTestTokenForApiUser(testApiUser.id)

    const response = await api
      .get(`/api/posts/${testPost.id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.id).toBe(testPost.id)

    await deleteTestPost(testPost.id)
    await deleteTestUser(testUser.id)
    await deleteTestApiUser(testApiUser.id)
  })

  it("should return error 400 when the post doesn't exist", async () => {
    const response = await api.get("/api/posts/nonExistingPostId")

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

describe("POST /api/posts", function () {
  it("should respond with json", async () => {
    const response = await api.post("/api/posts").send({})

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

    const response = await api.post("/api/posts").send(postToCreate)

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

    const postsBefore = await api.get("/api/posts")
    const response = await api.post("/api/posts").send(postToCreate)

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

    const postsAfter = await api.get("/api/posts")

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
      .get("/api/posts")
      .set("Authorization", `Bearer ${token}`)
    const response = await api
      .post("/api/posts")
      .send(postToCreate)
      .set("Authorization", `Bearer ${token}`)

    expect(postsBefore.status).toBe(200)
    expect(postsBefore.body.total).toBeDefined()

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()

    const postsAfter = await api
      .get("/api/posts")
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

    const response = await api.post("/api/posts").send(postToCreate)

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

    const response = await api.post("/api/posts").send(postToCreate)

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