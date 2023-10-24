// lib/apolloClient.ts

import { ApolloClient, InMemoryCache } from "@apollo/client";

console.log(process.env.NEXT_PUBLIC_GRAPHQL_URI, "환경변수");
const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI, // GraphQL 서버의 엔드포인트를 입력합니다.
  cache: new InMemoryCache(),
});

export default apolloClient;
