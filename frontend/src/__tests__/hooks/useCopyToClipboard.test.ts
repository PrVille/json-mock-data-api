import { describe, it, expect } from "vitest"
import { renderHook } from "../../testUtils"

import { useCopyToClipboard } from "../../hooks/useCopyToClipboard"
import { NotificationProvider } from "../../context/NotificationContext"

describe("useCopyToClipboard", async () => {
  it("should render correctly", async () => {
    const { result } = renderHook(useCopyToClipboard, {
      wrapper: NotificationProvider,
    })

    expect(result).not.toBeNull()
  })
})
