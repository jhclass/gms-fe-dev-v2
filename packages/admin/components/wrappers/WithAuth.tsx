import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useReactiveVar } from '@apollo/client'
import { isLoggedInVar } from '@/lib/apolloClient'

export default function WithAuth({ children }) {
  const router = useRouter()
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  useEffect(() => {
    if (!isLoggedIn && router.pathname !== '/login') {
      router.push('/login')
    }
  }, [isLoggedIn, router])

  return <>{children}</>
}
