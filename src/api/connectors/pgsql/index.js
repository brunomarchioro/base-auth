import { createPool, createTypeParserPreset } from "slonik"
import moment from "moment"
import createQueryLoggerInterceptor from "./queryLoggerInterceptor"
import camelCaseTransformationInterceptor from "./camelCaseTransformationInterceptor"

let interceptors = [
  camelCaseTransformationInterceptor()
]

if (process.env.NODE_ENV === 'development') {
  interceptors.push(createQueryLoggerInterceptor())
}

const pool = createPool(process.env.DB_CONN_URI, {
  typeParsers: [
    ...createTypeParserPreset(),
    {
      name: "date",
      parse: value => moment(value).format("YYYY-MM-DD"),
    },
    {
      name: "timestamp",
      parse: value => moment(value).toISOString(),
    },
    {
      name: "timestamptz",
      parse: value => moment(value).toISOString(),
    },
  ],

  interceptors,

  // connectionTimeout: 50000
})

export default pool
