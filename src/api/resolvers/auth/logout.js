export default async (_parent, _args, { auth }) => {
  auth.destroy()
  return true
}
