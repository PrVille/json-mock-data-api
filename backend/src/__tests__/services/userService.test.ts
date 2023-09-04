import userService from "../../services/userService"
import { DEFAULT_API_USER_ID } from "../../utils/config"
import { createTestUser, deleteTestUser } from "../../utils/testHelpers"

describe("userService", () => {
  describe("getUserById", () => {
    it("should return a user by id", async () => {
      const testUser = await createTestUser()
      const result = await userService.getById(testUser.id, DEFAULT_API_USER_ID)

      expect(result).toEqual(
        expect.objectContaining({
          firstName: expect.any(String),
          lastName: expect.any(String),
          username: expect.any(String),
          email: expect.any(String),
        })
      )

      await deleteTestUser(testUser.id)
    })

    it("should return null for invalid user id", async () => {
      const result = await userService.getById("notValidUserId", DEFAULT_API_USER_ID)
      expect(result).toEqual(null)
    })
  })
})
