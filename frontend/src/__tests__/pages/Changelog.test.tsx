import { describe, it, expect } from "vitest"
import { render } from "../../testUtils"

import Changelog from "../../pages/Changelog"

describe("Changelog", async () => {
  it("should render correctly", async () => {
    const { container } = render(<Changelog />)

    const titleElements = container.querySelectorAll("h1")
    const expectedTitles = ["Changelog"]

    for (const titleElement of titleElements) {
      expect(
        expectedTitles.includes(titleElement.textContent || "")
      ).toBeTruthy()
    }
  })
})
