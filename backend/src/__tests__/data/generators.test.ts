import {
  generateFakeUser,
  generateFakeUsers,
  generateFakePostWithoutUser,
  generateFakePostsWithoutUser,
} from "../../data/generators"

describe("generators", () => {
  describe("generateFakeUser", () => {
    it("should generate a fake user object", () => {
      const fakeUser = generateFakeUser()
      expect(fakeUser).toEqual(
        expect.objectContaining({
          firstName: expect.any(String),
          lastName: expect.any(String),
          username: expect.any(String),
          email: expect.any(String),
        })
      )
    })
  })

  describe("generateFakeUsers", () => {
    it("should generate an array of fake users", () => {
      const amount = 5
      const fakeUsers = generateFakeUsers(amount)
      expect(fakeUsers).toHaveLength(amount)
      fakeUsers.forEach((fakeUser) => {
        expect(fakeUser).toEqual(
          expect.objectContaining({
            firstName: expect.any(String),
            lastName: expect.any(String),
            username: expect.any(String),
            email: expect.any(String),
          })
        )
      })
    })
  })

  describe("generateFakePostWithoutUser", () => {
    it("should generate a fake post object without user", () => {
      const fakePost = generateFakePostWithoutUser()
      expect(fakePost).toEqual(
        expect.objectContaining({
          title: expect.any(String),
          content: expect.any(String),
        })
      )
    })
  })

  describe("generateFakePostsWithoutUser", () => {
    it("should generate an array of fake posts without user", () => {
      const amount = 5
      const fakePosts = generateFakePostsWithoutUser(amount)
      expect(fakePosts).toHaveLength(amount)
      fakePosts.forEach((fakePost) => {
        expect(fakePost).toEqual(
          expect.objectContaining({
            title: expect.any(String),
            content: expect.any(String),
          })
        )
      })
    })
  })
})
