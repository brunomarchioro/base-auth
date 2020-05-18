import { applySession } from "next-iron-session"

const getAuth = async ({ req, res }) => {
  const options = {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'base-auth/session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
  }

  await applySession(req, res, options)

  return {
    user: req.session.get("user"),
    set: async (user) => {
      req.session.set("user", user)
      await req.session.save()
    },
    destroy: () => {
      req.session.destroy()
    }
  }
}

export default getAuth
