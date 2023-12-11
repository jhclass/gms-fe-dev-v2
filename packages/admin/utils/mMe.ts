import { MME_QUERY } from '@/graphql/queries'
import { useQuery } from '@apollo/client'

const useMmeQuery = () => {
  const { loading, error, data } = useQuery(MME_QUERY)
  const { mMe } = data || {}
  const { id, mUserId, mUsername, mGrade, mRank } = mMe || {}

  const useMme = e => {
    switch (e) {
      case 'id':
        return id
      case 'mUserId':
        return mUserId
      case 'mUsername':
        return mUsername
      case 'mGrade':
        return mGrade
      case 'mRank':
        return mRank
    }
  }

  return { useMme }
}
export default useMmeQuery
