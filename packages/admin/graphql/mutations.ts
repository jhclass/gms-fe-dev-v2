import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
  mutation CreateStudentState($mUserId: String!, $mPassword: String!) {
    mLogin(mUserId: $mUserId, mPassword: $mPassword) {
      error
      ok
      token
    }
  }
`
export const UPDATE_FAVORITE_MUTATION = gql`
  mutation UpdateFavorite($updateFavoriteId: Int!, $favorite: Boolean!) {
    updateFavorite(id: $updateFavoriteId, favorite: $favorite) {
      favorite
    }
  }
`
