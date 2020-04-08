import Link from "next/link"
import { withApollo } from "../apollo/client"
import useAuth from "../lib/hooks/auth/useAuth"

function ContactPage() {
  const { data, loading } = useAuth()

  console.log(data)

  return (
    <div>
      You're signed in as {data?.viewer?.email}{" "}
      This is a static page goto{" "}
      <Link href="/">
        <a>dynamic</a>
      </Link>{" "}
      <Link href="/about">
        <a>about</a>
      </Link>{" "}
      page.
    </div>
  )
}

export default withApollo(ContactPage, { ssr: false })
