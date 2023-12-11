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
export const USER_LOGS_MUTATION = gql`
  mutation Mutation($eventName: String!, $uri: String) {
    createUserActivityLogs(eventName: $eventName, uri: $uri) {
      ok
      error
      message
    }
  }
`

export const UPDATE_FAVORITE_MUTATION = gql`
  mutation UpdateFavorite($updateFavoriteId: Int!) {
    updateFavorite(id: $updateFavoriteId) {
      ok
      message
      error
      favoriteStudentState {
        id
        mUserId
        mUsername
        mPassword
        mGrade
        mRank
        mPhoneNum
        studentStates {
          id
          campus
          category
          stName
          phoneNum1
          phoneNum2
          phoneNum3
          currentManager
          subject
          detail
          agreement
          progress
          stEmail
          stAddr
          subDiv
          stVisit
          expEnrollDate
          perchase
          createdAt
          updatedAt
          receiptDiv
          pic
        }
        createdAt
        updatedAt
        mAvatar
        favoriteStudentState
      }
    }
  }
`

export const SEARCH_STUDENTSTATE_MUTATION = gql`
  mutation SearchStudentState(
    $searchStudentStateId: Int
    $receiptDiv: String
    $subDiv: String
    $pic: String
    $createdAt: [String]
    $stVisit: [String]
    $stName: String
    $progress: [Int]
    $page: Int
    $perPage: Int
  ) {
    searchStudentState(
      id: $searchStudentStateId
      receiptDiv: $receiptDiv
      subDiv: $subDiv
      pic: $pic
      createdAt: $createdAt
      stVisit: $stVisit
      stName: $stName
      progress: $progress
      page: $page
      perPage: $perPage
    ) {
      ok
      error
      message
      totalCount
      studentState {
        id
        campus
        category
        stName
        phoneNum1
        phoneNum2
        phoneNum3
        currentManager
        subject
        detail
        agreement
        progress
        stEmail
        stAddr
        subDiv
        stVisit
        expEnrollDate
        perchase
        createdAt
        updatedAt
        receiptDiv
        pic
        consultationMemo {
          id
          content
          createdAt
          updatedAt
          manageUser {
            id
            mUserId
            mUsername
          }
          manageUserId
        }
      }
    }
  }
`

export const UPDATE_STUDENT_STATE_MUTATION = gql`
  mutation Mutation(
    $updateStudentStateId: Int!
    $campus: String
    $stName: String
    $category: String
    $phoneNum1: String
    $phoneNum2: String
    $phoneNum3: String
    $subject: [String]
    $detail: String
    $progress: Int
    $stEmail: String
    $stAddr: String
    $subDiv: String
    $stVisit: String
    $expEnrollDate: String
    $perchase: Boolean
    $birthday: String
    $pic: String
    $receiptDiv: String
  ) {
    updateStudentState(
      id: $updateStudentStateId
      campus: $campus
      stName: $stName
      category: $category
      phoneNum1: $phoneNum1
      phoneNum2: $phoneNum2
      phoneNum3: $phoneNum3
      subject: $subject
      detail: $detail
      progress: $progress
      stEmail: $stEmail
      stAddr: $stAddr
      subDiv: $subDiv
      stVisit: $stVisit
      expEnrollDate: $expEnrollDate
      perchase: $perchase
      birthday: $birthday
      pic: $pic
      receiptDiv: $receiptDiv
    ) {
      error
      message
      ok
    }
  }
`
