import MainWrap from '@/components/wrappers/MainWrap'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import { Radio, RadioGroup, Button } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import Layout from '@/pages/students/layout'
import { useRecoilValue } from 'recoil'
import { gradeState } from '@/lib/recoilAtoms'
import useMmeQuery from '@/utils/mMe'
import { SEARCH_STUDENT_MUTATION } from '@/graphql/mutations'
import CreateStudentMemo from '@/components/form/CreateStudentMemo'
import StudentMemo from '@/components/form/StudentMemo'
import StudentPaymentItem from '@/components/items/PaymentItem'
import StudentInfo from '@/components/items/StudentInfo'
import FormTopInfo from '@/components/common/FormTopInfo'

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
  color: ${({ theme }) => theme.colors.black};
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
const PaymentList = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;

  > a {
    display: block;
    width: 100%;
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
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
  const mPart = useMme('mPart') || []
  const studentId = typeof router.query.id === 'string' ? router.query.id : null
  const [searchStudentMutation] = useMutation(SEARCH_STUDENT_MUTATION)
  const [studentData, setStudentData] = useState(null)
  const [studentPaymentData, setStudentPaymentData] = useState([])
  const [memoList, setMemoList] = useState([])

  useEffect(() => {
    searchStudentMutation({
      variables: {
        searchStudentId: parseInt(studentId),
      },
      onCompleted: data => {
        if (data.searchStudent.ok) {
          setStudentData(data.searchStudent?.student[0])
          setStudentPaymentData(data.searchStudent?.student[0].studentPayment)
          setMemoList(data.searchStudent?.student[0].studentMemo)
        }
      },
    })
  }, [router])

  return (
    <>
      {studentData !== null && (
        <MainWrap>
          <ConArea>
            <Breadcrumb isFilter={false} isWrite={false} rightArea={false} />
            <DetailBox>
              <FormTopInfo item={studentData} noti={true} />
              <DetailDiv>
                <AreaTitle>
                  <h4>기본정보</h4>
                  <Button
                    size="sm"
                    radius="sm"
                    variant="solid"
                    color="primary"
                    className="text-white"
                    onClick={() => {
                      {
                        router.push(`/students/edit/${studentData?.id}`)
                      }
                    }}
                  >
                    수정
                  </Button>
                </AreaTitle>
                <StudentInfo
                  studentData={studentData}
                  detailAll={true}
                  record={false}
                />
                {(studentPaymentData === null ||
                  studentPaymentData?.length === 0) && (
                  <BtnBox>
                    {(mGrade <= grade.subMaster ||
                      mPart.includes('교무팀')) && (
                      <Button
                        size="md"
                        radius="md"
                        variant="solid"
                        color="primary"
                        className="lg:w-[50%] w-full text-white"
                        onClick={() => {
                          router.push(
                            `/students/write/course/${studentData.id}`,
                          )
                        }}
                      >
                        수강신청
                      </Button>
                    )}
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
                )}
              </DetailDiv>
            </DetailBox>
            {studentPaymentData?.length > 0 && (
              <DetailBox>
                <DetailDiv>
                  <AreaTitle>
                    <h4>수강 목록</h4>
                    {(mGrade <= grade.subMaster ||
                      mPart.includes('교무팀')) && (
                      <Button
                        size="sm"
                        radius="sm"
                        variant="solid"
                        color="primary"
                        className="text-white bg-accent"
                        onClick={() => {
                          {
                            router.push(
                              `/students/write/course/${studentData.id}`,
                            )
                          }
                        }}
                      >
                        과정 추가
                      </Button>
                    )}
                  </AreaTitle>
                  <FlexBox>
                    <PaymentList>
                      {studentPaymentData?.map((item, index) => (
                        <StudentPaymentItem
                          key={index}
                          index={index}
                          detailtData={item}
                          studentId={studentData?.id}
                        />
                      ))}
                    </PaymentList>
                  </FlexBox>
                </DetailDiv>
              </DetailBox>
            )}
            {studentPaymentData?.length > 0 && (
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
            )}

            <DetailBox>
              <DetailDiv>
                <CreateStudentMemo
                  setMemoList={setMemoList}
                  studentId={studentData?.id}
                />
                {memoList && (
                  <MemoList>
                    {memoList?.map((item, index) => (
                      <MemoItem key={index}>
                        <StudentMemo
                          item={item}
                          setMemoList={setMemoList}
                          studentId={studentData?.id}
                        />
                      </MemoItem>
                    ))}
                  </MemoList>
                )}
              </DetailDiv>
            </DetailBox>
          </ConArea>
        </MainWrap>
      )}
    </>
  )
}
StudentsWrite.getLayout = page => <Layout>{page}</Layout>
