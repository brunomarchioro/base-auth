import { orderTranslate } from "lib/api/utils"
import { sql } from "slonik"
import { raw } from "slonik-sql-tag-raw"
import db from "api/connectors/pgsql"

export default async ({ query, filters, page, pageSize, ...args } = {}) => {
  let queryFields = ""
  let filterFields = ""
  let where = "TRUE"
  let limit = ""

  if (query) {
    queryFields = ["name"].map(field => {
      return `${field} ILIKE '%${query}%'`
    }).join(" OR ")
  }

  if (filters) {
    filterFields = Object.entries(filters).map(([key, value]) => {
      if (value !== null) {}
    }).filter(x => x).join(" AND ")
  }

  if (query && filterFields) {
    where = `(${queryFields}) AND (${filterFields})`
  } else if (filterFields && !query) {
    where = filterFields
  } else if (query && !filterFields) {
    where = queryFields
  }

  const offset = (page - 1) * pageSize

  if (page && pageSize) {
    limit = `LIMIT ${pageSize} OFFSET ${offset}`
  } else if (pageSize && !page) {
    limit = `LIMIT ${pageSize}`
  }

  const sortField = args.sortField || 'name'
  const sortOrder = args.sortOrder ? orderTranslate[args.sortOrder] : 'DESC'

  const rows = await db.any(sql`
    SELECT
      *, count(*) OVER () AS total_rows
    FROM
      scopes
    WHERE ${raw(where)}
    ORDER BY
      "${raw(sortField)}" ${raw(sortOrder)}
    ${raw(limit)}
  `)

  const totalCount = rows.length === 0 ? 0 : rows[0].totalRows
  const totalPages = Math.ceil(totalCount / pageSize) || 0
  const hasNextPage = offset + pageSize < totalCount

  return {
    entries: rows,
    pageInfo: {
      totalCount,
      totalPages,
      currentPage: page,
      pageSize,
      hasNextPage
    }
  }
}
