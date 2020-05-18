import cookie from "cookie"
import jwt from "jsonwebtoken"
import getConfig from "next/config"

const JWT_SECRET = getConfig()?.serverRuntimeConfig?.JWT_SECRET

export function getAuthToken(ctx) {
  const { token } = cookie.parse(ctx.req.headers.cookie ?? "")
  if (!token) {
    return null
  }
  return jwt.verify(token, JWT_SECRET)
}

export function setAuthToken(ctx, username) {
  const payload = { username, time: new Date() }
  const options = { expiresIn: "6h" }
  const token = jwt.sign(payload, JWT_SECRET, options)

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
