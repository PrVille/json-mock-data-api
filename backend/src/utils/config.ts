import "dotenv/config"

const PORT = process.env.PORT || "3001"
const DEFAULT_API_USER_ID = process.env.DEFAULT_API_USER_ID!
const SECRET = process.env.SECRET!

export {
  PORT,
  DEFAULT_API_USER_ID,
  SECRET
}
