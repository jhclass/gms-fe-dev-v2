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
export const EDIT_MANAGE_USER_MUTATION = gql`
  mutation Mutation(
    $mUsername: String
    $mPassword: String
    $mGrade: Int
    $mRank: String
    $mPhoneNum: String
    $mPhoneNumCompany: String
    $mPhoneNumInside: String
    $mPhoneNumFriend: String
    $mPart: String
    $mAvatar: String
    $mJoiningDate: String
    $mAddresses: String
  ) {
    editManageUser(
      mUsername: $mUsername
      mPassword: $mPassword
      mGrade: $mGrade
      mRank: $mRank
      mPhoneNum: $mPhoneNum
      mPhoneNumCompany: $mPhoneNumCompany
      mPhoneNumInside: $mPhoneNumInside
      mPhoneNumFriend: $mPhoneNumFriend
      mPart: $mPart
      mAvatar: $mAvatar
      mJoiningDate: $mJoiningDate
      mAddresses: $mAddresses
    ) {
      ok
      error
      message
    }
  }
`
export const UPDATE_FAVORITE_MUTATION = gql`
  mutation Mutation($updateFavoriteId: Int!) {
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
        mPhoneNumCompany
        mPhoneNumInside
        mPhoneNumFriend
        mPart
        mAvatar
        mJoiningDate
        mAddresses
        createdAt
        updatedAt
        favoriteStudentState
        StudentStates {
          id
          stName
          phoneNum1
        }
        ConsultationMemo {
          id
          content
        }
      }
    }
  }
`

export const CREATE_STUDENT_STATE_MUTATION = gql`
  mutation Mutation(
    $stName: String!
    $phoneNum1: String!
    $subject: [String]!
    $agreement: String!
    $progress: Int!
    $adviceTypes: [String]!
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
      subject: $subject
      agreement: $agreement
      progress: $progress
      adviceTypes: $adviceTypes
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
      error
      message
      ok
    }
  }
`

export const SEARCH_STUDENTSTATE_MUTATION = gql`
  mutation Mutation(
    $searchStudentStateId: Int
    $receiptDiv: String
    $phoneNum1: String
    $subDiv: String
    $pic: String
    $createdAt: [String]
    $stVisit: [String]
    $stName: String
    $adviceType: String
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
      adviceType: $adviceType
      progress: $progress
      page: $page
      perPage: $perPage
    ) {
      error
      message
      ok
      totalCount
      studentState {
        adviceTypes {
          id
          type
        }
        agreement
        campus
        category
        consultationMemo {
          content
          createdAt
          id
          manageUser {
            mGrade
            id
            mPart
            mRank
            mUserId
            mUsername
          }
          manageUserId
          studentStateId
          updatedAt
        }
        createdAt
        currentManager
        detail
        expEnrollDate
        id
        perchase
        phoneNum1
        phoneNum2
        phoneNum3
        pic
        progress
        receiptDiv
        stAddr
        stEmail
        stName
        stVisit
        subDiv
        subject
        updatedAt
      }
    }
  }
`

export const UPDATE_STUDENT_STATE_MUTATION = gql`
  mutation UpdateStudentState(
    $updateStudentStateId: Int!
    $campus: String
    $category: String
    $stName: String
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
    $adviceTypes: [String]
  ) {
    updateStudentState(
      id: $updateStudentStateId
      campus: $campus
      category: $category
      stName: $stName
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
      adviceTypes: $adviceTypes
    ) {
      error
      message
      ok
    }
  }
`
export const DELETE_STUDENT_STATE_MUTATION = gql`
  mutation Mutation($deleteStudentStateId: [Int]!) {
    deleteStudentState(id: $deleteStudentStateId) {
      ok
      message
      error
    }
  }
`

export const CREATE_ADVICE_TYPE_MUTATION = gql`
  mutation Mutation($type: String!) {
    createAdviceType(type: $type) {
      error
      message
      ok
    }
  }
`

export const DELETE_ADVICE_TYPE_MUTATION = gql`
  mutation DeleteAdviceType($deleteAdviceTypeId: Int!) {
    deleteAdviceType(id: $deleteAdviceTypeId) {
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
  mutation CreateSubject(
    $subDiv: String!
    $subjectName: String!
    $fee: Int!
    $startDate: String
    $endDate: String
    $roomNum: String
    $exposure: Boolean
    $totalTime: Int
    $teacherName: String
    $subjectCode: String
    $expiresDateStart: String
    $expiresDateEnd: String
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
      subjectCode: $subjectCode
      expiresDateStart: $expiresDateStart
      expiresDateEnd: $expiresDateEnd
    ) {
      error
      message
      ok
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
    $expiresDateStart: String
    $expiresDateEnd: String
    $mGrade: Int
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
      expiresDateStart: $expiresDateStart
      expiresDateEnd: $expiresDateEnd
      mGrade: $mGrade
    ) {
      error
      message
      ok
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
      error
      message
      ok
      result {
        createdAt
        endDate
        expiresDateEnd
        expiresDateStart
        exposure
        fee
        id
        roomNum
        startDate
        subDiv
        subjectCode
        subjectName
        teacherName
        totalTime
        updatedAt
      }
      totalCount
    }
  }
`
