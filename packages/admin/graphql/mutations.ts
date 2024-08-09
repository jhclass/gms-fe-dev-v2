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

export const READ_ALARMS_MUTATION = gql`
  mutation ReadAlarms($readAlarmsId: Int, $all: String) {
    readAlarms(id: $readAlarmsId, all: $all) {
      error
      message
      ok
    }
  }
`

// manager
export const CREATE_MANAGE_USER_MUTATION = gql`
  mutation Mutation(
    $mUserId: String!
    $mUsername: String!
    $mPassword: String!
    $mGrade: Int
    $mRank: String
    $mPart: [String]
    $mPhoneNum: String
    $mPhoneNumCompany: String
    $mPhoneNumFriend: String
    $mPhoneNumInside: String
    $mJoiningDate: String
    $mZipCode: String
    $mAddressDetail: String
    $mAddresses: String
    $email: String
  ) {
    createManagerAccount(
      mUserId: $mUserId
      mUsername: $mUsername
      mPassword: $mPassword
      mGrade: $mGrade
      mRank: $mRank
      mPart: $mPart
      mPhoneNum: $mPhoneNum
      mPhoneNumCompany: $mPhoneNumCompany
      mPhoneNumFriend: $mPhoneNumFriend
      mPhoneNumInside: $mPhoneNumInside
      mJoiningDate: $mJoiningDate
      mZipCode: $mZipCode
      mAddressDetail: $mAddressDetail
      mAddresses: $mAddresses
      email: $email
    ) {
      error
      ok
    }
  }
`

export const EDIT_MANAGE_USER_MUTATION = gql`
  mutation Mutation(
    $editManageUserId: Int
    $mUsername: String
    $mPassword: String
    $mRank: String
    $mPhoneNum: String
    $mPhoneNumCompany: String
    $mPhoneNumInside: String
    $mPart: [String]
    $mPhoneNumFriend: String
    $mAvatar: Upload
    $mZipCode: String
    $mAddressDetail: String
    $mAddresses: String
    $mJoiningDate: String
    $email: String
    $resign: String
  ) {
    editManageUser(
      id: $editManageUserId
      mUsername: $mUsername
      mPassword: $mPassword
      mRank: $mRank
      mPhoneNum: $mPhoneNum
      mPhoneNumCompany: $mPhoneNumCompany
      mPhoneNumInside: $mPhoneNumInside
      mPart: $mPart
      mPhoneNumFriend: $mPhoneNumFriend
      mAvatar: $mAvatar
      mZipCode: $mZipCode
      mAddressDetail: $mAddressDetail
      mAddresses: $mAddresses
      mJoiningDate: $mJoiningDate
      email: $email
      resign: $resign
    ) {
      error
      message
      ok
    }
  }
`
export const DEV_EDIT_MANAGE_USER_MUTATION = gql`
  mutation Mutation(
    $mUserId: [String]
    $mUsername: String
    $mPassword: String
    $mRank: String
    $mPhoneNum: String
    $mPhoneNumCompany: String
    $mPhoneNumInside: String
    $mPhoneNumFriend: String
    $mPart: [String]
    $mAvatar: String
    $mJoiningDate: String
    $mAddresses: String
    $resign: String
    $email: String
    $mGrade: Int
  ) {
    devEditManageUser(
      mUserId: $mUserId
      mUsername: $mUsername
      mPassword: $mPassword
      mRank: $mRank
      mPhoneNum: $mPhoneNum
      mPhoneNumCompany: $mPhoneNumCompany
      mPhoneNumInside: $mPhoneNumInside
      mPhoneNumFriend: $mPhoneNumFriend
      mPart: $mPart
      mAvatar: $mAvatar
      mJoiningDate: $mJoiningDate
      mAddresses: $mAddresses
      resign: $resign
      email: $email
      mGrade: $mGrade
    ) {
      error
      message
      ok
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
    $adviceTypes: [Int]!
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
    $today: [String]
    $branchId: Int
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
      today: $today
      branchId: $branchId
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
    $adviceTypes: [Int]
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
  mutation Mutation($type: String!, $indexNum: Int!, $category: String!) {
    createAdviceType(type: $type, indexNum: $indexNum, category: $category) {
      error
      message
      ok
    }
  }
`

