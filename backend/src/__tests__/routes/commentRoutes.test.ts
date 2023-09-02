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
import { SortCommentsBy, SortOrder, SortPostsBy } from "../../typings/enums"
import { CreatePostBody, UpdatePostBody } from "../../typings/bodies"

const api = supertest(app)

afterAll(() => {
  server.close()
})

describe("GET /api/comments", function () {
  it("should respond with json", async () => {
    const response = await api.get("/api/comments")

    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.status).toBe(200)
  })

  it("should return comments with default parameters", async () => {
    const response = await api.get("/api/comments")
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
    const response = await api.get("/api/comments")

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.data).toBeDefined()
    expect(response.body.skip).toBeDefined()
    expect(response.body.take).toBeDefined()
    expect(response.body.total).toBeDefined()
  })

  it("should return comments for an authenticated user", async () => {
    const testApiUser = await createTestApiUser()
    const token = createTestTokenForApiUser(testApiUser.id)

    const response = await api
      .get("/api/comments")
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.data).toBeDefined()
    expect(response.body.data).toHaveLength(0)
    expect(response.body.data).toEqual([])

    await deleteTestApiUser(testApiUser.id)
  })

  it("should return comments with valid query parameters", async () => {
    const response = await api.get("/api/comments").query({
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
      const response = await api.get("/api/comments").query({
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
