// https://github.com/gajus/slonik-interceptor-field-name-transformation
import camelcaseKeys from "camelcase-keys"

export default () => {
  return {
    transformRow: (context, query, row) => {
      return camelcaseKeys(row, {
        exclude: [/^[^_]*$/],
        deep: true
      })
    }
  }
}
