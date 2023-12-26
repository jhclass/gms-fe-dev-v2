// lib/apolloClient.ts
import { useRouter } from 'next/router'
import {
  ApolloClient,
  InMemoryCache,
  makeVar,
  createHttpLink,
  ApolloLink,
} from '@apollo/client'

// console.log(process.env.NEXT_PUBLIC_GRAPHQL_URI, '환경변수')
const TOKEN = 'token'
export const isLoggedInVar = makeVar(
  typeof window !== 'undefined' ? Boolean(localStorage.getItem(TOKEN)) : false,
)
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
})

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(TOKEN)
  const headers = operation.getContext().headers || {} // 기본 헤더 객체 설정
  operation.setContext({
    headers: {
      ...headers,
      token: token,
    },
  })
  return forward(operation)
})
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

//로그인
export const LogUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token)
  isLoggedInVar(true)
}
