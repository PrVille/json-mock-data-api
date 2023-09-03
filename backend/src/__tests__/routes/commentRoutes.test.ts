import supertest from "supertest"
import app, { server } from "../../index"
import { createTestAuth, createTestDb } from "../../utils/testHelpers"
import { SortCommentsBy, SortOrder } from "../../typings/enums"
import { CreateCommentBody } from "../../typings/bodies"

const api = supertest(app)
const baseUrl = "/api/comments"

afterAll(() => {
  server.close()
})

describe(`GET ${baseUrl}`, function () {
  it("should respond with json", async () => {
    const response = await api.get(baseUrl)

    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.status).toBe(200)
  })

  it("should return comments with default parameters", async () => {
    const response = await api.get(baseUrl)
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
  })

  it("should return meta data with comments", async () => {
    const response = await api.get(baseUrl)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.data).toBeDefined()
    expect(response.body.skip).toBeDefined()
    expect(response.body.take).toBeDefined()
    expect(response.body.total).toBeDefined()
  })

  it("should return comments for an authenticated user", async () => {
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

  it("should return comments with valid query parameters", async () => {
    const response = await api.get(baseUrl).query({
      skip: 2,
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
  })
})

describe(`GET ${baseUrl}/:id`, function () {
  it("should respond with json", async () => {
    const { comment, removeTestDb } = await createTestDb()

    const response = await api.get(`${baseUrl}/${comment.id}`)

    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.status).toBe(200)

    await removeTestDb()
  })

  it("should return comment for an authenticated user", async () => {
    const { apiUser, token, removeTestAuth } = await createTestAuth()
    const { comment, removeTestDb } = await createTestDb(apiUser.id)

    const response = await api
      .get(`${baseUrl}/${comment.id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.id).toBe(comment.id)

    await removeTestDb()
    await removeTestAuth()
  })

  it("should return error 400 when the comment doesn't exist", async () => {
    const response = await api.get(`${baseUrl}/nonExistingCommentId`)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "nonExistingCommentId",
          msg: "The specified comment for the 'id' field does not exist.",
          path: "id",
          location: "params",
        },
      ],
    })
  })
})

describe(`POST ${baseUrl}`, function () {
  it("should respond with json", async () => {
    const response = await api.post(baseUrl).send({})

    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.status).toBe(400)
  })

  it("should return created comment with valid request body", async () => {
    const { user, post, removeTestDb } = await createTestDb()

    const commentToCreate: CreateCommentBody = {
      content: "content",
      userId: user.id,
      postId: post.id,
    }

    const response = await api.post(baseUrl).send(commentToCreate)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        content: expect.any(String),
        userId: expect.any(String),
        postId: expect.any(String),
      })
    )

    await removeTestDb()
  })

  it("should mock creating comment when not authenticated", async () => {
    const { user, post, removeTestDb } = await createTestDb()

    const commentToCreate: CreateCommentBody = {
      content: "content",
      userId: user.id,
      postId: post.id,
    }

    const commentsBefore = await api.get(baseUrl)
    const response = await api.post(baseUrl).send(commentToCreate)

    expect(commentsBefore.status).toBe(200)
    expect(commentsBefore.body.total).toBeDefined()

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()

    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("content")
    expect(response.body).toHaveProperty("userId")
    expect(response.body).toHaveProperty("postId")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")

    const commentsAfter = await api.get(baseUrl)

    expect(commentsAfter.status).toBe(200)
    expect(commentsAfter.body.total).toBeDefined()
    expect(commentsAfter.body.total).toBe(commentsBefore.body.total)

    await removeTestDb()
  })

  it("should save comment when authenticated", async () => {
    const { apiUser, token, removeTestAuth } = await createTestAuth()
    const { user, post, removeTestDb } = await createTestDb(apiUser.id)

    const commentToCreate: CreateCommentBody = {
      content: "content",
      userId: user.id,
      postId: post.id,
    }

    const commentsBefore = await api
      .get(baseUrl)
      .set("Authorization", `Bearer ${token}`)
    const response = await api
      .post(baseUrl)
      .send(commentToCreate)
      .set("Authorization", `Bearer ${token}`)

    expect(commentsBefore.status).toBe(200)
    expect(commentsBefore.body.total).toBeDefined()

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()

    const commentsAfter = await api
      .get(baseUrl)
      .set("Authorization", `Bearer ${token}`)

    expect(commentsAfter.status).toBe(200)
    expect(commentsAfter.body.total).toBeDefined()
    expect(commentsAfter.body.total).toBe(commentsBefore.body.total + 1)

    await removeTestDb()
    await removeTestAuth()
  })

  it("should return error 400 with invalid request body", async () => {
    const commentToCreate: CreateCommentBody = {
      content: "",
      userId: "",
      postId: "",
    }

    const response = await api.post(baseUrl).send(commentToCreate)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
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
        {
          type: "field",
          value: "",
          msg: "The 'postId' field must be a non-empty string.",
          path: "postId",
          location: "body",
        },
      ],
    })
  })

  it("should return error 400 when user doesn't exist", async () => {
    const { post, removeTestDb } = await createTestDb()

    const commentToCreate: CreateCommentBody = {
      content: "content",
      userId: "nonExistingUser",
      postId: post.id,
    }

    const response = await api.post(baseUrl).send(commentToCreate)

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

    removeTestDb()
  })

  it("should return error 400 when post doesn't exist", async () => {
    const { user, removeTestDb } = await createTestDb()

    const commentToCreate: CreateCommentBody = {
      content: "content",
      userId: user.id,
      postId: "nonExistingPost",
    }

    const response = await api.post(baseUrl).send(commentToCreate)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "nonExistingPost",
          msg: "The specified post for the 'postId' field does not exist.",
          path: "postId",
          location: "body",
        },
      ],
    })

    removeTestDb()
  })
})
