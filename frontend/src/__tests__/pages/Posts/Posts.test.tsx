import { describe, it, expect } from "vitest"
import { userEvent, render } from "../../../testUtils"

import Posts from "../../../pages/Posts/Posts"

describe("Posts", async () => {
  it("should render correctly", async () => {
    const { container } = render(<Posts />)

    const titleElements = container.querySelectorAll("h1")
    const expectedTitles = ["Posts", "The post object"]

    for (const titleElement of titleElements) {
      expect(
        expectedTitles.includes(titleElement.textContent || "")
      ).toBeTruthy()
    }

    const subtitleElements = container.querySelectorAll("h5")
    const expectedSubtitles = ["Attributes"]

    for (const subtitleElement of subtitleElements) {
      expect(
        expectedSubtitles.includes(subtitleElement.textContent || "")
      ).toBeTruthy()
    }

    const codeboxElements = container.querySelectorAll("h6")
    const expectedCodeboxes = ["Endpoints", "Post schema", "Post example"]

    for (const codeboxElement of codeboxElements) {
      expect(
        expectedCodeboxes.includes(codeboxElement.textContent || "")
      ).toBeTruthy()
    }
  })

  it("should copy correctly", async () => {
    const { container } = render(<Posts />)
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
