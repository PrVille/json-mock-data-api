import supertest from "supertest"
import app from "../../index"
import { createTestUser, deleteTestUser } from "../../utils/testHelpers"
import { SortOrder, SortUsersBy } from "../../typings/enums"
import { CreateUserBody, UpdateUserBody } from "../../typings/bodies"
import { faker } from "@faker-js/faker"

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
          msg: "The 'sortBy' field must be one of 'id', 'username', 'email', 'firstName', 'lastName', 'age', 'updatedAt' or 'createdAt'.",
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

    await deleteTestUser(response.body.id)
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
})
