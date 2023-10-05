import { describe, it, expect } from "vitest"
import { render, screen } from "../testUtils"

import App from "../App"

describe("Renders main page correctly", async () => {
  it("Should render the page correctly", async () => {
    render(<App />)

    const h5 = screen.queryByText("Easing development for free with placeholder data.")
    
    expect(h5).not.toBeNull()
  })
})
