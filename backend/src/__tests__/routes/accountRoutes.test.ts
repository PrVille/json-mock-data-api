import supertest from "supertest"
import app, { server } from "../../index"
import { createTestAuth } from "../../utils/testHelpers"
import { faker } from "@faker-js/faker"

const api = supertest(app)
const baseUrl = "/api/account"

afterAll(() => {
  server.close()
})

describe(`DELETE ${baseUrl}/:id`, () => {
  it("should respond with json", async () => {
    const { apiUser, removeTestAuth } = await createTestAuth()

    const response = await api.delete(`${baseUrl}/${apiUser.id}`)

    expect(response.headers["content-type"]).toMatch(/application\/json/)

    await removeTestAuth()
  })

  it("should return error 401 if missing auth", async () => {
    const response = await api.delete(`${baseUrl}/id`)

    expect(response.status).toBe(401)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "auth",
          msg: "Missing token.",
        },
      ],
    })
  })

  it("should return error 401 if invalid auth", async () => {
    const response = await api
      .delete(`${baseUrl}/id`)
      .set("Authorization", `Bearer invalidToken`)

    expect(response.status).toBe(401)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "auth",
          msg: "Invalid token.",
          value: "invalidToken",
        },
      ],
    })
  })

  it("should return error 400 when the apiUser doesn't exist", async () => {
    const { token, removeTestAuth } = await createTestAuth()

    const response = await api
      .delete(`${baseUrl}/nonExistingId`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "nonExistingId",
          msg: "The specified apiUser for the 'id' field does not exist.",
          path: "id",
          location: "params",
        },
      ],
    })

    await removeTestAuth()
  })

  it("should delete apiUser when authenticated", async () => {
    const { apiUser, token } = await createTestAuth()

    const response = await api
      .delete(`${baseUrl}/${apiUser.id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")
  })
})

describe(`GET ${baseUrl}/:id/resources`, () => {
  it("should respond with json", async () => {
    const { apiUser, removeTestAuth } = await createTestAuth()

    const response = await api.get(`${baseUrl}/${apiUser.id}/resources`)

    expect(response.headers["content-type"]).toMatch(/application\/json/)

    await removeTestAuth()
  })

  it("should return error 401 if missing auth", async () => {
    const response = await api.get(`${baseUrl}/id/resources`)

    expect(response.status).toBe(401)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "auth",
          msg: "Missing token.",
        },
      ],
    })
  })

  it("should return error 401 if invalid auth", async () => {
    const response = await api
      .get(`${baseUrl}/id/resources`)
      .set("Authorization", `Bearer invalidToken`)

    expect(response.status).toBe(401)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "auth",
          msg: "Invalid token.",
          value: "invalidToken",
        },
      ],
    })
  })

  it("should return error 400 when the apiUser doesn't exist", async () => {
    const { token, removeTestAuth } = await createTestAuth()

    const response = await api
      .get(`${baseUrl}/nonExistingId/resources`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "nonExistingId",
          msg: "The specified apiUser for the 'id' field does not exist.",
          path: "id",
          location: "params",
        },
      ],
    })

    await removeTestAuth()
  })

  it("should return resources when authenticated", async () => {
    const { apiUser, token, removeTestAuth } = await createTestAuth()

    const response = await api
      .get(`${baseUrl}/${apiUser.id}/resources`)
      .set("Authorization", `Bearer ${token}`)

    const expectedProperties = {
      name: expect.any(String),
      count: expect.any(Number),
    }

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.resources).toBeDefined()
    expect(response.body.resources).toContainEqual(
      expect.objectContaining(expectedProperties)
    )

    await removeTestAuth()
  })
})

describe(`DELETE ${baseUrl}/:id/resources`, () => {
  it("should respond with json", async () => {
    const { apiUser, removeTestAuth } = await createTestAuth()

    const response = await api.delete(`${baseUrl}/${apiUser.id}/resources`)

    expect(response.headers["content-type"]).toMatch(/application\/json/)

    await removeTestAuth()
  })

  it("should return error 401 if missing auth", async () => {
    const response = await api.delete(`${baseUrl}/id/resources`)

    expect(response.status).toBe(401)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "auth",
          msg: "Missing token.",
        },
      ],
    })
  })

  it("should return error 401 if invalid auth", async () => {
    const response = await api
      .delete(`${baseUrl}/id/resources`)
      .set("Authorization", `Bearer invalidToken`)

    expect(response.status).toBe(401)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "auth",
          msg: "Invalid token.",
          value: "invalidToken",
        },
      ],
    })
  })

  it("should return error 400 when the apiUser doesn't exist", async () => {
    const { token, removeTestAuth } = await createTestAuth()

    const response = await api
      .delete(`${baseUrl}/nonExistingId/resources`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "nonExistingId",
          msg: "The specified apiUser for the 'id' field does not exist.",
          path: "id",
          location: "params",
        },
      ],
    })

    await removeTestAuth()
  })

  it("should delete resources when authenticated", async () => {
    const { apiUser, token, removeTestAuth } = await createTestAuth()

    const response = await api
      .delete(`${baseUrl}/${apiUser.id}/resources`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      users: { count: 0 },
      posts: { count: 0 },
      comments: { count: 0 },
    })

    await removeTestAuth()
  })
})

describe(`POST ${baseUrl}/:id/resources`, () => {
  it("should respond with json", async () => {
    const { apiUser, removeTestAuth } = await createTestAuth()

    const response = await api.post(`${baseUrl}/${apiUser.id}/resources`)

    expect(response.headers["content-type"]).toMatch(/application\/json/)

    await removeTestAuth()
  })

  it("should return error 401 if missing auth", async () => {
    const response = await api.post(`${baseUrl}/id/resources`)

    expect(response.status).toBe(401)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "auth",
          msg: "Missing token.",
        },
      ],
    })
  })

  it("should return error 401 if invalid auth", async () => {
    const response = await api
      .post(`${baseUrl}/id/resources`)
      .set("Authorization", `Bearer invalidToken`)

    expect(response.status).toBe(401)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "auth",
          msg: "Invalid token.",
          value: "invalidToken",
        },
      ],
    })
  })

  it("should return error 400 when the apiUser doesn't exist", async () => {
    const { token, removeTestAuth } = await createTestAuth()

    const response = await api
      .post(`${baseUrl}/nonExistingId/resources`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "nonExistingId",
          msg: "The specified apiUser for the 'id' field does not exist.",
          path: "id",
          location: "params",
        },
      ],
    })

    await removeTestAuth()
  })

  it("should reset resources when authenticated", async () => {
    const { apiUser, token, removeTestAuth } = await createTestAuth()

    const response = await api
      .post(`${baseUrl}/${apiUser.id}/resources`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      deleted: {
        users: { count: 0 },
        posts: { count: 0 },
        comments: { count: 0 },
      },
      created: {
        users: 10,
        posts: 100,
        comments: 250,
      },
    })

    await removeTestAuth()
  })
})

describe.only(`POST ${baseUrl}/:id/update/email`, () => {
  it("should respond with json", async () => {
    const { apiUser, removeTestAuth } = await createTestAuth()

    const response = await api.post(`${baseUrl}/${apiUser.id}/update/email`)

    expect(response.headers["content-type"]).toMatch(/application\/json/)

    await removeTestAuth()
  })

  it("should return error 401 if missing auth", async () => {
    const response = await api.post(`${baseUrl}/id/update/email`)

    expect(response.status).toBe(401)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "auth",
          msg: "Missing token.",
        },
      ],
    })
  })

  it("should return error 401 if invalid auth", async () => {
    const response = await api
      .post(`${baseUrl}/id/update/email`)
      .set("Authorization", `Bearer invalidToken`)

    expect(response.status).toBe(401)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "auth",
          msg: "Invalid token.",
          value: "invalidToken",
        },
      ],
    })
  })

  it("should return error 400 when the apiUser doesn't exist", async () => {
    const { token, removeTestAuth } = await createTestAuth()

    const newEmail = {
      email: `${faker.string.uuid()}@${faker.string.uuid()}.com`,
    }

    const response = await api
      .post(`${baseUrl}/nonExistingId/update/email`)
      .send(newEmail)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "nonExistingId",
          msg: "The specified apiUser for the 'id' field does not exist.",
          path: "id",
          location: "params",
        },
      ],
    })

    await removeTestAuth()
  })

  it("should return error 400 with invalid request body", async () => {
    const { apiUser, token, removeTestAuth } = await createTestAuth()

    const response = await api
      .post(`${baseUrl}/${apiUser.id}/update/email`)
      .send({ email: "" })
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "",
          msg: "The 'email' field must be a valid e-mail address.",
          path: "email",
          location: "body",
        },
      ],
    })

    await removeTestAuth()
  })

  it("should return error 400 when email is already in use", async () => {
    const { apiUser, token, removeTestAuth } = await createTestAuth()

    const response = await api
      .post(`${baseUrl}/${apiUser.id}/update/email`)
      .send({ email: apiUser.email })
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: apiUser.email,
          msg: "The specified email for the 'email' field is already in use.",
          path: "email",
          location: "body",
        },
      ],
    })

    await removeTestAuth()
  })

  it("should update email when authenticated with valid email", async () => {
    const { apiUser, token, removeTestAuth } = await createTestAuth()

    const newEmail = {
      email: `${faker.string.uuid()}@${faker.string.uuid()}.com`,
    }

    const response = await api
      .post(`${baseUrl}/${apiUser.id}/update/email`)
      .send(newEmail)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      ...newEmail,
      id: apiUser.id,
      token: apiUser.token,
      createdAt: apiUser.createdAt.toISOString(),
      updatedAt: expect.any(String),
    })

    await removeTestAuth()
  })
})
