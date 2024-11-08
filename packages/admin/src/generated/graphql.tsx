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
  studentStates?: Maybe<Array<StudentState>>;
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
  StudentPayment: StudentPayment;
  Subject: Subject;
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
  updatedAt: Scalars['String']['output'];
};

export type Certificate = {
  __typename?: 'Certificate';
  Branch?: Maybe<Branch>;
  CAdate: Scalars['String']['output'];
  CertificateIssuer: Scalars['String']['output'];
  StudentPayment: StudentPayment;
  Subject: Subject;
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

export type EduInfomation = {
  __typename?: 'EduInfomation';
  Branch?: Maybe<Branch>;
  StudentPayment: StudentPayment;
  Subject: Subject;
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
  updatedAt: Scalars['String']['output'];
};

export type EmploymentRecommendation = {
  __typename?: 'EmploymentRecommendation';
  Branch?: Maybe<Branch>;
  StudentPayment: StudentPayment;
  Subject: Subject;
  branchId: Scalars['Int']['output'];
  certificateOfEmploymentStatus: Scalars['String']['output'];
  companyName: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  dateOfInterview?: Maybe<Scalars['String']['output']>;
  dateOfRecommendation: Scalars['String']['output'];
  employmentStatus: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastModifiedByName: Scalars['String']['output'];
  lastModifiedByUserId: Scalars['String']['output'];
  lastModifiedTime: Scalars['String']['output'];
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
  StudentPayment: StudentPayment;
  Subject: Subject;
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
  StudentPayment: StudentPayment;
  Subject: Subject;
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
  Stamp?: Maybe<Array<Stamp>>;
  Student?: Maybe<Array<Student>>;
  StudentMemo?: Maybe<Array<StudentMemo>>;
  StudentPayment?: Maybe<Array<StudentPayment>>;
  StudentState?: Maybe<Array<StudentState>>;
  branchId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  favoriteStudentState?: Maybe<Array<Scalars['Int']['output']>>;
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

export type Mutation = {
  __typename?: 'Mutation';
  changeOrderAT: CommonResponse;
  createAdviceType: CommonResponse;
  createAttendanceRecord: CommonResponse;
  createBranch: CommonResponse;
  createConsultationMemo: CommonResponse;
  createManageUser: CommonResponse;
  createMasterUser: CommonResponse;
  createPermissionGranted: CommonResponse;
  createStudentState: CommonResponse;
  createSubject: CommonResponse;
  deleteBranch: CommonResponse;
  deleteConsultationMemo: CommonResponse;
  deleteManageUser: CommonResponse;
  deletePermissionsGranted: CommonResponse;
  deleteStudentState: CommonResponse;
  deleteSubject: CommonResponse;
  editAdviceType: CommonResponse;
  editBranch: CommonResponse;
  editManageUser: CommonResponse;
  editPermissionsGranted: CommonResponse;
  mLogin: ResultLogin;
  readAlarms: CommonResponse;
  refreshToken: ResultRefreshToken;
  searchStudentState: SearchStudentStateResult;
  searchSubject: SearchSubjectResult;
  staticPushAT: CommonResponse;
  updateConsultationMemo: CommonResponse;
  updateFavorite: UpdateFavoriteResult;
  updateStudentState: UpdateStudentStateResult;
  updateSubject: CommonResponse;
};


export type MutationChangeOrderAtArgs = {
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  indexNums: Array<Scalars['Int']['input']>;
};


export type MutationCreateAdviceTypeArgs = {
  category: Scalars['String']['input'];
  defaultValue?: InputMaybe<Scalars['String']['input']>;
  indexNum: Scalars['Int']['input'];
  onOff?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};


export type MutationCreateAttendanceRecordArgs = {
  clockIn: Scalars['String']['input'];
};


export type MutationCreateBranchArgs = {
  branchName: Scalars['String']['input'];
};


export type MutationCreateConsultationMemoArgs = {
  content: Scalars['String']['input'];
  studentStateId: Scalars['Int']['input'];
};


export type MutationCreateManageUserArgs = {
  branchId?: InputMaybe<Scalars['Int']['input']>;
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


export type MutationCreatePermissionGrantedArgs = {
  allPermitted?: InputMaybe<Scalars['String']['input']>;
  manageUserIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  permissionName: Scalars['String']['input'];
  readOnly?: InputMaybe<Scalars['String']['input']>;
  smsPermitted?: InputMaybe<Scalars['String']['input']>;
  topic: Scalars['String']['input'];
};


export type MutationCreateStudentStateArgs = {
  adviceTypes: Array<Scalars['Int']['input']>;
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
  subject: Array<Scalars['String']['input']>;
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


export type MutationDeleteBranchArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteConsultationMemoArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteManageUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePermissionsGrantedArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteStudentStateArgs = {
  id: Array<Scalars['Int']['input']>;
};


export type MutationDeleteSubjectArgs = {
  id: Scalars['Int']['input'];
};


export type MutationEditAdviceTypeArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  defaultValue?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  onOff?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditBranchArgs = {
  id: Scalars['Int']['input'];
  newBranchName: Scalars['String']['input'];
};


export type MutationEditManageUserArgs = {
  branchId?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  lastModifiedTime?: InputMaybe<Scalars['String']['input']>;
  mAddressDetail?: InputMaybe<Scalars['String']['input']>;
  mAddresses?: InputMaybe<Scalars['String']['input']>;
  mGrade?: InputMaybe<Scalars['Int']['input']>;
  mJoiningDate?: InputMaybe<Scalars['String']['input']>;
  mPart?: InputMaybe<Array<Scalars['String']['input']>>;
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


export type MutationEditPermissionsGrantedArgs = {
  allPermitted?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  lastModifiedTime: Scalars['String']['input'];
  manageUserIdsToConnect?: InputMaybe<Array<Scalars['Int']['input']>>;
  manageUserIdsToDisconnect?: InputMaybe<Array<Scalars['Int']['input']>>;
  permissionName?: InputMaybe<Scalars['String']['input']>;
  readOnly?: InputMaybe<Scalars['String']['input']>;
  smsPermitted?: InputMaybe<Scalars['String']['input']>;
  topic?: InputMaybe<Scalars['String']['input']>;
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
  cashReceipts?: Maybe<Array<Scalars['String']['output']>>;
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
  studentPayment: StudentPayment;
  studentPaymentId: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
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
  StudentPayment: StudentPayment;
  Subject: Subject;
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

export type Query = {
  __typename?: 'Query';
  isMme: ResultIsMe;
  mMe: ManageUser;
  sayHello: Scalars['String']['output'];
  searchAttendanceRecord: ResultSearchAttendanceRecord;
  searchManageUser: SearchManageUserResult;
  searchPermissionsGranted: ResultSearchPermissionsGranted;
  seeAdviceType: ResultAdviceType;
  seeAlarms: ResultSeeAlarms;
  seeFavorite: Array<StudentState>;
  seeManageUser: ResultSeeManageUser;
  seeStudentState: StudentStateResponse;
  seeSubject: SeeSubjectResult;
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


export type QuerySeeAdviceTypeArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySeeAlarmsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySeeManageUserArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  resign?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySeeStudentStateArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page: Scalars['Int']['input'];
};


export type QuerySeeSubjectArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
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

export type ResultSeeAlarms = {
  __typename?: 'ResultSeeAlarms';
  data?: Maybe<Array<Maybe<Alarm>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Float']['output']>;
};

export type ResultSeeManageUser = {
  __typename?: 'ResultSeeManageUser';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  result?: Maybe<Array<Maybe<ManageUser>>>;
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

export type SeeSubjectResult = {
  __typename?: 'SeeSubjectResult';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  subject?: Maybe<Array<Maybe<Subject>>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
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
  StudentPayment: StudentPayment;
  Subject: Subject;
  branchId: Scalars['Int']['output'];
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
  Career?: Maybe<Array<Career>>;
  Certificate?: Maybe<Array<Certificate>>;
  EduInfomation?: Maybe<Array<EduInfomation>>;
  EmploymentRecommendation?: Maybe<Array<EmploymentRecommendation>>;
  EmploymentStatus?: Maybe<Array<EmploymentStatus>>;
  HopeForEmployment?: Maybe<Array<HopeForEmployment>>;
  PreInspection?: Maybe<Array<PreInspection>>;
  StudentConsultation?: Maybe<Array<StudentConsultation>>;
  StudentPortfolio?: Maybe<Array<StudentPortfolio>>;
  actualAmount?: Maybe<Scalars['Int']['output']>;
  amountReceived?: Maybe<Scalars['Int']['output']>;
  attendance?: Maybe<Array<Attendance>>;
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
  paymentDetail?: Maybe<Array<PaymentDetail>>;
  processingManager?: Maybe<ManageUser>;
  processingManagerId?: Maybe<Scalars['Int']['output']>;
  reasonFordroppingOut?: Maybe<Scalars['String']['output']>;
  receiptClassification?: Maybe<Array<Scalars['String']['output']>>;
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

export type StudentPortfolio = {
  __typename?: 'StudentPortfolio';
  Branch?: Maybe<Branch>;
  StudentPayment: StudentPayment;
  Subject: Subject;
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
  url?: Maybe<Array<Scalars['String']['output']>>;
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
  subject?: Maybe<Array<Scalars['String']['output']>>;
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

export type WorkLogs = {
  __typename?: 'WorkLogs';
  Branch?: Maybe<Branch>;
  BranchId?: Maybe<Scalars['Int']['output']>;
  absentSt?: Maybe<Scalars['String']['output']>;
  attendanceCount: Array<Scalars['Int']['output']>;
  checkContext?: Maybe<Array<Scalars['String']['output']>>;
  checkList: Array<Scalars['String']['output']>;
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
  trainingInfoEight: Array<Scalars['String']['output']>;
  trainingInfoFive: Array<Scalars['String']['output']>;
  trainingInfoFour: Array<Scalars['String']['output']>;
  trainingInfoOne: Array<Scalars['String']['output']>;
  trainingInfoSeven: Array<Scalars['String']['output']>;
  trainingInfoSix: Array<Scalars['String']['output']>;
  trainingInfoThree: Array<Scalars['String']['output']>;
  trainingInfoTwo: Array<Scalars['String']['output']>;
  trainingTimeOneday: Array<Scalars['Int']['output']>;
  trainingTimeTotal: Array<Scalars['Int']['output']>;
  updatedAt: Scalars['String']['output'];
  workLogsDate: Scalars['String']['output'];
};
