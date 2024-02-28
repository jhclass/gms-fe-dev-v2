import MainWrap from '@/components/wrappers/MainWrap'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import { Radio, RadioGroup, Button } from '@nextui-org/react'
import { useMutation, useQuery } from '@apollo/client'
import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'
import useUserLogsMutation from '@/utils/userLogs'
import Layout from '@/pages/students/layout'
import { useRecoilState, useRecoilValue } from 'recoil'
import { gradeState, selectedPaymentState } from '@/lib/recoilAtoms'
import useMmeQuery from '@/utils/mMe'
import {
  CLASS_CANCEL_MUTATION,
  SEARCH_PAYMENT_DETAIL_FILTER_MUTATION,
  SEARCH_PAYMENT_MUTATION,
  SEARCH_STUDENT_MUTATION,
  UPDATE_STUDENT_COURSE_MUTATION,
} from '@/graphql/mutations'
import StudentPaymentDetailItem from '@/components/items/PaymentDetailItem'

const ConArea = styled.div`
  width: 100%;
  max-width: 1400px;
`
const DetailBox = styled.div`
  margin-top: 2rem;
  background: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
`
const TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
  font-size: 0.8rem;
  @media (max-width: 768px) {
    align-items: flex-end;
    flex-direction: column-reverse;
  }
`
const Noti = styled.p`
  span {
    color: red;
  }
`
const UpdateTime = styled.p`
  span {
    color: #555;
  }
`
const DetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media (max-width: 768px) {
    gap: 1rem;
  }
`
const FlexBox = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const AreaTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    font-size: 1.2rem;
    font-weight: 600;
  }
`
const AreaBox = styled.div`
  flex: 1;
  width: 100%;
`
const AreaSmallBox = styled.div`
  @media (max-width: 768px) {
    width: 100% !important;
  }
`

const RadioBox = styled.div`
  display: flex;
  width: 100%;
`
const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #11181c;
  display: block;
  padding-bottom: 0.375rem;
  span {
    color: red;
  }
`
const BtnBox = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`

const BtnBox4 = styled.div<{ $isPayment: boolean }>`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  @media (max-width: 768px) {
    ${props => props.$isPayment && 'flex-wrap:wrap;'}
    button {
      ${props => props.$isPayment && ' width: calc(50% - 0.5rem);'}
    }
  }
`
const LineBox = styled.div`
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  border-bottom: 2px solid hsl(240 6% 90%);
  height: 40px;
  line-height: 40px;
  font-size: 0.875rem;
`
const FlatBox = styled.div`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background: hsl(240 5% 96%);
  height: 40px;
  line-height: 40px;
  border-radius: 0.5rem;
  font-size: 0.875rem;
`
const MemoList = styled.ul`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`
const MemoItem = styled.li`
  width: 100%;
  display: flex;
  gap: 1rem;
  align-items: center;
  textarea {
    width: 100%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.3rem;
  }
