import { describe, it, expect } from "vitest"
import { userEvent, render } from "../../../testUtils"

import ListPostComments from "../../../pages/Posts/ListPostComments"

describe("ListPostComments", async () => {
  it("should render correctly", async () => {
    const { container } = render(<ListPostComments />)

    const titleElements = container.querySelectorAll("h1")
    const expectedTitles = ["List all post comments"]

    for (const titleElement of titleElements) {
      expect(
        expectedTitles.includes(titleElement.textContent || "")
      ).toBeTruthy()
    }

    const subtitleElements = container.querySelectorAll("h5")
    const expectedSubtitles = ["Path parameters", "Query parameters", "Returns"]

    for (const subtitleElement of subtitleElements) {
      expect(
        expectedSubtitles.includes(subtitleElement.textContent || "")
      ).toBeTruthy()
    }

    const codeboxElements = container.querySelectorAll("h6")
    const expectedCodeboxes = ["Response", "GET/api/posts/:id/comments"]

    for (const codeboxElement of codeboxElements) {
      expect(
        expectedCodeboxes.includes(codeboxElement.textContent || "")
      ).toBeTruthy()
    }
  })

  it("should copy correctly", async () => {
    const { container } = render(<ListPostComments />)
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
