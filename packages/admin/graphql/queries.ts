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
`
export const ISMME_QUERY = gql`
  query IsMme($isMmeId: Int!) {
    isMme(id: $isMmeId) {
      ok
      error
    }
  }
`
export const SEE_STUDENT_QUERY = gql`
  query SeeStudentState($page: Int!, $limit: Int) {
    seeStudentState(page: $page, limit: $limit) {
      message
      ok
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
      }
      totalCount
    }
  }
`

export const SEE_MANAGEUSER_QUERY = gql`
  query Query {
    seeManageUser {
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
    }
  }
`

export const SEE_FAVORITESTATE_QUERY = gql`
  query SeeFavorite {
    seeFavorite {
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
  }
`

export const SEE_SUBJECT_QUERY = gql`
  query SeeSubject($page: Int, $limit: Int) {
    seeSubject(page: $page, limit: $limit) {
      ok
      error
      message
      totalCount
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
      }
    }
  }
`
