import { describe, it, expect } from "vitest"
import { render, screen } from "../../testUtils"

import Home from "../../pages/Home"

describe("Home", async () => {
  it("should render correctly", async () => {
    render(<Home />)

    const h5 = screen.queryByText("Easing development for free with placeholder data.")
    
    expect(h5).not.toBeNull()
  })
})
