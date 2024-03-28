import { useAuthRedirect } from '@/utils/useAuthRedirect'

export default function StudentsLayout({ children }) {
  const isCheckingLogin = useAuthRedirect()
  if (isCheckingLogin) {
    return null
  }
  return <main>{children}</main>
}
