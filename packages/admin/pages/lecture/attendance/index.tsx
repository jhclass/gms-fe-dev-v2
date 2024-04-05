import MainWrap from '@/components/wrappers/MainWrap'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import { Button, Chip } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import useUserLogsMutation from '@/utils/userLogs'
import Layout from '@/pages/students/layout'
import { useRecoilValue } from 'recoil'
import { gradeState } from '@/lib/recoilAtoms'
import useMmeQuery from '@/utils/mMe'
import {
  CLASS_CANCEL_MUTATION,
  CLASS_CHECK_MUTATION,
  SEARCH_PAYMENT_MUTATION,
  UPDATE_STUDENT_COURSE_MUTATION,
} from '@/graphql/mutations'
import LectureInfo from '@/components/items/LectureInfo'
import AbsentList from '@/components/table/AbsentList'
import AropoutList from '@/components/table/AropoutList'
import AropoutStateList from '@/components/table/AropoutStateList'
import AcquisitionList from '@/components/table/AcquisitionList'
import EmploymentList from '@/components/table/EmploymentList'
import EvaluationList from '@/components/table/EvaluationList'
import Attendance from '@/components/table/Attendance'

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
  font-size: 0.8rem;
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
const FlexChipBox = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
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
const AreaSmallBox2 = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 768px) {
    width: 100% !important;
  }
