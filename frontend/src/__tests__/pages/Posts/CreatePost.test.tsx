import { describe, it, expect } from "vitest"
import { userEvent, render } from "../../../testUtils"

import CreatePost from "../../../pages/Posts/CreatePost"

describe("CreatePost", async () => {
  it("should render correctly", async () => {
    const { container } = render(<CreatePost />)

    const titleElements = container.querySelectorAll("h1")
    const expectedTitles = ["Create a post"]

    for (const titleElement of titleElements) {
      expect(
        expectedTitles.includes(titleElement.textContent || "")
      ).toBeTruthy()
    }

    const subtitleElements = container.querySelectorAll("h5")
    const expectedSubtitles = ["Body parameters", "Returns"]

    for (const subtitleElement of subtitleElements) {
      expect(
        expectedSubtitles.includes(subtitleElement.textContent || "")
      ).toBeTruthy()
    }

    const codeboxElements = container.querySelectorAll("h6")
    const expectedCodeboxes = ["Response", "POST/api/posts"]

    for (const codeboxElement of codeboxElements) {
      expect(
        expectedCodeboxes.includes(codeboxElement.textContent || "")
      ).toBeTruthy()
    }
  })

  it("should copy correctly", async () => {
    const { container } = render(<CreatePost />)
    const user = userEvent.setup()

    const copyButtons = container.querySelectorAll("#copyButton")

    expect(copyButtons.length).toBe(2)

    for (const copyButton of copyButtons) {
      await user.click(copyButton)
      const clipboardText = await navigator.clipboard.readText()
      expect(clipboardText.length).not.toBe(0)
    }
  })
})
