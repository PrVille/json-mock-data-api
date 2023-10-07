import { describe, it, expect } from "vitest"
import { userEvent, render } from "../../testUtils"

import Introduction from "../../pages/Introduction"

describe("Introduction", async () => {
  it("should render correctly", async () => {
    const { container } = render(<Introduction />)

    const titleElements = container.querySelectorAll("h1")
    const expectedTitles = ["API reference", "All routes"]

    for (const titleElement of titleElements) {
      expect(
        expectedTitles.includes(titleElement.textContent || "")
      ).toBeTruthy()
    }

    const codeboxElements = container.querySelectorAll("h6")
    const expectedCodeboxes = ["Base url"]

    for (const codeboxElement of codeboxElements) {
      expect(
        expectedCodeboxes.includes(codeboxElement.textContent || "")
      ).toBeTruthy()
    }
  })

  it("should copy correctly", async () => {
    const { container } = render(<Introduction />)
    const user = userEvent.setup()

    const copyButtons = container.querySelectorAll("#copyButton")

    expect(copyButtons.length).toBe(1)

    for (const copyButton of copyButtons) {
      await user.click(copyButton)
      const clipboardText = await navigator.clipboard.readText()
      expect(clipboardText.length).not.toBe(0)
    }
  })
})
