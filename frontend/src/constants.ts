import { Method } from "./typings/enums"

export const methodColorMap = {
  [Method.get]: "text-sky-500",
  [Method.post]: "text-green-500",
  [Method.put]: "text-yellow-500",
  [Method.delete]: "text-red-500",
}

export const methodColorMapLight = {
  [Method.get]: "text-sky-200",
  [Method.post]: "text-green-200",
  [Method.put]: "text-yellow-200",
  [Method.delete]: "text-red-200",
}