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
  Upload: { input: any; output: any; }
};

export type AdviceType = {
  __typename?: 'AdviceType';
  category?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  indexNum?: Maybe<Scalars['Int']['output']>;
  onOff?: Maybe<Scalars['String']['output']>;
  studentStates?: Maybe<Array<Maybe<StudentState>>>;
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Alarm = {
  __typename?: 'Alarm';
  Branch?: Maybe<Branch>;
  branchId?: Maybe<Scalars['Int']['output']>;
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  personalTarget?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Attendance = {
  __typename?: 'Attendance';
  attendanceDate?: Maybe<Scalars['String']['output']>;
  attendanceDateTime?: Maybe<Scalars['String']['output']>;
  attendanceState?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  isCanceled?: Maybe<Scalars['String']['output']>;
  lectures?: Maybe<Lectures>;
  lecturesId?: Maybe<Scalars['Int']['output']>;
  student?: Maybe<Student>;
  studentId?: Maybe<Scalars['Int']['output']>;
  studentPayment?: Maybe<StudentPayment>;
  studentPaymentId: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type AuthEmailResult = {
  __typename?: 'AuthEmailResult';
  code?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  ok: Scalars['Boolean']['output'];
};

export type Branch = {
  __typename?: 'Branch';
  branchName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type CheckAccountResult = {
  __typename?: 'CheckAccountResult';
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isMine: Scalars['Boolean']['output'];
  payload: Scalars['String']['output'];
  photo: Photo;
  replies?: Maybe<Array<Maybe<Reply>>>;
  updatedAt: Scalars['String']['output'];
  user: User;
};

export type CommonResponse = {
  __typename?: 'CommonResponse';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CommonSubscription = {
  __typename?: 'CommonSubscription';
  message?: Maybe<Scalars['String']['output']>;
  ok?: Maybe<Scalars['Boolean']['output']>;
};

export type ConsultationMemo = {
  __typename?: 'ConsultationMemo';
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  manageUser?: Maybe<ManageUser>;
  manageUserId?: Maybe<Scalars['Int']['output']>;
  studentState?: Maybe<StudentState>;
  studentStateId?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type CreateAccountResult = {
  __typename?: 'CreateAccountResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateCommentResult = {
  __typename?: 'CreateCommentResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateConsultationMemoResult = {
  __typename?: 'CreateConsultationMemoResult';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type DashboardAtResult = {
  __typename?: 'DashboardATResult';
  count?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
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

export type DeleteConsultationMemoResult = {
  __typename?: 'DeleteConsultationMemoResult';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type DeletePhotoResult = {
  __typename?: 'DeletePhotoResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type DeleteStudentStateResult = {
  __typename?: 'DeleteStudentStateResult';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type EditPhotoResult = {
  __typename?: 'EditPhotoResult';
  changes?: Maybe<Scalars['String']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type EditProfileResult = {
  __typename?: 'EditProfileResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type File = {
  __typename?: 'File';
  encoding: Scalars['String']['output'];
  filename: Scalars['String']['output'];
  mimetype: Scalars['String']['output'];
};

export type Hashtag = {
  __typename?: 'Hashtag';
  createdAt: Scalars['String']['output'];
  hashtag: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  photos?: Maybe<Array<Maybe<Photo>>>;
  totalPhotos?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['String']['output'];
};


export type HashtagPhotosArgs = {
  lastId?: InputMaybe<Scalars['Int']['input']>;
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
  ok?: Maybe<Scalars['Boolean']['output']>;
  thisTimeAmountTotal?: Maybe<Scalars['Int']['output']>;
  thisTimeRealTotal?: Maybe<Scalars['Int']['output']>;
  thisTimeRefundTotal?: Maybe<Scalars['Int']['output']>;
};

export type IsMeResult = {
  __typename?: 'IsMeResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type Lectures = {
  __typename?: 'Lectures';
  ApprovedNum: Scalars['Int']['output'];
  WorkLogs?: Maybe<Array<Maybe<WorkLogs>>>;
  campus: Scalars['String']['output'];
  confirmedNum: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  eduStatusReport: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lectureDetails: Array<Maybe<Scalars['String']['output']>>;
  lecturePeriodEnd: Scalars['String']['output'];
  lecturePeriodStart: Scalars['String']['output'];
  lectureTime: Array<Maybe<Scalars['String']['output']>>;
  roomNum: Scalars['String']['output'];
  sessionNum: Scalars['Int']['output'];
  subDiv?: Maybe<Scalars['String']['output']>;
  subject?: Maybe<Subject>;
  subjectId: Scalars['Int']['output'];
  teachers: Array<Maybe<ManageUser>>;
  temporaryName: Scalars['String']['output'];
  timetableAttached?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type Like = {
  __typename?: 'Like';
  UpdatedAt: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  photo: Photo;
  user: User;
};

export type LoginResult = {
  __typename?: 'LoginResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type ManageUser = {
  __typename?: 'ManageUser';
  ConsultationMemo?: Maybe<Array<Maybe<ConsultationMemo>>>;
  Lectures?: Maybe<Array<Maybe<Lectures>>>;
  PaymentDetail?: Maybe<Array<Maybe<PaymentDetail>>>;
  Stamp?: Maybe<Array<Maybe<Stamp>>>;
  Student?: Maybe<Array<Maybe<Student>>>;
  StudentMemo?: Maybe<Array<Maybe<StudentMemo>>>;
  StudentPayment?: Maybe<Array<Maybe<StudentPayment>>>;
  StudentStates?: Maybe<Array<Maybe<StudentState>>>;
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  favoriteStudentState?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  frequentlyUsed?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id: Scalars['Int']['output'];
  lastModifiedBy?: Maybe<Scalars['String']['output']>;
  mAddressDetail?: Maybe<Scalars['String']['output']>;
  mAddresses?: Maybe<Scalars['String']['output']>;
  mAvatar?: Maybe<Scalars['String']['output']>;
  mGrade?: Maybe<Scalars['Int']['output']>;
  mJoiningDate?: Maybe<Scalars['String']['output']>;
  mPart?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  mPassword: Scalars['String']['output'];
  mPhoneNum?: Maybe<Scalars['String']['output']>;
  mPhoneNumCompany?: Maybe<Scalars['String']['output']>;
  mPhoneNumFriend?: Maybe<Scalars['String']['output']>;
  mPhoneNumInside?: Maybe<Scalars['String']['output']>;
  mRank?: Maybe<Scalars['String']['output']>;
  mUserId: Scalars['String']['output'];
  mUsername: Scalars['String']['output'];
  mZipCode?: Maybe<Scalars['String']['output']>;
  resign?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isMine: Scalars['Boolean']['output'];
  myName?: Maybe<Scalars['String']['output']>;
  payload: Scalars['String']['output'];
  room: Room;
  roomId: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
  user: User;
  userId: Scalars['Int']['output'];
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
  updatedAt: Branch;
};

export type Mutation = {
  __typename?: 'Mutation';
  authEmail?: Maybe<AuthEmailResult>;
  calcLectures?: Maybe<ResultCalcLectures>;
  changeOrderAT?: Maybe<CommonResponse>;
  checkNick: CheckAccountResult;
  checkUser: CheckAccountResult;
  classCancellation?: Maybe<CommonResponse>;
  createAccount?: Maybe<CreateAccountResult>;
  createAdviceType?: Maybe<CommonResponse>;
  createAttendance?: Maybe<CommonResponse>;
  createBranch?: Maybe<CommonResponse>;
  createComment: MutationResponse;
  createConsultationMemo?: Maybe<CreateConsultationMemoResult>;
  createLectures?: Maybe<CommonResponse>;
  createManagerAccount?: Maybe<CreateManagerAccountResult>;
  createMessageStorage?: Maybe<CommonResponse>;
  createPaymentDetail?: Maybe<CommonResponse>;
  createReplyComment: CreateReplyCommentResult;
  createStudent?: Maybe<CommonResponse>;
  createStudentMemo?: Maybe<CommonResponse>;
  createStudentPayment?: Maybe<CommonResponse>;
  createStudentState?: Maybe<CommonResponse>;
  createSubject?: Maybe<CommonResponse>;
  createUserActivityLogs?: Maybe<CommonResponse>;
  createWorkLogs?: Maybe<CommonResponse>;
  createWorkRequest?: Maybe<CommonResponse>;
  deleteAdviceType?: Maybe<CommonResponse>;
  deleteComment: MutationResponse;
  deleteConsultationMemo?: Maybe<DeleteConsultationMemoResult>;
  deleteLectures?: Maybe<CommonResponse>;
  deleteManageUser?: Maybe<CommonResponse>;
  deleteMessage: MutationResponse;
  deleteMessageStorage?: Maybe<CommonResponse>;
  deletePhoto: DeletePhotoResult;
  deleteStamp?: Maybe<CommonResponse>;
  deleteStudent?: Maybe<CommonResponse>;
  deleteStudentMemo?: Maybe<CommonResponse>;
  deleteStudentPayment?: Maybe<CommonResponse>;
  deleteStudentState?: Maybe<DeleteStudentStateResult>;
  deleteSubject?: Maybe<CommonResponse>;
  deleteWorkRequest?: Maybe<CommonResponse>;
  devEditManageUser?: Maybe<CommonResponse>;
  doubleCheck?: Maybe<CommonResponse>;
  duplicateCheck?: Maybe<CommonResponse>;
  editAdviceType?: Maybe<CommonResponse>;
  editAttendance?: Maybe<CommonResponse>;
  editComment: MutationResponse;
  editLectures?: Maybe<CommonResponse>;
  editManageUser?: Maybe<CommonResponse>;
  editPaymentDetail?: Maybe<CommonResponse>;
  editPhoto: EditPhotoResult;
  editProfile?: Maybe<EditProfileResult>;
  editStudent?: Maybe<CommonResponse>;
  editStudentMemo?: Maybe<CommonResponse>;
  editStudentPayment?: Maybe<CommonResponse>;
  editWorkLogs?: Maybe<CommonResponse>;
  editWorkRequest?: Maybe<CommonResponse>;
  followUser?: Maybe<FollowUserResult>;
  getHourlySalesData?: Maybe<HourlySalesData>;
  getSalesData?: Maybe<Array<SalesData>>;
  insertBranchToAdviceType?: Maybe<CommonResponse>;
  insertBranchToAttendance?: Maybe<CommonResponse>;
  insertBranchToConsultationMemo?: Maybe<CommonResponse>;
  insertBranchToLectures?: Maybe<CommonResponse>;
  insertBranchToManageUser?: Maybe<CommonResponse>;
  insertBranchToPaymentDetail?: Maybe<CommonResponse>;
  insertBranchToStamp?: Maybe<CommonResponse>;
  insertBranchToStudent?: Maybe<CommonResponse>;
  insertBranchToStudentMemo?: Maybe<CommonResponse>;
  insertBranchToStudentPayment?: Maybe<CommonResponse>;
  insertBranchToStudentState?: Maybe<CommonResponse>;
  insertBranchToSubject?: Maybe<CommonResponse>;
  insertBranchToUserActivityLogs?: Maybe<CommonResponse>;
  insertBranchToWorkLogs?: Maybe<CommonResponse>;
  insertBranchToWorkRequest?: Maybe<CommonResponse>;
  login?: Maybe<LoginResult>;
  mLogin?: Maybe<MLoginResult>;
  readAlarms: CommonResponse;
  readMessage: MutationResponse;
  refundApproval?: Maybe<CommonResponse>;
  reqRefund?: Maybe<CommonResponse>;
  salesStatistics?: Maybe<SalesStatisticsResult>;
  salesStatisticsList?: Maybe<SalesStatisticsListResult>;
  searchLectures?: Maybe<SearchLecturesResult>;
  searchPaymentDetail?: Maybe<PaymentDetailResult>;
  searchStudent?: Maybe<SearchStudentResult>;
  searchStudentPayment?: Maybe<SearchStudentPaymentResult>;
  searchStudentState?: Maybe<SearchStudentStateResult>;
  searchSubject?: Maybe<SearchSubjectResult>;
  sendMessage: MutationResponse;
  sendSms: CommonResponse;
  staticPushAT?: Maybe<CommonResponse>;
  toggleLike: ToggleLikeResult;
  unfollowUser?: Maybe<UnfollowUserResult>;
  updateConsultationMemo?: Maybe<UpdateConsultationMemoResult>;
  updateFavorite?: Maybe<UpdateFavoriteResult>;
  updateStudentState?: Maybe<UpdateStudentStateResult>;
  updateSubject?: Maybe<CommonResponse>;
  uploadPhoto?: Maybe<Photo>;
};


export type MutationAuthEmailArgs = {
  emailAdd: Scalars['String']['input'];
};


export type MutationCalcLecturesArgs = {
  id: Scalars['Int']['input'];
};


export type MutationChangeOrderAtArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  indexNums?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type MutationCheckNickArgs = {
  nick: Scalars['String']['input'];
};


export type MutationCheckUserArgs = {
  temporaryUser: Scalars['String']['input'];
};


export type MutationClassCancellationArgs = {
  courseComplete: Scalars['String']['input'];
  dateOfDroppingOut?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  reasonFordroppingOut?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateAccountArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationCreateAdviceTypeArgs = {
  category: Scalars['String']['input'];
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


export type MutationCreateBranchArgs = {
  branchName?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateCommentArgs = {
  payload: Scalars['String']['input'];
  photoId: Scalars['Int']['input'];
};


export type MutationCreateConsultationMemoArgs = {
  content: Scalars['String']['input'];
  studentStateId: Scalars['Int']['input'];
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
  timetableAttached?: InputMaybe<Scalars['Upload']['input']>;
};


export type MutationCreateManagerAccountArgs = {
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


export type MutationCreateReplyCommentArgs = {
  commentId: Scalars['Int']['input'];
  payload: Scalars['String']['input'];
};


export type MutationCreateStudentArgs = {
  birthday?: InputMaybe<Scalars['String']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNum1?: InputMaybe<Scalars['String']['input']>;
  phoneNum2?: InputMaybe<Scalars['String']['input']>;
  smsAgreement?: InputMaybe<Scalars['String']['input']>;
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
  cashAmount?: InputMaybe<Scalars['Int']['input']>;
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
  tuitionFee: Scalars['Int']['input'];
  unCollectedAmount?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCreateStudentStateArgs = {
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
  phoneNum1: Scalars['String']['input'];
  phoneNum2?: InputMaybe<Scalars['String']['input']>;
  phoneNum3?: InputMaybe<Scalars['String']['input']>;
  pic?: InputMaybe<Scalars['String']['input']>;
  progress: Scalars['Int']['input'];
  receiptDiv?: InputMaybe<Scalars['String']['input']>;
  stAddr?: InputMaybe<Scalars['String']['input']>;
  stEmail?: InputMaybe<Scalars['String']['input']>;
  stName: Scalars['String']['input'];
  stVisit?: InputMaybe<Scalars['String']['input']>;
  subDiv?: InputMaybe<Scalars['String']['input']>;
  subject: Array<InputMaybe<Scalars['String']['input']>>;
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


export type MutationCreateWorkLogsArgs = {
  lecturesId: Scalars['Int']['input'];
  workLogsDate: Scalars['String']['input'];
};


export type MutationCreateWorkRequestArgs = {
  context: Scalars['String']['input'];
  toId: Scalars['Int']['input'];
};


export type MutationDeleteAdviceTypeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteConsultationMemoArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteLecturesArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteManageUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteMessageStorageArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeletePhotoArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteStampArgs = {
  manageUserId: Scalars['Int']['input'];
};


export type MutationDeleteStudentArgs = {
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


export type MutationDeleteWorkRequestArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDevEditManageUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
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
  mUserId?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  mUsername?: InputMaybe<Scalars['String']['input']>;
  resign?: InputMaybe<Scalars['String']['input']>;
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
  id: Scalars['Int']['input'];
  onOff?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditAttendanceArgs = {
  attendanceState: Array<InputMaybe<Scalars['String']['input']>>;
  id: Array<InputMaybe<Scalars['Int']['input']>>;
};


export type MutationEditCommentArgs = {
  id: Scalars['Int']['input'];
  payload: Scalars['String']['input'];
};


export type MutationEditLecturesArgs = {
  ApprovedNum?: InputMaybe<Scalars['Int']['input']>;
  campus?: InputMaybe<Scalars['String']['input']>;
  confirmedNum?: InputMaybe<Scalars['Int']['input']>;
  eduStatusReport?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
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
  timetableAttached?: InputMaybe<Scalars['Upload']['input']>;
};


export type MutationEditManageUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  mAddressDetail?: InputMaybe<Scalars['String']['input']>;
  mAddresses?: InputMaybe<Scalars['String']['input']>;
  mAvatar?: InputMaybe<Scalars['Upload']['input']>;
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
  paymentDate?: InputMaybe<Scalars['String']['input']>;
  receiverId: Scalars['Int']['input'];
  studentPaymentId: Scalars['Int']['input'];
};


export type MutationEditPhotoArgs = {
  caption: Scalars['String']['input'];
  id: Scalars['Int']['input'];
};


export type MutationEditProfileArgs = {
  avatar?: InputMaybe<Scalars['Upload']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditStudentArgs = {
  birthday?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNum1?: InputMaybe<Scalars['String']['input']>;
  phoneNum2?: InputMaybe<Scalars['String']['input']>;
  smsAgreement?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditStudentMemoArgs = {
  content: Scalars['String']['input'];
  id: Scalars['Int']['input'];
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
  tuitionFee?: InputMaybe<Scalars['Int']['input']>;
  unCollectedAmount?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationEditWorkLogsArgs = {
  absentSt?: InputMaybe<Scalars['String']['input']>;
  attendanceCount?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  checkContext?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  checkList?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  etc?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  instruction?: InputMaybe<Scalars['String']['input']>;
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


export type MutationEditWorkRequestArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  read?: InputMaybe<Scalars['String']['input']>;
};


export type MutationFollowUserArgs = {
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationGetHourlySalesDataArgs = {
  date: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationGetSalesDataArgs = {
  endDate: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
};


export type MutationInsertBranchToAdviceTypeArgs = {
  branchId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationInsertBranchToAttendanceArgs = {
  branchId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationInsertBranchToConsultationMemoArgs = {
  branchId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationInsertBranchToLecturesArgs = {
  branchId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationInsertBranchToManageUserArgs = {
  branchId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationInsertBranchToPaymentDetailArgs = {
  branchId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationInsertBranchToStampArgs = {
  branchId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationInsertBranchToStudentArgs = {
  branchId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationInsertBranchToStudentMemoArgs = {
  branchId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationInsertBranchToStudentPaymentArgs = {
  branchId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationInsertBranchToStudentStateArgs = {
  branchId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationInsertBranchToSubjectArgs = {
  branchId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationInsertBranchToUserActivityLogsArgs = {
  branchId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationInsertBranchToWorkLogsArgs = {
  branchId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationInsertBranchToWorkRequestArgs = {
  branchId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationMLoginArgs = {
  mPassword: Scalars['String']['input'];
  mUserId: Scalars['String']['input'];
};


export type MutationReadAlarmsArgs = {
  all?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationReadMessageArgs = {
  id: Scalars['Int']['input'];
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


export type MutationSalesStatisticsListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  period: Array<InputMaybe<Scalars['String']['input']>>;
  receiverId: Scalars['Int']['input'];
};


export type MutationSearchLecturesArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
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
  id?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  period?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  studentName?: InputMaybe<Scalars['String']['input']>;
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


export type MutationSendMessageArgs = {
  payload: Scalars['String']['input'];
  roomId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
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


export type MutationToggleLikeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUnfollowUserArgs = {
  username: Scalars['String']['input'];
};


export type MutationUpdateConsultationMemoArgs = {
  content: Scalars['String']['input'];
  id: Scalars['Int']['input'];
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


export type MutationUploadPhotoArgs = {
  caption?: InputMaybe<Scalars['String']['input']>;
  file: Scalars['Upload']['input'];
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  error?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type PaymentDetail = {
  __typename?: 'PaymentDetail';
  ApprovalNum?: Maybe<Scalars['String']['output']>;
  accountingManager?: Maybe<Scalars['String']['output']>;
  amountPayment?: Maybe<Scalars['Int']['output']>;
  bankName?: Maybe<Scalars['String']['output']>;
  cardCompany?: Maybe<Scalars['String']['output']>;
  cardNum?: Maybe<Scalars['String']['output']>;
  cashOrCard?: Maybe<Scalars['String']['output']>;
  cashReceipts?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createdAt?: Maybe<Scalars['String']['output']>;
  depositAmount?: Maybe<Scalars['Int']['output']>;
  depositDate?: Maybe<Scalars['String']['output']>;
  depositorName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  installment?: Maybe<Scalars['Int']['output']>;
  paymentDate?: Maybe<Scalars['String']['output']>;
  receiver?: Maybe<ManageUser>;
  receiverId?: Maybe<Scalars['Int']['output']>;
  refundApproval?: Maybe<Scalars['Boolean']['output']>;
  refundApprovalDate?: Maybe<Scalars['String']['output']>;
  refundManager?: Maybe<Scalars['String']['output']>;
  reqRefund?: Maybe<Scalars['Boolean']['output']>;
  reqRefundDate?: Maybe<Scalars['String']['output']>;
  reqRefundManager?: Maybe<Scalars['String']['output']>;
  stName?: Maybe<Scalars['String']['output']>;
  studentId?: Maybe<Scalars['Int']['output']>;
  studentPayment?: Maybe<StudentPayment>;
  studentPaymentId: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type PaymentDetailResult = {
  __typename?: 'PaymentDetailResult';
  PaymentDetail?: Maybe<Array<Maybe<PaymentDetail>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok?: Maybe<Scalars['Boolean']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type Photo = {
  __typename?: 'Photo';
  caption?: Maybe<Scalars['String']['output']>;
  commentNumber: Scalars['Int']['output'];
  comments?: Maybe<Array<Maybe<Comment>>>;
  createdAt: Scalars['String']['output'];
  file: Scalars['String']['output'];
  hashtags?: Maybe<Array<Maybe<Hashtag>>>;
  id: Scalars['Int']['output'];
  isLiked: Scalars['Boolean']['output'];
  isMine: Scalars['Boolean']['output'];
  likes: Scalars['Int']['output'];
  totalComments?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['String']['output'];
  user: User;
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
  createStamp?: Maybe<CommonResponse>;
  dashboardAT?: Maybe<DashboardAtResult>;
  dashboardMonth?: Maybe<DashboardMonthResult>;
  dashboardRD?: Maybe<Array<Maybe<DashboardRdResult>>>;
  dashboardToday?: Maybe<DashboardTodayResult>;
  dashboardUnp?: Maybe<DashboardUnpResult>;
  isMme?: Maybe<IsMeResult>;
  mMe?: Maybe<ManageUser>;
  me?: Maybe<User>;
  searchAttendance?: Maybe<SearchAttendanceResult>;
  searchManageUser?: Maybe<SearchManageUserResult>;
  searchPhotos?: Maybe<Array<Maybe<Photo>>>;
  searchSms: ResultSearchSms;
  searchUsers?: Maybe<Array<Maybe<User>>>;
  searchWorkLogs?: Maybe<SearchWorkLogsResult>;
  seeAdviceType?: Maybe<ResultAdviceType>;
  seeAlarms?: Maybe<ResultSeeAlarms>;
  seeAttendance?: Maybe<SeeAttendanceResult>;
  seeFavorite?: Maybe<Array<Maybe<StudentState>>>;
  seeFeed?: Maybe<Array<Maybe<Photo>>>;
  seeFollowing: SeeFollowingResult;
  seeFollows: SeeFollowsResult;
  seeHashtag?: Maybe<Hashtag>;
  seeLectures?: Maybe<SeeLecturesResult>;
  seeManageUser?: Maybe<SeeManageUserResult>;
  seeMessageStorage: ResultMessageStorage;
  seePaymentDetail?: Maybe<PaymentDetailResult>;
  seePhoto?: Maybe<Photo>;
  seePhotoComments?: Maybe<Array<Maybe<Comment>>>;
  seePhotoLikes?: Maybe<Array<Maybe<User>>>;
  seeProfile?: Maybe<User>;
  seeReplyComment?: Maybe<Array<Maybe<Reply>>>;
  seeRoom: Room;
  seeRooms?: Maybe<Array<Maybe<Room>>>;
  seeStudent?: Maybe<SeeStudentResult>;
  seeStudentPayment?: Maybe<StudentPaymentResult>;
  seeStudentState?: Maybe<StudentStateResponse>;
  seeSubject?: Maybe<SeeSubjectResult>;
  seeUserActivityLogs?: Maybe<UserActivityLogsResponse>;
  seeWorkRequest?: Maybe<SeeWorkRequestResult>;
  signWorkLogs?: Maybe<SignWorkLogsResult>;
};


export type QueryCreateStampArgs = {
  manageUserId: Scalars['Int']['input'];
};


export type QueryDashboardTodayArgs = {
  today?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  yesterday?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryIsMmeArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySearchAttendanceArgs = {
  attendanceDate?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  lecturesId: Scalars['Int']['input'];
  studentId?: InputMaybe<Scalars['Int']['input']>;
  studentPaymentId?: InputMaybe<Scalars['Int']['input']>;
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


export type QuerySearchPhotosArgs = {
  keyword: Scalars['String']['input'];
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


export type QuerySearchUsersArgs = {
  keyword: Scalars['String']['input'];
  lastId?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySearchWorkLogsArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  lecturesId?: InputMaybe<Scalars['Int']['input']>;
  workLogsDate?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySeeAdviceTypeArgs = {
  category: Scalars['String']['input'];
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


export type QuerySeeFeedArgs = {
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySeeFollowingArgs = {
  lastId?: InputMaybe<Scalars['Int']['input']>;
  username: Scalars['String']['input'];
};


export type QuerySeeFollowsArgs = {
  page: Scalars['Int']['input'];
  username: Scalars['String']['input'];
};


export type QuerySeeHashtagArgs = {
  hashtag: Scalars['String']['input'];
};


export type QuerySeeLecturesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySeeManageUserArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
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


export type QuerySeePhotoArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySeePhotoCommentsArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySeePhotoLikesArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySeeProfileArgs = {
  username: Scalars['String']['input'];
};


export type QuerySeeReplyCommentArgs = {
  commentId: Scalars['Int']['input'];
};


export type QuerySeeRoomArgs = {
  id: Scalars['Int']['input'];
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


export type QuerySeeWorkRequestArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  read?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySignWorkLogsArgs = {
  gradeType: Scalars['String']['input'];
  id: Scalars['Int']['input'];
};

export type Reply = {
  __typename?: 'Reply';
  comment?: Maybe<Scalars['String']['output']>;
  commentId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  isMine?: Maybe<Scalars['Boolean']['output']>;
  payload?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type ResultAdviceType = {
  __typename?: 'ResultAdviceType';
  adviceType?: Maybe<Array<Maybe<AdviceType>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type ResultCalcLectures = {
  __typename?: 'ResultCalcLectures';
  approvedPersonnel?: Maybe<Scalars['Int']['output']>;
  confirmedPersonnel?: Maybe<Scalars['Int']['output']>;
  courseDropout?: Maybe<Scalars['Int']['output']>;
  dropoutRate?: Maybe<Scalars['Int']['output']>;
  earlyEmployment?: Maybe<Scalars['Int']['output']>;
  employedUponCompletion?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  expectedEmploymentProof?: Maybe<Scalars['Int']['output']>;
  graduates?: Maybe<Scalars['Int']['output']>;
  graduationRate?: Maybe<Scalars['Int']['output']>;
  incomplete?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  notEarlyEmployed?: Maybe<Scalars['Int']['output']>;
  notEmployedUponCompletion?: Maybe<Scalars['Int']['output']>;
  ok?: Maybe<Scalars['Boolean']['output']>;
  trainingPersonnel?: Maybe<Scalars['Int']['output']>;
};

export type ResultMessageStorage = {
  __typename?: 'ResultMessageStorage';
  data?: Maybe<Array<Maybe<MessageStorage>>>;
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
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type Room = {
  __typename?: 'Room';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  message?: Maybe<Array<Maybe<Message>>>;
  unreadTotal: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type SalesData = {
  __typename?: 'SalesData';
  cardRefundTotal: Scalars['Int']['output'];
  cardTotal: Scalars['Int']['output'];
  cashRefundTotal: Scalars['Int']['output'];
  cashTotal: Scalars['Int']['output'];
  date?: Maybe<Scalars['String']['output']>;
  paymentTotal: Scalars['Int']['output'];
  refundTotal: Scalars['Int']['output'];
  totalAmount: Scalars['Int']['output'];
};

export type SalesStatisticsListResult = {
  __typename?: 'SalesStatisticsListResult';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok?: Maybe<Scalars['Boolean']['output']>;
  paymentData?: Maybe<Array<Maybe<PaymentDetail>>>;
  receiverId?: Maybe<Scalars['Int']['output']>;
  refundData?: Maybe<Array<Maybe<PaymentDetail>>>;
};

export type SalesStatisticsResult = {
  __typename?: 'SalesStatisticsResult';
  data?: Maybe<Array<Maybe<ProcessingManagerGroupResult>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok?: Maybe<Scalars['Boolean']['output']>;
};

export type SearchAttendanceResult = {
  __typename?: 'SearchAttendanceResult';
  data?: Maybe<Array<Maybe<Attendance>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok?: Maybe<Scalars['Boolean']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type SearchLecturesResult = {
  __typename?: 'SearchLecturesResult';
  data?: Maybe<Array<Maybe<Lectures>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok?: Maybe<Scalars['Boolean']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type SearchManageUserResult = {
  __typename?: 'SearchManageUserResult';
  data?: Maybe<Array<Maybe<ManageUser>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok?: Maybe<Scalars['Boolean']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type SearchStudentPaymentResult = {
  __typename?: 'SearchStudentPaymentResult';
  data?: Maybe<Array<Maybe<StudentPayment>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok?: Maybe<Scalars['Boolean']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type SearchStudentResult = {
  __typename?: 'SearchStudentResult';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok?: Maybe<Scalars['Boolean']['output']>;
  student?: Maybe<Array<Maybe<Student>>>;
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

export type SearchWorkLogsResult = {
  __typename?: 'SearchWorkLogsResult';
  data?: Maybe<Array<Maybe<WorkLogs>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok?: Maybe<Scalars['Boolean']['output']>;
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
  ok?: Maybe<Scalars['Boolean']['output']>;
  outingCount?: Maybe<Scalars['Int']['output']>;
  outingData?: Maybe<Array<Maybe<Attendance>>>;
  tardyCount?: Maybe<Scalars['Int']['output']>;
  tardyData?: Maybe<Array<Maybe<Attendance>>>;
};

export type SeeFollowingResult = {
  __typename?: 'SeeFollowingResult';
  error?: Maybe<Scalars['String']['output']>;
  following?: Maybe<Array<Maybe<User>>>;
  ok: Scalars['Boolean']['output'];
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
  ok?: Maybe<Scalars['Boolean']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type SeeStudentResult = {
  __typename?: 'SeeStudentResult';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok?: Maybe<Scalars['Boolean']['output']>;
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

export type SeeWorkRequestResult = {
  __typename?: 'SeeWorkRequestResult';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok?: Maybe<Scalars['Boolean']['output']>;
  toMeData?: Maybe<Array<Maybe<WorkRequest>>>;
  toMeDataCount?: Maybe<Scalars['Int']['output']>;
  toYouData?: Maybe<Array<Maybe<WorkRequest>>>;
  toYouDataCount?: Maybe<Scalars['Int']['output']>;
};

export type SignWorkLogsResult = {
  __typename?: 'SignWorkLogsResult';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok?: Maybe<Scalars['Boolean']['output']>;
  stampUrl?: Maybe<Scalars['String']['output']>;
};

export type Sms = {
  __typename?: 'Sms';
  Branch?: Maybe<Branch>;
  branchId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  manageUser?: Maybe<ManageUser>;
  manageUserId?: Maybe<Scalars['Int']['output']>;
  message: Scalars['String']['output'];
  receiver: Scalars['String']['output'];
  saveType?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type Stamp = {
  __typename?: 'Stamp';
  Manager?: Maybe<ManageUser>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  manageUserId?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Student = {
  __typename?: 'Student';
  birthday?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  manager?: Maybe<ManageUser>;
  managerUserId?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  phoneNum1: Scalars['String']['output'];
  phoneNum2?: Maybe<Scalars['String']['output']>;
  smsAgreement: Scalars['String']['output'];
  studentMemo?: Maybe<Array<Maybe<StudentMemo>>>;
  studentPayment?: Maybe<Array<Maybe<StudentPayment>>>;
  updatedAt: Scalars['String']['output'];
  writer: Scalars['String']['output'];
};

export type StudentMemo = {
  __typename?: 'StudentMemo';
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  manageUser?: Maybe<ManageUser>;
  manageUserId?: Maybe<Scalars['Int']['output']>;
  student?: Maybe<Student>;
  studentId?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type StudentPayment = {
  __typename?: 'StudentPayment';
  Branch?: Maybe<Branch>;
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
  tuitionFee?: Maybe<Scalars['Int']['output']>;
  unCollectedAmount?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type StudentPaymentResult = {
  __typename?: 'StudentPaymentResult';
  StudentPayment?: Maybe<Array<Maybe<StudentPayment>>>;
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok?: Maybe<Scalars['Boolean']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type StudentState = {
  __typename?: 'StudentState';
  Branch?: Maybe<Branch>;
  adviceTypes?: Maybe<Array<Maybe<AdviceType>>>;
  agreement: Scalars['String']['output'];
  branchId?: Maybe<Scalars['Int']['output']>;
  campus?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  classMethod?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  consultationMemo?: Maybe<Array<Maybe<ConsultationMemo>>>;
  createdAt: Scalars['String']['output'];
  currentManager?: Maybe<Scalars['String']['output']>;
  detail?: Maybe<Scalars['String']['output']>;
  expEnrollDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
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
  subject: Array<Maybe<Scalars['String']['output']>>;
  updatedAt: Scalars['String']['output'];
};

export type StudentStateResponse = {
  __typename?: 'StudentStateResponse';
  message?: Maybe<Scalars['String']['output']>;
  ok?: Maybe<Scalars['Boolean']['output']>;
  studentState?: Maybe<Array<Maybe<StudentState>>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type Subject = {
  __typename?: 'Subject';
  Branch?: Maybe<Branch>;
  StudentPayment?: Maybe<Array<Maybe<StudentPayment>>>;
  branchId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['String']['output']>;
  expiresDateEnd?: Maybe<Scalars['String']['output']>;
  expiresDateStart?: Maybe<Scalars['String']['output']>;
  exposure?: Maybe<Scalars['Boolean']['output']>;
  fee?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
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

export type Subscription = {
  __typename?: 'Subscription';
  accountingAlarms?: Maybe<CommonSubscription>;
  newMessage?: Maybe<Message>;
  roomUpdates: Message;
};


export type SubscriptionNewMessageArgs = {
  id: Scalars['Int']['input'];
};

export type UpdateConsultationMemoResult = {
  __typename?: 'UpdateConsultationMemoResult';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
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

export type User = {
  __typename?: 'User';
  UpdatedAt: Scalars['String']['output'];
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  follower?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  id: Scalars['Int']['output'];
  isFollowing: Scalars['Boolean']['output'];
  isMe: Scalars['Boolean']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  photos?: Maybe<Array<Maybe<Photo>>>;
  totalFollower: Scalars['Int']['output'];
  totalFollowing: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};


export type UserPhotosArgs = {
  lastId?: InputMaybe<Scalars['Int']['input']>;
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
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  userActivityLogs?: Maybe<Array<Maybe<UserActivityLogs>>>;
};

export type WorkLogs = {
  __typename?: 'WorkLogs';
  Branch?: Maybe<Branch>;
  BranchId?: Maybe<Scalars['Int']['output']>;
  absentSt?: Maybe<Scalars['String']['output']>;
  attendanceCount?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  checkContext?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  checkList: Array<Maybe<Scalars['String']['output']>>;
  createdAt: Scalars['String']['output'];
  etc?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  instruction?: Maybe<Scalars['String']['output']>;
  leaveEarlySt?: Maybe<Scalars['String']['output']>;
  lectures?: Maybe<Lectures>;
  lecturesId: Scalars['Int']['output'];
  outingSt?: Maybe<Scalars['String']['output']>;
  paymentOne?: Maybe<Scalars['String']['output']>;
  paymentThree?: Maybe<Scalars['String']['output']>;
  paymentTwo?: Maybe<Scalars['String']['output']>;
  tardySt?: Maybe<Scalars['String']['output']>;
  trainingInfoEight: Array<Maybe<Scalars['String']['output']>>;
  trainingInfoFive: Array<Maybe<Scalars['String']['output']>>;
  trainingInfoFour: Array<Maybe<Scalars['String']['output']>>;
  trainingInfoOne: Array<Maybe<Scalars['String']['output']>>;
  trainingInfoSeven: Array<Maybe<Scalars['String']['output']>>;
  trainingInfoSix: Array<Maybe<Scalars['String']['output']>>;
  trainingInfoThree: Array<Maybe<Scalars['String']['output']>>;
  trainingInfoTwo: Array<Maybe<Scalars['String']['output']>>;
  trainingTimeOneday: Array<Maybe<Scalars['Int']['output']>>;
  trainingTimeTotal: Array<Maybe<Scalars['Int']['output']>>;
  updatedAt: Scalars['String']['output'];
  workLogsDate: Scalars['String']['output'];
};

export type WorkRequest = {
  __typename?: 'WorkRequest';
  campus?: Maybe<Scalars['String']['output']>;
  context: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  from: Scalars['String']['output'];
  fromId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  to: Scalars['String']['output'];
  toId: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type CreateManagerAccountResult = {
  __typename?: 'createManagerAccountResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateReplyCommentResult = {
  __typename?: 'createReplyCommentResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type FollowUserResult = {
  __typename?: 'followUserResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type MLoginResult = {
  __typename?: 'mLoginResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type SeeFollowsResult = {
  __typename?: 'seeFollowsResult';
  error?: Maybe<Scalars['String']['output']>;
  follower?: Maybe<Array<Maybe<User>>>;
  ok: Scalars['Boolean']['output'];
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type ToggleLikeResult = {
  __typename?: 'toggleLikeResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type UnfollowUserResult = {
  __typename?: 'unfollowUserResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};
