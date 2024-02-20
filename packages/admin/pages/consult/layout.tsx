import { useAuthRedirect } from '@/utils/useAuthRedirect'

export default function SubjectLayout({ children }) {
  const isCheckingLogin = useAuthRedirect()
  if (isCheckingLogin) {
    return null
  }
  return <main>{children}</main>
}
