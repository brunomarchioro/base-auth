import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { useRouter } from 'next/router'

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      email
    }
  }
`

export default function (isPrivate = false) {
  const router = useRouter()
  const { data, loading } = useQuery(ViewerQuery)

  console.log(isPrivate, loading, data?.viewer)

  if (isPrivate && loading === false && !data?.viewer) {
    router.push('/login')
  }

  return { data, loading }
}
