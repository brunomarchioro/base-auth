import cookie from "cookie"
import jwt from "jsonwebtoken"
import getConfig from "next/config"

const JWT_SECRET = getConfig().serverRuntimeConfig.JWT_SECRET

export function getAuthToken(ctx) {
  const { token } = cookie.parse(ctx.req.headers.cookie ?? "")
  if (!token) {
    return null
  }
  const user = jwt.verify(token, JWT_SECRET)
  return user
}

export function setAuthToken(ctx, user) {
  const token = jwt.sign(
    { email: user.email, id: user.id, time: new Date() },
    JWT_SECRET,
    {
      expiresIn: "6h"
    }
  )

  ctx.res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", token, {
      httpOnly: true,
      maxAge: 6 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    })
  )
}

export function removeAuthToken(ctx) {
  ctx.res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      maxAge: -1,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    })
  )
}
