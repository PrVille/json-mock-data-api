import { describe, it, expect } from "vitest"
import { userEvent, render } from "../../testUtils"

import Home from "../../pages/Home"

describe("Home", async () => {
  it("should render correctly", async () => {
    const { container } = render(<Home />)

    const titleElements = container.querySelectorAll("h1")
    const expectedTitles = ["JSON Mock Data API", "Try it out", "All routes"]

    for (const titleElement of titleElements) {
      expect(
        expectedTitles.includes(titleElement.textContent || "")
      ).toBeTruthy()
    }

    const subtitleElements = container.querySelectorAll("h5")
    const expectedSubtitles = [
      "Easing development for free with placeholder data.",
    ]

    for (const subtitleElement of subtitleElements) {
      expect(
        expectedSubtitles.includes(subtitleElement.textContent || "")
      ).toBeTruthy()
    }
  })

  it("should copy correctly", async () => {
    const { container } = render(<Home />)
    const user = userEvent.setup()

    const copyButtons = container.querySelectorAll("#copyButton")

    expect(copyButtons.length).toBe(1)

    for (const copyButton of copyButtons) {
      await user.click(copyButton)
      const clipboardText = await navigator.clipboard.readText()
      expect(clipboardText.length).not.toBe(0)
    }
  })

  it("should be able to try out", async () => {
    const { container } = render(<Home />)
    const user = userEvent.setup()

    const buttonElements = container.querySelectorAll("button")

    expect(buttonElements.length).toBe(6)

    const tabs: Record<string, string | undefined> = {
      "Create user": "POST/api/users",
      "List users": "GET/api/users",
      "List posts": "GET/api/posts",
      "List comments": "GET/api/comments",
    }

    for (const buttonElement of buttonElements) {
      const tab = tabs[buttonElement.textContent || ""]

      if (tab) {
        await user.click(buttonElement)
        const h6Elements = container.querySelectorAll("h6")
        const h6Contents = [...h6Elements].map((h6) => h6.textContent)
        expect(h6Contents.includes(tab)).toBeTruthy()

        const runRequestButton = container.querySelector("#runRequestButton")

        if (runRequestButton) {
          await user.click(runRequestButton)
          // TODO: expect something
        }
      }
    }
  })
})
