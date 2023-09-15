import supertest from "supertest"
import app, { server } from "../../index"
import { createTestAuth } from "../../utils/testHelpers"

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
