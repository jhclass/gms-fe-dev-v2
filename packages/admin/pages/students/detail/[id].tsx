import MainWrap from '@/components/wrappers/MainWrap'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import { Radio, RadioGroup, Button, useDisclosure } from '@nextui-org/react'
import { useMutation, useQuery } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'
import useUserLogsMutation from '@/utils/userLogs'
import Layout from '@/pages/students/layout'
import { useRecoilValue } from 'recoil'
import { ReceiptState } from '@/lib/recoilAtoms'
import CreateMemo from '@/components/form/CreateMemo'
import ConsolutMemo from '@/components/form/ConsolutMemo'
import useMmeQuery from '@/utils/mMe'
import { SEARCH_STUDENT_MUTATION } from '@/graphql/mutations'

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
const FlexCardBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 2px solid hsl(240 6% 90%);
  padding: 1rem;
  border-radius: 0.5rem;
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
`
const AreaSmallBox = styled.div``

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
  const router = useRouter()
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const studentId = typeof router.query.id === 'string' ? router.query.id : null

  const { userLogs } = useUserLogsMutation()
  const {
    loading: managerLoading,
    error: managerError,
    data: managerData,
  } = useQuery(SEE_MANAGEUSER_QUERY)
  const Receipt = useRecoilValue(ReceiptState)
  const managerList = managerData?.seeManageUser || []
  const [searchStudentMutation] = useMutation(SEARCH_STUDENT_MUTATION)
  const { register, control, setValue, handleSubmit, formState } = useForm()
  const { errors } = formState
  const {
    isOpen: sbjIsOpen,
    onOpen: sbjOpen,
    onClose: sbjClose,
  } = useDisclosure()
  const [studentData, setStudentData] = useState(null)
  const [studentSubjectData, setStudentSubjectData] = useState(null)
  const [studentPaymentData, setStudentPaymentData] = useState(null)
  const [memoList, setMemoList] = useState([])

  useEffect(() => {
    searchStudentMutation({
      variables: {
        searchStudentId: parseInt(studentId),
      },
      onCompleted: data => {
        setStudentData(data.searchStudent?.student[0])
        setStudentSubjectData(data.searchStudent?.student[0].studentPayment[0])
        setStudentPaymentData(data.searchStudent?.student[0].studentPayment[0])
        setMemoList(data.searchStudent?.student[0].studentMemo)
      },
    })
  }, [router])
  const onSubmit = data => {
    console.log(data)
    // createStudent({
    //   variables: {
    //     stName: data.stName.trim(),
    //     agreement: '동의',
    //     subject: data.subject,
    //     campus: '신촌',
    //     detail: data.detail === '' ? null : data.detail.trim(),
    //     category: null,
    //     phoneNum1: data.phoneNum1.trim(),
    //     phoneNum2: data.phoneNum2 === '' ? null : data.phoneNum2.trim(),
    //     phoneNum3: data.phoneNum3 === '' ? null : data.phoneNum3.trim(),
    //     stEmail: data.stEmail === '' ? null : data.stEmail.trim(),
    //     stAddr: null,
    //     subDiv: data.subDiv === undefined ? null : data.subDiv,
    //     stVisit: data.stVisit === undefined ? null : new Date(data.stVisit),
    //     expEnrollDate:
    //       data.expEnrollDate === undefined
    //         ? null
    //         : new Date(data.expEnrollDate),
    //     perchase: null,
    //     birthday: null,
    //     receiptDiv: data.subDiv === undefined ? '' : data.receiptDiv,
    //     pic: data.subDiv === undefined ? null : data.pic,
    //     // progress: 0,
    //   },
    //   refetchQueries: [
    //     {
    //       query: SEE_STUDENT_QUERY,
    //       variables: { page: 1, limit: 10 },
    //     },
    //   ],
    //   onCompleted: data => {
    //     alert('등록되었습니다.')
    //     router.push('/consult')
    //   },
    // })
    // userLogs(`${data.stName}의 상담 등록`)
  }

  const fametDate = (data, isTime) => {
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
    const result =
      fee || (0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
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
                  {fametDate(studentData?.updatedAt, true)}
                </UpdateTime>
              </TopInfo>
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
                        연락처<span>*</span>
                      </FilterLabel>
                      <LineBox>{studentData?.phoneNum1}</LineBox>
                    </div>
                  </AreaBox>
                  <AreaSmallBox>
                    <RadioBox>
                      <RadioGroup
                        label={
                          <FilterLabel>
                            SNS 수신 여부<span>*</span>
                          </FilterLabel>
                        }
                        isReadOnly
                        defaultValue={studentData?.smsAgreement}
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
                        생년월일<span>*</span>
                      </FilterLabel>
                      <LineBox>
                        {fametDate(studentData?.birthday, false)}
                      </LineBox>
                    </div>
                  </AreaBox>
                  <AreaBox>
                    <div>
                      <FilterLabel>기타 연락처</FilterLabel>
                      <LineBox>{studentData?.phoneNum2}</LineBox>
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
                        {fametDate(studentData?.createdAt, false)}
                      </LineBox>
                    </div>
                  </AreaBox>
                </FlexBox>
                {studentSubjectData === undefined && (
                  <BtnBox>
                    <Button
                      size="md"
                      radius="md"
                      variant="solid"
                      color="primary"
                      className="w-full text-white"
                      onClick={() => {
                        router.push(`/students/write/course/${studentData?.id}`)
                      }}
                    >
                      수강신청
                    </Button>
                    {mGrade < 2 && (
                      <Button
                        size="md"
                        radius="md"
                        variant="solid"
                        className="w-full text-white bg-flag1"
                      >
                        삭제
                      </Button>
                    )}
                  </BtnBox>
                )}
              </DetailDiv>
            </DetailBox>
            {studentSubjectData !== undefined && (
              <DetailBox>
                <DetailDiv>
                  <AreaTitle>
                    <h4>수강료 정보</h4>
                    <Button
                      size="sm"
                      radius="sm"
                      variant="solid"
                      color="primary"
                      className="text-white"
                      onClick={() => {
                        {
                          router.push(
                            `/students/edit/course/${studentData?.id}`,
                          )
                        }
                      }}
                    >
                      수정
                    </Button>
                  </AreaTitle>
                  <FlexBox>
                    <AreaSmallBox style={{ minWidth: '20%' }}>
                      <div>
                        <FilterLabel>과정코드</FilterLabel>
                        <LineBox>{studentData?.classCode}</LineBox>
                      </div>
                    </AreaSmallBox>
                    <AreaBox>
                      <div>
                        <FilterLabel>과정명</FilterLabel>
                        <LineBox>{studentData?.subject?.subjectName}</LineBox>
                      </div>
                    </AreaBox>
                    <AreaSmallBox style={{ minWidth: '20%' }}>
                      <div>
                        <FilterLabel>
                          선별테스트점수<span>*</span>
                        </FilterLabel>
                        <LineBox>{studentSubjectData?.seScore || 0}</LineBox>
                      </div>
                    </AreaSmallBox>
                  </FlexBox>
                  <BtnBox>
                    <Button
                      isDisabled={studentData?.courseComplete ? true : false}
                      size="md"
                      radius="md"
                      variant="bordered"
                      color="primary"
                      className="w-full"
                    >
                      {studentData?.lectureAssignment
                        ? '배정 취소'
                        : '강의배정'}
                    </Button>
                    <Button
                      isDisabled={studentData?.lectureAssignment ? false : true}
                      size="md"
                      radius="md"
                      variant="solid"
                      color="primary"
                      className="w-full text-white"
                    >
                      {studentData?.courseComplete
                        ? '이수처리 취소'
                        : '이수처리'}
                    </Button>
                  </BtnBox>
                  <FlexBox>
                    <AreaBox>
                      <div>
                        <FilterLabel>수강 구분</FilterLabel>
                        <LineBox>국가기간</LineBox>
                      </div>
                    </AreaBox>
                    <AreaBox>
                      <div>
                        <FilterLabel>수강료</FilterLabel>
                        <LineBox>
                          {feeFormet(studentSubjectData?.tuitionFee)}
                        </LineBox>
                      </div>
                    </AreaBox>
                    <AreaBox>
                      <div>
                        <FilterLabel>수강당담자</FilterLabel>
                        <LineBox>
                          {studentSubjectData?.processingManager}
                        </LineBox>
                      </div>
                    </AreaBox>
                    <AreaBox>
                      <div>
                        <FilterLabel>수강예정일</FilterLabel>
                        <LineBox>
                          {studentData?.dueDate === null
                            ? ''
                            : fametDate(studentData?.dueDate, false)}
                        </LineBox>
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
                          defaultValue=""
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
                        <FilterLabel>할인금액</FilterLabel>
                        <LineBox>
                          {feeFormet(studentSubjectData?.discountAmount)}
                        </LineBox>
                      </div>
                    </AreaBox>
                    <AreaBox>
                      <div>
                        <FilterLabel>실 수강료</FilterLabel>
                        <LineBox>
                          {feeFormet(studentSubjectData?.actualAmount)}
                        </LineBox>
                      </div>
                    </AreaBox>
                    <AreaBox>
                      <div>
                        <FilterLabel>미 수납액</FilterLabel>
                        <LineBox>
                          {feeFormet(studentSubjectData?.unCollectedAmount)}
                        </LineBox>
                      </div>
                    </AreaBox>
                  </FlexBox>
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
              </DetailBox>
            )}
            {/* {studentPaymentData !== null && (
              <DetailBox>
                <DetailDiv>
                  <AreaTitle>
                    <h4>결제 정보</h4>
                    <Button
                      size="sm"
                      radius="sm"
                      variant="solid"
                      className="text-white bg-flag1"
                      onClick={() => {
                        {
                          router.push('/students/write/payment')
                        }
                      }}
                    >
                      미수금결제
                    </Button>
                  </AreaTitle>
                  <FlexCardBox>
                    <FlexBox>
                      <AreaBox>
                        <div>
                          <FilterLabel>결제일자</FilterLabel>
                          <FlatBox>
                            {fametDate(studentPaymentData?.paymentDate, false)}
                          </FlatBox>
                        </div>
                      </AreaBox>
                      <AreaBox>
                        <div>
                          <FilterLabel>{`${studentPaymentData?.cashOrCard} 결제금액`}</FilterLabel>
                          <FlatBox>
                            {feeFormet(studentPaymentData?.amountPayment)}
                          </FlatBox>
                        </div>
                      </AreaBox>
                      <AreaBox>
                        <div>
                          <FilterLabel>수납자</FilterLabel>
                          <FlatBox>{studentPaymentData?.cashOrCard}</FlatBox>
                        </div>
                      </AreaBox>
                      <AreaBox>
                        <div>
                          <FilterLabel>영수구분</FilterLabel>
                          <FlatBox>
                            {studentPaymentData?.ReceiptClassification}
                          </FlatBox>
                        </div>
                      </AreaBox>
                    </FlexBox>
                    <BtnBox>
                      <Button
                        size="md"
                        radius="md"
                        variant="bordered"
                        color="primary"
                        className="w-full"
                      >
                        영수증 인쇄
                      </Button>
                      <Button
                        size="md"
                        radius="md"
                        variant="solid"
                        color="primary"
                        className="w-full text-white"
                        onClick={() => router.push('/students/edit/payment/0')}
                      >
                        결제 변경
                      </Button>
                      <Button
                        size="md"
                        radius="md"
                        variant="bordered"
                        className="w-full text-flag1 border-flag1"
                      >
                        결제 삭제
                      </Button>
                    </BtnBox>
                  </FlexCardBox>
                  <FlexCardBox>
                    <FlexBox>
                      <AreaBox>
                        <div>
                          <FilterLabel>결제일자</FilterLabel>
                          <FlatBox>2024.01.11</FlatBox>
                        </div>
                      </AreaBox>
                      <AreaBox>
                        <div>
                          <FilterLabel>결제금액</FilterLabel>
                          <FlatBox>500,000원</FlatBox>
                        </div>
                      </AreaBox>
                      <AreaBox>
                        <div>
                          <FilterLabel>카드</FilterLabel>
                          <FlatBox>500,000원</FlatBox>
                        </div>
                      </AreaBox>
                      <AreaBox>
                        <div>
                          <FilterLabel>현금</FilterLabel>
                          <FlatBox>0원</FlatBox>
                        </div>
                      </AreaBox>
                      <AreaBox>
                        <div>
                          <FilterLabel>수납자</FilterLabel>
                          <FlatBox>이주임</FlatBox>
                        </div>
                      </AreaBox>
                      <AreaBox>
                        <div>
                          <FilterLabel>영수구분</FilterLabel>
                          <FlatBox></FlatBox>
                        </div>
                      </AreaBox>
                    </FlexBox>
                    <BtnBox>
                      <Button
                        size="md"
                        radius="md"
                        variant="bordered"
                        color="primary"
                        className="w-full"
                      >
                        영수증 인쇄
                      </Button>
                      <Button
                        size="md"
                        radius="md"
                        variant="solid"
                        color="primary"
                        className="w-full text-white"
                        onClick={() => router.push('/students/edit/payment/0')}
                      >
                        결제 변경
                      </Button>
                      <Button
                        size="md"
                        radius="md"
                        variant="bordered"
                        className="w-full text-flag1 border-flag1"
                      >
                        결제 삭제
                      </Button>
                    </BtnBox>
                  </FlexCardBox>
                </DetailDiv>
              </DetailBox>
            )} */}
            {memoList !== null && (
              <DetailBox>
                <DetailDiv>
                  <CreateMemo />
                  <MemoList>
                    <MemoItem>
                      <ConsolutMemo
                        item={''}
                        setMemoList={[]}
                        studentId={1}
                      ></ConsolutMemo>
                    </MemoItem>
                  </MemoList>
                </DetailDiv>
              </DetailBox>
            )}
          </ConArea>
        </MainWrap>
      )}
    </>
  )
}
StudentsWrite.getLayout = page => <Layout>{page}</Layout>
