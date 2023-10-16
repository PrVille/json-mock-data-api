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
import {
  SortCommentsBy,
  SortOrder,
  SortPostsBy,
  SortUsersBy,
} from "../../typings/enums"
import { CreateUserBody, UpdateUserBody } from "../../typings/bodies"
import { faker } from "@faker-js/faker"

const api = supertest(app)
const baseUrl = "/api/users"

afterAll(() => {
  server.close()
})

//TODO: Refactor
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

  it("should return meta data with users", async () => {
    const response = await api.get("/api/users")

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.data).toBeDefined()
    expect(response.body.skip).toBeDefined()
    expect(response.body.take).toBeDefined()
    expect(response.body.total).toBeDefined()
  })

  it("should return users for an authenticated user", async () => {
    const testApiUser = await createTestApiUser()
    const token = createTestTokenForApiUser(testApiUser.id)

    const response = await api
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.data).toBeDefined()
    expect(response.body.data).toHaveLength(0)
    expect(response.body.data).toEqual([])

    await deleteTestApiUser(testApiUser.id)
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
          msg: "The 'sortBy' field must be one of 'id', 'username', 'email', 'firstName', 'lastName', 'age', 'jobTitle', 'bio', 'country', 'height', 'weight', 'updatedAt' or 'createdAt'.",
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

//TODO: Refactor
describe("GET /api/users/:id", function () {
  it("should respond with json", async () => {
    const testUser = await createTestUser()
    const response = await api.get(`/api/users/${testUser.id}`)

    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.status).toBe(200)

    await deleteTestUser(testUser.id)
  })

  it("should return user for an authenticated user", async () => {
    const testApiUser = await createTestApiUser()
    const testUser = await createTestUser(testApiUser.id)
    const token = createTestTokenForApiUser(testApiUser.id)

    const response = await api
      .get(`/api/users/${testUser.id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.id).toBe(testUser.id)

    await deleteTestUser(testUser.id)
    await deleteTestApiUser(testApiUser.id)
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

//TODO: Refactor
describe("GET /api/users/:id/posts", function () {
  it("should respond with json", async () => {
    const testUser = await createTestUser()
    const response = await api.get(`/api/users/${testUser.id}/posts`)

    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.status).toBe(200)

    await deleteTestUser(testUser.id)
  })

  it("should return error 400 when the user doesn't exist", async () => {
    const response = await api.get("/api/users/nonExistingUserId/posts")

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

  it("should return posts for user with default parameters", async () => {
    const testUser = await createTestUser()
    const testPost = await createTestPost(testUser.id)
    const response = await api.get(`/api/users/${testUser.id}/posts`)
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

    await deleteTestPost(testPost.id)
    await deleteTestUser(testUser.id)
  })

  it("should return meta data with posts for user", async () => {
    const testUser = await createTestUser()
    const response = await api.get(`/api/users/${testUser.id}/posts`)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.data).toBeDefined()
    expect(response.body.skip).toBeDefined()
    expect(response.body.take).toBeDefined()
    expect(response.body.total).toBeDefined()

    await deleteTestUser(testUser.id)
  })

  it("should return posts for user for an authenticated user", async () => {
    const testApiUser = await createTestApiUser()
    const testUser = await createTestUser(testApiUser.id)
    const token = createTestTokenForApiUser(testApiUser.id)

    const response = await api
      .get(`/api/users/${testUser.id}/posts`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.data).toBeDefined()
    expect(response.body.data).toHaveLength(0)
    expect(response.body.data).toEqual([])

    await deleteTestUser(testUser.id)
    await deleteTestApiUser(testApiUser.id)
  })

  it("should return posts with valid query parameters", async () => {
    const testUser = await createTestUser()
    const testPost = await createTestPost(testUser.id)
    const response = await api.get(`/api/users/${testUser.id}/posts`).query({
      skip: 0,
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
    expect(response.body.data).toHaveLength(1)
    expect(response.body.data).toContainEqual(
      expect.objectContaining(expectedProperties)
    )

    await deleteTestPost(testPost.id)
    await deleteTestUser(testUser.id)
  })

  it("should return error 400 with invalid properties", async () => {
    const testUser = await createTestUser()

    const response = await api.get(`/api/users/${testUser.id}/posts`).query({
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

    await deleteTestUser(testUser.id)
  })
})

describe(`GET ${baseUrl}/:id/comments`, function () {
  it("should respond with json", async () => {
    const { user, removeTestDb } = await createTestDb()

    const response = await api.get(`${baseUrl}/${user.id}/comments`)

    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.status).toBe(200)

    await removeTestDb()
  })

  it("should return error 400 when the user doesn't exist", async () => {
    const response = await api.get(`${baseUrl}/nonExistingId/comments`)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "nonExistingId",
          msg: "The specified user for the 'id' field does not exist.",
          path: "id",
          location: "params",
        },
      ],
    })
  })

  it("should return comments for user with default parameters", async () => {
    const { user, removeTestDb } = await createTestDb()

    const response = await api.get(`${baseUrl}/${user.id}/comments`)

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

  it("should return meta data with commnets for user", async () => {
    const { user, removeTestDb } = await createTestDb()
    const response = await api.get(`${baseUrl}/${user.id}/comments`)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.data).toBeDefined()
    expect(response.body.skip).toBeDefined()
    expect(response.body.take).toBeDefined()
    expect(response.body.total).toBeDefined()

    await removeTestDb()
  })

  it("should return comments for user for an authenticated user", async () => {
    const { apiUser, token, removeTestAuth } = await createTestAuth()
    const { user, removeTestDb } = await createTestDb(apiUser.id)

    const response = await api
      .get(`${baseUrl}/${user.id}/comments`)
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
    const { user, removeTestDb } = await createTestDb()

    const response = await api.get(`${baseUrl}/${user.id}/comments`).query({
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
    const { user, removeTestDb } = await createTestDb()

    const response = await api.get(`${baseUrl}/${user.id}/comments`).query({
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

//TODO: Refactor
describe("POST /api/users", function () {
  it("should respond with json", async () => {
    const response = await api.post("/api/users").send({})

    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.status).toBe(400)
  })

  it("should return created user with valid request body", async () => {
    const userToCreate: CreateUserBody = {
      email: faker.string.uuid() + "@email.com",
      username: faker.string.uuid(),
      firstName: "firstName",
      lastName: "lastName",
    }

    const response = await api.post("/api/users").send(userToCreate)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        username: expect.any(String),
        email: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
      })
    )
  })

  it("should mock creating user when not authenticated", async () => {
    const userToCreate: CreateUserBody = {
      email: faker.string.uuid() + "@email.com",
      username: faker.string.uuid(),
      firstName: "firstName",
      lastName: "lastName",
    }

    const usersBefore = await api.get("/api/users")
    const response = await api.post("/api/users").send(userToCreate)

    expect(usersBefore.status).toBe(200)
    expect(usersBefore.body.total).toBeDefined()

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()

    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("username")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("firstName")
    expect(response.body).toHaveProperty("lastName")
    expect(response.body).toHaveProperty("age")
    expect(response.body).toHaveProperty("imageUrl")
    expect(response.body).toHaveProperty("jobTitle")
    expect(response.body).toHaveProperty("bio")
    expect(response.body).toHaveProperty("country")
    expect(response.body).toHaveProperty("height")
    expect(response.body).toHaveProperty("weight")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")

    const usersAfter = await api.get("/api/users")

    expect(usersAfter.status).toBe(200)
    expect(usersAfter.body.total).toBeDefined()
    expect(usersAfter.body.total).toBe(usersBefore.body.total)
  })

  it("should save user when authenticated", async () => {
    const testApiUser = await createTestApiUser()
    const token = createTestTokenForApiUser(testApiUser.id)

    const userToCreate: CreateUserBody = {
      email: faker.string.uuid() + "@email.com",
      username: faker.string.uuid(),
      firstName: "firstName",
      lastName: "lastName",
    }

    const usersBefore = await api
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`)
    const response = await api
      .post("/api/users")
      .send(userToCreate)
      .set("Authorization", `Bearer ${token}`)

    expect(usersBefore.status).toBe(200)
    expect(usersBefore.body.total).toBeDefined()

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()

    const usersAfter = await api
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`)

    expect(usersAfter.status).toBe(200)
    expect(usersAfter.body.total).toBeDefined()
    expect(usersAfter.body.total).toBe(usersBefore.body.total + 1)

    await deleteTestApiUser(testApiUser.id)
  })

  it("should return error 400 with invalid request body", async () => {
    const userToCreate: CreateUserBody = {
      email: "invalidEmail",
      username: "",
      firstName: "",
      lastName: "",
      age: -1,
      imageUrl: "invalidUrl",
    }

    const response = await api.post("/api/users").send(userToCreate)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "invalidEmail",
          msg: "The 'email' field must be a valid e-mail address.",
          path: "email",
          location: "body",
        },
        {
          type: "field",
          value: "",
          msg: "The 'username' field must be at least 3 characters long.",
          path: "username",
          location: "body",
        },
        {
          type: "field",
          value: "",
          msg: "The 'firstName' field must be a non-empty string.",
          path: "firstName",
          location: "body",
        },
        {
          type: "field",
          value: "",
          msg: "The 'lastName' field must be a non-empty string.",
          path: "lastName",
          location: "body",
        },
        {
          type: "field",
          value: -1,
          msg: "The 'age' field must be an integer greater than or equal to 0.",
          path: "age",
          location: "body",
        },
        {
          type: "field",
          value: "invalidUrl",
          msg: "The 'imageUrl' field must be a valid URL.",
          path: "imageUrl",
          location: "body",
        },
      ],
    })
  })

  it("should return error 400 with existing email", async () => {
    const testUser = await createTestUser()

    const userToCreate: CreateUserBody = {
      email: testUser.email,
      username: faker.string.uuid(),
      firstName: "firstName",
      lastName: "lastName",
    }

    const response = await api.post("/api/users").send(userToCreate)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: testUser.email,
          msg: "The specified email for the 'email' field is already in use.",
          path: "email",
          location: "body",
        },
      ],
    })

    await deleteTestUser(testUser.id)
  })

  it("should return error 400 with existing username", async () => {
    const testUser = await createTestUser()

    const userToCreate: CreateUserBody = {
      email: faker.string.uuid() + "@email.com",
      username: testUser.username,
      firstName: "firstName",
      lastName: "lastName",
    }

    const response = await api.post("/api/users").send(userToCreate)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: testUser.username,
          msg: "The specified username for the 'username' field is already in use.",
          path: "username",
          location: "body",
        },
      ],
    })

    await deleteTestUser(testUser.id)
  })
})

//TODO: Refactor
describe("PUT /api/users/:id", function () {
  it("should respond with json", async () => {
    const testUser = await createTestUser()
    const updatedUserData: UpdateUserBody = {
      firstName: "UpdatedFirstName",
      lastName: "UpdatedLastName",
    }

    const response = await api
      .put(`/api/users/${testUser.id}`)
      .send(updatedUserData)

    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.status).toBe(200)

    await deleteTestUser(testUser.id)
  })

  it("should return error 400 when the user doesn't exist", async () => {
    const nonExistingUserId = "nonExistingUserId"
    const updatedUserData: UpdateUserBody = {
      firstName: "UpdatedFirstName",
      lastName: "UpdatedLastName",
    }

    const response = await api
      .put(`/api/users/${nonExistingUserId}`)
      .send(updatedUserData)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: nonExistingUserId,
          msg: "The specified user for the 'id' field does not exist.",
          path: "id",
          location: "params",
        },
      ],
    })
  })

  it("should return updated user with valid request body", async () => {
    const testUser = await createTestUser()
    const updatedUserData: UpdateUserBody = {
      firstName: "UpdatedFirstName",
      lastName: "UpdatedLastName",
    }

    const response = await api
      .put(`/api/users/${testUser.id}`)
      .send(updatedUserData)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual(
      expect.objectContaining({
        id: testUser.id,
        username: testUser.username,
        email: testUser.email,
        firstName: updatedUserData.firstName,
        lastName: updatedUserData.lastName,
      })
    )

    await deleteTestUser(testUser.id)
  })

  it("should mock updating user when not authenticated", async () => {
    const testUser = await createTestUser()
    const updatedUserData: UpdateUserBody = {
      firstName: "UpdatedFirstName",
      lastName: "UpdatedLastName",
    }

    const response = await api
      .put(`/api/users/${testUser.id}`)
      .send(updatedUserData)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()

    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("username")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("firstName")
    expect(response.body).toHaveProperty("lastName")
    expect(response.body).toHaveProperty("age")
    expect(response.body).toHaveProperty("imageUrl")
    expect(response.body).toHaveProperty("jobTitle")
    expect(response.body).toHaveProperty("bio")
    expect(response.body).toHaveProperty("country")
    expect(response.body).toHaveProperty("height")
    expect(response.body).toHaveProperty("weight")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")

    expect(response.body.id).toBe(testUser.id)
    expect(response.body.firstName).toBe(updatedUserData.firstName)
    expect(response.body.lastName).toBe(updatedUserData.lastName)

    const testUserAfter = await api.get(`/api/users/${testUser.id}`)

    expect(testUserAfter.status).toBe(200)
    expect(testUserAfter.body).toBeDefined()
    expect(testUserAfter.body.id).toBe(testUser.id)
    expect(testUserAfter.body.firstName).toBe(testUser.firstName)
    expect(testUserAfter.body.lastName).toBe(testUser.lastName)

    await deleteTestUser(testUser.id)
  })

  it("should mock updating user correctly when request body is empty", async () => {
    const { user, removeTestDb } = await createTestDb()

    const updatedData: UpdateUserBody = {}

    const response = await api.put(`${baseUrl}/${user.id}`).send(updatedData)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()

    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("username")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("firstName")
    expect(response.body).toHaveProperty("lastName")
    expect(response.body).toHaveProperty("age")
    expect(response.body).toHaveProperty("imageUrl")
    expect(response.body).toHaveProperty("jobTitle")
    expect(response.body).toHaveProperty("bio")
    expect(response.body).toHaveProperty("country")
    expect(response.body).toHaveProperty("height")
    expect(response.body).toHaveProperty("weight")

    expect(response.body.id).toBe(user.id)
    expect(response.body.username).toBe(user.username)
    expect(response.body.email).toBe(user.email)
    expect(response.body.firstName).toBe(user.firstName)
    expect(response.body.lastName).toBe(user.lastName)
    expect(response.body.age).toBe(user.age)
    expect(response.body.imageUrl).toBe(user.imageUrl)
    expect(response.body.jobTitle).toBe(user.jobTitle)
    expect(response.body.bio).toBe(user.bio)
    expect(response.body.country).toBe(user.country)
    expect(response.body.height).toBe(user.height)
    expect(response.body.weight).toBe(user.weight)

    await removeTestDb()
  })

  it("should save updated user when authenticated", async () => {
    const testApiUser = await createTestApiUser()
    const token = createTestTokenForApiUser(testApiUser.id)

    const testUser = await createTestUser(testApiUser.id)
    const updatedUserData: UpdateUserBody = {
      firstName: "UpdatedFirstName",
      lastName: "UpdatedLastName",
    }

    const response = await api
      .put(`/api/users/${testUser.id}`)
      .send(updatedUserData)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()

    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("username")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("firstName")
    expect(response.body).toHaveProperty("lastName")
    expect(response.body).toHaveProperty("age")
    expect(response.body).toHaveProperty("imageUrl")
    expect(response.body).toHaveProperty("jobTitle")
    expect(response.body).toHaveProperty("bio")
    expect(response.body).toHaveProperty("country")
    expect(response.body).toHaveProperty("height")
    expect(response.body).toHaveProperty("weight")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")

    expect(response.body.id).toBe(testUser.id)
    expect(response.body.firstName).toBe(updatedUserData.firstName)
    expect(response.body.lastName).toBe(updatedUserData.lastName)

    const testUserAfter = await api
      .get(`/api/users/${testUser.id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(testUserAfter.status).toBe(200)
    expect(testUserAfter.body).toBeDefined()
    expect(testUserAfter.body.id).toBe(testUser.id)
    expect(testUserAfter.body.firstName).toBe(updatedUserData.firstName)
    expect(testUserAfter.body.lastName).toBe(updatedUserData.lastName)

    await deleteTestUser(testUser.id)
    await deleteTestApiUser(testApiUser.id)
  })

  it("should return error 400 with invalid request body", async () => {
    const testUser = await createTestUser()
    const updatedUserData: UpdateUserBody = {
      email: "invalidEmail",
      username: "",
      firstName: "",
      lastName: "",
      age: -1,
      imageUrl: "invalidUrl",
    }

    const response = await api
      .put(`/api/users/${testUser.id}`)
      .send(updatedUserData)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "invalidEmail",
          msg: "The 'email' field must be a valid e-mail address.",
          path: "email",
          location: "body",
        },
        {
          type: "field",
          value: "",
          msg: "The 'username' field must be at least 3 characters long.",
          path: "username",
          location: "body",
        },
        {
          type: "field",
          value: "",
          msg: "The 'firstName' field must be a non-empty string.",
          path: "firstName",
          location: "body",
        },
        {
          type: "field",
          value: "",
          msg: "The 'lastName' field must be a non-empty string.",
          path: "lastName",
          location: "body",
        },
        {
          type: "field",
          value: -1,
          msg: "The 'age' field must be an integer greater than or equal to 0.",
          path: "age",
          location: "body",
        },
        {
          type: "field",
          value: "invalidUrl",
          msg: "The 'imageUrl' field must be a valid URL.",
          path: "imageUrl",
          location: "body",
        },
      ],
    })

    await deleteTestUser(testUser.id)
  })

  it("should return error 400 with existing email", async () => {
    const testUser = await createTestUser()
    const testUser2 = await createTestUser()

    const updatedUserData: UpdateUserBody = {
      email: testUser2.email,
    }

    const response = await api
      .put(`/api/users/${testUser.id}`)
      .send(updatedUserData)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: testUser2.email,
          msg: "The specified email for the 'email' field is already in use.",
          path: "email",
          location: "body",
        },
      ],
    })

    await deleteTestUser(testUser.id)
    await deleteTestUser(testUser2.id)
  })

  it("should return error 400 with existing username", async () => {
    const testUser = await createTestUser()
    const testUser2 = await createTestUser()

    const updatedUserData: UpdateUserBody = {
      username: testUser2.username,
    }

    const response = await api
      .put(`/api/users/${testUser.id}`)
      .send(updatedUserData)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: testUser2.username,
          msg: "The specified username for the 'username' field is already in use.",
          path: "username",
          location: "body",
        },
      ],
    })

    await deleteTestUser(testUser.id)
    await deleteTestUser(testUser2.id)
  })
})

