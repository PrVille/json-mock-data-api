import { describe, it, expect } from "vitest"
import { render } from "../../testUtils"

import NotFound from "../../pages/NotFound"

describe("NotFound", async () => {
  it("should render correctly", async () => {
    const { container } = render(<NotFound />)

    const titleElements = container.querySelectorAll("h1")
    const expectedTitles = ["Page not found"]

    for (const titleElement of titleElements) {
      expect(
        expectedTitles.includes(titleElement.textContent || "")
      ).toBeTruthy()
    }
  })
})
