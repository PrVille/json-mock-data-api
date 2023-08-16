import userService from "../../services/userService"
import { IncludeInUser } from "../../typings/enums"
import { createTestUser, deleteTestUser } from "../../utils/testHelpers"

describe("userService", () => {
  describe("getUserById", () => {
    it("should return a user by id", async () => {
      const testUser = await createTestUser()
      const result = await userService.getUserById(testUser.id, [
        IncludeInUser.POSTS,
      ])

      expect(result).toEqual(
        expect.objectContaining({
          firstName: expect.any(String),
          lastName: expect.any(String),
          username: expect.any(String),
          email: expect.any(String),
          posts: expect.any(Object),
        })
      )

      await deleteTestUser(testUser.id)
    })

    it("should return null for invalid user id", async () => {
      const result = await userService.getUserById("notValidUserId", [])
      expect(result).toEqual(null)
    })
  })
})
