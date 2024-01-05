import MainWrap from '@/components/wrappers/MainWrap'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
registerLocale('ko', ko)
import {
  Checkbox,
  CheckboxGroup,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
  Button,
  useDisclosure,
  Pagination,
  ScrollShadow,
} from '@nextui-org/react'
import { useQuery } from '@apollo/client'
import { Controller, useForm } from 'react-hook-form'
import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'
import Layout from '../layout'
import { useRecoilValue } from 'recoil'
import { ReceiptState } from '@/lib/recoilAtoms'
import SubjectModal from '@/components/modal/SubjectModal'
import CreateMemo from '@/components/form/CreateMemo'
import ConsolutMemo from '@/components/form/ConsolutMemo'

const ConArea = styled.div`
  width: 100%;
  max-width: 1400px;
`
const DetailDiv = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`
const TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
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
const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
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
const DatePickerBox = styled.div`
  width: 100%;
  .react-datepicker-wrapper {
    width: 100%;
  }
  .react-datepicker__close-icon {
    height: 2.5rem;
    top: auto;
    bottom: 0;
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
const InputText = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  width: 2rem;
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
`

const FlatBox = styled.div`
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  background: hsl(240 5% 96%);
  height: 40px;
  line-height: 40px;
  border-radius: 0.5rem;
`

const MemoList = styled.ul`
  margin-top: 1.5rem;
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

export default function StudentsWrite() {
  const router = useRouter()
  const { userLogs } = useUserLogsMutation()
  const {
    loading: managerLoading,
    error: managerError,
    data: managerData,
  } = useQuery(SEE_MANAGEUSER_QUERY)
  const Receipt = useRecoilValue(ReceiptState)
  const managerList = managerData?.seeManageUser || []
  const { register, control, setValue, handleSubmit, formState } = useForm()
  const { errors } = formState
  const {
    isOpen: sbjIsOpen,
    onOpen: sbjOpen,
    onClose: sbjClose,
  } = useDisclosure()
  const [subjectSelected, setSubjectSelected] = useState(null)
  const [subjectSubDiv, setSubjectSubDiv] = useState('')
  const [birthdayDate, setBirthdayDate] = useState(null)
  const [sub, setSub] = useState('없음')
  const [manager, setManager] = useState('담당자 지정필요')

  useEffect(() => {}, [router])
  useEffect(() => {
    setValue('testSubDiv', subjectSelected?.subDiv)
  }, [subjectSelected])

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

  const fametDate = data => {
    const timestamp = parseInt(data, 10)
    const date = new Date(timestamp)
    const formatted =
      `${date.getFullYear()}-` +
      `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
      `${date.getDate().toString().padStart(2, '0')} ` +
      `${date.getHours().toString().padStart(2, '0')}:` +
      `${date.getMinutes().toString().padStart(2, '0')}:` +
      `${date.getSeconds().toString().padStart(2, '0')}`
    return formatted
  }

  const handleSubChange = e => {
    setSub(e.target.value)
  }
  const handleManagerChange = e => {
    setManager(e.target.value)
  }

  return (
    <>
      <MainWrap>
        <ConArea>
          <Breadcrumb rightArea={false} />
          <DetailDiv>
            <TopInfo>
              <Noti>
                <span>*</span> 는 필수입력입니다.
              </Noti>
            </TopInfo>
            <DetailBox>
              <AreaTitle>
                <h4>기본정보</h4>
                <Button
                  size="sm"
                  radius="sm"
                  variant="solid"
                  color="primary"
                  className="text-white"
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
                    <LineBox>홍길동</LineBox>
                  </div>
                </AreaBox>
                <AreaBox>
                  <div>
                    <FilterLabel>
                      연락처<span>*</span>
                    </FilterLabel>
                    <LineBox>01022224444</LineBox>
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
                      defaultValue="동의"
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
                    <LineBox>1993.05.10</LineBox>
                  </div>
                </AreaBox>
                <AreaBox>
                  <div>
                    <FilterLabel>
                      선별테스트점수<span>*</span>
                    </FilterLabel>
                    <LineBox>
                      <span>87</span>/100
                    </LineBox>
                  </div>
                </AreaBox>
                <AreaBox>
                  <div>
                    <FilterLabel>담당자</FilterLabel>
                    <LineBox>김사원</LineBox>
                  </div>
                </AreaBox>
              </FlexBox>
            </DetailBox>
            <DetailBox>
              <AreaTitle>
                <h4>수강료 정보</h4>
                <Button
                  size="sm"
                  radius="sm"
                  variant="solid"
                  color="primary"
                  className="text-white"
                >
                  수정
                </Button>
              </AreaTitle>
              <FlexBox>
                <AreaSmallBox style={{ minWidth: '20%' }}>
                  <div>
                    <FilterLabel>과정코드</FilterLabel>
                    <LineBox>G12345678910549</LineBox>
                  </div>
                </AreaSmallBox>
                <AreaBox>
                  <div>
                    <FilterLabel>과정명</FilterLabel>
                    <LineBox>
                      멀티미디어 영상콘텐츠제작(프리미어,에펙,영상편집) A
                    </LineBox>
                  </div>
                </AreaBox>
                <AreaSmallBox style={{ minWidth: '20%' }}>
                  <div>
                    <FilterLabel>수강예정일</FilterLabel>
                    <LineBox>2024.11.11</LineBox>
                  </div>
                </AreaSmallBox>
              </FlexBox>

              <BtnBox>
                <Button
                  size="md"
                  radius="md"
                  variant="bordered"
                  color="primary"
                  className="w-full"
                >
                  강의배정
                </Button>
                <Button
                  size="md"
                  radius="md"
                  variant="solid"
                  color="primary"
                  className="w-full text-white"
                >
                  이수처리
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
                    <LineBox>3,510,000</LineBox>
                  </div>
                </AreaBox>
                <AreaBox>
                  <div>
                    <FilterLabel>수강당담자</FilterLabel>
                    <LineBox>박대리</LineBox>
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
                      defaultValue="비동의"
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
                    <LineBox>0원</LineBox>
                  </div>
                </AreaBox>
                <AreaBox>
                  <div>
                    <FilterLabel>실 수강료</FilterLabel>
                    <LineBox>3,510,000원</LineBox>
                  </div>
                </AreaBox>
                <AreaBox>
                  <div>
                    <FilterLabel>미 수납액</FilterLabel>
                    <LineBox>2,500,000원</LineBox>
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
            </DetailBox>
            <DetailBox>
              <AreaTitle>
                <h4>결제 정보</h4>
                <Button
                  size="sm"
                  radius="sm"
                  variant="solid"
                  className="text-white bg-flag1"
                >
                  추가
                </Button>
              </AreaTitle>
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
                      <FlatBox>510,000원</FlatBox>
                    </div>
                  </AreaBox>
                  <AreaBox>
                    <div>
                      <FilterLabel>카드</FilterLabel>
                      <FlatBox>0원</FlatBox>
                    </div>
                  </AreaBox>
                  <AreaBox>
                    <div>
                      <FilterLabel>현금</FilterLabel>
                      <FlatBox>510,000원</FlatBox>
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
            </DetailBox>
            <DetailBox>
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
            </DetailBox>
          </DetailDiv>
        </ConArea>
      </MainWrap>
    </>
  )
}
StudentsWrite.getLayout = page => <Layout>{page}</Layout>
