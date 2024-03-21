import { ISMME_QUERY } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import useMmeQuery from '@/utils/mMe'

const useIsMmeQuery = () => {
  const { useMme } = useMmeQuery()
  const mId = useMme('id')
  const { loading, error, data } = useQuery(ISMME_QUERY, {
    variables: { isMmeId: mId },
  })
  const { ok } = data?.isMme || {}

  if (loading) return null
  if (error) {
    console.log(error)
  }

  return ok
}
export default useIsMmeQuery
