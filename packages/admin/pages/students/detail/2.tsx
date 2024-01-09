import MainWrap from '@/components/wrappers/MainWrap'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import { Radio, RadioGroup, Button, useDisclosure } from '@nextui-org/react'
import { useQuery } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'
import useUserLogsMutation from '@/utils/userLogs'
import Layout from '@/pages/students/layout'
import { useRecoilValue } from 'recoil'
import { ReceiptState } from '@/lib/recoilAtoms'
import CreateMemo from '@/components/form/CreateMemo'
import ConsolutMemo from '@/components/form/ConsolutMemo'

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
          <DetailBox>
            <TopInfo>
              <Noti>
                <span>*</span> 는 필수입력입니다.
              </Noti>
              <UpdateTime>
                <span>최근 업데이트 일시 :</span>
                {fametDate('2023.01.04')}
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
                      router.push('/students/edit/basicInfo/0')
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
                <AreaBox>
                  <div>
                    <FilterLabel>등록일시</FilterLabel>
                    <LineBox>2024.05.11</LineBox>
                  </div>
                </AreaBox>
              </FlexBox>
              <BtnBox>
                <Button
                  size="md"
                  radius="md"
                  variant="solid"
                  color="primary"
                  className="w-full text-white"
                  onClick={() => {
                    router.push('/students/write/course')
                  }}
                >
                  수강신청
                </Button>
                <Button
                  size="md"
                  radius="md"
                  variant="solid"
                  className="w-full text-white bg-flag1"
                >
                  삭제
                </Button>
              </BtnBox>
            </DetailDiv>
          </DetailBox>
        </ConArea>
      </MainWrap>
    </>
  )
}
StudentsWrite.getLayout = page => <Layout>{page}</Layout>
