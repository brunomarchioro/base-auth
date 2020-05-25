import "dotenv/config"
import seedTables from "../src/api/migrations/seedTables"

;(async () => {
  try {
    await seedTables()

  } catch (error) {
    console.error(error)
  }

  process.exit()
})()
