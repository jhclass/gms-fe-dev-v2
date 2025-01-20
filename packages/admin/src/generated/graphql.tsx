import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AdviceType = {
  __typename?: 'AdviceType';
  Branch?: Maybe<Branch>;
  StudentState: Array<StudentState>;
  branchId?: Maybe<Scalars['Int']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  defaultValue?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  indexNum: Scalars['Int']['output'];
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  onOff?: Maybe<Scalars['String']['output']>;
  studentStates?: Maybe<Array<Maybe<StudentState>>>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Alarm = {
  __typename?: 'Alarm';
  Branch?: Maybe<Branch>;
  branchId?: Maybe<Scalars['Int']['output']>;
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  personalTarget?: Maybe<Array<Scalars['Int']['output']>>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Attendance = {
  __typename?: 'Attendance';
  Branch?: Maybe<Branch>;
  attendanceDate?: Maybe<Scalars['String']['output']>;
  attendanceDateTime?: Maybe<Scalars['String']['output']>;
  attendanceState?: Maybe<Scalars['String']['output']>;
  branchId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  isCanceled?: Maybe<Scalars['String']['output']>;
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  lectures?: Maybe<Lectures>;
  lecturesId?: Maybe<Scalars['Int']['output']>;
  student?: Maybe<Student>;
  studentId?: Maybe<Scalars['Int']['output']>;
  studentPayment?: Maybe<StudentPayment>;
  studentPaymentId: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type AttendanceRecord = {
  __typename?: 'AttendanceRecord';
  Branch?: Maybe<Branch>;
  ManageUser: ManageUser;
  branchId?: Maybe<Scalars['Int']['output']>;
  clockIn: Scalars['String']['output'];
  clockOut?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  manageUserId: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Branch = {
  __typename?: 'Branch';
  AdviceType?: Maybe<Array<AdviceType>>;
  ConsultationMemo?: Maybe<Array<ConsultationMemo>>;
  PermissionsGranted?: Maybe<Array<PermissionsGranted>>;
  StudentState?: Maybe<Array<StudentState>>;
  branchName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type Career = {
  __typename?: 'Career';
  Branch?: Maybe<Branch>;
  StudentPayment?: Maybe<StudentPayment>;
  Subject?: Maybe<Subject>;
  branchId?: Maybe<Scalars['Int']['output']>;
  careerDetails: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastModifiedByName: Scalars['String']['output'];
  lastModifiedByUserId: Scalars['String']['output'];
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  lectureId: Scalars['Int']['output'];
  stName: Scalars['String']['output'];
  studentId: Scalars['Int']['output'];
  studentPaymentId: Scalars['Int']['output'];
  subjectId: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Certificate = {
  __typename?: 'Certificate';
  Branch?: Maybe<Branch>;
  CAdate: Scalars['String']['output'];
  CertificateIssuer: Scalars['String']['output'];
  StudentPayment?: Maybe<StudentPayment>;
  Subject?: Maybe<Subject>;
  branchId?: Maybe<Scalars['Int']['output']>;
  certificateLevel?: Maybe<Scalars['String']['output']>;
  certificateName: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastModifiedByName: Scalars['String']['output'];
  lastModifiedByUserId: Scalars['String']['output'];
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  lectureId: Scalars['Int']['output'];
  stName: Scalars['String']['output'];
  studentId: Scalars['Int']['output'];
  studentPaymentId: Scalars['Int']['output'];
  subjectId: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type CommonResponse = {
  __typename?: 'CommonResponse';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type ConsultationMemo = {
  __typename?: 'ConsultationMemo';
  Branch?: Maybe<Branch>;
  branchId?: Maybe<Scalars['Int']['output']>;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  manageUser?: Maybe<ManageUser>;
  manageUserId?: Maybe<Scalars['Int']['output']>;
  studentState?: Maybe<StudentState>;
  studentStateId?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type CreateStudentStateDto = {
  adviceTypes: Array<InputMaybe<Scalars['Int']['input']>>;
  agreement: Scalars['String']['input'];
  birthday?: InputMaybe<Scalars['String']['input']>;
  branchId?: InputMaybe<Scalars['Int']['input']>;
  campus?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  classMethod?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  detail?: InputMaybe<Scalars['String']['input']>;
  expEnrollDate?: InputMaybe<Scalars['String']['input']>;
  perchase?: InputMaybe<Scalars['Boolean']['input']>;
  phoneNum1?: InputMaybe<Scalars['String']['input']>;
  phoneNum2?: InputMaybe<Scalars['String']['input']>;
  phoneNum3?: InputMaybe<Scalars['String']['input']>;
  pic?: InputMaybe<Scalars['String']['input']>;
  progress: Scalars['Int']['input'];
  receiptDiv?: InputMaybe<Scalars['String']['input']>;
  stAddr?: InputMaybe<Scalars['String']['input']>;
  stEmail?: InputMaybe<Scalars['String']['input']>;
  stName?: InputMaybe<Scalars['String']['input']>;
  stVisit?: InputMaybe<Scalars['String']['input']>;
  subDiv?: InputMaybe<Scalars['String']['input']>;
  subject: Array<InputMaybe<Scalars['String']['input']>>;
  today?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CreateWorkBoardDto = {
  detail: Scalars['String']['input'];
  endDate?: InputMaybe<Scalars['String']['input']>;
  filePath?: InputMaybe<Scalars['String']['input']>;
  lastModifiedTime?: InputMaybe<Scalars['String']['input']>;
  level?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  toPerson?: InputMaybe<Scalars['String']['input']>;
  toTeam?: InputMaybe<Scalars['String']['input']>;
  workStatus?: InputMaybe<Scalars['String']['input']>;
  writer: Scalars['String']['input'];
};

export type DashboardAtResult = {
  __typename?: 'DashboardATResult';
  count?: Maybe<Array<Scalars['Int']['output']>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  topFiveName?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  totalStudentState?: Maybe<Scalars['Int']['output']>;
};

export type DashboardMonthResult = {
  __typename?: 'DashboardMonthResult';
  compareMonth?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  month?: Maybe<Scalars['Int']['output']>;
  ok?: Maybe<Scalars['Boolean']['output']>;
};

export type DashboardRdResult = {
  __typename?: 'DashboardRDResult';
  count?: Maybe<Scalars['Int']['output']>;
  receiptDiv?: Maybe<Scalars['String']['output']>;
};

export type DashboardTodayResult = {
  __typename?: 'DashboardTodayResult';
  compareToday?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok?: Maybe<Scalars['Boolean']['output']>;
  today?: Maybe<Scalars['Int']['output']>;
};

export type DashboardUnpResult = {
  __typename?: 'DashboardUnpResult';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok?: Maybe<Scalars['Boolean']['output']>;
  unpCount?: Maybe<Scalars['Int']['output']>;
};

export type EditStudentStateDto = {
  adviceTypes?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  birthday?: InputMaybe<Scalars['String']['input']>;
  campus?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  detail?: InputMaybe<Scalars['String']['input']>;
  expEnrollDate?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  lastModifiedTime?: InputMaybe<Scalars['String']['input']>;
  perchase?: InputMaybe<Scalars['Boolean']['input']>;
  phoneNum1?: InputMaybe<Scalars['String']['input']>;
  phoneNum2?: InputMaybe<Scalars['String']['input']>;
  phoneNum3?: InputMaybe<Scalars['String']['input']>;
  pic?: InputMaybe<Scalars['String']['input']>;
  progress?: InputMaybe<Scalars['Int']['input']>;
  receiptDiv?: InputMaybe<Scalars['String']['input']>;
  stAddr?: InputMaybe<Scalars['String']['input']>;
  stEmail?: InputMaybe<Scalars['String']['input']>;
  stName?: InputMaybe<Scalars['String']['input']>;
  stVisit?: InputMaybe<Scalars['String']['input']>;
  subDiv?: InputMaybe<Scalars['String']['input']>;
  subject?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type EduInfomation = {
  __typename?: 'EduInfomation';
  Branch?: Maybe<Branch>;
  StudentPayment?: Maybe<StudentPayment>;
  Subject?: Maybe<Subject>;
  branchId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['String']['output'];
  eduName: Scalars['String']['output'];
  eduType: Scalars['String']['output'];
  graduationStatus: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastModifiedByName: Scalars['String']['output'];
  lastModifiedByUserId: Scalars['String']['output'];
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  lectureId: Scalars['Int']['output'];
  major?: Maybe<Scalars['String']['output']>;
  stName: Scalars['String']['output'];
  studentId: Scalars['Int']['output'];
  studentPaymentId: Scalars['Int']['output'];
  subjectId: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type EmploymentRecommendation = {
  __typename?: 'EmploymentRecommendation';
  Branch?: Maybe<Branch>;
  StudentPayment?: Maybe<StudentPayment>;
  Subject?: Maybe<Subject>;
  branchId?: Maybe<Scalars['Int']['output']>;
  certificateOfEmploymentStatus: Scalars['String']['output'];
  companyName: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  dateOfInterview?: Maybe<Scalars['String']['output']>;
  dateOfRecommendation: Scalars['String']['output'];
  employmentStatus: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastModifiedByName: Scalars['String']['output'];
  lastModifiedByUserId: Scalars['String']['output'];
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  lectureId: Scalars['Int']['output'];
  location: Scalars['String']['output'];
  phoneNum: Scalars['String']['output'];
  reasonForNonEmployment: Scalars['String']['output'];
  recruitmentField: Scalars['String']['output'];
  stName: Scalars['String']['output'];
  studentId: Scalars['Int']['output'];
  studentPaymentId: Scalars['Int']['output'];
  subjectId: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type EmploymentStatus = {
  __typename?: 'EmploymentStatus';
  Branch?: Maybe<Branch>;
  StudentPayment?: Maybe<StudentPayment>;
  Subject?: Maybe<Subject>;
  branchId?: Maybe<Scalars['Int']['output']>;
  businessNum: Scalars['String']['output'];
  businessSize: Scalars['String']['output'];
  companyName: Scalars['String']['output'];
  completionType: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  dateOfEmployment: Scalars['String']['output'];
  employmentType: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  imploymentInsurance: Scalars['String']['output'];
  lastModifiedByName: Scalars['String']['output'];
  lastModifiedByUserId: Scalars['String']['output'];
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  lectureId: Scalars['Int']['output'];
  location: Scalars['String']['output'];
  phoneNum: Scalars['String']['output'];
  proofOfImployment: Scalars['String']['output'];
  relatedFields: Scalars['String']['output'];
  responsibilities: Scalars['String']['output'];
  stName: Scalars['String']['output'];
  studentId: Scalars['Int']['output'];
  studentPaymentId: Scalars['Int']['output'];
  subjectId: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type HopeForEmployment = {
  __typename?: 'HopeForEmployment';
  Branch?: Maybe<Branch>;
  StudentPayment?: Maybe<StudentPayment>;
  Subject?: Maybe<Subject>;
  branchId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['String']['output'];
  fieldOfHope: Scalars['String']['output'];
  hopefulReward: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  lastModifiedByName: Scalars['String']['output'];
  lastModifiedByUserId: Scalars['String']['output'];
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  lectureId: Scalars['Int']['output'];
  opinion: Scalars['String']['output'];
  stName: Scalars['String']['output'];
  studentId: Scalars['Int']['output'];
  studentPaymentId: Scalars['Int']['output'];
  subjectId: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
  workType: Scalars['String']['output'];
  workingArea: Scalars['String']['output'];
  workingHours: Scalars['Int']['output'];
};

export type HourlyData = {
  __typename?: 'HourlyData';
  amount?: Maybe<Scalars['Int']['output']>;
  cashOrCard?: Maybe<Scalars['String']['output']>;
  currentState?: Maybe<Scalars['String']['output']>;
  nowDate?: Maybe<Scalars['String']['output']>;
};

export type HourlySalesData = {
  __typename?: 'HourlySalesData';
  error?: Maybe<Scalars['String']['output']>;
  hourlyDetails?: Maybe<Array<Maybe<HourlyData>>>;
  hourlyTotalCard?: Maybe<Scalars['Int']['output']>;
  hourlyTotalCardRefund?: Maybe<Scalars['Int']['output']>;
  hourlyTotalCash?: Maybe<Scalars['Int']['output']>;
  hourlyTotalCashRefund?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  thisTimeAmountTotal?: Maybe<Scalars['Int']['output']>;
  thisTimeRealTotal?: Maybe<Scalars['Int']['output']>;
  thisTimeRefundTotal?: Maybe<Scalars['Int']['output']>;
};

export type Lectures = {
  __typename?: 'Lectures';
  ApprovedNum: Scalars['Int']['output'];
  WorkLogs?: Maybe<Array<WorkLogs>>;
  campus: Scalars['String']['output'];
  confirmedNum: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  eduStatusReport: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  lectureDetails: Array<Scalars['String']['output']>;
  lecturePeriodEnd: Scalars['String']['output'];
  lecturePeriodStart: Scalars['String']['output'];
  lectureTime: Array<Scalars['String']['output']>;
  roomNum: Scalars['String']['output'];
  sessionNum: Scalars['Int']['output'];
  subDiv: Scalars['String']['output'];
  subject?: Maybe<Subject>;
  subjectId: Scalars['Int']['output'];
  teachers?: Maybe<Array<Maybe<ManageUser>>>;
  temporaryName: Scalars['String']['output'];
  timetableAttached?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type ManageUser = {
  __typename?: 'ManageUser';
  Branch?: Maybe<Branch>;
  ConsultationMemo?: Maybe<Array<ConsultationMemo>>;
  Lectures?: Maybe<Array<Lectures>>;
  PaymentDetail?: Maybe<Array<PaymentDetail>>;
  PermissionsGranted?: Maybe<Array<PermissionsGranted>>;
  Sms?: Maybe<Array<Maybe<Sms>>>;
  Stamp?: Maybe<Array<Stamp>>;
  Student?: Maybe<Array<Student>>;
  StudentMemo?: Maybe<Array<StudentMemo>>;
  StudentPayment?: Maybe<Array<StudentPayment>>;
  StudentState?: Maybe<Array<StudentState>>;
  branchId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  favoriteStudentState?: Maybe<Array<Scalars['Int']['output']>>;
  frequentlyUsed?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['Int']['output']>;
  lastModifiedBy?: Maybe<Scalars['String']['output']>;
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  mAddressDetail?: Maybe<Scalars['String']['output']>;
  mAddresses?: Maybe<Scalars['String']['output']>;
  mAvatar?: Maybe<Scalars['String']['output']>;
  mGrade?: Maybe<Scalars['Int']['output']>;
  mJoiningDate?: Maybe<Scalars['String']['output']>;
  mPart?: Maybe<Array<Scalars['String']['output']>>;
  mPassword: Scalars['String']['output'];
  mPhoneNum?: Maybe<Scalars['String']['output']>;
  mPhoneNumCompany?: Maybe<Scalars['String']['output']>;
  mPhoneNumFriend?: Maybe<Scalars['String']['output']>;
  mPhoneNumInside?: Maybe<Scalars['String']['output']>;
  mRank?: Maybe<Scalars['String']['output']>;
  mUserId?: Maybe<Scalars['String']['output']>;
  mUsername?: Maybe<Scalars['String']['output']>;
  mZipCode?: Maybe<Scalars['String']['output']>;
  resign?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type MessageStorage = {
  __typename?: 'MessageStorage';
  Branch?: Maybe<Branch>;
  branchId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  manageUser?: Maybe<ManageUser>;
  manageUserId?: Maybe<Scalars['Int']['output']>;
  message: Scalars['String']['output'];
  saveType: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeOrderAT: CommonResponse;
  checkingIpRecord: CommonResponse;
  classCancellation: CommonResponse;
  createAdviceType: CommonResponse;
  createAttendance: CommonResponse;
  createAttendanceRecord: CommonResponse;
  createBranch: CommonResponse;
  createBusinessAccountReq: CommonResponse;
  createCareer: CommonResponse;
  createCertificate: CommonResponse;
  createConsultationMemo: CommonResponse;
  createEduInfomation: CommonResponse;
  createEmploymentRecommendation: CommonResponse;
  createEmploymentStatus: CommonResponse;
  createHopeForEmployment: CommonResponse;
  createLectures: CommonResponse;
  createManagerAccount: CommonResponse;
  createMasterUser: CommonResponse;
  createMessageStorage: CommonResponse;
  createPaymentDetail: CommonResponse;
  createPermissionGranted: CommonResponse;
  createPreInspection: CommonResponse;
  createRegularEvaluationSet: CommonResponse;
  createStudent: CommonResponse;
  createStudentConsultation: CommonResponse;
  createStudentMemo: CommonResponse;
  createStudentPayment: CommonResponse;
  createStudentPortfolio: CommonResponse;
  createStudentState: CommonResponse;
  createSubject: CommonResponse;
  createUserActivityLogs: CommonResponse;
  createWorkBoard: CommonResponse;
  createWorkLogs: CommonResponse;
  deleteAttendance: CommonResponse;
  deleteBranch: CommonResponse;
  deleteBusinessAccountReq: CommonResponse;
  deleteCareer: CommonResponse;
  deleteCertificate: CommonResponse;
  deleteConsultationMemo: CommonResponse;
  deleteEduInfomation: CommonResponse;
  deleteEmploymentStatus: CommonResponse;
  deleteFileNameSp: CommonResponse;
  deleteHopeForEmployment: CommonResponse;
  deleteLectures: CommonResponse;
  deleteManageUser: CommonResponse;
  deleteMessageStorage: CommonResponse;
  deletePaymentDetail: CommonResponse;
  deletePermissionsGranted: CommonResponse;
  deletePreInspection: CommonResponse;
  deleteRecommendation: CommonResponse;
  deleteRegularEvaluationSet: CommonResponse;
  deleteSms: CommonResponse;
  deleteStudent: CommonResponse;
  deleteStudentConsultation: CommonResponse;
  deleteStudentMemo: CommonResponse;
  deleteStudentPayment: CommonResponse;
  deleteStudentState: CommonResponse;
  deleteSubject: CommonResponse;
  deleteWorkLogs: CommonResponse;
  doubleCheck: CommonResponse;
  duplicateCheck: CommonResponse;
  editAdviceType: CommonResponse;
  editAttendance: CommonResponse;
  editBranch: CommonResponse;
  editBusinessAccountReq: CommonResponse;
  editCareer: CommonResponse;
  editCertificate: CommonResponse;
  editEduInfomation: CommonResponse;
  editEmploymentRecommendation: CommonResponse;
  editEmploymentStatus: CommonResponse;
  editHopeEmployment: CommonResponse;
  editLectures: CommonResponse;
  editManageUser: CommonResponse;
  editPaymentDetail: CommonResponse;
  editPermissionsGranted: CommonResponse;
  editPreInspection: CommonResponse;
  editRegularEvaluationSet: CommonResponse;
  editStudent: CommonResponse;
  editStudentConsultation: CommonResponse;
  editStudentMemo: CommonResponse;
  editStudentPayment: CommonResponse;
  editStudentPortfolio: CommonResponse;
  editWorkLogs: CommonResponse;
  getHourlySalesData: HourlySalesData;
  mLogin: ResultLogin;
  readAlarms: CommonResponse;
  refreshToken: ResultRefreshToken;
  refundApproval: CommonResponse;
  reqRefund: CommonResponse;
  salesStatistics: SalesStatisticsResult;
  searchLectures: SearchLecturesResult;
  searchPaymentDetail: PaymentDetailResult;
  searchStudent: SearchStudentResult;
  searchStudentPayment: SearchStudentPaymentResult;
  searchStudentState: SearchStudentStateResult;
  searchSubject: SearchSubjectResult;
  sendSms: CommonResponse;
  staticPushAT: CommonResponse;
  updateConsultationMemo: CommonResponse;
  updateFavorite: UpdateFavoriteResult;
  updateStudentState: UpdateStudentStateResult;
  updateSubject: CommonResponse;
  validateNumber: ResultValidateNumber;
};


export type MutationChangeOrderAtArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  indexNums?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};


export type MutationCheckingIpRecordArgs = {
  ipRecord: Scalars['String']['input'];
  today: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationClassCancellationArgs = {
  courseComplete: Scalars['String']['input'];
  dateOfDroppingOut?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  lastModifiedTime?: InputMaybe<Scalars['String']['input']>;
  reasonFordroppingOut?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateAdviceTypeArgs = {
  category: Scalars['String']['input'];
  defaultValue?: InputMaybe<Scalars['String']['input']>;
  indexNum: Scalars['Int']['input'];
  onOff?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};


export type MutationCreateAttendanceArgs = {
  attendanceDate: Scalars['String']['input'];
  attendanceState: Array<InputMaybe<Scalars['String']['input']>>;
  lecturesId: Scalars['Int']['input'];
  studentId: Array<InputMaybe<Scalars['Int']['input']>>;
  studentPaymentId: Array<InputMaybe<Scalars['Int']['input']>>;
};


export type MutationCreateAttendanceRecordArgs = {
  clockIn: Scalars['String']['input'];
};


export type MutationCreateBranchArgs = {
  branchName: Scalars['String']['input'];
};


export type MutationCreateBusinessAccountReqArgs = {
  agree: Scalars['String']['input'];
  companyName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  filePath: Array<InputMaybe<Scalars['String']['input']>>;
  phoneNum: Scalars['String']['input'];
  validate: Scalars['String']['input'];
};


export type MutationCreateCareerArgs = {
  careerDetails: Scalars['String']['input'];
  studentPaymentId: Scalars['Int']['input'];
  subjectId: Scalars['Int']['input'];
};


export type MutationCreateCertificateArgs = {
  CAdate: Scalars['String']['input'];
  CertificateIssuer: Scalars['String']['input'];
  certificateLevel?: InputMaybe<Scalars['String']['input']>;
  certificateName: Scalars['String']['input'];
  studentPaymentId: Scalars['Int']['input'];
  subjectId: Scalars['Int']['input'];
};


export type MutationCreateConsultationMemoArgs = {
  content: Scalars['String']['input'];
  studentStateId: Scalars['Int']['input'];
};


export type MutationCreateEduInfomationArgs = {
  eduName: Scalars['String']['input'];
  eduType: Scalars['String']['input'];
  graduationStatus: Scalars['String']['input'];
  major?: InputMaybe<Scalars['String']['input']>;
  studentPaymentId: Scalars['Int']['input'];
  subjectId: Scalars['Int']['input'];
};


export type MutationCreateEmploymentRecommendationArgs = {
  certificateOfEmploymentStatus: Scalars['String']['input'];
  companyName: Scalars['String']['input'];
  dateOfInterview?: InputMaybe<Scalars['String']['input']>;
  dateOfRecommendation: Scalars['String']['input'];
  employmentStatus: Scalars['String']['input'];
  location: Scalars['String']['input'];
  phoneNum: Scalars['String']['input'];
  reasonForNonEmployment: Scalars['String']['input'];
  recruitmentField: Scalars['String']['input'];
  studentPaymentId: Scalars['Int']['input'];
  subjectId: Scalars['Int']['input'];
};


export type MutationCreateEmploymentStatusArgs = {
  businessNum: Scalars['String']['input'];
  businessSize: Scalars['String']['input'];
  companyName: Scalars['String']['input'];
  completionType: Scalars['String']['input'];
  dateOfEmployment: Scalars['String']['input'];
  employmentType: Scalars['String']['input'];
  imploymentInsurance: Scalars['String']['input'];
  location: Scalars['String']['input'];
  phoneNum: Scalars['String']['input'];
  proofOfImployment: Scalars['String']['input'];
  relatedFields: Scalars['String']['input'];
  responsibilities: Scalars['String']['input'];
  studentPaymentId: Scalars['Int']['input'];
  subjectId: Scalars['Int']['input'];
};


export type MutationCreateHopeForEmploymentArgs = {
  fieldOfHope: Scalars['String']['input'];
  hopefulReward: Scalars['Int']['input'];
  opinion: Scalars['String']['input'];
  studentPaymentId: Scalars['Int']['input'];
  subjectId: Scalars['Int']['input'];
  workType: Scalars['String']['input'];
  workingArea: Scalars['String']['input'];
  workingHours: Scalars['Int']['input'];
};


export type MutationCreateLecturesArgs = {
  ApprovedNum: Scalars['Int']['input'];
  campus: Scalars['String']['input'];
  confirmedNum: Scalars['Int']['input'];
  eduStatusReport: Scalars['String']['input'];
  lectureDetails: Array<InputMaybe<Scalars['String']['input']>>;
  lecturePeriodEnd: Scalars['String']['input'];
  lecturePeriodStart: Scalars['String']['input'];
  lectureTime: Array<InputMaybe<Scalars['String']['input']>>;
  roomNum: Scalars['String']['input'];
  sessionNum: Scalars['Int']['input'];
  subDiv: Scalars['String']['input'];
  subjectId: Scalars['Int']['input'];
  teachersId: Array<InputMaybe<Scalars['Int']['input']>>;
  temporaryName: Scalars['String']['input'];
  timetableAttached?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateManagerAccountArgs = {
  branchId?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  mAddressDetail?: InputMaybe<Scalars['String']['input']>;
  mAddresses?: InputMaybe<Scalars['String']['input']>;
  mGrade?: InputMaybe<Scalars['Int']['input']>;
  mJoiningDate?: InputMaybe<Scalars['String']['input']>;
  mPart?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  mPassword: Scalars['String']['input'];
  mPhoneNum?: InputMaybe<Scalars['String']['input']>;
  mPhoneNumCompany?: InputMaybe<Scalars['String']['input']>;
  mPhoneNumFriend?: InputMaybe<Scalars['String']['input']>;
  mPhoneNumInside?: InputMaybe<Scalars['String']['input']>;
  mRank?: InputMaybe<Scalars['String']['input']>;
  mUserId: Scalars['String']['input'];
  mUsername: Scalars['String']['input'];
  mZipCode?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateMasterUserArgs = {
  branchName: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  mAddressDetail?: InputMaybe<Scalars['String']['input']>;
  mAddresses?: InputMaybe<Scalars['String']['input']>;
  mGrade?: InputMaybe<Scalars['Int']['input']>;
  mJoiningDate?: InputMaybe<Scalars['String']['input']>;
  mPart?: InputMaybe<Array<Scalars['String']['input']>>;
  mPassword: Scalars['String']['input'];
  mPhoneNum?: InputMaybe<Scalars['String']['input']>;
  mPhoneNumCompany?: InputMaybe<Scalars['String']['input']>;
  mPhoneNumFriend?: InputMaybe<Scalars['String']['input']>;
  mPhoneNumInside?: InputMaybe<Scalars['String']['input']>;
  mRank?: InputMaybe<Scalars['String']['input']>;
  mUserId: Scalars['String']['input'];
  mUsername: Scalars['String']['input'];
  mZipCode?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateMessageStorageArgs = {
  message: Scalars['String']['input'];
  saveType: Scalars['String']['input'];
};


export type MutationCreatePaymentDetailArgs = {
  ApprovalNum?: InputMaybe<Scalars['String']['input']>;
  amountPayment?: InputMaybe<Scalars['Int']['input']>;
  bankName?: InputMaybe<Scalars['String']['input']>;
  cardCompany?: InputMaybe<Scalars['String']['input']>;
  cardNum?: InputMaybe<Scalars['String']['input']>;
  cashOrCard: Scalars['String']['input'];
  cashReceipts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositAmount?: InputMaybe<Scalars['Int']['input']>;
  depositDate?: InputMaybe<Scalars['String']['input']>;
  depositorName?: InputMaybe<Scalars['String']['input']>;
  installment?: InputMaybe<Scalars['Int']['input']>;
  paymentDate?: InputMaybe<Scalars['String']['input']>;
  receiverId: Scalars['Int']['input'];
  studentPaymentId: Scalars['Int']['input'];
};


export type MutationCreatePermissionGrantedArgs = {
  allPermitted?: InputMaybe<Scalars['String']['input']>;
  manageUserIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  permissionName: Scalars['String']['input'];
  readOnly?: InputMaybe<Scalars['String']['input']>;
  smsPermitted?: InputMaybe<Scalars['String']['input']>;
  topic: Scalars['String']['input'];
};


export type MutationCreatePreInspectionArgs = {
  actionTaken?: InputMaybe<Scalars['String']['input']>;
  dateOfPreInspection?: InputMaybe<Scalars['String']['input']>;
  preInspectionDetails?: InputMaybe<Scalars['String']['input']>;
  preScreenerType?: InputMaybe<Scalars['String']['input']>;
  studentPaymentId: Scalars['Int']['input'];
  subjectId: Scalars['Int']['input'];
};


export type MutationCreateRegularEvaluationSetArgs = {
  evaluationDetails: Scalars['String']['input'];
  points: Scalars['Int']['input'];
  statusType: Scalars['String']['input'];
  subjectId: Scalars['Int']['input'];
};


export type MutationCreateStudentArgs = {
  birthday?: InputMaybe<Scalars['String']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNum1?: InputMaybe<Scalars['String']['input']>;
  phoneNum2?: InputMaybe<Scalars['String']['input']>;
  smsAgreement?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateStudentConsultationArgs = {
  dateOfConsultation: Scalars['String']['input'];
  detailsOfConsultation: Scalars['String']['input'];
  studentPaymentId: Scalars['Int']['input'];
  subjectId: Scalars['Int']['input'];
  typeOfConsultation: Scalars['String']['input'];
};


export type MutationCreateStudentMemoArgs = {
  content: Scalars['String']['input'];
  studentId: Scalars['Int']['input'];
};


export type MutationCreateStudentPaymentArgs = {
  actualAmount?: InputMaybe<Scalars['Int']['input']>;
  amountReceived?: InputMaybe<Scalars['Int']['input']>;
  campus: Scalars['String']['input'];
  cardAmount?: InputMaybe<Scalars['Int']['input']>;
  cashAmount?: InputMaybe<Scalars['Float']['input']>;
  classCode?: InputMaybe<Scalars['String']['input']>;
  courseComplete?: InputMaybe<Scalars['String']['input']>;
  discountAmount?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['String']['input']>;
  employment?: InputMaybe<Scalars['String']['input']>;
  isWeekend?: InputMaybe<Scalars['String']['input']>;
  lectureAssignment?: InputMaybe<Scalars['String']['input']>;
  paymentDate?: InputMaybe<Scalars['String']['input']>;
  processingManagerId: Scalars['Int']['input'];
  receiptClassification?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seScore?: InputMaybe<Scalars['Int']['input']>;
  situationReport?: InputMaybe<Scalars['Boolean']['input']>;
  studentId: Scalars['Int']['input'];
  subDiv?: InputMaybe<Scalars['String']['input']>;
  subjectId: Scalars['Int']['input'];
  supportType?: InputMaybe<Scalars['String']['input']>;
  tuitionFee: Scalars['Int']['input'];
  unCollectedAmount?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCreateStudentPortfolioArgs = {
  details?: InputMaybe<Scalars['String']['input']>;
  filePath: Array<InputMaybe<Scalars['String']['input']>>;
  isBest?: InputMaybe<Scalars['String']['input']>;
  studentPaymentId: Scalars['Int']['input'];
  subjectId: Scalars['Int']['input'];
  url?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationCreateStudentStateArgs = {
  input: CreateStudentStateDto;
};


export type MutationCreateSubjectArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  expiresDateEnd?: InputMaybe<Scalars['String']['input']>;
  expiresDateStart?: InputMaybe<Scalars['String']['input']>;
  exposure?: InputMaybe<Scalars['Boolean']['input']>;
  fee: Scalars['Int']['input'];
  roomNum?: InputMaybe<Scalars['String']['input']>;
  round: Scalars['Int']['input'];
  startDate?: InputMaybe<Scalars['String']['input']>;
  subDiv: Scalars['String']['input'];
  subjectCode?: InputMaybe<Scalars['String']['input']>;
  subjectName: Scalars['String']['input'];
  teacherName?: InputMaybe<Scalars['String']['input']>;
  totalTime?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCreateUserActivityLogsArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  eventName: Scalars['String']['input'];
};


export type MutationCreateWorkBoardArgs = {
  createWorkBoardDto: CreateWorkBoardDto;
};


export type MutationCreateWorkLogsArgs = {
  lecturesId: Scalars['Int']['input'];
  workLogsDate: Scalars['String']['input'];
};


export type MutationDeleteAttendanceArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteBranchArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteBusinessAccountReqArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteCareerArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteCertificateArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteConsultationMemoArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteEduInfomationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteEmploymentStatusArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteFileNameSpArgs = {
  fileUrl: Scalars['String']['input'];
  folderName: Scalars['String']['input'];
  id: Scalars['Int']['input'];
};


export type MutationDeleteHopeForEmploymentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteLecturesArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteManageUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteMessageStorageArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePaymentDetailArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePermissionsGrantedArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePreInspectionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteRecommendationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteRegularEvaluationSetArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteSmsArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteStudentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteStudentConsultationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteStudentMemoArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteStudentPaymentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteStudentStateArgs = {
  id: Array<InputMaybe<Scalars['Int']['input']>>;
};


export type MutationDeleteSubjectArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteWorkLogsArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDoubleCheckArgs = {
  name: Scalars['String']['input'];
  phoneNum1: Scalars['String']['input'];
};


export type MutationDuplicateCheckArgs = {
  studentId: Scalars['Int']['input'];
  subjectId: Scalars['Int']['input'];
};


export type MutationEditAdviceTypeArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  defaultValue?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  onOff?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditAttendanceArgs = {
  attendanceState: Array<InputMaybe<Scalars['String']['input']>>;
  id: Array<InputMaybe<Scalars['Int']['input']>>;
  lastModifiedTime: Scalars['String']['input'];
};


export type MutationEditBranchArgs = {
  id: Scalars['Int']['input'];
  newBranchName: Scalars['String']['input'];
};


export type MutationEditBusinessAccountReqArgs = {
  creationComplete: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  rejection?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditCareerArgs = {
  careerDetails: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  lastModifiedTime?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditCertificateArgs = {
  CAdate?: InputMaybe<Scalars['String']['input']>;
  CertificateIssuer?: InputMaybe<Scalars['String']['input']>;
  certificateLevel?: InputMaybe<Scalars['String']['input']>;
  certificateName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  lastModifiedTime: Scalars['String']['input'];
};


export type MutationEditEduInfomationArgs = {
  eduName?: InputMaybe<Scalars['String']['input']>;
  eduType?: InputMaybe<Scalars['String']['input']>;
  graduationStatus?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  lastModifiedTime: Scalars['String']['input'];
  major?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditEmploymentRecommendationArgs = {
  certificateOfEmploymentStatus?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  dateOfInterview?: InputMaybe<Scalars['String']['input']>;
  dateOfRecommendation?: InputMaybe<Scalars['String']['input']>;
  employmentStatus?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  lastModifiedTime: Scalars['String']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  phoneNum?: InputMaybe<Scalars['String']['input']>;
  reasonForNonEmployment?: InputMaybe<Scalars['String']['input']>;
  recruitmentField?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditEmploymentStatusArgs = {
  businessNum: Scalars['String']['input'];
  businessSize: Scalars['String']['input'];
  companyName: Scalars['String']['input'];
  completionType: Scalars['String']['input'];
  dateOfEmployment: Scalars['String']['input'];
  employmentType: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  imploymentInsurance: Scalars['String']['input'];
  lastModifiedTime: Scalars['String']['input'];
  location: Scalars['String']['input'];
  phoneNum: Scalars['String']['input'];
  proofOfImployment: Scalars['String']['input'];
  relatedFields: Scalars['String']['input'];
  responsibilities: Scalars['String']['input'];
};


export type MutationEditHopeEmploymentArgs = {
  fieldOfHope: Scalars['String']['input'];
  hopefulReward: Scalars['Int']['input'];
  id: Scalars['Float']['input'];
  lastModifiedTime: Scalars['String']['input'];
  opinion: Scalars['String']['input'];
  workType: Scalars['String']['input'];
  workingArea?: InputMaybe<Scalars['String']['input']>;
  workingHours: Scalars['Int']['input'];
};


export type MutationEditLecturesArgs = {
  ApprovedNum?: InputMaybe<Scalars['Int']['input']>;
  campus?: InputMaybe<Scalars['String']['input']>;
  confirmedNum?: InputMaybe<Scalars['Int']['input']>;
  eduStatusReport?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  lastModifiedTime: Scalars['String']['input'];
  lectureDetails?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lecturePeriodEnd?: InputMaybe<Scalars['String']['input']>;
  lecturePeriodStart?: InputMaybe<Scalars['String']['input']>;
  lectureTime?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  roomNum?: InputMaybe<Scalars['String']['input']>;
  sessionNum?: InputMaybe<Scalars['Int']['input']>;
  subDiv?: InputMaybe<Scalars['String']['input']>;
  subjectId?: InputMaybe<Scalars['Int']['input']>;
  teachersId?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  temporaryName?: InputMaybe<Scalars['String']['input']>;
  timetableAttached?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditManageUserArgs = {
  branchId?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  lastModifiedTime?: InputMaybe<Scalars['String']['input']>;
  mAddressDetail?: InputMaybe<Scalars['String']['input']>;
  mAddresses?: InputMaybe<Scalars['String']['input']>;
  mAvatar?: InputMaybe<Scalars['String']['input']>;
  mGrade?: InputMaybe<Scalars['Int']['input']>;
  mJoiningDate?: InputMaybe<Scalars['String']['input']>;
  mPart?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  mPassword?: InputMaybe<Scalars['String']['input']>;
  mPhoneNum?: InputMaybe<Scalars['String']['input']>;
  mPhoneNumCompany?: InputMaybe<Scalars['String']['input']>;
  mPhoneNumFriend?: InputMaybe<Scalars['String']['input']>;
  mPhoneNumInside?: InputMaybe<Scalars['String']['input']>;
  mRank?: InputMaybe<Scalars['String']['input']>;
  mUsername?: InputMaybe<Scalars['String']['input']>;
  mZipCode?: InputMaybe<Scalars['String']['input']>;
  resign?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditPaymentDetailArgs = {
  ApprovalNum?: InputMaybe<Scalars['String']['input']>;
  amountPayment?: InputMaybe<Scalars['Int']['input']>;
  bankName?: InputMaybe<Scalars['String']['input']>;
  cardCompany?: InputMaybe<Scalars['String']['input']>;
  cardNum?: InputMaybe<Scalars['String']['input']>;
  cashOrCard: Scalars['String']['input'];
  cashReceipts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  depositAmount?: InputMaybe<Scalars['Int']['input']>;
  depositDate?: InputMaybe<Scalars['String']['input']>;
  depositorName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  installment?: InputMaybe<Scalars['Int']['input']>;
  lastModifiedTime: Scalars['String']['input'];
  paymentDate?: InputMaybe<Scalars['String']['input']>;
  receiverId: Scalars['Int']['input'];
  studentPaymentId: Scalars['Int']['input'];
};


export type MutationEditPermissionsGrantedArgs = {
  allPermitted?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  lastModifiedTime: Scalars['String']['input'];
  manageUserIdsToConnect?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  manageUserIdsToDisconnect?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  permissionName?: InputMaybe<Scalars['String']['input']>;
  readOnly?: InputMaybe<Scalars['String']['input']>;
  smsPermitted?: InputMaybe<Scalars['String']['input']>;
  topic?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditPreInspectionArgs = {
  actionTaken?: InputMaybe<Scalars['String']['input']>;
  dateOfPreInspection?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  lastModifiedTime: Scalars['String']['input'];
  preInspectionDetails?: InputMaybe<Scalars['String']['input']>;
  preScreenerType?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditRegularEvaluationSetArgs = {
  evaluationDetails: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  lastModifiedTime: Scalars['String']['input'];
  points: Scalars['Int']['input'];
  statusType: Scalars['String']['input'];
};


export type MutationEditStudentArgs = {
  birthday?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  lastModifiedTime?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNum1?: InputMaybe<Scalars['String']['input']>;
  phoneNum2?: InputMaybe<Scalars['String']['input']>;
  smsAgreement?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditStudentConsultationArgs = {
  dateOfConsultation?: InputMaybe<Scalars['String']['input']>;
  detailsOfConsultation?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  lastModifiedTime: Scalars['String']['input'];
  typeOfConsultation?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditStudentMemoArgs = {
  content: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  lastModifiedTime: Scalars['String']['input'];
};


export type MutationEditStudentPaymentArgs = {
  actualAmount?: InputMaybe<Scalars['Int']['input']>;
  amountReceived?: InputMaybe<Scalars['Int']['input']>;
  campus?: InputMaybe<Scalars['String']['input']>;
  cardAmount?: InputMaybe<Scalars['Int']['input']>;
  cashAmount?: InputMaybe<Scalars['Int']['input']>;
  classCode?: InputMaybe<Scalars['String']['input']>;
  courseComplete?: InputMaybe<Scalars['String']['input']>;
  discountAmount?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['String']['input']>;
  employment?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  isWeekend?: InputMaybe<Scalars['String']['input']>;
  lastModifiedTime?: InputMaybe<Scalars['String']['input']>;
  lectureAssignment?: InputMaybe<Scalars['String']['input']>;
  mAddressDetail?: InputMaybe<Scalars['String']['input']>;
  mAddresses?: InputMaybe<Scalars['String']['input']>;
  mZipCode?: InputMaybe<Scalars['String']['input']>;
  paymentDate?: InputMaybe<Scalars['String']['input']>;
  processingManagerId?: InputMaybe<Scalars['Int']['input']>;
  receiptClassification?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seScore?: InputMaybe<Scalars['Int']['input']>;
  situationReport?: InputMaybe<Scalars['Boolean']['input']>;
  subDiv?: InputMaybe<Scalars['String']['input']>;
  subject?: InputMaybe<Scalars['String']['input']>;
  subjectId: Scalars['Int']['input'];
  supportType?: InputMaybe<Scalars['String']['input']>;
  tuitionFee?: InputMaybe<Scalars['Int']['input']>;
  unCollectedAmount?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationEditStudentPortfolioArgs = {
  details?: InputMaybe<Scalars['String']['input']>;
  filePath?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id: Scalars['Int']['input'];
  isBest?: InputMaybe<Scalars['String']['input']>;
  lastModifiedTime: Scalars['String']['input'];
  url?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationEditWorkLogsArgs = {
  absentSt?: InputMaybe<Scalars['String']['input']>;
  attendanceCount?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  checkContext?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  checkList?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  etc?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  instruction?: InputMaybe<Scalars['String']['input']>;
  lastModifiedTime: Scalars['String']['input'];
  leaveEarlySt?: InputMaybe<Scalars['String']['input']>;
  lecturesId?: InputMaybe<Scalars['Int']['input']>;
  outingSt?: InputMaybe<Scalars['String']['input']>;
  tardySt?: InputMaybe<Scalars['String']['input']>;
  trainingInfoEight?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  trainingInfoFive?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  trainingInfoFour?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  trainingInfoOne?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  trainingInfoSeven?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  trainingInfoSix?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  trainingInfoThree?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  trainingInfoTwo?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  trainingTimeOneday?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  trainingTimeTotal?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  workLogsDate?: InputMaybe<Scalars['String']['input']>;
};


export type MutationGetHourlySalesDataArgs = {
  date: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationMLoginArgs = {
  mPassword: Scalars['String']['input'];
  mUserId: Scalars['String']['input'];
};


export type MutationReadAlarmsArgs = {
  all?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationRefundApprovalArgs = {
  id: Scalars['Int']['input'];
  refundApproval: Scalars['Boolean']['input'];
  refundApprovalDate: Scalars['String']['input'];
  studentPaymentId: Scalars['Int']['input'];
};


export type MutationReqRefundArgs = {
  id: Scalars['Int']['input'];
  reqRefund: Scalars['Boolean']['input'];
  reqRefundDate: Scalars['String']['input'];
};


export type MutationSalesStatisticsArgs = {
  period: Array<InputMaybe<Scalars['String']['input']>>;
  receiverId: Array<InputMaybe<Scalars['Int']['input']>>;
};


export type MutationSearchLecturesArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  periodEnd?: InputMaybe<Scalars['String']['input']>;
  periodStart?: InputMaybe<Scalars['String']['input']>;
  subjectId?: InputMaybe<Scalars['Int']['input']>;
  teacherId?: InputMaybe<Scalars['Int']['input']>;
  temporaryName?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSearchPaymentDetailArgs = {
  ApprovalNum?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  paymentDate?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  period?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  receiverId?: InputMaybe<Scalars['Int']['input']>;
  refundApproval?: InputMaybe<Scalars['Boolean']['input']>;
  refundApprovalDate?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  reqRefund?: InputMaybe<Scalars['Boolean']['input']>;
  reqRefundDate?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sortOf?: InputMaybe<Scalars['String']['input']>;
  stName?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSearchStudentArgs = {
  birthday?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  createdAt?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  phoneNum?: InputMaybe<Scalars['String']['input']>;
  studentName?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSearchStudentPaymentArgs = {
  createdPeriod?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  employment?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  lectureAssignment?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  period?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  studentName?: InputMaybe<Scalars['String']['input']>;
  subDiv?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSearchStudentStateArgs = {
  adviceType?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  phoneNum1?: InputMaybe<Scalars['String']['input']>;
  pic?: InputMaybe<Scalars['String']['input']>;
  progress?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  receiptDiv?: InputMaybe<Scalars['String']['input']>;
  stName?: InputMaybe<Scalars['String']['input']>;
  stVisit?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  subDiv?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSearchSubjectArgs = {
  exposure?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  subDiv?: InputMaybe<Scalars['String']['input']>;
  subjectCode?: InputMaybe<Scalars['String']['input']>;
  subjectName?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSendSmsArgs = {
  message: Scalars['String']['input'];
  rDate?: InputMaybe<Scalars['String']['input']>;
  rTime?: InputMaybe<Scalars['String']['input']>;
  receiver: Scalars['String']['input'];
  senderNum?: InputMaybe<Scalars['String']['input']>;
};


export type MutationStaticPushAtArgs = {
  id: Scalars['Int']['input'];
  onOff?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateConsultationMemoArgs = {
  content: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  lastModifiedTime?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateFavoriteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateStudentStateArgs = {
  input: EditStudentStateDto;
};


export type MutationUpdateSubjectArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  expiresDateEnd?: InputMaybe<Scalars['String']['input']>;
  expiresDateStart?: InputMaybe<Scalars['String']['input']>;
  exposure?: InputMaybe<Scalars['Boolean']['input']>;
  fee: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
  lastModifiedTime?: InputMaybe<Scalars['String']['input']>;
  mGrade?: InputMaybe<Scalars['Int']['input']>;
  roomNum?: InputMaybe<Scalars['String']['input']>;
  round?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  subDiv: Scalars['String']['input'];
  subjectCode?: InputMaybe<Scalars['String']['input']>;
  subjectName: Scalars['String']['input'];
  teacherName?: InputMaybe<Scalars['String']['input']>;
  totalTime?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationValidateNumberArgs = {
  input: ValidateNumberDto;
};

export type PaymentDetail = {
  __typename?: 'PaymentDetail';
  ApprovalNum?: Maybe<Scalars['String']['output']>;
  Branch?: Maybe<Branch>;
  accountingManager?: Maybe<Scalars['String']['output']>;
  amountPayment?: Maybe<Scalars['Int']['output']>;
  bankName?: Maybe<Scalars['String']['output']>;
  branchId?: Maybe<Scalars['Int']['output']>;
  cardCompany?: Maybe<Scalars['String']['output']>;
  cardNum?: Maybe<Scalars['String']['output']>;
  cashOrCard?: Maybe<Scalars['String']['output']>;
  cashReceipts?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createdAt: Scalars['String']['output'];
  depositAmount?: Maybe<Scalars['Int']['output']>;
  depositDate?: Maybe<Scalars['String']['output']>;
  depositorName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  installment?: Maybe<Scalars['Int']['output']>;
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  paymentDate?: Maybe<Scalars['String']['output']>;
  receiver?: Maybe<ManageUser>;
  receiverId?: Maybe<Scalars['Int']['output']>;
  refundApproval?: Maybe<Scalars['Boolean']['output']>;
  refundApprovalDate?: Maybe<Scalars['String']['output']>;
  refundManager?: Maybe<Scalars['String']['output']>;
  reqRefund?: Maybe<Scalars['Boolean']['output']>;
  reqRefundDate?: Maybe<Scalars['String']['output']>;
  reqRefundManager?: Maybe<Scalars['String']['output']>;
  reqRefundManagerId?: Maybe<Scalars['Int']['output']>;
  stName?: Maybe<Scalars['String']['output']>;
  studentId?: Maybe<Scalars['Int']['output']>;
  studentPayment?: Maybe<StudentPayment>;
  studentPaymentId?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type PaymentDetailResult = {
  __typename?: 'PaymentDetailResult';
  PaymentDetail?: Maybe<Array<Maybe<PaymentDetail>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type PermissionsGranted = {
  __typename?: 'PermissionsGranted';
  Branch?: Maybe<Branch>;
  ManageUser?: Maybe<Array<ManageUser>>;
  allPermitted?: Maybe<Scalars['String']['output']>;
  branchId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  permissionName: Scalars['String']['output'];
  readOnly?: Maybe<Scalars['String']['output']>;
  smsPermitted?: Maybe<Scalars['String']['output']>;
  topic?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type PreInspection = {
  __typename?: 'PreInspection';
  Branch?: Maybe<Branch>;
  StudentPayment?: Maybe<StudentPayment>;
  Subject?: Maybe<Subject>;
  actionTaken?: Maybe<Scalars['String']['output']>;
  branchId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['String']['output'];
  dateOfPreInspection?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastModifiedByName: Scalars['String']['output'];
  lastModifiedByUserId: Scalars['String']['output'];
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  lectureId: Scalars['Int']['output'];
  preInspectionDetails?: Maybe<Scalars['String']['output']>;
  preScreenerType?: Maybe<Scalars['String']['output']>;
  stName: Scalars['String']['output'];
  studentId: Scalars['Int']['output'];
  studentPaymentId: Scalars['Int']['output'];
  subjectId: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type ProcessingManagerGroupResult = {
  __typename?: 'ProcessingManagerGroupResult';
  receiverId?: Maybe<Scalars['Int']['output']>;
  totalActualAmount?: Maybe<Scalars['Int']['output']>;
  totalAmount?: Maybe<Scalars['Int']['output']>;
  totalPaymentCount?: Maybe<Scalars['Int']['output']>;
  totalRefundAmount?: Maybe<Scalars['Int']['output']>;
  totalRefundCount?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  createStamp: CommonResponse;
  dashboardAT: DashboardAtResult;
  dashboardMonth: DashboardMonthResult;
  dashboardRD?: Maybe<Array<Maybe<DashboardRdResult>>>;
  dashboardToday: DashboardTodayResult;
  dashboardUnp: DashboardUnpResult;
  isMme: ResultIsMe;
  mMe: ManageUser;
  sayHello: Scalars['String']['output'];
  searchAcademyRecord: ResultAcademyRecord;
  searchAttendance: SearchAttendanceResult;
  searchAttendanceRecord: ResultSearchAttendanceRecord;
  searchManageUser: SearchManageUserResult;
  searchPermissionsGranted: ResultSearchPermissionsGranted;
  searchSM: ResultSearchSm;
  searchSms: ResultSearchSms;
  searchWorkBoard: ResultSeeWorkBoard;
  searchWorkLogs: SearchWorkLogsResult;
  seeAdviceType: ResultAdviceType;
  seeAlarms: ResultSeeAlarms;
  seeAttendance: SeeAttendanceResult;
  seeFavorite: Array<StudentState>;
  seeLectures: SeeLecturesResult;
  seeManageUser: SeeManageUserResult;
  seeMessageStorage: ResultMessageStorage;
  seePaymentDetail: PaymentDetailResult;
  seeRegularEvaluationSet: ResultSeeRegularEvaluationSet;
  seeStudent: SeeStudentResult;
  seeStudentPayment: StudentPaymentResult;
  seeStudentState: StudentStateResponse;
  seeSubject: SeeSubjectResult;
  seeUserActivityLogs: UserActivityLogsResponse;
  seeWorkBoard: ResultSeeWorkBoard;
  signWorkLogs: SignWorkLogsResult;
};


export type QueryCreateStampArgs = {
  manageUserId: Scalars['Int']['input'];
};


export type QueryDashboardAtArgs = {
  period?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryDashboardRdArgs = {
  period?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryDashboardTodayArgs = {
  today?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  yesterday?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QuerySearchAcademyRecordArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  lectureName?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  phoneNum?: InputMaybe<Scalars['String']['input']>;
  studentName?: InputMaybe<Scalars['String']['input']>;
  subDiv?: InputMaybe<Scalars['String']['input']>;
  teacherName?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchAttendanceArgs = {
  attendanceDate?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  lecturesId: Scalars['Int']['input'];
  studentId?: InputMaybe<Scalars['Int']['input']>;
  studentPaymentId?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySearchAttendanceRecordArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  mUserId?: InputMaybe<Scalars['String']['input']>;
  mUsername?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  period?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QuerySearchManageUserArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  mGrade?: InputMaybe<Scalars['Int']['input']>;
  mJoiningDate?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  mPart?: InputMaybe<Scalars['String']['input']>;
  mPhoneNum?: InputMaybe<Scalars['String']['input']>;
  mRank?: InputMaybe<Scalars['String']['input']>;
  mUserId?: InputMaybe<Scalars['String']['input']>;
  mUsername?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  resign?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchPermissionsGrantedArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  manageUserId?: InputMaybe<Scalars['Int']['input']>;
  permissionName?: InputMaybe<Scalars['String']['input']>;
  topic?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchSmArgs = {
  lectureId?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  modelType: Scalars['String']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  studentPaymentId?: InputMaybe<Scalars['Int']['input']>;
  subjectId?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySearchSmsArgs = {
  branchId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  manageUserId?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  period?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  receiver?: InputMaybe<Scalars['String']['input']>;
  saveType?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchWorkBoardArgs = {
  searchWorkBoardDto: SearchWorkBoardDto;
};


export type QuerySearchWorkLogsArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  lecturesId?: InputMaybe<Scalars['Int']['input']>;
  workLogsDate?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySeeAdviceTypeArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySeeAlarmsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySeeAttendanceArgs = {
  attendanceDate: Scalars['String']['input'];
  lecturesId: Scalars['Int']['input'];
};


export type QuerySeeLecturesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySeeManageUserArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  resign?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySeeMessageStorageArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  saveType: Scalars['String']['input'];
};


export type QuerySeePaymentDetailArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySeeRegularEvaluationSetArgs = {
  lectureId?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  subjectId?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySeeStudentArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySeeStudentPaymentArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySeeStudentStateArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page: Scalars['Int']['input'];
};


export type QuerySeeSubjectArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySeeWorkBoardArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySignWorkLogsArgs = {
  id: Scalars['Int']['input'];
  lastModifiedTime?: InputMaybe<Scalars['String']['input']>;
};

export type RegularEvaluationSet = {
  __typename?: 'RegularEvaluationSet';
  Branch?: Maybe<Branch>;
  Subject?: Maybe<Subject>;
  branchId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['String']['output'];
  evaluationDetails: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastModifiedByName: Scalars['String']['output'];
  lastModifiedByUserId: Scalars['String']['output'];
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  lectureId: Scalars['Int']['output'];
  points: Scalars['Int']['output'];
  statusType: Scalars['String']['output'];
  subjectId: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type ResultAcademyRecord = {
  __typename?: 'ResultAcademyRecord';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  result?: Maybe<Array<Maybe<StudentPayment>>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type ResultAdviceType = {
  __typename?: 'ResultAdviceType';
  adviceType?: Maybe<Array<Maybe<AdviceType>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type ResultIsMe = {
  __typename?: 'ResultIsMe';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type ResultLogin = {
  __typename?: 'ResultLogin';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
};

export type ResultMessageStorage = {
  __typename?: 'ResultMessageStorage';
  data?: Maybe<Array<Maybe<MessageStorage>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type ResultRefreshToken = {
  __typename?: 'ResultRefreshToken';
  error?: Maybe<Scalars['String']['output']>;
  newAccessToken?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type ResultSearchAttendanceRecord = {
  __typename?: 'ResultSearchAttendanceRecord';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  result?: Maybe<Array<Maybe<AttendanceRecord>>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type ResultSearchPermissionsGranted = {
  __typename?: 'ResultSearchPermissionsGranted';
  data?: Maybe<Array<Maybe<PermissionsGranted>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type ResultSearchSm = {
  __typename?: 'ResultSearchSM';
  data?: Maybe<Array<Maybe<SearchDataUnion>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type ResultSearchSms = {
  __typename?: 'ResultSearchSms';
  data?: Maybe<Array<Maybe<Sms>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type ResultSeeAlarms = {
  __typename?: 'ResultSeeAlarms';
  data?: Maybe<Array<Maybe<Alarm>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Float']['output']>;
};

export type ResultSeeRegularEvaluationSet = {
  __typename?: 'ResultSeeRegularEvaluationSet';
  data?: Maybe<Array<Maybe<RegularEvaluationSet>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type ResultSeeWorkBoard = {
  __typename?: 'ResultSeeWorkBoard';
  data?: Maybe<Array<Maybe<WorkBoard>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type ResultValidateNumber = {
  __typename?: 'ResultValidateNumber';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  validateNum?: Maybe<Scalars['String']['output']>;
};

export type SalesStatisticsResult = {
  __typename?: 'SalesStatisticsResult';
  data?: Maybe<Array<Maybe<ProcessingManagerGroupResult>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type SearchAttendanceResult = {
  __typename?: 'SearchAttendanceResult';
  data?: Maybe<Array<Maybe<Attendance>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type SearchDataUnion = Career | Certificate | EduInfomation | EmploymentRecommendation | EmploymentStatus | HopeForEmployment | PreInspection | StudentConsultation | StudentPortfolio;

export type SearchLecturesResult = {
  __typename?: 'SearchLecturesResult';
  data?: Maybe<Array<Maybe<Lectures>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type SearchManageUserResult = {
  __typename?: 'SearchManageUserResult';
  data?: Maybe<Array<Maybe<ManageUser>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type SearchStudentPaymentResult = {
  __typename?: 'SearchStudentPaymentResult';
  data?: Maybe<Array<Maybe<StudentPayment>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type SearchStudentResult = {
  __typename?: 'SearchStudentResult';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  student?: Maybe<Array<Student>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type SearchStudentStateResult = {
  __typename?: 'SearchStudentStateResult';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  studentState?: Maybe<Array<Maybe<StudentState>>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type SearchSubjectResult = {
  __typename?: 'SearchSubjectResult';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  result?: Maybe<Array<Maybe<Subject>>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type SearchWorkBoardDto = {
  id?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  toPerson?: InputMaybe<Scalars['String']['input']>;
  toTeam?: InputMaybe<Scalars['String']['input']>;
  workPeriod?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  workStatus?: InputMaybe<Scalars['String']['input']>;
  writer?: InputMaybe<Scalars['String']['input']>;
};

export type SearchWorkLogsResult = {
  __typename?: 'SearchWorkLogsResult';
  data?: Maybe<Array<Maybe<WorkLogs>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type SeeAttendanceResult = {
  __typename?: 'SeeAttendanceResult';
  absentCount?: Maybe<Scalars['Int']['output']>;
  absentData?: Maybe<Array<Maybe<Attendance>>>;
  attendanceCount?: Maybe<Scalars['Int']['output']>;
  attendanceData?: Maybe<Array<Maybe<Attendance>>>;
  enrollCount?: Maybe<Scalars['Int']['output']>;
  enrollData?: Maybe<Array<Maybe<Attendance>>>;
  error?: Maybe<Scalars['String']['output']>;
  leaveEarlyCount?: Maybe<Scalars['Int']['output']>;
  leaveEarlyData?: Maybe<Array<Maybe<Attendance>>>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  outingCount?: Maybe<Scalars['Int']['output']>;
  outingData?: Maybe<Array<Maybe<Attendance>>>;
  tardyCount?: Maybe<Scalars['Int']['output']>;
  tardyData?: Maybe<Array<Maybe<Attendance>>>;
};

export type SeeLecturesResult = {
  __typename?: 'SeeLecturesResult';
  data?: Maybe<Array<Maybe<Lectures>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type SeeManageUserResult = {
  __typename?: 'SeeManageUserResult';
  data?: Maybe<Array<Maybe<ManageUser>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type SeeStudentResult = {
  __typename?: 'SeeStudentResult';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  student?: Maybe<Array<Maybe<Student>>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type SeeSubjectResult = {
  __typename?: 'SeeSubjectResult';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  subject?: Maybe<Array<Maybe<Subject>>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type SignWorkLogsResult = {
  __typename?: 'SignWorkLogsResult';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  stampUrl?: Maybe<Scalars['String']['output']>;
};

export type Sms = {
  __typename?: 'Sms';
  Branch?: Maybe<Branch>;
  branchId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['String']['output'];
  failureReason?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  manageUser?: Maybe<ManageUser>;
  manageUserId?: Maybe<Scalars['Int']['output']>;
  message: Scalars['String']['output'];
  rDate?: Maybe<Scalars['String']['output']>;
  rTime?: Maybe<Scalars['String']['output']>;
  receiver: Scalars['String']['output'];
  saveType?: Maybe<Scalars['String']['output']>;
  sender?: Maybe<Scalars['String']['output']>;
  successType?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type Stamp = {
  __typename?: 'Stamp';
  Manager?: Maybe<ManageUser>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  manageUserId?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Student = {
  __typename?: 'Student';
  Branch?: Maybe<Branch>;
  birthday?: Maybe<Scalars['String']['output']>;
  branchId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  manager?: Maybe<ManageUser>;
  managerUserId?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  phoneNum1: Scalars['String']['output'];
  phoneNum2?: Maybe<Scalars['String']['output']>;
  smsAgreement: Scalars['String']['output'];
  studentMemo?: Maybe<Array<StudentMemo>>;
  studentPayment?: Maybe<Array<StudentPayment>>;
  updatedAt: Scalars['String']['output'];
  writer: Scalars['String']['output'];
};

export type StudentConsultation = {
  __typename?: 'StudentConsultation';
  Branch?: Maybe<Branch>;
  StudentPayment?: Maybe<StudentPayment>;
  Subject?: Maybe<Subject>;
  branchId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['String']['output'];
  dateOfConsultation: Scalars['String']['output'];
  detailsOfConsultation: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastModifiedByName: Scalars['String']['output'];
  lastModifiedByUserId: Scalars['String']['output'];
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  lectureId: Scalars['Int']['output'];
  stName: Scalars['String']['output'];
  studentId: Scalars['Int']['output'];
  studentPaymentId: Scalars['Int']['output'];
  subjectId: Scalars['Int']['output'];
  typeOfConsultation: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type StudentMemo = {
  __typename?: 'StudentMemo';
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  manageUser?: Maybe<ManageUser>;
  manageUserId?: Maybe<Scalars['Int']['output']>;
  student?: Maybe<Student>;
  studentId?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type StudentPayment = {
  __typename?: 'StudentPayment';
  Branch?: Maybe<Branch>;
  Career?: Maybe<Array<Maybe<Career>>>;
  Certificate?: Maybe<Array<Maybe<Certificate>>>;
  EduInfomation?: Maybe<Array<Maybe<EduInfomation>>>;
  EmploymentRecommendation?: Maybe<Array<Maybe<EmploymentRecommendation>>>;
  EmploymentStatus?: Maybe<Array<Maybe<EmploymentStatus>>>;
  HopeForEmployment?: Maybe<Array<Maybe<HopeForEmployment>>>;
  PreInspection?: Maybe<Array<Maybe<PreInspection>>>;
  StudentConsultation?: Maybe<Array<Maybe<StudentConsultation>>>;
  StudentPortfolio?: Maybe<Array<Maybe<StudentPortfolio>>>;
  actualAmount?: Maybe<Scalars['Int']['output']>;
  amountReceived?: Maybe<Scalars['Int']['output']>;
  attendance?: Maybe<Array<Maybe<Attendance>>>;
  branchId?: Maybe<Scalars['Int']['output']>;
  campus?: Maybe<Scalars['String']['output']>;
  cardAmount?: Maybe<Scalars['Int']['output']>;
  cashAmount?: Maybe<Scalars['Int']['output']>;
  classCode?: Maybe<Scalars['String']['output']>;
  courseComplete?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  dateOfDroppingOut?: Maybe<Scalars['String']['output']>;
  discountAmount?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['String']['output']>;
  employment?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isWeekend?: Maybe<Scalars['String']['output']>;
  lastModifiedByName?: Maybe<Scalars['String']['output']>;
  lastModifiedByUserId?: Maybe<Scalars['String']['output']>;
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  lectureAssignment?: Maybe<Scalars['String']['output']>;
  mAddressDetail?: Maybe<Scalars['String']['output']>;
  mAddresses?: Maybe<Scalars['String']['output']>;
  mZipCode?: Maybe<Scalars['String']['output']>;
  paymentDate?: Maybe<Scalars['String']['output']>;
  paymentDetail?: Maybe<Array<Maybe<PaymentDetail>>>;
  processingManager?: Maybe<ManageUser>;
  processingManagerId?: Maybe<Scalars['Int']['output']>;
  reasonFordroppingOut?: Maybe<Scalars['String']['output']>;
  receiptClassification?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  seScore?: Maybe<Scalars['Int']['output']>;
  situationReport?: Maybe<Scalars['Boolean']['output']>;
  student?: Maybe<Student>;
  studentId: Scalars['Int']['output'];
  subDiv?: Maybe<Scalars['String']['output']>;
  subject?: Maybe<Subject>;
  subjectId?: Maybe<Scalars['Int']['output']>;
  supportType?: Maybe<Scalars['String']['output']>;
  tuitionFee?: Maybe<Scalars['Int']['output']>;
  unCollectedAmount?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type StudentPaymentResult = {
  __typename?: 'StudentPaymentResult';
  StudentPayment?: Maybe<Array<Maybe<StudentPayment>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type StudentPortfolio = {
  __typename?: 'StudentPortfolio';
  Branch?: Maybe<Branch>;
  StudentPayment?: Maybe<StudentPayment>;
  Subject?: Maybe<Subject>;
  branchId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['String']['output'];
  details?: Maybe<Scalars['String']['output']>;
  filePath: Array<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isBest: Scalars['String']['output'];
  lastModifiedByName: Scalars['String']['output'];
  lastModifiedByUserId: Scalars['String']['output'];
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  lectureId: Scalars['Int']['output'];
  stName: Scalars['String']['output'];
  studentId: Scalars['Int']['output'];
  studentPaymentId: Scalars['Int']['output'];
  subjectId: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
  url?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type StudentState = {
  __typename?: 'StudentState';
  Branch?: Maybe<Branch>;
  adviceTypes?: Maybe<Array<Maybe<AdviceType>>>;
  agreement: Scalars['String']['output'];
  branchId?: Maybe<Scalars['Int']['output']>;
  campus?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  classMethod?: Maybe<Array<Scalars['String']['output']>>;
  consultationMemo?: Maybe<Array<Maybe<ConsultationMemo>>>;
  createdAt: Scalars['String']['output'];
  currentManager?: Maybe<ManageUser>;
  currentManagerId?: Maybe<Scalars['Int']['output']>;
  detail?: Maybe<Scalars['String']['output']>;
  expEnrollDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  perchase?: Maybe<Scalars['Boolean']['output']>;
  phoneNum1: Scalars['String']['output'];
  phoneNum2?: Maybe<Scalars['String']['output']>;
  phoneNum3?: Maybe<Scalars['String']['output']>;
  pic?: Maybe<Scalars['String']['output']>;
  progress: Scalars['Int']['output'];
  receiptDiv?: Maybe<Scalars['String']['output']>;
  stAddr?: Maybe<Scalars['String']['output']>;
  stEmail?: Maybe<Scalars['String']['output']>;
  stName: Scalars['String']['output'];
  stVisit?: Maybe<Scalars['String']['output']>;
  subDiv?: Maybe<Scalars['String']['output']>;
  subject?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  updatedAt: Scalars['String']['output'];
};

export type StudentStateResponse = {
  __typename?: 'StudentStateResponse';
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  studentState?: Maybe<Array<Maybe<StudentState>>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type Subject = {
  __typename?: 'Subject';
  Branch?: Maybe<Branch>;
  StudentPayment?: Maybe<Array<StudentPayment>>;
  branchId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['String']['output']>;
  expiresDateEnd?: Maybe<Scalars['String']['output']>;
  expiresDateStart?: Maybe<Scalars['String']['output']>;
  exposure?: Maybe<Scalars['Boolean']['output']>;
  fee?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  lectures?: Maybe<Lectures>;
  roomNum?: Maybe<Scalars['String']['output']>;
  round?: Maybe<Scalars['Int']['output']>;
  startDate?: Maybe<Scalars['String']['output']>;
  subDiv?: Maybe<Scalars['String']['output']>;
  subjectCode?: Maybe<Scalars['String']['output']>;
  subjectName?: Maybe<Scalars['String']['output']>;
  teacherName?: Maybe<Scalars['String']['output']>;
  totalTime?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type UpdateFavoriteResult = {
  __typename?: 'UpdateFavoriteResult';
  error?: Maybe<Scalars['String']['output']>;
  favoriteStudentState?: Maybe<ManageUser>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type UpdateStudentStateResult = {
  __typename?: 'UpdateStudentStateResult';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type UserActivityLogs = {
  __typename?: 'UserActivityLogs';
  Branch?: Maybe<Branch>;
  branchId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  eventName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export type UserActivityLogsResponse = {
  __typename?: 'UserActivityLogsResponse';
  data?: Maybe<Array<Maybe<UserActivityLogs>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type ValidateNumberDto = {
  phoneNum: Scalars['String']['input'];
};

export type WorkBoard = {
  __typename?: 'WorkBoard';
  branch?: Maybe<Branch>;
  branchId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['String']['output'];
  detail: Scalars['String']['output'];
  endDate?: Maybe<Scalars['String']['output']>;
  filePath?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  level?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  toPerson?: Maybe<Scalars['String']['output']>;
  toTeam?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  workStatus?: Maybe<Scalars['String']['output']>;
  writer: Scalars['String']['output'];
};

export type WorkLogs = {
  __typename?: 'WorkLogs';
  Branch?: Maybe<Branch>;
  BranchId?: Maybe<Scalars['Int']['output']>;
  absentSt?: Maybe<Scalars['String']['output']>;
  attendanceCount?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  checkContext?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  checkList?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createdAt: Scalars['String']['output'];
  etc?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  instruction?: Maybe<Scalars['String']['output']>;
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  leaveEarlySt?: Maybe<Scalars['String']['output']>;
  lectures?: Maybe<Lectures>;
  lecturesId: Scalars['Int']['output'];
  outingSt?: Maybe<Scalars['String']['output']>;
  paymentOne?: Maybe<Scalars['String']['output']>;
  paymentThree?: Maybe<Scalars['String']['output']>;
  paymentTwo?: Maybe<Scalars['String']['output']>;
  tardySt?: Maybe<Scalars['String']['output']>;
  trainingInfoEight?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  trainingInfoFive?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  trainingInfoFour?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  trainingInfoOne?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  trainingInfoSeven?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  trainingInfoSix?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  trainingInfoThree?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  trainingInfoTwo?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  trainingTimeOneday?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  trainingTimeTotal?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  updatedAt: Scalars['String']['output'];
  workLogsDate: Scalars['String']['output'];
};
