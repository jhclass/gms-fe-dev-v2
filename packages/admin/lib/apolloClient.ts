// lib/apolloClient.ts
import { onError } from '@apollo/client/link/error'
import {
  ApolloClient,
  InMemoryCache,
  makeVar,
  createHttpLink,
  ApolloLink,
  from,
} from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
// console.log(process.env.NEXT_PUBLIC_GRAPHQL_URI, '환경변수')
const TOKEN = 'token'
export const isLoggedInVar = makeVar(
  typeof window !== 'undefined' ? Boolean(localStorage.getItem(TOKEN)) : false,
)
// const httpLink = createHttpLink({
//   uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
// })
const uploadLink = createUploadLink({
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
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      )
      if (message === 'UNAUTHENTICATED') {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    })
  }
  if (networkError) console.error(`[Network error]: ${networkError}`)
})
const link = ApolloLink.from([authLink, errorLink, uploadLink]) // 여기서 uploadLink를 추가합니다.
export const apolloClient = new ApolloClient({
  //link: authLink.concat(uploadLink),
  link,
  cache: new InMemoryCache(),
})

//로그인
export const LogUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token)
  isLoggedInVar(true)
}
