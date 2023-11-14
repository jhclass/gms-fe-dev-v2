// lib/apolloClient.ts
import { useRouter } from 'next/router'
import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client'

console.log(process.env.NEXT_PUBLIC_GRAPHQL_URI, '환경변수')
const TOKEN = 'token'
export const isLoggedInVar = makeVar(
  typeof window !== 'undefined' ? Boolean(localStorage.getItem(TOKEN)) : false,
)
export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI, // GraphQL 서버의 엔드포인트를 입력합니다.
  cache: new InMemoryCache(),
})

//로그인
export const LogUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token)
  isLoggedInVar(true)
}

//로그아웃

//export const LogUserOut = (history: any) => {
export const LogUserOut = () => {
  localStorage.removeItem(TOKEN)
  //history?.replace()

  window.location.href = '/login'
  window.location.reload()
}
