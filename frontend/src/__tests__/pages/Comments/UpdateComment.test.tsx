import { describe, it, expect } from "vitest"
import { userEvent, render } from "../../../testUtils"

import UpdateComment from "../../../pages/Comments/UpdateComment"

describe("UpdateComment", async () => {
  it("should render correctly", async () => {
    const { container } = render(<UpdateComment />)

    const titleElements = container.querySelectorAll("h1")
    const expectedTitles = ["Update a comment"]

    for (const titleElement of titleElements) {
      expect(
        expectedTitles.includes(titleElement.textContent || "")
      ).toBeTruthy()
    }

    const subtitleElements = container.querySelectorAll("h5")
    const expectedSubtitles = ["Path parameters", "Body parameters", "Returns"]

    for (const subtitleElement of subtitleElements) {
      expect(
        expectedSubtitles.includes(subtitleElement.textContent || "")
      ).toBeTruthy()
    }

    const codeboxElements = container.querySelectorAll("h6")
    const expectedCodeboxes = ["Response", "PUT/api/comments/:id"]

    for (const codeboxElement of codeboxElements) {
      expect(
        expectedCodeboxes.includes(codeboxElement.textContent || "")
      ).toBeTruthy()
    }
  })

  it("should copy correctly", async () => {
    const { container } = render(<UpdateComment />)
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