`

type studentSubject = {
  actualAmount: number
  cardAmount: number
  cashAmount: number
  discountAmount: number
  id: number
  paymentDate: string
  processingManagerId: number
  receiptClassification: string
  seScore: number
  studentId: number
  tuitionFee: number
  unCollectedAmount: number
}

export default function StudentsWrite() {
  const grade = useRecoilValue(gradeState)
  const router = useRouter()
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const mPart = useMme('mPart')
  const paymentId = typeof router.query.id === 'string' ? router.query.id : null
  const { userLogs } = useUserLogsMutation()
  const {
    loading: managerLoading,
    error: managerError,
    data: managerData,
  } = useQuery(SEE_MANAGEUSER_QUERY)
  const managerList = managerData?.seeManageUser || []
  const [searchStudentMutation] = useMutation(SEARCH_STUDENT_MUTATION)
  const [updateStudentCourseMutation] = useMutation(
    UPDATE_STUDENT_COURSE_MUTATION,
  )
  const [searchStudentPayment] = useMutation(SEARCH_PAYMENT_MUTATION)
  const [classCancelMutation] = useMutation(CLASS_CANCEL_MUTATION)
  const [studentData, setStudentData] = useState(null)
  const [studentSubjectData, setStudentSubjectData] = useState(null)
  const [studentPaymentData, setStudentPaymentData] = useState(null)
  const [studentPaymentDetailData, setStudentPaymentDetailData] = useState([])

  useEffect(() => {
    if (paymentId !== null) {
      searchStudentPayment({
        variables: {
          searchStudentPaymentId: parseInt(paymentId),
        },
        onCompleted: data => {
          if (data.searchStudentPayment.ok) {
            setStudentPaymentData(data.searchStudentPayment?.data)
            setStudentData(data.searchStudentPayment?.data?.student)
            setStudentSubjectData(data.searchStudentPayment?.data?.subject)
            setStudentPaymentDetailData(
              data.searchStudentPayment?.data?.paymentDetail,
            )
          }
        },
      })
    }
  }, [router, paymentId])

  const clickLectureAssignment = () => {
    if (studentPaymentData.lectureAssignment === '배정') {
      const isAssignment = confirm(
        `${studentData.name}학생의 ${studentSubjectData.subjectName} 강의 배정을 취소 하시겠습니까?`,
      )
      if (isAssignment) {
        updateStudentCourseMutation({
          variables: {
            editStudentPaymentId: parseInt(studentPaymentData.id),
            lectureAssignment: '미배정',
            subjectId: studentPaymentData.subjectId,
            processingManagerId: studentPaymentData.processingManagerId,
          },
          onCompleted: result => {
            if (result.editStudentPayment.ok) {
              searchStudentPayment({
                variables: {
                  searchStudentPaymentId: parseInt(paymentId),
                },
                onCompleted: data => {
                  if (data.searchStudentPayment.ok) {
                    setStudentPaymentData(data.searchStudentPayment?.data)
                    userLogs(
                      `${studentData.name}학생 ${studentSubjectData.subjectName} 강의 배정 취소`,
                    )
                    alert('강의배정 취소되었습니다.')
                  }
                },
              })
            }
          },
        })
      }
    } else {
      const isAssignment = confirm(
        `${studentData.name}학생을 ${studentSubjectData.subjectName} 강의 배정 하시겠습니까?`,
      )
      if (isAssignment) {
        updateStudentCourseMutation({
          variables: {
            editStudentPaymentId: parseInt(studentPaymentData.id),
            lectureAssignment: '배정',
            subjectId: studentPaymentData.subjectId,
            processingManagerId: studentPaymentData.processingManagerId,
          },
          onCompleted: result => {
            if (result.editStudentPayment.ok) {
              searchStudentPayment({
                variables: {
                  searchStudentPaymentId: parseInt(paymentId),
                },
                onCompleted: data => {
                  if (data.searchStudentPayment.ok) {
                    setStudentPaymentData(data.searchStudentPayment?.data)
                    userLogs(
                      `${studentData.name}학생 ${studentSubjectData.subjectName} 강의 배정`,
                    )
                    alert('강의배정 되었습니다.')
                  }
                },
              })
            }
          },
        })
      }
    }
  }

  const clickLCourseComplete = () => {
    if (studentPaymentData.courseComplete === '수료') {
      const isComplete = confirm(
        `${studentData.name}학생의 이수처리를 취소하시겠습니까?`,
      )
      if (isComplete) {
        classCancelMutation({
          variables: {
            classCancellationId: parseInt(studentPaymentData.id),
            courseComplete: '미수료',
          },
          onCompleted: result => {
            if (result.classCancellation.ok) {
              searchStudentPayment({
                variables: {
                  searchStudentPaymentId: parseInt(paymentId),
                },
                onCompleted: data => {
                  if (data.searchStudentPayment.ok) {
                    setStudentPaymentData(data.searchStudentPayment?.data)
                    userLogs(`${studentData.name}학생 이수처리 취소`)
                    alert('이수처리 취소되었습니다.')
                  }
                },
              })
            }
          },
        })
      }
    } else {
      const isComplete = confirm(
        `${studentData.name}학생을 이수처리 하시겠습니까?`,
      )
      if (isComplete) {
        classCancelMutation({
          variables: {
            classCancellationId: parseInt(studentPaymentData.id),
            courseComplete: '수료',
          },
          onCompleted: result => {
            if (result.classCancellation.ok) {
              searchStudentPayment({
                variables: {
                  searchStudentPaymentId: parseInt(paymentId),
                },
                onCompleted: data => {
                  if (data.searchStudentPayment.ok) {
                    setStudentPaymentData(data.searchStudentPayment?.data)
                    userLogs(`${studentData.name}학생 이수처리`)
                    alert('이수처리 되었습니다.')
                  }
                },
              })
            }
          },
        })
      }
    }
  }

  const clickClassDrop = () => {
    if (studentPaymentData.courseComplete === '중도포기') {
      const isAssignment = confirm(
        `${studentData.name}학생의 ${studentSubjectData.subjectName} 중도포기 철회 하시겠습니까?`,
      )
      if (isAssignment) {
        classCancelMutation({
          variables: {
            classCancellationId: parseInt(studentPaymentData.id),
            courseComplete: '미수료',
          },
          onCompleted: result => {
            if (result.classCancellation.ok) {
              searchStudentMutation({
                variables: {
                  searchStudentId: parseInt(studentData.id),
                },
                onCompleted: data => {
                  if (data.searchStudent.ok) {
                    searchStudentPayment({
                      variables: {
                        searchStudentPaymentId: parseInt(paymentId),
                      },
                      onCompleted: data => {
                        if (data.searchStudentPayment.ok) {
                          setStudentPaymentData(data.searchStudentPayment?.data)
                          userLogs(
                            `${studentData.name}학생 ${studentSubjectData.subjectName} 강의 중도포기 철회`,
                          )
                          alert('중도포기 철회 되었습니다.')
                        }
                      },
                    })
                  }
                },
              })
            }
          },
        })
      }
    } else {
      const isAssignment = confirm(
        `${studentData.name}학생을 ${studentSubjectData.subjectName} 강의 중도포기 하시겠습니까?`,
      )
      if (isAssignment) {
        classCancelMutation({
          variables: {
            classCancellationId: parseInt(studentPaymentData.id),
            courseComplete: '중도포기',
          },
          onCompleted: result => {
            if (result.classCancellation.ok) {
              searchStudentPayment({
                variables: {
                  searchStudentPaymentId: parseInt(paymentId),
                },
                onCompleted: data => {
                  if (data.searchStudentPayment.ok) {
                    setStudentPaymentData(data.searchStudentPayment?.data)
                    userLogs(
                      `${studentData.name}학생 ${studentSubjectData.subjectName} 중도포기 `,
                    )
                    alert('중도포기 되었습니다.')
                  }
                },
              })
            }
          },
        })
      }
    }
  }

  const clickClassCancel = () => {
    if (studentPaymentData.courseComplete === '수강철회') {
      const isAssignment = confirm(
        `${studentData.name}학생의 ${studentSubjectData.subjectName} 수강철회를 취소 하시겠습니까?`,
      )
      if (isAssignment) {
        classCancelMutation({
          variables: {
            classCancellationId: parseInt(studentPaymentData.id),
            courseComplete: '미수료',
          },
          onCompleted: result => {
            if (result.classCancellation.ok) {
              searchStudentPayment({
                variables: {
                  searchStudentPaymentId: parseInt(paymentId),
                },
                onCompleted: data => {
                  if (data.searchStudentPayment.ok) {
                    setStudentPaymentData(data.searchStudentPayment?.data)
                    userLogs(
                      `${studentData.name}학생 ${studentSubjectData.subjectName} 강의 수강철회 취소`,
                    )
                    alert('중도포기 철회 되었습니다.')
                  }
                },
              })
            }
          },
        })
      }
    } else {
      const isAssignment = confirm(
        `${studentData.name}학생을 ${studentSubjectData.subjectName} 강의 수강철회 하시겠습니까?`,
      )
      if (isAssignment) {
        classCancelMutation({
          variables: {
            classCancellationId: parseInt(studentPaymentData.id),
            courseComplete: '수강철회',
          },
          onCompleted: result => {
            if (result.classCancellation.ok) {
              searchStudentPayment({
                variables: {
                  searchStudentPaymentId: parseInt(paymentId),
                },
                onCompleted: data => {
                  if (data.searchStudentPayment.ok) {
                    setStudentPaymentData(data.searchStudentPayment?.data)
                    userLogs(
                      `${studentData.name}학생 ${studentSubjectData.subjectName} 수강철회 `,
                    )
                    alert('수강철회 되었습니다.')
                  }
                },
              })
            }
          },
        })
      }
    }
  }

  const formatDate = (data, isTime) => {
    const timestamp = parseInt(data, 10)
    const date = new Date(timestamp)
    if (isTime) {
      const formatted =
        `${date.getFullYear()}-` +
        `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
        `${date.getDate().toString().padStart(2, '0')} ` +
        `${date.getHours().toString().padStart(2, '0')}:` +
        `${date.getMinutes().toString().padStart(2, '0')}:` +
        `${date.getSeconds().toString().padStart(2, '0')}`
      return formatted
    } else {
      const formatted =
        `${date.getFullYear()}-` +
        `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
        `${date.getDate().toString().padStart(2, '0')} `
      return formatted
    }
  }

  const feeFormet = fee => {
    const result = fee
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    return result
  }

  return (
    <>
      {studentData !== null && (
        <MainWrap>
          <ConArea>
            <Breadcrumb rightArea={false} />
            <DetailBox>
              <TopInfo>
                <Noti>
                  <span>*</span> 는 필수입력입니다.
                </Noti>
                <UpdateTime>
                  <span>최근 업데이트 일시 :</span>
                  {formatDate(studentData?.updatedAt, true)}
                </UpdateTime>
              </TopInfo>
              <DetailDiv>
                <AreaTitle>
                  <h4>기본정보</h4>
                </AreaTitle>
                <FlexBox>
                  <AreaBox>
                    <div>
                      <FilterLabel>
                        이름<span>*</span>
                      </FilterLabel>
                      <LineBox>{studentData?.name}</LineBox>
                    </div>
                  </AreaBox>
                  <AreaBox>
                    <div>
                      <FilterLabel>
                        생년월일<span>*</span>
                      </FilterLabel>
                      <LineBox>
                        {formatDate(studentData?.birthday, false)}
                      </LineBox>
                    </div>
                  </AreaBox>
                  <AreaBox>
                    <div>
                      <FilterLabel>
                        연락처<span>*</span>
                      </FilterLabel>
                      <LineBox>{studentData?.phoneNum1}</LineBox>
                    </div>
                  </AreaBox>
                </FlexBox>
                <FlexBox>
                  <AreaBox>
                    <div>
                      <FilterLabel>담당자</FilterLabel>
                      <LineBox>{studentData?.writer}</LineBox>
                    </div>
                  </AreaBox>
                  <AreaBox>
                    <div>
                      <FilterLabel>등록일시</FilterLabel>
                      <LineBox>
                        {formatDate(studentData?.createdAt, false)}
                      </LineBox>
                    </div>
                  </AreaBox>
                </FlexBox>
              </DetailDiv>
            </DetailBox>
            {studentPaymentData !== undefined && (
              <>
                <DetailBox>
                  <DetailDiv>
                    <AreaTitle>
                      <h4>수강 정보</h4>
                      {(mGrade < grade.general || mPart.includes('교무팀')) && (
                        <Button
                          isDisabled={
                            studentPaymentData?.lectureAssignment === '배정'
                              ? true
                              : false
                          }
                          size="sm"
                          radius="sm"
                          variant="solid"
                          color="primary"
                          className="text-white"
                          onClick={() => {
                            {
                              router.push(
                                `/students/edit/course/${studentPaymentData?.id}`,
                              )
                            }
                          }}
                        >
                          수정
                        </Button>
                      )}
                    </AreaTitle>
                    <FlexBox>
                      <AreaSmallBox style={{ minWidth: '20%' }}>
                        <div>
                          <FilterLabel>과정코드</FilterLabel>
                          <LineBox>{studentSubjectData?.subjectCode}</LineBox>
                        </div>
                      </AreaSmallBox>
                      <AreaBox>
                        <div>
                          <FilterLabel>과정명</FilterLabel>
                          <LineBox>{studentSubjectData?.subjectName}</LineBox>
                        </div>
                      </AreaBox>
                      <AreaSmallBox>
                        <RadioBox>
                          <RadioGroup
                            isReadOnly
                            label={
                              <FilterLabel>
                                교육상황보고여부<span>*</span>
                              </FilterLabel>
                            }
                            defaultValue={
                              studentPaymentData?.situationReport
                                ? '동의'
                                : '비동의'
                            }
                            orientation="horizontal"
                            className="gap-[0.65rem]"
                          >
                            <Radio key={'동의'} value={'동의'}>
                              동의
                            </Radio>
                            <Radio key={'비동의'} value={'비동의'}>
                              비동의
                            </Radio>
                          </RadioGroup>
                        </RadioBox>
                      </AreaSmallBox>
                    </FlexBox>
                    <FlexBox>
                      <AreaBox>
                        <div>
                          <FilterLabel>
                            선발평가점수<span>*</span>
                          </FilterLabel>
                          <LineBox>{studentPaymentData?.seScore || 0}</LineBox>
                        </div>
                      </AreaBox>
                      <AreaBox>
                        <div>
                          <FilterLabel>수강 구분</FilterLabel>
                          <LineBox>{studentPaymentData?.subDiv}</LineBox>
                        </div>
                      </AreaBox>
                      <AreaBox>
                        <div>
                          <FilterLabel>수강예정일</FilterLabel>
                          <LineBox>
                            {studentPaymentData?.dueDate === null
                              ? ''
                              : formatDate(studentPaymentData?.dueDate, false)}
                          </LineBox>
                        </div>
                      </AreaBox>
                    </FlexBox>
                    <FlexBox>
                      <AreaBox>
                        <div>
                          <FilterLabel>수강료</FilterLabel>
                          <LineBox>
                            {studentPaymentData?.tuitionFee
                              ? feeFormet(studentPaymentData?.tuitionFee)
                              : '0'}
                          </LineBox>
                        </div>
                      </AreaBox>
                      <AreaBox>
                        <div>
                          <FilterLabel>할인금액</FilterLabel>
                          <LineBox>
                            {studentPaymentData?.discountAmount
                              ? studentPaymentData?.discountAmount
                              : '0'}
                          </LineBox>
                        </div>
                      </AreaBox>
                      <AreaBox>
                        <div>
                          <FilterLabel>
                            <b>실 수강료</b>
                          </FilterLabel>
                          <LineBox>
                            {studentPaymentData?.actualAmount
                              ? feeFormet(studentPaymentData?.actualAmount)
                              : '0'}
                          </LineBox>
                        </div>
                      </AreaBox>
                    </FlexBox>
                    <FlexBox>
                      <AreaBox>
                        <div>
                          <FilterLabel>수납액</FilterLabel>
                          <LineBox>
                            {studentPaymentData?.amountReceived
                              ? feeFormet(studentPaymentData?.amountReceived)
                              : '0'}
                          </LineBox>
                        </div>
                      </AreaBox>
                      <AreaBox>
                        <div>
                          <FilterLabel>
                            <b>미 수납액</b>
                          </FilterLabel>
                          <LineBox>
                            {studentPaymentData?.unCollectedAmount
                              ? feeFormet(studentPaymentData?.unCollectedAmount)
                              : '0'}
                          </LineBox>
                        </div>
                      </AreaBox>
                      <AreaBox>
                        <div>
                          <FilterLabel>수강담당자</FilterLabel>
                          <LineBox>
                            {
                              managerList.find(
                                user =>
                                  user.id ===
                                  studentPaymentData?.processingManagerId,
                              )?.mUsername
                            }
                          </LineBox>
                        </div>
                      </AreaBox>
                    </FlexBox>
                    {(mGrade < grade.general ||
                      mPart.includes('교무팀') ||
                      mPart.includes('회계팀')) && (
                      <BtnBox4
                        $isPayment={studentPaymentDetailData?.length === 0}
                      >
                        {studentPaymentDetailData?.length === 0 &&
                          (mGrade < grade.general ||
                            mPart.includes('회계팀')) && (
                            <Button
                              size="md"
                              radius="md"
                              variant="solid"
                              className={`w-full text-white bg-flag1 ${
                                mPart.includes('회계팀') && 'lg:w-[50%]'
                              }`}
                              onClick={() =>
                                router.push(
                                  `/students/write/payment/${paymentId}`,
                                )
                              }
                            >
                              수강 결제
                            </Button>
                          )}
                        {(mGrade < grade.general ||
                          mPart.includes('교무팀')) && (
                          <>
                            <Button
                              isDisabled={
                                studentPaymentData?.courseComplete ===
                                  '미수료' ||
                                studentPaymentData?.courseComplete === ''
                                  ? false
                                  : true
                              }
                              size="md"
                              radius="md"
                              variant="bordered"
                              color="primary"
                              className="w-full lg:max-w-[50%]"
                              onClick={clickLectureAssignment}
                            >
                              {studentPaymentData?.lectureAssignment === '배정'
                                ? '배정 취소'
                                : '강의배정'}
                            </Button>
                            {studentPaymentData?.lectureAssignment ===
                              '배정' && (
                              <>
                                <Button
                                  isDisabled={
                                    studentPaymentData?.courseComplete ===
                                      '수강철회' ||
                                    studentPaymentData?.courseComplete ===
                                      '중도포기'
                                      ? true
                                      : false
                                  }
                                  size="md"
                                  radius="md"
                                  variant="solid"
                                  color="primary"
                                  className="w-full text-white"
                                  onClick={clickLCourseComplete}
                                >
                                  {studentPaymentData?.courseComplete === '수료'
                                    ? '이수처리 취소'
                                    : '이수처리'}
                                </Button>
                                <Button
                                  isDisabled={
                                    studentPaymentData?.courseComplete ===
                                      '수료' ||
                                    studentPaymentData?.courseComplete ===
                                      '중도포기'
                                      ? true
                                      : false
                                  }
                                  size="md"
                                  radius="md"
                                  variant="bordered"
                                  className="w-full text-flag1 border-flag1"
                                  onClick={clickClassCancel}
                                >
                                  {studentPaymentData?.courseComplete ===
                                  '수강철회'
                                    ? '수강철회 취소'
                                    : '수강철회'}
                                </Button>
                                <Button
                                  isDisabled={
                                    studentPaymentData?.courseComplete ===
                                      '수료' ||
                                    studentPaymentData?.courseComplete ===
                                      '수강철회'
                                      ? true
                                      : false
                                  }
                                  size="md"
                                  radius="md"
                                  variant="solid"
                                  className="w-full text-white bg-flag1"
                                  onClick={clickClassDrop}
                                >
                                  {studentPaymentData?.courseComplete ===
                                  '중도포기'
                                    ? '중도포기 철회'
                                    : '중도포기'}
                                </Button>
                              </>
                            )}
                          </>
                        )}
                      </BtnBox4>
                    )}
                  </DetailDiv>
                </DetailBox>
                {/* <DetailBox>
                  <DetailDiv>
                    <BtnBox>
                      <Button
                        size="md"
                        radius="md"
                        variant="solid"
                        className="w-full text-white bg-flag1"
                      >
                        환불신청
                      </Button>
                      <Button
                        size="md"
                        radius="md"
                        variant="bordered"
                        className="w-full text-flag1 border-flag1"
                      >
                        삭제
                      </Button>
                    </BtnBox>
                  </DetailDiv>
                </DetailBox> */}
              </>
            )}
            {studentPaymentDetailData?.length > 0 && (
              <>
                <DetailBox>
                  <DetailDiv>
                    <AreaTitle>
                      <h4>결제 정보</h4>
                      {(mGrade < grade.general || mPart.includes('회계팀')) && (
                        <Button
                          isDisabled={
                            studentPaymentData?.unCollectedAmount === 0
                              ? true
                              : false
                          }
                          size="sm"
                          radius="sm"
                          variant="solid"
                          className="text-white bg-flag1"
                          onClick={() => {
                            {
                              router.push(
                                `/students/write/payment/${paymentId}`,
                              )
                            }
                          }}
                        >
                          미수금결제
                        </Button>
                      )}
                    </AreaTitle>
                    {studentPaymentDetailData?.map((item, index) => (
                      <StudentPaymentDetailItem
                        key={index}
                        setStudentPaymentDetailData={
                          setStudentPaymentDetailData
                        }
                        detailtData={item}
                        studentId={studentData?.id}
                      />
                    ))}
                  </DetailDiv>
                </DetailBox>
              </>
            )}
            <DetailBox>
              <BtnBox>
                <Button
                  size="md"
                  radius="md"
                  variant="bordered"
                  color="primary"
                  className="lg:w-[50%] w-full"
                  onClick={() => {
                    router.back()
                  }}
                >
                  이전으로
                </Button>
              </BtnBox>
            </DetailBox>
          </ConArea>
        </MainWrap>
      )}
    </>
  )
}
StudentsWrite.getLayout = page => <Layout>{page}</Layout>
