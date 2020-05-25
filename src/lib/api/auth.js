import { applySession } from "next-iron-session"
import { AuthenticationError, ForbiddenError } from "apollo-server-micro"

export const getAuth = async ({ req, res }) => {
  const options = {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "base-auth/session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    }
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

export const requireAuth = (auth) => {
  if (!auth) {
    throw new AuthenticationError("Você deve estar logado!")
  }
}

export const can = ({ scope, contentType, role, auth }) => {
  if (!auth.isAuthenticated) {
    throw new AuthenticationError("Você deve estar logado!")
  }
}
