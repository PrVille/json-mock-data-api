import { describe, it, expect } from "vitest"
import { userEvent, render } from "../../testUtils"

import SignIn from "../../pages/SignIn"

describe("SignIn", async () => {
  it("should render correctly", async () => {
    const { container } = render(<SignIn />)

    const titleElements = container.querySelectorAll("h2")
    const expectedTitles = ["Sign in to your account"]

    for (const titleElement of titleElements) {
      expect(
        expectedTitles.includes(titleElement.textContent || "")
      ).toBeTruthy()
    }

    const subtitleElements = container.querySelectorAll("label")
    const expectedSubtitles = ["Email", "Password"]

    for (const subtitleElement of subtitleElements) {
      expect(
        expectedSubtitles.includes(subtitleElement.textContent || "")
      ).toBeTruthy()
    }

    const inputElements = container.querySelectorAll("input")
    expect(inputElements.length).toBe(3)
  })

  it("should signin", async () => {
    const { container } = render(<SignIn />)
    const user = userEvent.setup()

    const submitButton = container.querySelector("button")

    const emailInputElement = container.querySelector('input[name="email"]')
    const passwordInputElement = container.querySelector(
      'input[name="password"]'
    )
    const checkboxInputElement = container.querySelector(
      'input[type="checkbox"]'
    )

    if (
      submitButton &&
      emailInputElement &&
      passwordInputElement &&
      checkboxInputElement
    ) {
      await user.type(emailInputElement, "email@email.com")
      await user.type(passwordInputElement, "password")
      await user.click(checkboxInputElement)

      await user.click(submitButton)
    }
  })
})
