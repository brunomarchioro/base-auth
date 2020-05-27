import { string, object, array, number } from "yup"

export const createPostSchema = object().shape({
  title: string().trim(),
  scopeIds: array(number()),
  content: string().trim(),
});

export const updatePostSchema = object().shape({
  title: string().trim(),
  scopeIds: array(number()),
  content: string().trim(),
});