//TODO: Refactor
describe("DELETE /api/users/:id", function () {
  it("should respond with json", async () => {
    const testUser = await createTestUser()
    const response = await api.delete(`/api/users/${testUser.id}`)

    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.status).toBe(200)
  })

  it("should return error 400 when the user doesn't exist", async () => {
    const response = await api.delete("/api/users/nonExistingUserId")

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

  it("should mock deleting user when not authenticated", async () => {
    const testUser = await createTestUser()

    const usersBefore = await api.get("/api/users")
    const response = await api.delete(`/api/users/${testUser.id}`)

    expect(usersBefore.status).toBe(200)
    expect(usersBefore.body.total).toBeDefined()

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()

    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("username")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("firstName")
    expect(response.body).toHaveProperty("lastName")
    expect(response.body).toHaveProperty("age")
    expect(response.body).toHaveProperty("imageUrl")
    expect(response.body).toHaveProperty("jobTitle")
    expect(response.body).toHaveProperty("bio")
    expect(response.body).toHaveProperty("country")
    expect(response.body).toHaveProperty("height")
    expect(response.body).toHaveProperty("weight")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")

    const usersAfter = await api.get("/api/users")

    expect(usersAfter.status).toBe(200)
    expect(usersAfter.body.total).toBeDefined()
    expect(usersAfter.body.total).toBe(usersBefore.body.total)

    await deleteTestUser(testUser.id)
  })

  it("should delete user when authenticated", async () => {
    const testApiUser = await createTestApiUser()
    const token = createTestTokenForApiUser(testApiUser.id)
    const testUser = await createTestUser(testApiUser.id)

    const usersBefore = await api
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`)

    const response = await api
      .delete(`/api/users/${testUser.id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(usersBefore.status).toBe(200)
    expect(usersBefore.body.total).toBeDefined()

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()

    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("username")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("firstName")
    expect(response.body).toHaveProperty("lastName")
    expect(response.body).toHaveProperty("age")
    expect(response.body).toHaveProperty("imageUrl")
    expect(response.body).toHaveProperty("jobTitle")
    expect(response.body).toHaveProperty("bio")
    expect(response.body).toHaveProperty("country")
    expect(response.body).toHaveProperty("height")
    expect(response.body).toHaveProperty("weight")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")

    const usersAfter = await api
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`)

    expect(usersAfter.status).toBe(200)
    expect(usersAfter.body.total).toBeDefined()
    expect(usersAfter.body.total).toBe(usersBefore.body.total - 1)

    await deleteTestApiUser(testApiUser.id)
  })
})