`
const FlexCon = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  label {
    span {
      margin-right: 0;
      margin-top: 0.25rem;
    }
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

const EllipsisBox = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
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

type HandleStudentPaymentUpdateParams = {
  isCurrentlySet: boolean
  checkFunction?: (variables: any) => Promise<boolean>
  updateFunction: (variables: any, successMessage: string) => Promise<void>
  variables: any
  confirmationMessage: string
  successMessage: string
  failureMessage?: string
  logMessage: string
}

export default function StudentsWrite() {
  const grade = useRecoilValue(gradeState)
  const router = useRouter()
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const mPart = useMme('mPart')
  const paymentId = typeof router.query.id === 'string' ? router.query.id : null
  const { userLogs } = useUserLogsMutation()
  const [updateStudentCourseMutation] = useMutation(
    UPDATE_STUDENT_COURSE_MUTATION,
  )
  const [searchStudentPayment] = useMutation(SEARCH_PAYMENT_MUTATION)
  const [classCancelMutation] = useMutation(CLASS_CANCEL_MUTATION)
  const [classCheckMutation] = useMutation(CLASS_CHECK_MUTATION)
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
        onCompleted: ({
          searchStudentPayment: {
            ok,
            data: [firstData],
          },
        }) => {
          if (ok) {
            const { student, subject, paymentDetail } = firstData
            setStudentPaymentData(firstData)
            setStudentData(student)
            setStudentSubjectData(subject)
            setStudentPaymentDetailData(paymentDetail)
          }
        },
      })
    }
  }, [router])

  const searchAndUpdateStudentPayment = async () => {
    const {
      data: {
        searchStudentPayment: {
          ok,
          data: [firstData],
        },
      },
    } = await searchStudentPayment({
      variables: {
        searchStudentPaymentId: parseInt(paymentId),
      },
    })
    if (ok) {
      setStudentPaymentData(firstData)
      return true
    }
    return false
  }

  const notifyUser = (message, isError = false) => {
    alert(message)
    if (isError) {
      console.error(message)
    }
  }

  const executeMutation = async (mutation, variables, successMessage) => {
    try {
      const { data } = await mutation({ variables })
      const firstKey = Object.keys(data)[0]
      const { ok } = data[firstKey]
      if (ok) {
        if (successMessage) notifyUser(successMessage)
        return true
      } else {
        throw new Error('Operation failed')
      }
    } catch (error) {
      notifyUser('처리 중 오류가 발생했습니다.', true)
      return false
    }
  }

  const handleStudentPaymentUpdate = async ({
    isCurrentlySet,
    checkFunction = async () => true,
    updateFunction,
    variables,
    confirmationMessage,
    successMessage,
    failureMessage = '조건을 만족하지 않아 처리할 수 없습니다.',
    logMessage,
  }: HandleStudentPaymentUpdateParams) => {
    if (!confirm(confirmationMessage)) return

    let updateSuccessful = false
    try {
      if (isCurrentlySet) {
        await updateFunction(variables, successMessage)
        updateSuccessful = true
      } else {
        const ok = await checkFunction(variables)
        if (ok) {
          await updateFunction(variables, successMessage)
          updateSuccessful = true
        } else {
          notifyUser(failureMessage)
        }
      }
    } catch (error) {
      console.error('업데이트 중 에러 발생:', error)
      notifyUser('업데이트 중 문제가 발생했습니다.')
      updateSuccessful = false
    }
    if (updateSuccessful) {
      userLogs(logMessage)
    }
  }

  const clickLectureAssignment = async () => {
    const isCurrentlyAssigned = studentPaymentData.lectureAssignment === '배정'
    const confirmationMessage = isCurrentlyAssigned
      ? `${studentData.name}학생의 ${studentSubjectData.subjectName} 강의 배정을 취소 하시겠습니까?`
      : `${studentData.name}학생을 ${studentSubjectData.subjectName} 강의 배정 하시겠습니까?`

    const updateLogic = async () => {
      const success = await handleStudentPaymentUpdate({
        isCurrentlySet: isCurrentlyAssigned,
        updateFunction: async (variables, successMessage) => {
          const success = await executeMutation(
            updateStudentCourseMutation,
            variables,
            successMessage,
          )
          if (success) await searchAndUpdateStudentPayment()
        },
        variables: {
          editStudentPaymentId: parseInt(studentPaymentData.id),
          lectureAssignment: isCurrentlyAssigned ? '미배정' : '배정',
          subjectId: studentPaymentData.subjectId,
          processingManagerId: studentPaymentData.processingManagerId,
        },
        confirmationMessage,
        successMessage: isCurrentlyAssigned
          ? '강의배정 취소되었습니다.'
          : '강의배정 되었습니다.',
        logMessage: isCurrentlyAssigned
          ? `${studentData.name}학생 ${studentSubjectData.subjectName} 강의 배정 취소`
          : `${studentData.name}학생 ${studentSubjectData.subjectName} 강의 배정`,
      })
      return success
    }

    if (!isCurrentlyAssigned) {
      const {
        data: {
          duplicateCheck: { ok },
        },
      } = await classCheckMutation({
        variables: {
          studentId: studentData.id,
          subjectId: studentPaymentData.subjectId,
        },
      })
      if (ok) {
        await updateLogic()
      } else {
        alert('강의가 중복됩니다. 배정할 수 없습니다.')
      }
    } else {
      await updateLogic()
    }
  }

  const clickCompletion = async () => {
    const isCurrentlyCompleted = studentPaymentData.courseComplete === '수료'
    const confirmationMessage = isCurrentlyCompleted
      ? `${studentData.name}학생의 이수 처리를 취소하시겠습니까?`
      : `${studentData.name}학생을 이수 처리하시겠습니까?`

    await handleStudentPaymentUpdate({
      isCurrentlySet: isCurrentlyCompleted,
      updateFunction: async (variables, successMessage) => {
        const success = await executeMutation(
          classCancelMutation,
          variables,
          successMessage,
        )
        if (success) await searchAndUpdateStudentPayment()
      },
      variables: {
        classCancellationId: parseInt(studentPaymentData.id),
        courseComplete: isCurrentlyCompleted ? '미수료' : '수료',
      },
      confirmationMessage,
      successMessage: isCurrentlyCompleted
        ? '이수 처리가 취소되었습니다.'
        : '이수 처리되었습니다.',
      logMessage: isCurrentlyCompleted
        ? `${studentData.name}학생 이수처리 취소`
        : `${studentData.name}학생 이수처리`,
    })
  }

  const clickDropout = async () => {
    const isCurrentlyDroppedOut =
      studentPaymentData.courseComplete === '중도포기'
    await handleStudentPaymentUpdate({
      isCurrentlySet: isCurrentlyDroppedOut,
      updateFunction: async (variables, successMessage) => {
        const success = await executeMutation(
          classCancelMutation,
          variables,
          successMessage,
        )
        if (success) await searchAndUpdateStudentPayment()
      },
      variables: {
        classCancellationId: parseInt(studentPaymentData.id),
        courseComplete: isCurrentlyDroppedOut ? '미수료' : '중도포기',
      },
      confirmationMessage: isCurrentlyDroppedOut
        ? `${studentData.name}학생의 중도포기를 취소하시겠습니까?`
        : `${studentData.name}학생을 중도포기 처리하시겠습니까?`,
      successMessage: isCurrentlyDroppedOut
        ? '중도 포기가 취소되었습니다.'
        : '중도 포기 처리되었습니다.',
      logMessage: isCurrentlyDroppedOut
        ? `${studentData.name}학생 ${studentSubjectData.subjectName} 강의 중도포기 철회`
        : `${studentData.name}학생 ${studentSubjectData.subjectName} 강의 중도포기`,
    })
  }

  const clickWithdrawal = async () => {
    const isCurrentlyWithdrawn =
      studentPaymentData.courseComplete === '수강철회'
    await handleStudentPaymentUpdate({
      isCurrentlySet: isCurrentlyWithdrawn,
      updateFunction: async (variables, successMessage) => {
        const success = await executeMutation(
          classCancelMutation,
          variables,
          successMessage,
        )
        if (success) await searchAndUpdateStudentPayment()
      },
      variables: {
        classCancellationId: parseInt(studentPaymentData.id),
        courseComplete: isCurrentlyWithdrawn ? '미수료' : '수강철회',
      },
      confirmationMessage: isCurrentlyWithdrawn
        ? `${studentData.name}학생의 수강철회를 취소하시겠습니까?`
        : `${studentData.name}학생을 수강철회 처리하시겠습니까?`,
      successMessage: isCurrentlyWithdrawn
        ? '수강철회가 취소되었습니다.'
        : '수강철회 처리되었습니다.',
      logMessage: isCurrentlyWithdrawn
        ? `${studentData.name}학생 ${studentSubjectData.subjectName} 수강철회 취소`
        : `${studentData.name}학생 ${studentSubjectData.subjectName} 수강철회`,
    })
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
                <h4>기본 정보</h4>
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
              </AreaTitle>
              <LectureInfo />
            </DetailDiv>
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>학적부</h4>
              </AreaTitle>
              <Noti>
                <span>❗️</span>
                교육훈련대상 수강생이 아닌 경우 학적부 명단에 나타나지 않습니다.
              </Noti>
              <FlexChipBox>
                <Chip color="primary">Primary</Chip>
                <Chip color="primary">Primary</Chip>
                <Chip color="primary">Primary</Chip>
                <Chip color="primary">Primary</Chip>
                <Chip color="primary">Primary</Chip>
                <Chip color="primary">Primary</Chip>
                <Chip color="primary">Primary</Chip>
                <Chip color="primary">Primary</Chip>
                <Chip color="primary">Primary</Chip>
                <Chip color="primary">Primary</Chip>
              </FlexChipBox>
            </DetailDiv>
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>출석부</h4>
              </AreaTitle>
              <Attendance />
            </DetailDiv>
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>결석인원현황</h4>
              </AreaTitle>
              <AbsentList />
            </DetailDiv>
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>중도탈락현황</h4>
              </AreaTitle>
              <AropoutList />
            </DetailDiv>
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>중도탈락 사전점검</h4>
              </AreaTitle>
              <AropoutStateList />
            </DetailDiv>
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>자격취득현황</h4>
              </AreaTitle>
              <AcquisitionList />
            </DetailDiv>
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>취업현황</h4>
              </AreaTitle>
              <EmploymentList />
            </DetailDiv>
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>정기평가 내용설정</h4>
              </AreaTitle>
              <EvaluationList />
            </DetailDiv>
          </DetailBox>
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
    </>
  )
}
StudentsWrite.getLayout = page => <Layout>{page}</Layout>
