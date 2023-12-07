import MainWrap from '@/components/wrappers/MainWrap'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
  Input,
  Modal,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import { progressStatusState } from '@/lib/recoilAtoms'
import { useRecoilValue } from 'recoil'
import { useMutation, useQuery } from '@apollo/client'
import { SEARCH_STUDENTSTATE_MUTATION } from '@/graphql/mutations'
import { Controller, useForm } from 'react-hook-form'
import Button from '@/components/common/Button'
import { SEE_MANAGEUSER_QUERY, SEE_SUBJECT_QUERY } from '@/graphql/queries'
import ClickModal from '@/components/common/ClickModal'

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
  0: '없음',
  1: '온라인',
  2: '전화',
  3: '방문',
}

const subData = {
  0: '없음',
  1: 'HRD',
  2: '일반',
}

export default function Consoultation() {
  const router = useRouter()
  const studentId = router.query.id
  const [parseStudent, setparseStudent] = useState<studentData>()
  const [filterActive, setFilterActive] = useState(false)
  const {
    loading: managerLoading,
    error: managerError,
    data: managerData,
  } = useQuery(SEE_MANAGEUSER_QUERY)
  const {
    loading: subjectLoading,
    error: subjectError,
    data: subjectData,
  } = useQuery(SEE_SUBJECT_QUERY)
  const progressStatus = useRecoilValue(progressStatusState)
  const managerList = managerData?.seeManageUser || []
  const subjectList = subjectData?.seeSubject || []
  const [stVisitDate, setStVisitDate] = useState(new Date())
  const [expEnrollDate, setExpEnrollDate] = useState(new Date())
  const [receipt, setReceipt] = useState('없음')
  const [sub, setSub] = useState('없음')
  const [manager, setManager] = useState('담당자 지정필요')
  const [subjectSelected, setSubjectSelected] = useState([])
  const defaultValues = parseStudent
  const { isOpen, onOpen } = useDisclosure()
  const { register, control, setValue, handleSubmit, formState } = useForm({
    defaultValues: {
      updateStudentStateId: parseStudent?.id,
      campus: parseStudent?.campus,
      category: parseStudent?.category,
      stName: parseStudent?.stName,
      phoneNum1: parseStudent?.phoneNum1,
      phoneNum2: parseStudent?.phoneNum2,
      phoneNum3: parseStudent?.phoneNum3,
      subject: parseStudent?.subject,
      detail: parseStudent?.detail,
      progress: parseStudent?.progress,
      stEmail: parseStudent?.stEmail,
      stAddr: parseStudent?.stAddr,
      subDiv: parseStudent?.subDiv,
      stVisit: parseStudent?.stVisit,
      expEnrollDate: parseStudent?.expEnrollDate,
      perchase: parseStudent?.perchase,
      pic: parseStudent?.pic,
      receiptDiv: parseStudent?.receiptDiv,
    },
  })

  useEffect(() => {
    const localStorageData = localStorage.getItem('selectStudentState')
    const parseData = JSON.parse(localStorageData)
    setparseStudent(parseData)
  }, [studentId])

  useEffect(() => {
    if (parseStudent && receipt === '없음') {
      if (parseStudent.receiptDiv !== '') {
        setReceipt(parseStudent.receiptDiv)
      } else {
        setReceipt('없음')
      }
    }
    if (parseStudent && sub === '없음') {
      if (parseStudent.subDiv !== null) {
        setSub(parseStudent.subDiv)
      } else {
        setSub('없음')
      }
    }
    if (parseStudent && manager === '담당자 지정필요') {
      if (parseStudent.pic !== null) {
        setManager(parseStudent.pic)
      } else {
        setManager('담당자 지정필요')
      }
    }
  }, [parseStudent, receipt, sub, stVisitDate])
  console.log(parseStudent)
  const onSubmit = data => {
    const { isDirty, dirtyFields } = formState
    const upDateStudent = {
      updateStudentStateId: data.id,
      campus: data.stName,
      category: data.category,
      stName: data.stName,
      phoneNum1: data.phoneNum1,
      phoneNum2: data.phoneNum2,
      phoneNum3: data.phoneNum3,
      subject: data.subject,
      detail: data.detail,
      progress: data.progress,
      stEmail: data.stEmail,
      stAddr: data.stAddr,
      subDiv: data.subDiv,
      stVisit: data.stVisit,
      expEnrollDate: data.expEnrollDate,
      perchase: data.perchase,
      pic: data.pic,
      receiptDiv: data.receiptDiv,
    }
    if (isDirty) {
      console.log('수정된 필드:', dirtyFields)
      console.log(upDateStudent)
    }
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
  const handleReceiptChange = e => {
    setReceipt(e.target.value)
  }
  const handleSubChange = e => {
    setSub(e.target.value)
  }
  const handleManagerChange = e => {
    setManager(e.target.value)
  }
  return (
    <>
      {parseStudent !== undefined && (
        <MainWrap>
          <Breadcrumb
            onFilterToggle={setFilterActive}
            isActive={filterActive}
            onBtn={false}
          />
          <DetailBox>
            <TopInfo>
              <span>최근 업데이트 일시 :</span>
              {fametDate(parseStudent?.updatedAt)}
            </TopInfo>
            <DetailForm onSubmit={handleSubmit(onSubmit)}>
              <FlexBox>
                <Input
                  labelPlacement="outside"
                  placeholder="이름"
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="이름"
                  defaultValue={parseStudent?.stName || null}
                  onChange={e => {
                    register('stName').onChange(e)
                  }}
                  className="w-full"
                  {...register('stName')}
                />
                <Input
                  labelPlacement="outside"
                  placeholder="이메일"
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="이메일"
                  defaultValue={parseStudent?.stEmail || null}
                  onChange={e => {
                    register('stEmail').onChange(e)
                  }}
                  className="w-full"
                  {...register('stEmail')}
                />
              </FlexBox>
              <FlexBox>
                <Input
                  labelPlacement="outside"
                  placeholder="전화번호1"
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="전화번호1"
                  defaultValue={parseStudent?.phoneNum1 || null}
                  onChange={e => {
                    register('phoneNum1').onChange(e)
                  }}
                  className="w-full"
                  {...register('phoneNum1')}
                />
                <Input
                  labelPlacement="outside"
                  placeholder=" "
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="전화번호2"
                  defaultValue={parseStudent?.phoneNum2 || null}
                  onChange={e => {
                    register('phoneNum2').onChange(e)
                  }}
                  className="w-full"
                  {...register('phoneNum2')}
                />
                <Input
                  labelPlacement="outside"
                  placeholder=" "
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="전화번호3"
                  defaultValue={parseStudent?.phoneNum3 || null}
                  onChange={e => {
                    register('phoneNum3').onChange(e)
                  }}
                  className="w-full"
                  {...register('phoneNum3')}
                />
              </FlexBox>
              <Controller
                control={control}
                name="subject"
                defaultValue={parseStudent?.subject}
                render={({ field }) => (
                  <ClickModal
                    label="상담과목"
                    list={subjectList}
                    defaultValue={parseStudent?.subject}
                    subjectSelected={subjectSelected}
                    setSubjectSelected={setSubjectSelected}
                    inputRef={field.ref}
                    onChange={value => {
                      setValue('subject', value) // 필드의 값 업데이트
                      setSubjectSelected(value) // subjectSelected 값 업데이트
                    }}
                  />
                )}
              />
              <FlexBox>
                <Controller
                  control={control}
                  name="receiptDiv"
                  defaultValue={parseStudent?.receiptDiv}
                  render={({ field, fieldState }) => (
                    <Select
                      labelPlacement="outside"
                      label={<FilterLabel>접수구분</FilterLabel>}
                      placeholder=" "
                      className="w-full"
                      defaultValue=""
                      variant="bordered"
                      selectedKeys={[receipt]}
                      onChange={value => {
                        field.onChange(value)
                        handleReceiptChange(value)
                      }}
                      {...register('receiptDiv')}
                    >
                      {Object.entries(receiptData).map(([key, item]) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
                <Controller
                  control={control}
                  name="subDiv"
                  defaultValue={parseStudent?.subDiv}
                  render={({ field, fieldState }) => (
                    <Select
                      labelPlacement="outside"
                      label={<FilterLabel>수강구분</FilterLabel>}
                      placeholder=" "
                      className="w-full"
                      defaultValue=""
                      variant="bordered"
                      selectedKeys={[sub]}
                      onChange={value => {
                        field.onChange(value)
                        handleSubChange(value)
                      }}
                      {...register('subDiv')}
                    >
                      {Object.entries(subData).map(([key, item]) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </FlexBox>
              <FlexBox>
                <Controller
                  control={control}
                  name="pic"
                  defaultValue={parseStudent?.pic}
                  render={({ field, fieldState }) => (
                    <Select
                      labelPlacement="outside"
                      label="담당자"
                      placeholder=" "
                      className="w-full"
                      defaultValue=""
                      variant="bordered"
                      selectedKeys={[manager]}
                      onChange={value => {
                        field.onChange(value)
                        handleManagerChange(value)
                      }}
                      {...register('pic')}
                    >
                      <SelectItem
                        key={'담당자 지정필요'}
                        value={'담당자 지정필요'}
                      >
                        {'담당자 지정필요'}
                      </SelectItem>
                      {managerList?.map(item => (
                        <SelectItem key={item.mUsername} value={item.mUsername}>
                          {item.mUsername}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
                <Input
                  isReadOnly
                  labelPlacement="outside"
                  placeholder="등록일시"
                  variant="faded"
                  radius="md"
                  type="text"
                  label="등록일시"
                  value={fametDate(parseStudent?.createdAt) || ''}
                  startContent={<i className="xi-calendar" />}
                  className="w-full"
                />
              </FlexBox>
              <RadioBox>
                <Controller
                  control={control}
                  name="progress"
                  defaultValue={parseStudent?.progress}
                  render={({ field, fieldState }) => (
                    <RadioGroup
                      label={<FilterLabel>진행상태</FilterLabel>}
                      orientation="horizontal"
                      className="gap-1"
                      defaultValue={String(parseStudent?.progress)}
                      onValueChange={value => {
                        field.onChange(parseInt(value))
                      }}
                      {...register('progress')}
                    >
                      {Object.entries(progressStatus).map(([key, value]) => (
                        <Radio key={key} value={key}>
                          {value.name}
                        </Radio>
                      ))}
                    </RadioGroup>
                  )}
                />
              </RadioBox>
              <FlexBox>
                <DatePickerBox>
                  <Controller
                    control={control}
                    name="stVisit"
                    // locale="ko"
                    defaultValue={parseStudent?.stVisit}
                    render={({ field, fieldState }) => (
                      <DatePicker
                        selected={stVisitDate}
                        placeholderText="기간을 선택해주세요."
                        isClearable
                        onChange={date => {
                          field.onChange(date)
                          setStVisitDate(date)
                        }}
                        ref={field.ref}
                        dateFormat="yyyy/MM/dd HH:mm"
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
                    )}
                  />
                </DatePickerBox>
                <DatePickerBox>
                  <Controller
                    control={control}
                    name="expEnrollDate"
                    defaultValue={parseStudent?.expEnrollDate}
                    render={({ field, fieldState }) => (
                      <DatePicker
                        selected={expEnrollDate}
                        placeholderText="기간을 선택해주세요."
                        isClearable
                        onChange={date => {
                          field.onChange(date)
                          setExpEnrollDate(date)
                        }}
                        ref={field.ref}
                        dateFormat="yyyy/MM/dd HH:mm"
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
                    )}
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
                  defaultValue={parseStudent?.detail || ''}
                  onChange={e => {
                    register('detail').onChange(e)
                  }}
                  {...register('detail')}
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
                    <Button typeBorder={true} width="100%" height="2.5rem">
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
