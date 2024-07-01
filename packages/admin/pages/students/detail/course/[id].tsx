import MainWrap from '@/components/wrappers/MainWrap'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import { Button } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import useUserLogsMutation from '@/utils/userLogs'
import Layout from '@/pages/students/layout'
import { useRecoilValue } from 'recoil'
import {
  assignmentState,
  completionStatus,
  employmentStatus,
  gradeState,
} from '@/lib/recoilAtoms'
import useMmeQuery from '@/utils/mMe'
import {
  CLASS_CANCEL_MUTATION,
  CLASS_CHECK_MUTATION,
  SEARCH_PAYMENT_MUTATION,
  UPDATE_STUDENT_COURSE_MUTATION,
} from '@/graphql/mutations'
import StudentPaymentDetailItem from '@/components/items/PaymentDetailItem'
import PaymentInfo from '@/components/items/PaymentInfo'

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

const FlexBtnBox = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    button {
      width: calc(50% - 0.5rem);
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
  const assignment = useRecoilValue(assignmentState)
  const completion = useRecoilValue(completionStatus)
  const employment = useRecoilValue(employmentStatus)
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

  const editAssignment = async state => {
    const changeAssignment = confirm(
      `${studentData?.name}학생을 "${state}"하시겠습니까? \n 과정명 : ${studentSubjectData?.subjectName}`,
    )
    if (changeAssignment) {
      const isCurrentlyAssigned =
        studentPaymentData.lectureAssignment === assignment.assignment

      const updateLogic = async () => {
        const success = await updateStudentCourseMutation({
          variables: {
            editStudentPaymentId: parseInt(studentPaymentData.id),
            lectureAssignment: state,
            subjectId: studentPaymentData.subjectId,
            processingManagerId: studentPaymentData.processingManagerId,
          },
        })
        if (success) {
          if (state !== assignment.assignment) {
            await classCancelMutation({
              variables: {
                classCancellationId: parseInt(studentPaymentData.id),
                courseComplete: '미참여',
              },
              onCompleted: async () => {
                const success2 = await searchAndUpdateStudentPayment()
                if (success2) {
                  alert(`${studentData?.name}학생을 "${state}"처리 하였습니다.`)
                  userLogs(`${studentData?.name}학생 "${state}"처리`)
                }
              },
            })
          } else {
            const success2 = await searchAndUpdateStudentPayment()
            if (success2) {
              alert(`${studentData?.name}학생을 "${state}"처리 하였습니다.`)
              userLogs(`${studentData?.name}학생 "${state}"처리`)
            }
          }
        }
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
  }

  const clickAssignment = async state => {
    if (studentPaymentDetailData?.length === 0) {
      alert('수강료 결제 후 변경 가능합니다.')
    } else {
      editAssignment(state)
    }
  }

  const clickCompletion = async state => {
    const changeCompletion = confirm(
      `${studentData?.name}학생을 "${state}"처리 하시겠습니까? \n 과정명 : ${studentSubjectData?.subjectName}`,
    )
    if (changeCompletion) {
      const success = await classCancelMutation({
        variables: {
          classCancellationId: parseInt(studentPaymentData.id),
          courseComplete: state,
        },
      })
      if (success) {
        const success2 = await searchAndUpdateStudentPayment()
        if (success2) {
          alert(`${studentData?.name}학생을 "${state}"처리 하였습니다.`)
          userLogs(`${studentData?.name}학생 "${state}"처리`)
        }
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

  return (
    <>
      {studentData !== null && (
        <MainWrap>
          <ConArea>
            <Breadcrumb isFilter={false} isWrite={false} rightArea={false} />
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
                            studentPaymentData?.lectureAssignment ===
                            assignment.withdrawal
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
                    <PaymentInfo
                      studentSubjectData={studentSubjectData}
                      studentPaymentData={studentPaymentData}
                    />
                    {(mGrade < grade.general || mPart.includes('교무팀')) && (
                      <>
                        <div>
                          <FilterLabel>배정 여부</FilterLabel>
                          <FlexBtnBox>
                            <Button
                              isDisabled={
                                studentPaymentData?.lectureAssignment ===
                                assignment.unassigned
                                  ? true
                                  : false
                              }
                              size="md"
                              radius="md"
                              variant={
                                studentPaymentData?.lectureAssignment ===
                                assignment.unassigned
                                  ? 'solid'
                                  : 'bordered'
                              }
                              className={
                                studentPaymentData?.lectureAssignment ===
                                assignment.unassigned
                                  ? 'w-full text-white bg-[#07bbae]'
                                  : 'w-full text-[#07bbae] border-[#07bbae]'
                              }
                              onClick={() =>
                                clickAssignment(assignment.unassigned)
                              }
                            >
                              {assignment.unassigned}
                            </Button>
                            <Button
                              isDisabled={
                                studentPaymentData?.lectureAssignment ===
                                assignment.assignment
                                  ? true
                                  : false
                              }
                              size="md"
                              radius="md"
                              variant={
                                studentPaymentData?.lectureAssignment ===
                                assignment.assignment
                                  ? 'solid'
                                  : 'bordered'
                              }
                              className={
                                studentPaymentData?.lectureAssignment ===
                                assignment.assignment
                                  ? 'w-full text-white bg-[#07bbae]'
                                  : 'w-full text-[#07bbae] border-[#07bbae]'
                              }
                              onClick={() =>
                                clickAssignment(assignment.assignment)
                              }
                            >
                              {assignment.assignment}
                            </Button>
                            <Button
                              isDisabled={
                                studentPaymentData?.lectureAssignment ===
                                assignment.withdrawal
                                  ? true
                                  : false
                              }
                              size="md"
                              radius="md"
                              variant={
                                studentPaymentData?.lectureAssignment ===
                                assignment.withdrawal
                                  ? 'solid'
                                  : 'bordered'
                              }
                              className={
                                studentPaymentData?.lectureAssignment ===
                                assignment.withdrawal
                                  ? 'w-full text-white bg-[#07bbae]'
                                  : 'w-full text-[#07bbae] border-[#07bbae]'
                              }
                              onClick={() =>
                                clickAssignment(assignment.withdrawal)
                              }
                            >
                              {assignment.withdrawal}
                            </Button>
                          </FlexBtnBox>
                        </div>
                        {studentPaymentData?.lectureAssignment ==
                          assignment.assignment && (
                          <div>
                            <FilterLabel>수료 여부</FilterLabel>
                            <FlexBtnBox>
                              <Button
                                isDisabled={
                                  studentPaymentData?.courseComplete ===
                                  completion.inTraining
                                    ? true
                                    : false
                                }
                                size="md"
                                radius="md"
                                variant={
                                  studentPaymentData?.courseComplete ===
                                  completion.inTraining
                                    ? 'solid'
                                    : 'bordered'
                                }
                                color="primary"
                                className="w-full"
                                onClick={() =>
                                  clickCompletion(completion.inTraining)
                                }
                              >
                                {completion.inTraining}
                              </Button>
                              <Button
                                isDisabled={
                                  studentPaymentData?.courseComplete ===
                                  completion.dropout
                                    ? true
                                    : false
                                }
                                size="md"
                                radius="md"
                                variant={
                                  studentPaymentData?.courseComplete ===
                                  completion.dropout
                                    ? 'solid'
                                    : 'bordered'
                                }
                                color="primary"
                                className="w-full"
                                onClick={() =>
                                  clickCompletion(completion.dropout)
                                }
                              >
                                {completion.dropout}
                              </Button>
                              <Button
                                isDisabled={
                                  studentPaymentData?.courseComplete ===
                                  completion.completed
                                    ? true
                                    : false
                                }
                                size="md"
                                radius="md"
                                variant={
                                  studentPaymentData?.courseComplete ===
                                  completion.completed
                                    ? 'solid'
                                    : 'bordered'
                                }
                                color="primary"
                                className="w-full"
                                onClick={() =>
                                  clickCompletion(completion.completed)
                                }
                              >
                                {completion.completed}
                              </Button>
                              <Button
                                isDisabled={
                                  studentPaymentData?.courseComplete ===
                                  completion.notCompleted
                                    ? true
                                    : false
                                }
                                size="md"
                                radius="md"
                                variant={
                                  studentPaymentData?.courseComplete ===
                                  completion.notCompleted
                                    ? 'solid'
                                    : 'bordered'
                                }
                                color="primary"
                                className="w-full"
                                onClick={() =>
                                  clickCompletion(completion.notCompleted)
                                }
                              >
                                {completion.notCompleted}
                              </Button>
                            </FlexBtnBox>
                          </div>
                        )}
                      </>
                    )}

                    {studentPaymentDetailData?.length === 0 &&
                      (mGrade < grade.general || mPart.includes('회계팀')) && (
                        <Button
                          size="md"
                          radius="md"
                          variant="solid"
                          className="w-full mx-auto text-white bg-flag1 lg:w-[50%]"
                          onClick={() =>
                            router.push(`/students/write/payment/${paymentId}`)
                          }
                        >
                          수강 결제
                        </Button>
                      )}
                  </DetailDiv>
                </DetailBox>
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
                            studentPaymentData?.unCollectedAmount === 0 ||
                            studentPaymentData?.lectureAssignment ===
                              assignment.withdrawal
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
                        paymentId={paymentId}
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