export const EDIT_ADVICE_TYPE_MUTATION = gql`
  mutation EditAdviceType($editAdviceTypeId: Int!, $onOff: String) {
    editAdviceType(id: $editAdviceTypeId, onOff: $onOff) {
      message
      ok
      error
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
        updatedAt
        totalTime
        teacherName
        subjectName
        subjectCode
        subDiv
        startDate
        round
        roomNum
        lectures {
          id
        }
        id
        fee
        exposure
        expiresDateStart
        expiresDateEnd
        createdAt
        endDate
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
  mutation EditStudentPayment(
    $editStudentPaymentId: Int!
    $subjectId: Int!
    $processingManagerId: Int
    $lectureAssignment: String
  ) {
    editStudentPayment(
      id: $editStudentPaymentId
      subjectId: $subjectId
      processingManagerId: $processingManagerId
      lectureAssignment: $lectureAssignment
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
    $lectureAssignment: String
    $courseComplete: String
    $employment: String
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
      lectureAssignment: $lectureAssignment
      courseComplete: $courseComplete
      employment: $employment
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
export const SEARCH_PAYMENT_MUTATION = gql`
  mutation SearchStudentPayment($searchStudentPaymentId: Int) {
    searchStudentPayment(id: $searchStudentPaymentId) {
      ok
      message
      error
      totalCount
      data {
        actualAmount
        amountReceived
        campus
        cardAmount
        cashAmount
        classCode
        dateOfDroppingOut
        reasonFordroppingOut
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
          ApprovalNum
          accountingManager
          amountPayment
          bankName
          cardCompany
          cardNum
          cashOrCard
          cashReceipts
          createdAt
          depositAmount
          depositorName
          depositDate
          id
          installment
          paymentDate
          receiver {
            mUserId
            mUsername
            id
          }
          receiverId
          refundApproval
          refundApprovalDate
          reqRefund
          refundManager
          reqRefundDate
          reqRefundManager
          stName
          studentId
          updatedAt
        }
        processingManager {
          mUserId
          mUsername
          id
        }
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
          writer
          updatedAt
        }
        subDiv
        subject {
          fee
          id
          subDiv
          subjectName
          subjectCode
          lectures {
            id
          }
        }
        subjectId
        tuitionFee
        unCollectedAmount
        updatedAt
      }
    }
  }
`

export const SEARCH_PAYMENT_FILTER_MUTATION = gql`
  mutation Mutation(
    $page: Int
    $limit: Int
    $studentName: String
    $period: [String]
    $createdPeriod: [String]
  ) {
    searchStudentPayment(
      page: $page
      limit: $limit
      studentName: $studentName
      period: $period
      createdPeriod: $createdPeriod
    ) {
      data {
        actualAmount
        amountReceived
        discountAmount
        id
        processingManager {
          mUsername
        }
        student {
          name
        }
        subject {
          round
          subDiv
          subjectCode
          subjectName
        }
        updatedAt
        unCollectedAmount
        tuitionFee
      }
      error
      message
      ok
      totalCount
    }
  }
`
export const CREATE_PAYMENT_DETAIL_MUTATION = gql`
  mutation CreatePaymentDetail(
    $cashOrCard: String!
    $studentPaymentId: Int!
    $receiverId: Int!
    $cardCompany: String
    $cardNum: String
    $installment: Int
    $approvalNum: String
    $amountPayment: Int
    $paymentDate: String
    $bankName: String
    $depositorName: String
    $depositAmount: Int
    $cashReceipts: [String]
  ) {
    createPaymentDetail(
      cashOrCard: $cashOrCard
      studentPaymentId: $studentPaymentId
      receiverId: $receiverId
      cardCompany: $cardCompany
      cardNum: $cardNum
      installment: $installment
      ApprovalNum: $approvalNum
      amountPayment: $amountPayment
      paymentDate: $paymentDate
      bankName: $bankName
      depositorName: $depositorName
      depositAmount: $depositAmount
      cashReceipts: $cashReceipts
    ) {
      error
      message
      ok
    }
  }
