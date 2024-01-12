import { gql } from '@apollo/client'

// Dashboard
export const DASHBOARD_TODAY_QUERY = gql`
  query DashboardToday {
    dashboardToday {
      ok
      today
      compareToday
    }
  }
`
export const DASHBOARD_MONTH_QUERY = gql`
  query DashboardMonth {
    dashboardMonth {
      ok
      month
      compareMonth
    }
  }
`
export const DASHBOARD_UNP_QUERY = gql`
  query DashboardUnp {
    dashboardUnp {
      ok
      unpCount
    }
  }
`

// Components
export const MME_QUERY = gql`
  query MMe {
    mMe {
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
      ConsultationMemo {
        id
        content
        updatedAt
        createdAt
        manageUserId
        studentStateId
      }
    }
  }
`
export const MME_FAVO_QUERY = gql`
  query MMe {
    mMe {
      favoriteStudentState
    }
  }
`
export const ISMME_QUERY = gql`
  query IsMme($isMmeId: Int!) {
    isMme(id: $isMmeId) {
      ok
      error
    }
  }
`
export const SEE_STUDENT_STATE_QUERY = gql`
  query SeeStudentState($page: Int!, $limit: Int) {
    seeStudentState(page: $page, limit: $limit) {
      message
      ok
      totalCount
      studentState {
        adviceTypes {
          id
          type
        }
        createdAt
        id
        phoneNum1
        pic
        progress
        receiptDiv
        stName
        stVisit
        subDiv
      }
    }
  }
`
export const SEE_ADVICE_TYPE_QUERY = gql`
  query Query {
    seeAdviceType {
      adviceType {
        id
        type
      }
      error
      message
      ok
    }
  }
`

export const SEE_MANAGEUSER_QUERY = gql`
  query SeeManageUser {
    seeManageUser {
      id
      mUserId
      mUsername
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
      ConsultationMemo {
        id
        content
        createdAt
        updatedAt
        studentStateId
        manageUserId
      }
      favoriteStudentState
    }
  }
`

export const SEE_FAVORITESTATE_QUERY = gql`
  query Query {
    seeFavorite {
      adviceTypes {
        id
        type
      }
      createdAt
      id
      phoneNum1
      pic
      progress
      receiptDiv
      stName
      stVisit
      subDiv
    }
  }
`

export const SEE_SUBJECT_QUERY = gql`
  query Query($page: Int, $limit: Int) {
    seeSubject(page: $page, limit: $limit) {
      subject {
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
        subjectCode
      }
      ok
      error
      message
      totalCount
    }
  }
`

//student
export const SEE_STUDENT_QUERY = gql`
  query SeeStudent($page: Int, $limit: Int) {
    seeStudent(page: $page, limit: $limit) {
      error
      message
      ok
      totalCount
      student {
        birthday
        createdAt
        id
        lectureAssignment
        courseComplete
        writer
        subject {
          subjectName
        }
        subDiv
        phoneNum1
        name
      }
    }
  }
`
