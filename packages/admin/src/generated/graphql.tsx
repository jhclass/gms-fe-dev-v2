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

export type AuthEmailResult = {
  __typename?: 'AuthEmailResult';
  code?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  ok: Scalars['Boolean']['output'];
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

export type IsMeResult = {
  __typename?: 'IsMeResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
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
  createdAt: Scalars['String']['output'];
  favoriteStudentState?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  id: Scalars['Int']['output'];
  mAvatar?: Maybe<Scalars['String']['output']>;
  mGrade?: Maybe<Scalars['String']['output']>;
  mPassword: Scalars['String']['output'];
  mPhoneNum?: Maybe<Scalars['String']['output']>;
  mRank?: Maybe<Scalars['String']['output']>;
  mUserId: Scalars['String']['output'];
  mUsername: Scalars['String']['output'];
  studentStates?: Maybe<Array<Maybe<StudentState>>>;
  updatedAt: Scalars['String']['output'];
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

export type Mutation = {
  __typename?: 'Mutation';
  authEmail?: Maybe<AuthEmailResult>;
  checkNick: CheckAccountResult;
  checkUser: CheckAccountResult;
  createAccount?: Maybe<CreateAccountResult>;
  createComment: MutationResponse;
  createConsultationMemo?: Maybe<CreateConsultationMemoResult>;
  createManagerAccount?: Maybe<CreateManagerAccountResult>;
  createReplyComment: CreateReplyCommentResult;
  createStudentState?: Maybe<CommonResponse>;
  createSubject?: Maybe<CommonResponse>;
  createUserActivityLogs?: Maybe<CommonResponse>;
  deleteComment: MutationResponse;
  deleteConsultationMemo?: Maybe<DeleteConsultationMemoResult>;
  deleteMessage: MutationResponse;
  deletePhoto: DeletePhotoResult;
  deleteSubject?: Maybe<CommonResponse>;
  editComment: MutationResponse;
  editPhoto: EditPhotoResult;
  editProfile?: Maybe<EditProfileResult>;
  followUser?: Maybe<FollowUserResult>;
  login?: Maybe<LoginResult>;
  mLogin?: Maybe<MLoginResult>;
  readMessage: MutationResponse;
  searchStudentState?: Maybe<SearchStudentStateResult>;
  searchSubject?: Maybe<SearchSubjectResult>;
  sendMessage: MutationResponse;
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


export type MutationCheckNickArgs = {
  nick: Scalars['String']['input'];
};


export type MutationCheckUserArgs = {
  temporaryUser: Scalars['String']['input'];
};


export type MutationCreateAccountArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationCreateCommentArgs = {
  payload: Scalars['String']['input'];
  photoId: Scalars['Int']['input'];
};


export type MutationCreateConsultationMemoArgs = {
  content: Scalars['String']['input'];
  studentStateId: Scalars['Int']['input'];
};


export type MutationCreateManagerAccountArgs = {
  mGrade?: InputMaybe<Scalars['String']['input']>;
  mPassword: Scalars['String']['input'];
  mPhoneNum?: InputMaybe<Scalars['String']['input']>;
  mRank?: InputMaybe<Scalars['String']['input']>;
  mUserId: Scalars['String']['input'];
  mUsername: Scalars['String']['input'];
};


export type MutationCreateReplyCommentArgs = {
  commentId: Scalars['Int']['input'];
  payload: Scalars['String']['input'];
};


export type MutationCreateStudentStateArgs = {
  agreement: Scalars['String']['input'];
  birthday?: InputMaybe<Scalars['String']['input']>;
  campus?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  detail?: InputMaybe<Scalars['String']['input']>;
  expEnrollDate?: InputMaybe<Scalars['String']['input']>;
  perchase?: InputMaybe<Scalars['Boolean']['input']>;
  phoneNum1: Scalars['String']['input'];
  phoneNum2?: InputMaybe<Scalars['String']['input']>;
  phoneNum3?: InputMaybe<Scalars['String']['input']>;
  pic?: InputMaybe<Scalars['String']['input']>;
  receiptDiv?: InputMaybe<Scalars['String']['input']>;
  stAddr?: InputMaybe<Scalars['String']['input']>;
  stEmail?: InputMaybe<Scalars['String']['input']>;
  stName: Scalars['String']['input'];
  stVisit?: InputMaybe<Scalars['String']['input']>;
  subDiv?: InputMaybe<Scalars['String']['input']>;
  subject?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type MutationCreateSubjectArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  exposure?: InputMaybe<Scalars['Boolean']['input']>;
  fee: Scalars['Int']['input'];
  roomNum?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  subDiv: Scalars['String']['input'];
  subjectName: Scalars['String']['input'];
  teacherName?: InputMaybe<Scalars['String']['input']>;
  totalTime?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCreateUserActivityLogsArgs = {
  eventName: Scalars['String']['input'];
  uri?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteConsultationMemoArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePhotoArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteSubjectArgs = {
  id: Scalars['Int']['input'];
};


export type MutationEditCommentArgs = {
  id: Scalars['Int']['input'];
  payload: Scalars['String']['input'];
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


export type MutationFollowUserArgs = {
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationMLoginArgs = {
  mPassword: Scalars['String']['input'];
  mUserId: Scalars['String']['input'];
};


export type MutationReadMessageArgs = {
  id: Scalars['Int']['input'];
};


export type MutationSearchStudentStateArgs = {
  createdAt?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  pic?: InputMaybe<Scalars['String']['input']>;
  progress?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  receiptDiv?: InputMaybe<Scalars['String']['input']>;
  stName?: InputMaybe<Scalars['String']['input']>;
  stVisit?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  subDiv?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSearchSubjectArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  subDiv?: InputMaybe<Scalars['String']['input']>;
  subjectName?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSendMessageArgs = {
  payload: Scalars['String']['input'];
  roomId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
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
  exposure?: InputMaybe<Scalars['Boolean']['input']>;
  fee: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
  roomNum?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  subDiv: Scalars['String']['input'];
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

export type Query = {
  __typename?: 'Query';
  isMme?: Maybe<IsMeResult>;
  mMe?: Maybe<ManageUser>;
  me?: Maybe<User>;
  searchPhotos?: Maybe<Array<Maybe<Photo>>>;
  searchUsers?: Maybe<Array<Maybe<User>>>;
  seeFavorite?: Maybe<Array<Maybe<StudentState>>>;
  seeFeed?: Maybe<Array<Maybe<Photo>>>;
  seeFollowing: SeeFollowingResult;
  seeFollows: SeeFollowsResult;
  seeHashtag?: Maybe<Hashtag>;
  seeManageUser?: Maybe<Array<Maybe<ManageUser>>>;
  seePhoto?: Maybe<Photo>;
  seePhotoComments?: Maybe<Array<Maybe<Comment>>>;
  seePhotoLikes?: Maybe<Array<Maybe<User>>>;
  seeProfile?: Maybe<User>;
  seeReplyComment?: Maybe<Array<Maybe<Reply>>>;
  seeRoom: Room;
  seeRooms?: Maybe<Array<Maybe<Room>>>;
  seeStudentState?: Maybe<StudentStateResponse>;
  seeSubject?: Maybe<SeeSubjectResult>;
  seeUserActivityLogs?: Maybe<UserActivityLogsResponse>;
};


export type QueryIsMmeArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySearchPhotosArgs = {
  keyword: Scalars['String']['input'];
};


export type QuerySearchUsersArgs = {
  keyword: Scalars['String']['input'];
  lastId?: InputMaybe<Scalars['Int']['input']>;
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


export type QuerySeeStudentStateArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page: Scalars['Int']['input'];
};


export type QuerySeeSubjectArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
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
};

export type SeeFollowingResult = {
  __typename?: 'SeeFollowingResult';
  error?: Maybe<Scalars['String']['output']>;
  following?: Maybe<Array<Maybe<User>>>;
  ok: Scalars['Boolean']['output'];
};

export type SeeSubjectResult = {
  __typename?: 'SeeSubjectResult';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  subject?: Maybe<Array<Maybe<Subject>>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type StudentState = {
  __typename?: 'StudentState';
  agreement: Scalars['String']['output'];
  campus?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['String']['output']>;
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
  createdAt: Scalars['String']['output'];
  endDate?: Maybe<Scalars['String']['output']>;
  exposure?: Maybe<Scalars['Boolean']['output']>;
  fee: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  roomNum?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['String']['output']>;
  subDiv: Scalars['String']['output'];
  subjectName: Scalars['String']['output'];
  teacherName?: Maybe<Scalars['String']['output']>;
  totalTime?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
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
  createdAt?: Maybe<Scalars['String']['output']>;
  eventName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export type UserActivityLogsResponse = {
  __typename?: 'UserActivityLogsResponse';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  userActivityLogs?: Maybe<Array<Maybe<UserActivityLogs>>>;
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
