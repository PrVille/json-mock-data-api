import supertest from "supertest"
import app from "../../index"
import { createTestUser, deleteTestUser } from "../../utils/testHelpers"

const api = supertest(app)

describe("GET /api/users", function () {
  it("should respond with json", async () => {
    const response = await api.get("/api/users")

    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.status).toBe(200)
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
