import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useReactiveVar } from '@apollo/client'
import { isLoggedInVar } from '@/lib/apolloClient'

export default function WithAuth({ children }) {
  const router = useRouter()
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  const [isClient, setIsClient] = useState(false)
  // useEffect(() => {
  //   setIsClient(true)
  //   if (!isLoggedIn && router.pathname !== '/login') {
  //     alert('로그인 해주세요. 😃')
  //     router.push('/login')
  //   }
  // }, [isLoggedIn, router])

  return children
}
