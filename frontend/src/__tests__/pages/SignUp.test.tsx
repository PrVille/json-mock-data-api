import { describe, it, expect } from "vitest"
import { userEvent, render } from "../../testUtils"

import SignUp from "../../pages/SignUp"

describe("SignUp", async () => {
  it("should render correctly", async () => {
    const { container } = render(<SignUp />)

    const titleElements = container.querySelectorAll("h2")
    const expectedTitles = ["Create your account"]

    for (const titleElement of titleElements) {
      expect(
        expectedTitles.includes(titleElement.textContent || "")
      ).toBeTruthy()
    }

    const subtitleElements = container.querySelectorAll("label")
    const expectedSubtitles = ["Email", "Password", "Password confirmation"]

    for (const subtitleElement of subtitleElements) {
      expect(
        expectedSubtitles.includes(subtitleElement.textContent || "")
      ).toBeTruthy()
    }

    const inputElements = container.querySelectorAll("input")
    expect(inputElements.length).toBe(3)
  })

  it("should signup", async () => {
    const { container } = render(<SignUp />)
    const user = userEvent.setup()

    const submitButton = container.querySelector("button")

    const emailInputElement = container.querySelector('input[name="email"]')
    const passwordInputElement = container.querySelector(
      'input[name="password"]'
    )
    const passwordConfirmationInputElement = container.querySelector(
      'input[name="passwordConfirmation"]'
    )

    if (
      submitButton &&
      emailInputElement &&
      passwordInputElement &&
      passwordConfirmationInputElement
    ) {
      await user.type(emailInputElement, "email@email.com")
      await user.type(passwordInputElement, "password")
      await user.type(passwordConfirmationInputElement, "password")

      await user.click(submitButton)
    }
  })
})
