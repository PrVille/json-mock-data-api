import { describe, it, expect } from "vitest"
import { userEvent, render } from "../../../testUtils"

import Users from "../../../pages/Users/Users"

describe("Users", async () => {
  it("should render correctly", async () => {
    const { container } = render(<Users />)

    const titleElements = container.querySelectorAll("h1")
    const allowedTitles = ["Users", "The user object"]

    for (const titleElement of titleElements) {
        expect(allowedTitles.includes(titleElement.textContent || "")).toBeTruthy()
    }

    // TODO: Validate more of the page    
  })

  it("should copy correctly", async () => {
    const { container } = render(<Users />)
    const user = userEvent.setup()

    const buttons = container.querySelectorAll("#copyButton")

    expect(buttons.length).toBe(2)

    for (const button of buttons) {
      await user.click(button)
      const clipboardText = await navigator.clipboard.readText()
      expect(clipboardText.length).not.toBe(0)
    }
  })
})
