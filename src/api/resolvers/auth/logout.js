export default async function logout(_parent, _args, { auth }) {
  auth.destroy()
  return true
}
