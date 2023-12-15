import { USER_LOGS_MUTATION } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'

const useUserLogsMutation = () => {
  const [userLogsResult] = useMutation(USER_LOGS_MUTATION)
  const userLogs = (evt, url?) => {
    userLogsResult({
      variables: {
        eventName: evt,
        uri: url,
      },
    })
  }

  return { userLogs }
}
export default useUserLogsMutation
