import { gql } from '@apollo/client'

// login
export const LOGIN_MUTATION = gql`
  mutation CreateStudentState($mUserId: String!, $mPassword: String!) {
    mLogin(mUserId: $mUserId, mPassword: $mPassword) {
      error
      ok
      token
    }
  }
`

// logs
export const USER_LOGS_MUTATION = gql`
  mutation Mutation($eventName: String!, $description: String) {
    createUserActivityLogs(eventName: $eventName, description: $description) {
      error
      message
      ok
    }
  }
`

// manager
export const EDIT_MANAGE_USER_MUTATION = gql`
  mutation Mutation(
    $mUsername: String
    $mGrade: Int
    $mRank: String
    $mPhoneNum: String
    $mPhoneNumCompany: String
    $mPhoneNumInside: String
    $mPhoneNumFriend: String
    $mPart: [String]
    $mAvatar: String
    $mJoiningDate: String
    $mAddresses: String
  ) {
    editManageUser(
      mUsername: $mUsername
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
export const UPDATE_FAVORITE_MUTATION2 = gql`
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
export const UPDATE_FAVORITE_MUTATION = gql`
  mutation Mutation($updateFavoriteId: Int!) {
    updateFavorite(id: $updateFavoriteId) {
      error
      message
      ok
      favoriteStudentState {
        id
        favoriteStudentState
        StudentStates {
          adviceTypes {
            id
            type
          }
          phoneNum1
          createdAt
          id
          pic
          progress
          receiptDiv
          stName
          stVisit
          subDiv
        }
        mUserId
        mUsername
      }
    }
  }
`

