import "dotenv/config"
import createTables from "../src/api/migrations/createTables"

;(async () => {
  try {
    await createTables()

  } catch (error) {
    console.error(error)
  }

  process.exit()
})()
