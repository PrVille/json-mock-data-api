import supertest from "supertest"
import app from "../../index"
import { createTestUser, deleteTestUser } from "../../utils/testHelpers"
import { SortOrder, SortUsersBy } from "../../typings/enums"

const api = supertest(app)

describe("GET /api/users", function () {
  it("should respond with json", async () => {
    const response = await api.get("/api/users")

    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.status).toBe(200)
  })

  it("should return users with default parameters", async () => {
    const response = await api.get("/api/users")
    const expectedProperties = {
      id: expect.any(String),
      username: expect.any(String),
      email: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
    }

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.data).toBeDefined()
    expect(response.body.data).toContainEqual(
      expect.objectContaining(expectedProperties)
    )
  })

  it("should return users with valid query parameters", async () => {
    const response = await api.get("/api/users").query({
      skip: 2,
      take: 5,
      sortOrder: SortOrder.ASC,
      sortBy: SortUsersBy.USERNAME,
    })

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.data).toHaveLength(5)
    expect(response.body.data[0]).toHaveProperty("id")
    expect(response.body.data[0]).toHaveProperty("username")
    expect(response.body.data[0]).toHaveProperty("email")
  })

  it("should return error 400 with invalid properties", async () => {
    const response = await api.get("/api/users").query({
      skip: "invalidSkip",
      take: "invalidTake",
      sortOrder: "invalidSortOrder",
      sortBy: "invalidSortBy",
      include: "invalidInclude",
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
          msg: "The 'sortBy' field must be one of 'id', 'username', or 'lastName'.",
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

describe("GET /api/users/:id", function () {
  it("should respond with json", async () => {
    const testUser = await createTestUser()
    const response = await api.get(`/api/users/${testUser.id}`)

    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.status).toBe(200)

    await deleteTestUser(testUser.id)
  })

  it("should return error 400 when the user doesn't exist", async () => {
    const response = await api.get("/api/users/nonExistingUserId")

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "nonExistingUserId",
          msg: "The specified user for the 'id' field does not exist.",
          path: "id",
          location: "params",
        },
      ],
    })
  })
})
