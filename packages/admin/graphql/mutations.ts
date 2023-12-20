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
    $phoneNum1: String
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
      phoneNum1: $phoneNum1
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
          studentStateId
          manageUserId
          manageUser {
            id
            mUserId
            mUsername
            mGrade
            mRank
          }
        }
      }
    }
  }
`

export const CREATE_STUDENT_STATE_MUTATION = gql`
  mutation CreateStudentState(
    $stName: String!
    $phoneNum1: String!
    $agreement: String!
    $subject: [String!]
    $campus: String
    $detail: String
    $category: String
    $phoneNum2: String
    $phoneNum3: String
    $stEmail: String
    $stAddr: String
    $subDiv: String
    $stVisit: String
    $expEnrollDate: String
    $perchase: Boolean
    $birthday: String
    $receiptDiv: String
    $pic: String
  ) {
    createStudentState(
      stName: $stName
      phoneNum1: $phoneNum1
      agreement: $agreement
      subject: $subject
      campus: $campus
      detail: $detail
      category: $category
      phoneNum2: $phoneNum2
      phoneNum3: $phoneNum3
      stEmail: $stEmail
      stAddr: $stAddr
      subDiv: $subDiv
      stVisit: $stVisit
      expEnrollDate: $expEnrollDate
      perchase: $perchase
      birthday: $birthday
      receiptDiv: $receiptDiv
      pic: $pic
    ) {
      ok
      error
      message
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

export const CREATE_CONSULTATION_MEMO_MUTATION = gql`
  mutation CreateConsultationMemo($content: String!, $studentStateId: Int!) {
    createConsultationMemo(content: $content, studentStateId: $studentStateId) {
      ok
      error
      message
    }
  }
`
export const UPDATE_CONSULTATION_MEMO_MUTATION = gql`
  mutation UpdateConsultationMemo(
    $updateConsultationMemoId: Int!
    $content: String!
  ) {
    updateConsultationMemo(id: $updateConsultationMemoId, content: $content) {
      ok
      error
      message
    }
  }
`
export const DELETE_CONSULTATION_MEMO_MUTATION = gql`
  mutation DeleteConsultationMemo($deleteConsultationMemoId: Int!) {
    deleteConsultationMemo(id: $deleteConsultationMemoId) {
      ok
      error
      message
    }
  }
`

export const CREATE_SUBJECT_MUTATION = gql`
  mutation Mutation(
    $subDiv: String!
    $subjectName: String!
    $fee: Int!
    $startDate: String
    $endDate: String
    $roomNum: String
    $exposure: Boolean
    $totalTime: Int
    $teacherName: String
  ) {
    createSubject(
      subDiv: $subDiv
      subjectName: $subjectName
      fee: $fee
      startDate: $startDate
      endDate: $endDate
      roomNum: $roomNum
      exposure: $exposure
      totalTime: $totalTime
      teacherName: $teacherName
    ) {
      ok
      error
      message
    }
  }
`
export const DELETE_SUBJECT_MUTATION = gql`
  mutation DeleteSubject($deleteSubjectId: Int!) {
    deleteSubject(id: $deleteSubjectId) {
      ok
      error
      message
    }
  }
`
export const UPDATE_SUBJECT_MUTATION = gql`
  mutation UpdateSubject(
    $updateSubjectId: Int!
    $subDiv: String!
    $subjectName: String!
    $fee: Int!
    $startDate: String
    $endDate: String
    $roomNum: String
    $exposure: Boolean
    $totalTime: Int
    $teacherName: String
  ) {
    updateSubject(
      id: $updateSubjectId
      subDiv: $subDiv
      subjectName: $subjectName
      fee: $fee
      startDate: $startDate
      endDate: $endDate
      roomNum: $roomNum
      exposure: $exposure
      totalTime: $totalTime
      teacherName: $teacherName
    ) {
      ok
      error
      message
    }
  }
`
export const SEARCH_SUBJECT_MUTATION = gql`
  mutation SearchSubject(
    $searchSubjectId: Int
    $subDiv: String
    $subjectName: String
    $exposure: Boolean
    $page: Int
    $limit: Int
  ) {
    searchSubject(
      id: $searchSubjectId
      subDiv: $subDiv
      subjectName: $subjectName
      exposure: $exposure
      page: $page
      limit: $limit
    ) {
      ok
      error
      totalCount
      message
      result {
        id
        subDiv
        subjectName
        createdAt
        updatedAt
        fee
        startDate
        endDate
        roomNum
        exposure
        totalTime
        teacherName
      }
    }
  }
`
