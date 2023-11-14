import { isLoggedInVar } from '@/lib/apolloClient'
import { useReactiveVar } from '@apollo/client'
import { useRouter } from 'next/router'

export default function IsLogin({ children }) {
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  const router = useRouter()

  if (isLoggedIn) {
    return <>{children}</>
  } else {
    // 로그인이 되어 있지 않다면 로그인 페이지로 리다이렉트
    router.push('/login')
    return null // 또는 다른 로딩 상태를 나타내는 JSX를 리턴할 수 있습니다.
  }
}
