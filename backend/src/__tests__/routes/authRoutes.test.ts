import supertest from "supertest"
import app, { server } from "../../index"
import { deleteTestApiUser } from "../../utils/testHelpers"
import { faker } from "@faker-js/faker"

const api = supertest(app)

afterAll(() => {
  server.close()
})

describe("POST /api/auth/signup", () => {
  it("should respond with json", async () => {
    const userCredentials = {
      email: faker.string.uuid() + "@test.com",
      password: "testpassword",
    }

    const response = await api.post("/api/auth/signup").send(userCredentials)

    expect(response.headers["content-type"]).toMatch(/application\/json/)
    expect(response.status).toBe(200)

    await deleteTestApiUser(response.body.id)
  })

  it("should create a new API user", async () => {
    const userCredentials = {
      email: faker.string.uuid() + "@test.com",
      password: "testpassword",
    }

    const response = await api.post("/api/auth/signup").send(userCredentials)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("id")
    expect(response.body.email).toBe(userCredentials.email)

    await deleteTestApiUser(response.body.id)
  })

  it("should return error 400 with invalid request body", async () => {
    const invalidCredentials = {
      email: "invalid-email",
      password: "123",
    }

    const response = await api.post("/api/auth/signup").send(invalidCredentials)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "invalid-email",
          msg: "The 'email' field must be a valid e-mail address.",
          path: "email",
          location: "body",
        },
        {
          type: "field",
          value: "123",
          msg: "The 'password' field must be at least 5 characters long.",
          path: "password",
          location: "body",
        },
      ],
    })
  })

  it("should return error 400 when email is already in use", async () => {
    const userCredentials = {
      email: faker.string.uuid() + "@test.com",
      password: "testpassword",
    }

    await api.post("/api/auth/signup").send(userCredentials)
    const response = await api.post("/api/auth/signup").send(userCredentials)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: 'field',
          value: userCredentials.email,
          msg: "The specified email for the 'email' field is already in use.",
          path: 'email',
          location: 'body'
        }
      ]
    })
  })
})

describe("POST /api/auth/login", () => {
  it("should log in an existing API user with valid credentials", async () => {
    const userCredentials = {
      email: faker.string.uuid() + "@test.com",
      password: "testpassword",
    }

    const responseSignUp = await api
      .post("/api/auth/signup")
      .send(userCredentials)
    const response = await api.post("/api/auth/login").send(userCredentials)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("token")
    expect(response.body).toHaveProperty("email", userCredentials.email)

    await deleteTestApiUser(responseSignUp.body.id)
  })

  it("should return error 400 with invalid request body", async () => {
    const invalidCredentials = {
      email: "invalid-email",
      password: "123",
    }

    const response = await api.post("/api/auth/login").send(invalidCredentials)

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "invalid-email",
          msg: "The 'email' field must be a valid e-mail address.",
          path: "email",
          location: "body",
        },
      ],
    })
  })

  it("should return error 400 when email doesn't exist", async () => {
    const response = await api.post("/api/auth/login").send({
      email: "nonExisting@email.com",
      password: "testpassword",
    })

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "nonExisting@email.com",
          msg: "The specified user for the 'email' field does not exist.",
          path: "email",
          location: "body",
        },
      ],
    })
  })

  it("should return error 400 when password is wrong", async () => {
    const userCredentials = {
      email: faker.string.uuid() + "@test.com",
      password: "testpassword",
    }

    const responseSignUp = await api
      .post("/api/auth/signup")
      .send(userCredentials)

    const response = await api
      .post("/api/auth/login")
      .send({ ...userCredentials, password: "wrongPassword" })

    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      errors: [
        {
          type: "field",
          value: "wrongPassword",
          msg: "The specified password for the 'password' field is incorrect.",
          path: "password",
          location: "body",
        },
      ],
    })

    await deleteTestApiUser(responseSignUp.body.id)
  })
})
