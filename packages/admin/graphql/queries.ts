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
export const DASHBOARD_AT_QUERY = gql`
  query Query {
    dashboardAT {
      count
      topFiveName
      totalStudentState
    }
  }
`
export const DASHBOARD_RD_QUERY = gql`
  query DashboardRD {
    dashboardRD {
      receiptDiv
      count
    }
  }
`

// Components
export const MME_QUERY = gql`
  query MMe {
    mMe {
      Stamp {
        id
        imageUrl
      }
      mAddresses
      mAvatar
      mGrade
      mJoiningDate
      mPart
      mPassword
      mPhoneNum
      mPhoneNumCompany
      mPhoneNumFriend
      mPhoneNumInside
      mRank
      mUserId
      mUsername
      resign
      updatedAt
      email
      id
      createdAt
      lastModifiedBy
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
        classMethod
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

export const CREATE_STAMP_QUERY = gql`
  query Query($manageUserId: Int!) {
    createStamp(manageUserId: $manageUserId) {
      error
      message
      ok
    }
  }
`

export const SEE_MANAGEUSER_QUERY = gql`
  query Query($limit: Int, $page: Int) {
    seeManageUser(limit: $limit, page: $page) {
      totalCount
      ok
      message
      error
      data {
        ConsultationMemo {
          id
          createdAt
          content
          manageUserId
          studentStateId
          updatedAt
        }
        updatedAt
        resign
        mUsername
        mUserId
        mRank
        mPhoneNumInside
        mPhoneNumFriend
        mPhoneNumCompany
        mPhoneNum
        mPassword
        mPart
        mJoiningDate
        mGrade
        mAvatar
        mAddresses
        lastModifiedBy
        id
        favoriteStudentState
        email
        createdAt
        Stamp {
          id
          imageUrl
        }
        frequentlyUsed
      }
    }
  }
`
export const SEARCH_MANAGEUSER_QUERY = gql`
  query SearchManageUser(
    $page: Int
    $limit: Int
    $searchManageUserId: Int
    $mUserId: String
    $mUsername: String
    $mRank: String
    $mPhoneNum: String
    $mPart: String
    $resign: String
    $mJoiningDate: [String]
  ) {
    searchManageUser(
      page: $page
      limit: $limit
      id: $searchManageUserId
      mUserId: $mUserId
      mUsername: $mUsername
      mRank: $mRank
      mPhoneNum: $mPhoneNum
      mPart: $mPart
      resign: $resign
      mJoiningDate: $mJoiningDate
    ) {
      totalCount
      ok
      message
      error
      data {
        Stamp {
          id
          imageUrl
        }
        mUserId
        mUsername
        email
        createdAt
        id
        mAddresses
        mAvatar
        mGrade
        mJoiningDate
        mPart
        mPhoneNum
        mPhoneNumCompany
        mPhoneNumFriend
        mPhoneNumInside
        mRank
        resign
        updatedAt
        lastModifiedBy
      }
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
        round
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
  query Query($page: Int, $limit: Int) {
    seeStudent(page: $page, limit: $limit) {
      error
      message
      ok
      totalCount
      student {
        birthday
        createdAt
        name
        phoneNum1
        writer
        smsAgreement
        id
        updatedAt
        studentPayment {
          id
        }
      }
    }
  }
`

export const SEE_AMOUNT_STUDENT_QUERY = gql`
  query Query($page: Int, $limit: Int) {
    seeStudent(page: $page, limit: $limit) {
      error
      message
      ok
      totalCount
      student {
        studentPayment {
          amountReceived
          cardAmount
          cashAmount
          discountAmount
          id
          processingManager {
            mUserId
            mUsername
            id
          }
          paymentDate
          tuitionFee
          unCollectedAmount
          subject {
            subjectName
            subDiv
            id
          }
        }
        phoneNum1
        name
      }
    }
  }
`

// 회계
export const SEE_PAYMENT_QUERY = gql`
  query SeeStudentPayment($page: Int, $limit: Int) {
    seeStudentPayment(page: $page, limit: $limit) {
      totalCount
      ok
      message
      error
      StudentPayment {
        amountReceived
        actualAmount
        discountAmount
        unCollectedAmount
        tuitionFee
        updatedAt
        subject {
          id
          subjectName
          round
        }
        processingManager {
          mUsername
        }
        student {
          name
          id
        }
        id
      }
    }
  }
`
export const SEE_PAYMENT_DETAIL_QUERY = gql`
  query Query($page: Int, $limit: Int) {
    seePaymentDetail(page: $page, limit: $limit) {
      ok
      message
      error
      totalCount
      PaymentDetail {
        id
        cashOrCard
        amountPayment
        ApprovalNum
        accountingManager
        paymentDate
        depositAmount
        studentPaymentId
        studentPayment {
          subject {
            id
            subjectName
            round
          }
        }
        receiver {
          id
          mUserId
          mUsername
        }
        receiverId
        refundApproval
        stName
        studentId
      }
    }
  }
`

export const SEE_REFUND_QUERY = gql`
  query SeePaymentDetail($page: Int, $limit: Int) {
    seePaymentDetail(page: $page, limit: $limit) {
      ok
      error
      message
      totalCount
      PaymentDetail {
        amountPayment
        cashOrCard
        id
        receiver {
          mUsername
        }
        studentPaymentId
        updatedAt
        studentPayment {
          processingManagerId
          amountReceived
          subjectId
          subject {
            subjectName
            id
          }
          subject {
            subjectName
          }
        }
        depositAmount
        reqRefund
        reqRefundManager
        bankName
        cardCompany
        receiverId
        refundApproval
        refundManager
        stName
      }
    }
  }
`

// 통계
export const GET_SALES_QUERY = gql`
  query GetSalesData($startDate: String!, $endDate: String!) {
    getSalesData(startDate: $startDate, endDate: $endDate) {
      cardRefundTotal
      cardTotal
      cashRefundTotal
      cashTotal
      paymentTotal
      date
      refundTotal
      totalAmount
    }
  }
`
