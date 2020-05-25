import { UserInputError } from "apollo-server-micro"
import locale from "lib/validation/locale"
import { setLocale } from "yup"

setLocale(locale)

export default async (schema, input) => {
  const options = {
    abortEarly: false
  }

  try {
    return schema.validate(input, options)
  } catch (e) {
    throw new UserInputError(e)
  }
}
