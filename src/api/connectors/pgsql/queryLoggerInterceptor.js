export default () => {
  return {
    beforeQueryExecution: async (context, query) => {
      const sql = query.sql.replace(/\n/g, '').trim().replace(/\s\s+/g, ' ')
      console.log(`Executando SQL: ${sql}`)
    },
  }
}
