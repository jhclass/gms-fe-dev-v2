import { useAuthRedirect } from '@/utils/useAuthRedirect'
import { useMutation } from '@apollo/client'

export default function SubjectLayout({ children }) {
  const isCheckingLogin = useAuthRedirect()
  if (isCheckingLogin) {
    return null
  }
  return <main>{children}</main>
}
