import { withApollo } from '../apollo/client'
import Link from 'next/link'
import useAuth from "../lib/hooks/auth/useAuth"

const Index = () => {
  const { data, loading } = useAuth(true)

  console.log(data)

  if (data && data.viewer) {
    return (
      <div>
        You're signed in as {data.viewer.email} goto{' '}
        <Link href="/about">
          <a>static</a>
        </Link>{' '}
        page. or{' '}
        <Link href="/logout">
          <a>logout</a>
        </Link>
      </div>
    )
  }

  return <p>Loading...</p>
}

export default withApollo(Index)
