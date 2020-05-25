import { string, object } from 'yup'

export const createPostSchema = object().shape({
  title: string().trim(),
  content: string().trim(),
});

export const updatePostSchema = object().shape({
  title: string().trim(),
  content: string().trim(),
});