`
export const UPDATE_PAYMENT_DETAIL_MUTATION = gql`
  mutation EditPaymentDetail(
    $editPaymentDetailId: Int!
    $cashOrCard: String!
    $studentPaymentId: Int!
    $receiverId: Int!
    $cardCompany: String
    $cardNum: String
    $installment: Int
    $approvalNum: String
    $amountPayment: Int
    $paymentDate: String
    $bankName: String
    $depositorName: String
    $depositAmount: Int
    $cashReceipts: [String]
  ) {
    editPaymentDetail(
      id: $editPaymentDetailId
      cashOrCard: $cashOrCard
      studentPaymentId: $studentPaymentId
      receiverId: $receiverId
      cardCompany: $cardCompany
      cardNum: $cardNum
      installment: $installment
      ApprovalNum: $approvalNum
      amountPayment: $amountPayment
      paymentDate: $paymentDate
      bankName: $bankName
      depositorName: $depositorName
      depositAmount: $depositAmount
      cashReceipts: $cashReceipts
    ) {
      ok
      message
      error
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
export const SEARCH_PAYMENT_DETAIL_FILTER_MUTATION = gql`
  mutation Mutation(
    $stName: String
    $sortOf: String
    $paymentDate: [String]
    $page: Int
    $limit: Int
    $reqRefund: Boolean
    $refundApproval: Boolean
    $reqRefundDate: [String]
    $refundApprovalDate: [String]
    $approvalNum: String
  ) {
    searchPaymentDetail(
      stName: $stName
      sortOf: $sortOf
      paymentDate: $paymentDate
      page: $page
      limit: $limit
      reqRefund: $reqRefund
      refundApproval: $refundApproval
      reqRefundDate: $reqRefundDate
      refundApprovalDate: $refundApprovalDate
      ApprovalNum: $approvalNum
    ) {
      totalCount
      ok
      message
      error
      PaymentDetail {
        ApprovalNum
        accountingManager
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
            subDiv
            subjectCode
            subjectName
            round
          }
        }
      }
    }
  }
`
export const UPDATE_STUDENT_RECEIVED_MUTATION = gql`
  mutation EditStudentPayment(
    $editStudentPaymentId: Int!
    $subjectId: Int!
    $processingManagerId: Int
    $amountReceived: Int
  ) {
    editStudentPayment(
      id: $editStudentPaymentId
      subjectId: $subjectId
      processingManagerId: $processingManagerId
      amountReceived: $amountReceived
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
  mutation Mutation(
    $classCancellationId: Int!
    $courseComplete: String!
    $dateOfDroppingOut: String
    $reasonFordroppingOut: String
  ) {
    classCancellation(
      id: $classCancellationId
      courseComplete: $courseComplete
      dateOfDroppingOut: $dateOfDroppingOut
      reasonFordroppingOut: $reasonFordroppingOut
    ) {
      error
      message
      ok
    }
  }
`
export const CLASS_CHECK_MUTATION = gql`
  mutation DuplicateCheck($studentId: Int!, $subjectId: Int!) {
    duplicateCheck(studentId: $studentId, subjectId: $subjectId) {
      error
      message
      ok
    }
  }
`
// statistics
export const SALES_STATISTICS_MUTATION = gql`
  mutation SalesStatistics($period: [String]!, $receiverId: [Int]!) {
    salesStatistics(period: $period, receiverId: $receiverId) {
      ok
      message
      error
      data {
        receiverId
        totalActualAmount
        totalAmount
        totalPaymentCount
        totalRefundAmount
        totalRefundCount
      }
    }
  }
`
export const SALES_STATISTICS_LIST_MUTATION = gql`
  mutation SearchPaymentDetail(
    $receiverId: Int
    $page: Int
    $limit: Int
    $sortOf: String
    $refundApproval: Boolean
    $paymentDate: [String]
  ) {
    searchPaymentDetail(
      receiverId: $receiverId
      page: $page
      limit: $limit
      sortOf: $sortOf
      refundApproval: $refundApproval
      paymentDate: $paymentDate
    ) {
      totalCount
      ok
      message
      error
      PaymentDetail {
        amountPayment
        cashOrCard
        paymentDate
        depositAmount
        id
        stName
        refundApproval
        studentPayment {
          subject {
            round
            id
            subDiv
            subjectCode
            subjectName
          }
        }
      }
    }
  }
`

export const SALES_STATISTICS_REFUND_LIST_MUTATION = gql`
  mutation SearchPaymentDetail(
    $receiverId: Int
    $page: Int
    $limit: Int
    $sortOf: String
    $reqRefund: Boolean
    $refundApproval: Boolean
    $refundApprovalDate: [String]
  ) {
    searchPaymentDetail(
      receiverId: $receiverId
      page: $page
      limit: $limit
      sortOf: $sortOf
      reqRefund: $reqRefund
      refundApproval: $refundApproval
      refundApprovalDate: $refundApprovalDate
    ) {
      totalCount
      ok
      message
      error
      PaymentDetail {
        amountPayment
        cashOrCard
        depositAmount
        refundApprovalDate
        id
        stName
        refundApproval
        studentPayment {
          subject {
            round
            id
            subDiv
            subjectCode
            subjectName
          }
        }
      }
    }
  }
`

export const GET_HOURLY_SALES_MUTATION = gql`
  mutation Mutation($date: [String]!) {
    getHourlySalesData(date: $date) {
      ok
      error
      hourlyDetails {
        nowDate
        cashOrCard
        currentState
        amount
      }
      hourlyTotalCard
      hourlyTotalCardRefund
      hourlyTotalCashRefund
      hourlyTotalCash
      thisTimeRefundTotal
      thisTimeAmountTotal
      thisTimeRealTotal
    }
  }
`
export const CHANGE_ORDER_AT_MUTATION = gql`
  mutation Mutation($ids: [Int], $indexNums: [Int!]) {
    changeOrderAT(ids: $ids, indexNums: $indexNums) {
      error
      message
      ok
    }
  }
`

export const CREATE_LECTURES_MUTATION = gql`
  mutation CreateLectures(
    $campus: String!
    $temporaryName: String!
    $subDiv: String!
    $teachersId: [Int]!
    $roomNum: String!
    $subjectId: Int!
    $lecturePeriodStart: String!
    $lecturePeriodEnd: String!
    $lectureDetails: [String]!
    $lectureTime: [String]!
    $eduStatusReport: String!
    $approvedNum: Int!
    $confirmedNum: Int!
    $sessionNum: Int!
    $timetableAttached: Upload
  ) {
    createLectures(
      campus: $campus
      temporaryName: $temporaryName
      subDiv: $subDiv
      teachersId: $teachersId
      roomNum: $roomNum
      subjectId: $subjectId
      lecturePeriodStart: $lecturePeriodStart
      lecturePeriodEnd: $lecturePeriodEnd
      lectureDetails: $lectureDetails
      lectureTime: $lectureTime
      eduStatusReport: $eduStatusReport
      ApprovedNum: $approvedNum
      confirmedNum: $confirmedNum
      sessionNum: $sessionNum
      timetableAttached: $timetableAttached
    ) {
      error
      message
      ok
    }
  }
`
export const SEARCH_LECTURES_MUTATION = gql`
  mutation SearchLectures(
    $searchLecturesId: Int
    $periodStart: String
    $periodEnd: String
    $temporaryName: String
    $subjectId: Int
    $teacherId: Int
  ) {
    searchLectures(
      id: $searchLecturesId
      periodStart: $periodStart
      periodEnd: $periodEnd
      temporaryName: $temporaryName
      subjectId: $subjectId
      teacherId: $teacherId
    ) {
      data {
        subject {
          StudentPayment {
            student {
              name
              phoneNum1
            }
            attendance {
              attendanceDate
              attendanceDateTime
              attendanceState
              createdAt
              id
              isCanceled
              updatedAt
              studentPaymentId
              studentId
              lecturesId
            }
            situationReport
            lectureAssignment
            isWeekend
            id
            subDiv
            student {
              id
              name
            }
            employment
            courseComplete
          }
          createdAt
          subjectName
          subjectCode
          subDiv
          round
          roomNum
          id
        }
        updatedAt
        timetableAttached
        temporaryName
        teachers {
          id
          mUserId
          mUsername
        }
        subDiv
        sessionNum
        roomNum
        lectureTime
        lecturePeriodStart
        lecturePeriodEnd
        lectureDetails
        id
        eduStatusReport
        createdAt
        subjectId
        confirmedNum
        campus
        ApprovedNum
        WorkLogs {
          id
          absentSt
          attendanceCount
          createdAt
          etc
          instruction
          leaveEarlySt
          lecturesId
          paymentOne
          paymentThree
          paymentTwo
          tardySt
          workLogsDate
          updatedAt
          trainingTimeTotal
          trainingTimeOneday
          trainingInfoTwo
          trainingInfoThree
          trainingInfoSix
          trainingInfoSeven
          trainingInfoOne
          trainingInfoFour
          trainingInfoFive
          trainingInfoEight
        }
      }
      totalCount
      ok
      message
      error
    }
  }
`
export const EDIT_LECTURES_MUTATION = gql`
  mutation Mutation(
    $editLecturesId: Int!
    $campus: String
    $temporaryName: String
    $subDiv: String
    $teachersId: [Int]
    $roomNum: String
    $subjectId: Int
    $lecturePeriodStart: String
    $lecturePeriodEnd: String
    $lectureDetails: [String]
    $lectureTime: [String]
    $eduStatusReport: String
    $approvedNum: Int
    $confirmedNum: Int
    $sessionNum: Int
    $timetableAttached: Upload
  ) {
    editLectures(
      id: $editLecturesId
      campus: $campus
      temporaryName: $temporaryName
      subDiv: $subDiv
      teachersId: $teachersId
      roomNum: $roomNum
      subjectId: $subjectId
      lecturePeriodStart: $lecturePeriodStart
      lecturePeriodEnd: $lecturePeriodEnd
      lectureDetails: $lectureDetails
      lectureTime: $lectureTime
      eduStatusReport: $eduStatusReport
      ApprovedNum: $approvedNum
      confirmedNum: $confirmedNum
      sessionNum: $sessionNum
      timetableAttached: $timetableAttached
    ) {
      ok
      message
      error
    }
  }
`
export const CREATE_ATTENDANCE_MUTATION = gql`
  mutation Mutation(
    $studentPaymentId: [Int]!
    $attendanceDate: String!
    $studentId: [Int]!
    $attendanceState: [String]!
    $lecturesId: Int!
  ) {
    createAttendance(
      studentPaymentId: $studentPaymentId
      attendanceDate: $attendanceDate
      studentId: $studentId
      attendanceState: $attendanceState
      lecturesId: $lecturesId
    ) {
      error
      message
      ok
    }
  }
`

export const EDIT_ATTENDANCE_MUTATION = gql`
  mutation EditAttendance(
    $editAttendanceId: [Int]!
    $attendanceState: [String]!
  ) {
    editAttendance(id: $editAttendanceId, attendanceState: $attendanceState) {
      ok
      message
      error
    }
  }
`

export const CREATE_WORKLOGS_MUTATION = gql`
  mutation Mutation($lecturesId: Int!, $workLogsDate: String!) {
    createWorkLogs(lecturesId: $lecturesId, workLogsDate: $workLogsDate) {
      ok
      message
      error
    }
  }
`

export const EDIT_WORKLOGS_MUTATION = gql`
  mutation Mutation(
    $editWorkLogsId: Int!
    $trainingInfoOne: [String]
    $trainingInfoTwo: [String]
    $trainingInfoThree: [String]
    $trainingInfoFour: [String]
    $trainingInfoFive: [String]
    $trainingInfoSix: [String]
    $trainingInfoSeven: [String]
    $trainingInfoEight: [String]
    $trainingTimeOneday: [Int]
    $trainingTimeTotal: [Int]
    $instruction: String
    $absentSt: String
    $tardySt: String
    $leaveEarlySt: String
    $outingSt: String
    $etc: String
    $attendanceCount: [Int]
    $checkList: [String]
    $checkContext: [String]
  ) {
    editWorkLogs(
      id: $editWorkLogsId
      trainingInfoOne: $trainingInfoOne
      trainingInfoTwo: $trainingInfoTwo
      trainingInfoThree: $trainingInfoThree
      trainingInfoFour: $trainingInfoFour
      trainingInfoFive: $trainingInfoFive
      trainingInfoSix: $trainingInfoSix
      trainingInfoSeven: $trainingInfoSeven
      trainingInfoEight: $trainingInfoEight
      trainingTimeOneday: $trainingTimeOneday
      trainingTimeTotal: $trainingTimeTotal
      instruction: $instruction
      absentSt: $absentSt
      tardySt: $tardySt
      leaveEarlySt: $leaveEarlySt
      outingSt: $outingSt
      etc: $etc
      attendanceCount: $attendanceCount
      checkList: $checkList
      checkContext: $checkContext
    ) {
      error
      message
      ok
    }
  }
`
// SMS
export const SEND_SMS_MUTATION = gql`
  mutation SendSms(
    $receiver: String!
    $message: String!
    $rDate: String
    $rTime: String
    $senderNum: String
  ) {
    sendSms(
      receiver: $receiver
      message: $message
      rDate: $rDate
      rTime: $rTime
      senderNum: $senderNum
    ) {
      error
      message
      ok
    }
  }
`
export const CREATE_MESSAGE_STORAGE_MUTATION = gql`
  mutation CreateMessageStorage($message: String!, $saveType: String!) {
    createMessageStorage(message: $message, saveType: $saveType) {
      error
      message
      ok
    }
  }
`
export const DELETE_MESSAGE_STORAGE_MUTATION = gql`
  mutation Mutation($deleteMessageStorageId: Int) {
    deleteMessageStorage(id: $deleteMessageStorageId) {
      error
      message
      ok
    }
  }
`

// 학적부
export const EDIT_STUDENT_INFOMATION_MUTATION = gql`
  mutation Mutation(
    $editStudentPaymentId: Int!
    $subjectId: Int!
    $mAddressDetail: String
    $mAddresses: String
    $mZipCode: String
  ) {
    editStudentPayment(
      id: $editStudentPaymentId
      subjectId: $subjectId
      mAddressDetail: $mAddressDetail
      mAddresses: $mAddresses
      mZipCode: $mZipCode
    ) {
      ok
      message
      error
    }
  }
`
export const CREATE_EDU_INFOMATION_MUTATION = gql`
  mutation CreateEduInfomation(
    $subjectId: Int!
    $studentPaymentId: Int!
    $eduType: String!
    $eduName: String!
    $graduationStatus: String!
    $major: String
  ) {
    createEduInfomation(
      subjectId: $subjectId
      studentPaymentId: $studentPaymentId
      eduType: $eduType
      eduName: $eduName
      graduationStatus: $graduationStatus
      major: $major
    ) {
      error
      message
      ok
    }
  }
`
export const DEIT_EDU_INFOMATION_MUTATION = gql`
  mutation Mutation(
    $editEduInfomationId: Int!
    $eduType: String
    $eduName: String
    $major: String
    $graduationStatus: String
  ) {
    editEduInfomation(
      id: $editEduInfomationId
      eduType: $eduType
      eduName: $eduName
      major: $major
      graduationStatus: $graduationStatus
    ) {
      ok
      message
      error
    }
  }
`
export const DELETE_EDU_INFOMATION_MUTATION = gql`
  mutation DeleteEduInfomation($deleteEduInfomationId: Int!) {
    deleteEduInfomation(id: $deleteEduInfomationId) {
      error
      message
      ok
    }
  }
`
export const CREATE_CAREER_MUTATION = gql`
  mutation CreateCareer(
    $careerDetails: String!
    $subjectId: Int!
    $studentPaymentId: Int!
  ) {
    createCareer(
      careerDetails: $careerDetails
      subjectId: $subjectId
      studentPaymentId: $studentPaymentId
    ) {
      ok
      message
      error
    }
  }
`
export const EDIT_CAREER_MUTATION = gql`
  mutation EditCareer($editCareerId: Int!, $careerDetails: String!) {
    editCareer(id: $editCareerId, careerDetails: $careerDetails) {
      error
      message
      ok
    }
  }
`
export const DELETE_CAREER_MUTATION = gql`
  mutation DeleteCareer($deleteCareerId: Int) {
    deleteCareer(id: $deleteCareerId) {
      ok
      message
      error
    }
  }
`
export const CREATE_CERTIFICATE_MUTATION = gql`
  mutation CreateCertificate(
    $cAdate: String!
    $certificateName: String!
    $certificateIssuer: String!
    $subjectId: Int!
    $studentPaymentId: Int!
    $certificateLevel: String
  ) {
    createCertificate(
      CAdate: $cAdate
      certificateName: $certificateName
      CertificateIssuer: $certificateIssuer
      subjectId: $subjectId
      studentPaymentId: $studentPaymentId
      certificateLevel: $certificateLevel
    ) {
      ok
      message
      error
    }
  }
`
export const EDIT_CERTIFICATE_MUTATION = gql`
  mutation EditCertificate(
    $certificateIssuer: String
    $certificateLevel: String
    $certificateName: String
    $cAdate: String
    $editCertificateId: Int!
  ) {
    editCertificate(
      CertificateIssuer: $certificateIssuer
      certificateLevel: $certificateLevel
      certificateName: $certificateName
      CAdate: $cAdate
      id: $editCertificateId
    ) {
      ok
      message
      error
    }
  }
`
export const DELETE_CERTIFICATE_MUTATION = gql`
  mutation DeleteCertificate($deleteCertificateId: Int!) {
    deleteCertificate(id: $deleteCertificateId) {
      error
      message
      ok
    }
  }
`
export const CREATE_STUDENT_CONSULTATION_MUTATION = gql`
  mutation CreateStudentConsultation(
    $typeOfConsultation: String!
    $dateOfConsultation: String!
    $detailsOfConsultation: String!
    $subjectId: Int!
    $studentPaymentId: Int!
  ) {
    createStudentConsultation(
      typeOfConsultation: $typeOfConsultation
      dateOfConsultation: $dateOfConsultation
      detailsOfConsultation: $detailsOfConsultation
      subjectId: $subjectId
      studentPaymentId: $studentPaymentId
    ) {
      error
      message
      ok
    }
  }
`
export const EDIT_STUDENT_CONSULTATION_MUTATION = gql`
  mutation EditStudentConsultation(
    $editStudentConsultationId: Int!
    $typeOfConsultation: String
    $dateOfConsultation: String
    $detailsOfConsultation: String
  ) {
    editStudentConsultation(
      id: $editStudentConsultationId
      typeOfConsultation: $typeOfConsultation
      dateOfConsultation: $dateOfConsultation
      detailsOfConsultation: $detailsOfConsultation
    ) {
      error
      message
      ok
    }
  }
`
export const DELETE_STUDENT_CONSULTATION_MUTATION = gql`
  mutation DeleteStudentConsultation($deleteStudentConsultationId: Int!) {
    deleteStudentConsultation(id: $deleteStudentConsultationId) {
      error
      message
      ok
    }
  }
`
export const CREATE_HOPE_FOR_EMPLOYMENT_MUTATION = gql`
  mutation CreateHopeForEmployment(
    $workingArea: String!
    $fieldOfHope: String!
    $hopefulReward: Int!
    $workType: String!
    $workingHours: Int!
    $opinion: String!
    $studentPaymentId: Int!
    $subjectId: Int!
  ) {
    createHopeForEmployment(
      workingArea: $workingArea
      fieldOfHope: $fieldOfHope
      hopefulReward: $hopefulReward
      workType: $workType
      workingHours: $workingHours
      opinion: $opinion
      studentPaymentId: $studentPaymentId
      subjectId: $subjectId
    ) {
      error
      message
      ok
    }
  }
`
export const EDIT_HOPE_FOR_EMPLOYMENT_MUTATION = gql`
  mutation EditHopeForEmployment(
    $editHopeForEmploymentId: Int!
    $fieldOfHope: String!
    $hopefulReward: Int!
    $workType: String!
    $workingHours: Int!
    $opinion: String!
    $workingArea: String
  ) {
    editHopeForEmployment(
      id: $editHopeForEmploymentId
      fieldOfHope: $fieldOfHope
      hopefulReward: $hopefulReward
      workType: $workType
      workingHours: $workingHours
      opinion: $opinion
      workingArea: $workingArea
    ) {
      error
      message
      ok
    }
  }
`
export const CREATE_EMPLOYMENT_RECOMMENDATION_MUTATION = gql`
  mutation CreateEmploymentRecommendation(
    $dateOfRecommendation: String!
    $recruitmentField: String!
    $companyName: String!
    $location: String!
    $phoneNum: String!
    $dateOfInterview: String!
    $employmentStatus: String!
    $reasonForNonEmployment: String!
    $certificateOfEmploymentStatus: String!
    $subjectId: Int!
    $studentPaymentId: Int!
  ) {
    createEmploymentRecommendation(
      dateOfRecommendation: $dateOfRecommendation
      recruitmentField: $recruitmentField
      companyName: $companyName
      location: $location
      phoneNum: $phoneNum
      dateOfInterview: $dateOfInterview
      employmentStatus: $employmentStatus
      reasonForNonEmployment: $reasonForNonEmployment
      certificateOfEmploymentStatus: $certificateOfEmploymentStatus
      subjectId: $subjectId
      studentPaymentId: $studentPaymentId
    ) {
      error
      message
      ok
    }
  }
`
export const EDIT_EMPLOYMENT_RECOMMENDATION_MUTATION = gql`
  mutation EditEmploymentRecommendation(
    $editEmploymentRecommendationId: Int!
    $dateOfRecommendation: String
    $recruitmentField: String
    $companyName: String
    $location: String
    $phoneNum: String
    $dateOfInterview: String
    $employmentStatus: String
    $reasonForNonEmployment: String
    $certificateOfEmploymentStatus: String
  ) {
    editEmploymentRecommendation(
      id: $editEmploymentRecommendationId
      dateOfRecommendation: $dateOfRecommendation
      recruitmentField: $recruitmentField
      companyName: $companyName
      location: $location
      phoneNum: $phoneNum
      dateOfInterview: $dateOfInterview
      employmentStatus: $employmentStatus
      reasonForNonEmployment: $reasonForNonEmployment
      certificateOfEmploymentStatus: $certificateOfEmploymentStatus
    ) {
      error
      message
      ok
    }
  }
`
export const DELETE_EMPLOYMENT_RECOMMENDATION_MUTATION = gql`
  mutation DeleteEmploymentRecommendation(
    $deleteEmploymentRecommendationId: Int
  ) {
    deleteEmploymentRecommendation(id: $deleteEmploymentRecommendationId) {
      error
      message
      ok
    }
  }
`
