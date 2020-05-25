import snakeCaseKeys from 'snakecase-keys'

export const orderTranslate = {
  ascend: 'ASC',
  descend: 'DESC'
}

export function prepareJsonToSql(value) {
  return JSON.stringify(snakeCaseKeys(value, { deep: true }))
}
