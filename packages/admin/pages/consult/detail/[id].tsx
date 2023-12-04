import MainWrap from '@/components/wrappers/MainWrap'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react'
import { progressStatusState } from '@/lib/recoilAtoms'
import { useRecoilValue } from 'recoil'
import { useMutation } from '@apollo/client'
import { SEARCH_STUDENTSTATE_MUTATION } from '@/graphql/mutations'
import { Controller, useForm } from 'react-hook-form'
import Button from '@/components/common/Button'

const DetailBox = styled.div`
  margin-top: 2rem;
  background: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
`
const TopInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
  font-size: 0.8rem;
  span {
    color: #555;
  }
`

const DetailForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`
const FlexBox = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

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
  padding-bottom: 0.1rem;
  display: block;
`
const BtnBox = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`
const MemoBox = styled.div`
  width: 100%;
  display: flex;
  flex: 1 3;
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
const MemoBtn = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1.75rem;
  width: 5rem;

  @media (max-width: 768px) {
    padding-top: 0;
    width: 100%;
  }
`

const MemoListBtn = styled.p`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;

  button {
    width: 5rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;

    button {
      width: 50%;
    }
  }
`

const MemoInfo = styled.label`
  display: flex;
  gap: 1rem;
`
const MemoName = styled.span`
  color: #11181c;
  font-weight: 600;
`
const MemoTime = styled.span``

type studentData = {
  id: number
  campus: string
  category: string
  stName: string
  phoneNum1: string
  phoneNum2: string
  phoneNum3: string
  currentManager: string
  subject: [string]
  detail: string
  agreement: string
  progress: number
  stEmail: string
  stAddr: string
  subDiv: string
  stVisit: string
  expEnrollDate: string
  perchase: boolean
  createdAt: string
  updatedAt: string
  receiptDiv: string
  pic: string
}

const receiptData = {
  0: '온라인',
  1: '전화',
  2: '방문',
}

const subData = {
  0: 'HRD',
  1: '일반',
}