// studentState
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
        classMethod
        consultationMemo {
          studentStateId
          manageUserId
          manageUser {
            id
            mUserId
            mUsername
          }
          content
          createdAt
          id
          updatedAt
          studentState {
            id
          }
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
        subDiv
        stVisit
        updatedAt
        subject
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

// adiveType
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

// consultMemo
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
  mutation Mutation($deleteConsultationMemoId: Int!) {
    deleteConsultationMemo(id: $deleteConsultationMemoId) {
      error
      message
      ok
    }
  }
`

// subject
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
    $round: Int!
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
      round: $round
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
    $subjectCode: String
    $round: Int
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
      subjectCode: $subjectCode
      round: $round
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
    $subjectCode: String
  ) {
    searchSubject(
      id: $searchSubjectId
      subDiv: $subDiv
      subjectName: $subjectName
      exposure: $exposure
      page: $page
      limit: $limit
      subjectCode: $subjectCode
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
        round
      }
      totalCount
    }
  }
`
export const SEARCH_SUBJECT_BASIC_MUTATION = gql`
  mutation SearchSubject($subjectName: String, $exposure: Boolean) {
    searchSubject(subjectName: $subjectName, exposure: $exposure) {
      error
      message
      ok
      result {
        fee
        subDiv
        subjectCode
        subjectName
      }
    }
  }
`

//students
export const CREATE_STUDENT_MUTATION = gql`
  mutation CreateStudent(
    $name: String
    $phoneNum1: String
    $phoneNum2: String
    $smsAgreement: String
    $birthday: String
  ) {
    createStudent(
      name: $name
      phoneNum1: $phoneNum1
      phoneNum2: $phoneNum2
      smsAgreement: $smsAgreement
      birthday: $birthday
    ) {
      error
      message
      ok
    }
  }
`
export const CHECK_DOUBLE_MUTATION = gql`
  mutation DoubleCheck($name: String!, $phoneNum1: String!) {
    doubleCheck(name: $name, phoneNum1: $phoneNum1) {
      error
      message
      ok
    }
  }
`
export const SEARCH_STUDENT_MUTATION = gql`
  mutation Mutation($searchStudentId: Int) {
    searchStudent(id: $searchStudentId) {
      error
      message
      ok
      student {
        birthday
        createdAt
        id
        name
        phoneNum1
        phoneNum2
        smsAgreement
        updatedAt
        writer
        studentPayment {
          actualAmount
          amountReceived
          campus
          cardAmount
          cashAmount
          classCode
          courseComplete
          discountAmount
          dueDate
          employment
          id
          lectureAssignment
          paymentDate
          paymentDetail {
            ApprovalNum
            amountPayment
            bankName
            cardCompany
            cardNum
            cashOrCard
            createdAt
            cashReceipts
            depositAmount
            depositDate
            depositorName
            id
            installment
            paymentDate
            receiver {
              mUserId
              mUsername
            }
            receiverId
            refundApproval
            refundApprovalDate
            refundManager
            reqRefund
            reqRefundDate
            reqRefundManager
            stName
            updatedAt
          }
          processingManagerId
          createdAt
          updatedAt
          seScore
          situationReport
          unCollectedAmount
          tuitionFee
          subDiv
          subjectId
          subject {
            subDiv
            subjectCode
            subjectName
          }
        }
        studentMemo {
          content
          createdAt
          id
          manageUser {
            mUserId
            mUsername
          }
          manageUserId
          updatedAt
          studentId
        }
      }
    }
  }
`
export const SEARCH_STUDENT_FILTER_MUTATION = gql`
  mutation Mutation(
    $searchStudentId: Int
    $studentName: String
    $createdAt: [String]
    $birthday: [String]
    $phoneNum: String
    $page: Int
    $limit: Int
  ) {
    searchStudent(
      id: $searchStudentId
      studentName: $studentName
      createdAt: $createdAt
      birthday: $birthday
      phoneNum: $phoneNum
      page: $page
      limit: $limit
    ) {
      error
      message
      ok
      totalCount
      student {
        birthday
        createdAt
        id
        name
        phoneNum1
        smsAgreement
        writer
        updatedAt
        studentPayment {
          id
        }
      }
    }
  }
`
export const SEARCH_STUDENT_MEMO_MUTATION = gql`
  mutation SearchStudent($searchStudentId: Int) {
    searchStudent(id: $searchStudentId) {
      error
      message
      ok
      student {
        studentMemo {
          manageUser {
            id
            mUserId
            mUsername
          }
          manageUserId
          createdAt
          updatedAt
          id
          content
        }
      }
    }
  }
`
export const SEARCH_STUDENT_BASIC_MUTATION = gql`
  mutation SearchStudent($searchStudentId: Int) {
    searchStudent(id: $searchStudentId) {
      error
      message
      ok
      student {
        birthday
        id
        name
        phoneNum1
        phoneNum2
        smsAgreement
        writer
        createdAt
        updatedAt
      }
    }
  }
`
export const SEARCH_STUDENT_PAYMENT_MUTATION = gql`
  mutation Mutation($searchStudentId: Int) {
    searchStudent(id: $searchStudentId) {
      error
      message
      ok
      student {
        birthday
        createdAt
        id
        name
        phoneNum1
        phoneNum2
        smsAgreement
        updatedAt
        writer
        studentPayment {
          actualAmount
          amountReceived
          campus
          cardAmount
          cashAmount
          classCode
          courseComplete
          discountAmount
          dueDate
          employment
          id
          lectureAssignment
          paymentDate
          paymentDetail {
            ApprovalNum
            amountPayment
            bankName
            cardCompany
            cardNum
            cashOrCard
            createdAt
            cashReceipts
            depositAmount
            depositDate
            depositorName
            id
            installment
            paymentDate
            receiver {
              mUserId
              mUsername
            }
            receiverId
            refundApproval
            refundApprovalDate
            refundManager
            reqRefund
            reqRefundDate
            reqRefundManager
            stName
            updatedAt
          }
          processingManagerId
          processingManager {
            mUserId
            mUsername
          }
          seScore
          situationReport
          unCollectedAmount
          tuitionFee
          subDiv
          subjectId
          subject {
            subDiv
            subjectCode
            subjectName
          }
        }
      }
    }
  }
`

export const UPDATE_STUDENT_BASIC_MUTATION = gql`
  mutation EditStudent(
    $editStudentId: Int!
    $name: String
    $phoneNum1: String
    $phoneNum2: String
    $smsAgreement: String
    $birthday: String
  ) {
    editStudent(
      id: $editStudentId
      name: $name
      phoneNum1: $phoneNum1
      phoneNum2: $phoneNum2
      smsAgreement: $smsAgreement
      birthday: $birthday
    ) {
      error
      message
      ok
    }
  }
`
export const UPDATE_STUDENT_COURSE_MUTATION = gql`
  mutation Mutation(
    $editStudentPaymentId: Int!
    $lectureAssignment: String
    $processingManagerId: Int
    $subjectId: Int
  ) {
    editStudentPayment(
      id: $editStudentPaymentId
      lectureAssignment: $lectureAssignment
      processingManagerId: $processingManagerId
      subjectId: $subjectId
    ) {
      error
      message
      ok
    }
  }
`

//StudentPayment
export const CREATE_STUDENT_PAYMENT_MUTATION = gql`
  mutation Mutation(
    $campus: String!
    $seScore: Int!
    $tuitionFee: Int!
    $studentId: Int!
    $processingManagerId: Int!
    $subjectId: Int!
    $dueDate: String
    $subDiv: String
    $amountReceived: Int
    $situationReport: Boolean
    $paymentDate: String
    $unCollectedAmount: Int
    $actualAmount: Int
    $discountAmount: String
    $isWeekend: String
  ) {
    createStudentPayment(
      campus: $campus
      seScore: $seScore
      tuitionFee: $tuitionFee
      studentId: $studentId
      processingManagerId: $processingManagerId
      subjectId: $subjectId
      dueDate: $dueDate
      subDiv: $subDiv
      amountReceived: $amountReceived
      situationReport: $situationReport
      paymentDate: $paymentDate
      unCollectedAmount: $unCollectedAmount
      actualAmount: $actualAmount
      discountAmount: $discountAmount
      isWeekend: $isWeekend
    ) {
      error
      message
      ok
    }
  }
`
export const UPDATE_STUDENT_PAYMENT_MUTATION = gql`
  mutation Mutation(
    $editStudentPaymentId: Int!
    $subjectId: Int!
    $seScore: Int
    $tuitionFee: Int
    $discountAmount: String
    $cashAmount: Int
    $cardAmount: Int
    $actualAmount: Int
    $unCollectedAmount: Int
    $paymentDate: String
    $processingManagerId: Int
    $situationReport: Boolean
    $amountReceived: Int
    $subDiv: String
    $dueDate: String
    $isWeekend: String
  ) {
    editStudentPayment(
      id: $editStudentPaymentId
      subjectId: $subjectId
      seScore: $seScore
      tuitionFee: $tuitionFee
      discountAmount: $discountAmount
      cashAmount: $cashAmount
      cardAmount: $cardAmount
      actualAmount: $actualAmount
      unCollectedAmount: $unCollectedAmount
      paymentDate: $paymentDate
      processingManagerId: $processingManagerId
      situationReport: $situationReport
      amountReceived: $amountReceived
      subDiv: $subDiv
      dueDate: $dueDate
      isWeekend: $isWeekend
    ) {
      error
      message
      ok
    }
  }
`
export const CREATE_PAYMENT_DETAIL_MUTATION = gql`
  mutation Mutation(
    $cashOrCard: String!
    $studentPaymentId: Int!
    $cardCompany: String
    $cardNum: String
    $installment: Int
    $approvalNum: String
    $amountPayment: Int
    $paymentDate: String
    $depositDate: String
    $depositAmount: Int
    $depositorName: String
    $bankName: String
    $cashReceipts: [String]
  ) {
    createPaymentDetail(
      cashOrCard: $cashOrCard
      studentPaymentId: $studentPaymentId
      cardCompany: $cardCompany
      cardNum: $cardNum
      installment: $installment
      ApprovalNum: $approvalNum
      amountPayment: $amountPayment
      paymentDate: $paymentDate
      depositDate: $depositDate
      depositAmount: $depositAmount
      depositorName: $depositorName
      bankName: $bankName
      cashReceipts: $cashReceipts
    ) {
      ok
      error
      message
    }
  }
`

export const UPDATE_PAYMENT_DETAIL_MUTATION = gql`
  mutation EditPaymentDetail(
    $editPaymentDetailId: Int!
    $cashOrCard: String!
    $studentPaymentId: Int!
    $cardCompany: String
    $cardNum: String
    $installment: Int
    $approvalNum: String
    $amountPayment: Int
    $paymentDate: String
    $bankName: String
    $depositorName: String
    $depositAmount: Int
    $depositDate: String
    $cashReceipts: [String]
  ) {
    editPaymentDetail(
      id: $editPaymentDetailId
      cashOrCard: $cashOrCard
      studentPaymentId: $studentPaymentId
      cardCompany: $cardCompany
      cardNum: $cardNum
      installment: $installment
      ApprovalNum: $approvalNum
      amountPayment: $amountPayment
      paymentDate: $paymentDate
      bankName: $bankName
      depositorName: $depositorName
      depositAmount: $depositAmount
      depositDate: $depositDate
      cashReceipts: $cashReceipts
    ) {
      ok
      error
      message
    }
  }
`
export const SEARCH_PAYMENT_DETAIL_FILTER_MUTATION = gql`
  mutation Mutation(
    $sortOf: String
    $refundApprovalDate: [String]
    $reqRefundDate: [String]
    $refundApproval: Boolean
    $reqRefund: Boolean
    $limit: Int
    $page: Int
    $stName: String
    $period: [String]
  ) {
    searchPaymentDetail(
      sortOf: $sortOf
      refundApprovalDate: $refundApprovalDate
      reqRefundDate: $reqRefundDate
      refundApproval: $refundApproval
      reqRefund: $reqRefund
      limit: $limit
      page: $page
      stName: $stName
      period: $period
    ) {
      totalCount
      ok
      message
      error
      PaymentDetail {
        ApprovalNum
        amountPayment
        bankName
        cardCompany
        cardNum
        cashOrCard
        createdAt
        depositAmount
        depositDate
        depositorName
        id
        installment
        paymentDate
        receiver {
          id
          mUsername
          mUserId
        }
        receiverId
        refundApproval
        refundApprovalDate
        refundManager
        reqRefund
        reqRefundDate
        reqRefundManager
        stName
        studentId
        studentPaymentId
        updatedAt
        studentPayment {
          amountReceived
          processingManagerId
          id
          subjectId
          subject {
            id
            subjectName
          }
        }
      }
    }
  }
`
export const SEARCH_PAYMENT_MUTATION = gql`
  mutation SearchStudentPayment($searchStudentPaymentId: Int!) {
    searchStudentPayment(id: $searchStudentPaymentId) {
      ok
      message
      error
      data {
        actualAmount
        amountReceived
        campus
        cardAmount
        cashAmount
        classCode
        courseComplete
        createdAt
        discountAmount
        dueDate
        employment
        id
        isWeekend
        lectureAssignment
        paymentDate
        paymentDetail {
          id
          cashOrCard
          cardCompany
          cardNum
          installment
          ApprovalNum
          amountPayment
          paymentDate
          bankName
          depositorName
          depositAmount
          depositDate
          studentPaymentId
          receiver {
            id
            mUserId
            mUsername
          }
          receiverId
          reqRefund
          reqRefundManager
          reqRefundDate
          refundApproval
          refundManager
          refundApprovalDate
          createdAt
          updatedAt
          studentId
          stName
          cashReceipts
        }
        processingManagerId
        seScore
        situationReport
        student {
          birthday
          createdAt
          id
          name
          phoneNum1
          updatedAt
          writer
        }
        studentId
        subDiv
        subject {
          subjectName
          subjectCode
          subDiv
          round
          id
          fee
        }
        subjectId
        tuitionFee
        unCollectedAmount
        updatedAt
      }
    }
  }
`
export const SEARCH_PAYMENT_DETAIL_MUTATION = gql`
  mutation SearchPaymentDetail($searchPaymentDetailId: Int) {
    searchPaymentDetail(id: $searchPaymentDetailId) {
      totalCount
      ok
      message
      error
      PaymentDetail {
        ApprovalNum
        amountPayment
        bankName
        cardNum
        cardCompany
        cashOrCard
        cashReceipts
        createdAt
        depositAmount
        depositDate
        depositorName
        id
        installment
        paymentDate
        receiver {
          mUserId
        }
        receiverId
        refundApproval
        refundApprovalDate
        refundManager
        reqRefund
        reqRefundDate
        reqRefundManager
        stName
        studentId
        studentPayment {
          id
          actualAmount
          amountReceived
          campus
          cardAmount
          cashAmount
          classCode
          courseComplete
          createdAt
          discountAmount
          employment
          dueDate
          lectureAssignment
          paymentDate
          processingManagerId
          seScore
          situationReport
          studentId
          student {
            birthday
            createdAt
            id
            name
            phoneNum1
            updatedAt
          }
          subDiv
          updatedAt
          unCollectedAmount
          tuitionFee
          subjectId
          subject {
            subjectCode
            subjectName
            id
            subDiv
            fee
            round
          }
        }
        studentPaymentId
        updatedAt
      }
    }
  }
`
export const UPDATE_STUDENT_RECEIVED_MUTATION = gql`
  mutation EditStudentPayment(
    $editStudentPaymentId: Int!
    $subjectId: Int
    $amountReceived: Int
    $processingManagerId: Int
  ) {
    editStudentPayment(
      id: $editStudentPaymentId
      subjectId: $subjectId
      amountReceived: $amountReceived
      processingManagerId: $processingManagerId
    ) {
      error
      message
      ok
    }
  }
`

// StudentMemo
export const CREATE_STUDENT_MEMO_MUTATION = gql`
  mutation Mutation($content: String!, $studentId: Int!) {
    createStudentMemo(content: $content, studentId: $studentId) {
      error
      message
      ok
    }
  }
`
export const UPDATE_STUDENT_MEMO_MUTATION = gql`
  mutation EditStudentMemo($editStudentMemoId: Int!, $content: String!) {
    editStudentMemo(id: $editStudentMemoId, content: $content) {
      error
      message
      ok
    }
  }
`
export const DELETE_STUDENT_MEMO_MUTATION = gql`
  mutation DeleteStudentMemo($deleteStudentMemoId: Int!) {
    deleteStudentMemo(id: $deleteStudentMemoId) {
      error
      message
      ok
    }
  }
`

//refund
export const REQ_REFUND_MUTATION = gql`
  mutation Mutation(
    $reqRefundId: Int!
    $reqRefund: Boolean!
    $reqRefundDate: String!
  ) {
    reqRefund(
      id: $reqRefundId
      reqRefund: $reqRefund
      reqRefundDate: $reqRefundDate
    ) {
      error
      message
      ok
    }
  }
`
export const APPROVAL_REFUND_MUTATION = gql`
  mutation Mutation(
    $refundApprovalId: Int!
    $refundApproval: Boolean!
    $refundApprovalDate: String!
    $studentPaymentId: Int!
  ) {
    refundApproval(
      id: $refundApprovalId
      refundApproval: $refundApproval
      refundApprovalDate: $refundApprovalDate
      studentPaymentId: $studentPaymentId
    ) {
      error
      message
      ok
    }
  }
`
export const CLASS_CANCEL_MUTATION = gql`
  mutation ClassCancellation(
    $classCancellationId: Int!
    $courseComplete: String!
  ) {
    classCancellation(
      id: $classCancellationId
      courseComplete: $courseComplete
    ) {
      error
      message
      ok
    }
  }
`

// statistics
export const SALES_STATISTICS_MUTATION = gql`
  mutation Mutation(
    $period: [String]!
    $processingManagerId: [Int]!
    $page: Int
    $limit: Int
  ) {
    salesStatistics(
      period: $period
      processingManagerId: $processingManagerId
      page: $page
      limit: $limit
    ) {
      data {
        totalCount
        totalActualAmount
        processingManagerId
      }
      ok
      message
      error
    }
  }
`
