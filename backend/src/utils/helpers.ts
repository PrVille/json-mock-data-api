import { Select } from "../typings/records"

// Remove?
export const buildSelectObject = (includeValues: string[]): Select => {
  const select: Record<string, boolean> = {}

  for (const value of includeValues) {
    select[value] = true
  }

  return select
}