export default function Consoultation() {
  const router = useRouter()
  const { id } = router.query
  let detailId
  if (typeof id === 'string') {
    detailId = parseInt(id, 10)
  } else if (Array.isArray(id) && id.length > 0 && typeof id[0] === 'string') {
    detailId = parseInt(id[0], 10)
  } else {
    detailId = 0
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [searchStudentState] = useMutation(SEARCH_STUDENTSTATE_MUTATION)
  const [studentData, setStudentData] = useState<studentData | undefined>(
    {} as studentData,
  )
  const [stVisitDate, setStVisitDate] = useState(new Date())
  const [expEnrollDate, setExpEnrollDate] = useState(new Date())
  const [receipt, setReceipt] = useState('')
  const [sub, setSub] = useState('')
  const progressStatus = useRecoilValue(progressStatusState)
  const [filterActive, setFilterActive] = useState(false)

  const fetchData = async () => {
    try {
      const { data } = await searchStudentState({
        variables: {
          searchStudentStateId: detailId,
        },
      })

      const studentStateData = data.searchStudentState.studentState[0]
      setStudentData(studentStateData)
    } catch (error) {
      console.error('데이터 검색 실패:', error)
    }
  }
  useEffect(() => {
    if (detailId !== undefined) {
      fetchData()
    }
  }, [detailId])

  const onSubmit = data => {
    console.log(data)
  }
  const handleReceiptChange = (value: string) => {
    setReceipt(value)
  }

  const handleSubChange = (value: string) => {
    setSub(value)
  }

  return (
    <>
      {studentData !== undefined && (
        <MainWrap>
          <Breadcrumb
            onFilterToggle={setFilterActive}
            isActive={filterActive}
            onBtn={false}
          />
          <DetailBox>
            <TopInfo>
              <span>최근 업데이트 일시 :</span>
              {studentData?.updatedAt}
            </TopInfo>
            <DetailForm onSubmit={handleSubmit(onSubmit)}>
              <FlexBox>
                <Input
                  isReadOnly
                  labelPlacement="outside"
                  placeholder="이름"
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="이름"
                  // value={studentData?.stName}
                  className="w-full"
                />
                <Input
                  isReadOnly
                  labelPlacement="outside"
                  placeholder="이메일"
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="이메일"
                  // value={studentData?.stEmail}
                  className="w-full"
                />
              </FlexBox>
              <FlexBox>
                <Input
                  isReadOnly
                  labelPlacement="outside"
                  placeholder="전화번호1"
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="전화번호1"
                  // value={studentData?.phoneNum1}
                  className="w-full"
                />
                <Input
                  isReadOnly
                  labelPlacement="outside"
                  placeholder=" "
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="전화번호2"
                  // value={studentData?.phoneNum2}
                  className="w-full"
                />
                <Input
                  isReadOnly
                  labelPlacement="outside"
                  placeholder=" "
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="전화번호3"
                  // value={studentData?.phoneNum3}
                  className="w-full"
                />
              </FlexBox>
              <Input
                isReadOnly
                labelPlacement="outside"
                placeholder="상담과목"
                variant="bordered"
                radius="md"
                type="text"
                label="상담과목"
                // value={studentData?.subject}
                className="w-full"
              />
              <FlexBox>
                <RadioBox>
                  <RadioGroup
                    label={<FilterLabel>진행상태</FilterLabel>}
                    orientation="horizontal"
                    className="gap-1 radioBox"
                  >
                    {Object.entries(receiptData).map(([key, item]) => (
                      <Radio key={key} value={item}>
                        {item}
                      </Radio>
                    ))}
                  </RadioGroup>
                </RadioBox>
                <RadioBox>
                  <RadioGroup
                    label={<FilterLabel>수강구분</FilterLabel>}
                    orientation="horizontal"
                    className="gap-1 radioBox"
                  >
                    {Object.entries(subData).map(([key, item]) => (
                      <Radio key={key} value={item}>
                        {item}
                      </Radio>
                    ))}
                  </RadioGroup>
                </RadioBox>
                {/* <Select
                  defaultSelectedKeys={[studentData?.pic]}
                  labelPlacement="outside"
                  label="담당자"
                  placeholder=" "
                  className="w-full"
                  defaultValue=""
                >
                  <SelectItem key={'김사원'} value={'김사원'}>
                    김사원
                  </SelectItem>
                  <SelectItem key={'이주임'} value={'이주임'}>
                    이주임
                  </SelectItem>
                  <SelectItem key={'박대리'} value={'박대리'}>
                    박대리
                  </SelectItem>
                </Select> */}
              </FlexBox>
              <FlexBox>
                <Input
                  labelPlacement="outside"
                  placeholder="담당자"
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="담당자"
                  value="담당자"
                  className="w-full"
                />
                <Input
                  isReadOnly
                  labelPlacement="outside"
                  placeholder="등록일시"
                  variant="faded"
                  radius="md"
                  type="text"
                  label="등록일시"
                  // value={studentData?.createdAt}
                  startContent={<i className="xi-calendar" />}
                  className="w-full"
                />
              </FlexBox>
              <RadioBox>
                <RadioGroup
                  label={<FilterLabel>진행상태</FilterLabel>}
                  orientation="horizontal"
                  className="gap-1"
                >
                  {Object.entries(progressStatus).map(([key, value]) => (
                    <Radio key={key} value={value.name}>
                      {value.name}
                    </Radio>
                  ))}
                </RadioGroup>
              </RadioBox>
              <FlexBox>
                <DatePickerBox>
                  <DatePicker
                    selected={stVisitDate}
                    onChange={date => setStVisitDate(date)}
                    placeholderText="기간을 선택해주세요."
                    isClearable
                    customInput={
                      <Input
                        label="상담예정일"
                        labelPlacement="outside"
                        type="text"
                        variant="bordered"
                        id="date"
                        startContent={<i className="xi-calendar" />}
                      />
                    }
                  />
                </DatePickerBox>
                <DatePickerBox>
                  <DatePicker
                    selected={expEnrollDate}
                    onChange={date => setExpEnrollDate(date)}
                    placeholderText="기간을 선택해주세요."
                    isClearable
                    customInput={
                      <Input
                        label="수강예정일"
                        labelPlacement="outside"
                        type="text"
                        variant="bordered"
                        id="date"
                        startContent={<i className="xi-calendar" />}
                      />
                    }
                  />
                </DatePickerBox>
              </FlexBox>
              <FlexBox>
                <Textarea
                  label="상담 내용"
                  labelPlacement="outside"
                  className="max-w-full"
                  variant="bordered"
                  minRows={5}
                  // value={studentData?.detail}
                />
              </FlexBox>
              <BtnBox>
                <Button buttonType="submit" width="100%" height="2.5rem">
                  수정
                </Button>
                <Button
                  buttonType="reset"
                  width="100%"
                  height="2.5rem"
                  typeBorder={true}
                >
                  목록으로
                </Button>
              </BtnBox>
            </DetailForm>
          </DetailBox>
          <DetailBox>
            <DetailForm>
              <MemoBox>
                <Textarea
                  label="메모작성"
                  labelPlacement="outside"
                  className="max-w-full"
                  variant="bordered"
                  minRows={5}
                />
                <MemoBtn>
                  <Button buttonType="submit" width="100%" height="2.5rem">
                    등록
                  </Button>
                </MemoBtn>
              </MemoBox>
              <MemoList>
                <MemoItem>
                  <Textarea
                    label={
                      <MemoInfo>
                        <MemoName>메모등록자</MemoName>
                        <MemoTime>2023.03.11 15:12:11</MemoTime>
                      </MemoInfo>
                    }
                    isReadOnly
                    variant="faded"
                    className="max-w-full"
                  />
                  <MemoListBtn>
                    <Button buttonType="submit" width="100%" height="2.5rem">
                      수정
                    </Button>
                    <Button
                      buttonType="submit"
                      typeBorder={true}
                      width="100%"
                      height="2.5rem"
                    >
                      삭제
                    </Button>
                  </MemoListBtn>
                </MemoItem>
                <MemoItem>
                  <Textarea
                    label={
                      <MemoInfo>
                        <MemoName>메모등록자</MemoName>
                        <MemoTime>2023.03.11 15:12:11</MemoTime>
                      </MemoInfo>
                    }
                    isReadOnly
                    variant="faded"
                    className="max-w-full"
                  />
                </MemoItem>
              </MemoList>
            </DetailForm>
          </DetailBox>
        </MainWrap>
      )}
    </>
  )
}
