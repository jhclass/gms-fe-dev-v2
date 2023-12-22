import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useReactiveVar } from '@apollo/client'
import { isLoggedInVar } from '@/lib/apolloClient'
import useMmeQuery from '@/utils/mMe'

export default function Layout({ children }) {
  const router = useRouter()
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  useEffect(() => {
    if (!isLoggedIn && router.pathname !== '/login') {
      router.push('/login')
    }
  }, [isLoggedIn, router])

  return <>{mGrade === 0 && { children }}</>
}
