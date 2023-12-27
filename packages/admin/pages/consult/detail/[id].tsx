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
import {
  progressStatusState,
  subStatusState,
  receiptStatusState,
} from '@/lib/recoilAtoms'
import { useRecoilValue } from 'recoil'
import { useMutation, useQuery } from '@apollo/client'
import {
  DELETE_STUDENT_STATE_MUTATION,
  SEARCH_STUDENTSTATE_MUTATION,
  SEARCH_SUBJECT_MUTATION,
  UPDATE_STUDENT_STATE_MUTATION,
} from '@/graphql/mutations'
import { Controller, useForm } from 'react-hook-form'
import { SEE_MANAGEUSER_QUERY, SEE_STUDENT_QUERY } from '@/graphql/queries'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'
import SubjectItem from '@/components/table/SubjectItem'
import ConsolutMemo from '@/components/form/ConsolutMemo'
import CreateMemo from '@/components/form/CreateMemo'
import useMmeQuery from '@/utils/mMe'

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
const AreaBox = styled.div`
  flex: 1;
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
const BtnArea = styled.div`
  display: flex;
  justify-content: start;
`
const Theader = styled.div`
  width: 100%;
  min-width: fit-content;
  display: table-row;
  flex-wrap: nowrap;
  color: #111;
  font-size: 0.875rem;
  font-weight: 700;
  border-bottom: 1px solid #e4e4e7;
  text-align: center;
`
const TableItem = styled.div`
  display: table;
  position: relative;
  width: 100%;
  min-width: fit-content;
  flex-wrap: nowrap;
  border-bottom: 1px solid #e4e4e7;
  color: #71717a;
  font-size: 0.875rem;
  background: #fff;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.8);
  }
`
const TableRow = styled.div`
  display: table-row;
  width: 100%;
  min-width: fit-content;
  text-align: center;
`
const Tcheck = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
`
const Tname = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 60%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 360px;
`
const TsubDiv = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 17%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 102px;
`
const Tfee = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 23%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 132px;
`
const PagerWrap = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: center;
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
const Nolist = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  color: #71717a;
`

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
  consultationMemo: {
    id: number
    content: string
    createdAt: string
    updatedAt: string
    manageUsers: {}
  }
}

export default function ConsultDetail() {
  const router = useRouter()
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const studentId = typeof router.query.id === 'string' ? router.query.id : null
  const [currentSubjectPage, setCurrentSubjectPage] = useState(1)
  const [currentSubjectLimit, setCurrentSubjectLimit] = useState(5)
  const {
    loading: managerLoading,
    error: managerError,
    data: managerData,
  } = useQuery(SEE_MANAGEUSER_QUERY)
  const [searchSubjectMutation] = useMutation(SEARCH_SUBJECT_MUTATION)
  const [updateStudent] = useMutation(UPDATE_STUDENT_STATE_MUTATION)
  const [deleteStudent] = useMutation(DELETE_STUDENT_STATE_MUTATION)
  const [searchStudentStateMutation, { data, loading, error }] = useMutation(
    SEARCH_STUDENTSTATE_MUTATION,
    {
      variables: {
        searchStudentStateId: parseInt(studentId),
      },
    },
  )
  const { userLogs } = useUserLogsMutation()
  const progressStatus = useRecoilValue(progressStatusState)
  const receiptStatus = useRecoilValue(receiptStatusState)
  const subStatus = useRecoilValue(subStatusState)
  const managerList = managerData?.seeManageUser || []
  const studentState = data?.searchStudentState.studentState[0] || []
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { register, control, setValue, handleSubmit, formState } = useForm({
    defaultValues: {
      updateStudentStateId: studentState?.id,
      campus: studentState?.campus,
      category: studentState?.category,
      stName: studentState?.stName,
      phoneNum1: studentState?.phoneNum1,
      phoneNum2: studentState?.phoneNum2,
      phoneNum3: studentState?.phoneNum3,
      subject: studentState?.subject,
      detail: studentState?.detail,
      progress: studentState?.progress,
      stEmail: studentState?.stEmail,
      stAddr: studentState?.stAddr,
      subDiv: studentState?.subDiv,
      stVisit: studentState?.stVisit,
      expEnrollDate: studentState?.expEnrollDate,
      perchase: studentState?.perchase,
      pic: studentState?.pic,
      receiptDiv: studentState?.receiptDiv,
    },
  })
  const { isDirty, dirtyFields, errors } = formState
  const [subjectList, setSubjectList] = useState(null)
  const [subjectSelected, setSubjectSelected] = useState()
  const [stVisitDate, setStVisitDate] = useState(null)
  const [expEnrollDate, setExpEnrollDate] = useState(null)
  const [receipt, setReceipt] = useState('없음')
  const [sub, setSub] = useState('없음')
  const [manager, setManager] = useState('담당자 지정필요')
  const [memoList, setMemoList] = useState([])
  useEffect(() => {
    searchStudentStateMutation({
      variables: {
        searchStudentStateId: parseInt(studentId),
      },
      onCompleted: data => {
        setMemoList(data.searchStudentState.studentState[0].consultationMemo)
      },
    })
  }, [router])

  useEffect(() => {
    searchSubjectMutation({
      variables: {
        exposure: true,
        page: currentSubjectPage,
        limit: currentSubjectLimit,
      },
      onCompleted: resData => {
        const { result, totalCount } = resData.searchSubject || {}
        setSubjectList({ result, totalCount })
      },
    })
  }, [router, currentSubjectPage])

  useEffect(() => {
    if (
      studentState.receiptDiv === '' ||
      studentState.receiptDiv === undefined
    ) {
      setReceipt('없음')
    } else {
      setReceipt(studentState.receiptDiv)
    }
    if (studentState.subDiv === null || studentState.subDiv === undefined) {
      setSub('없음')
    } else {
      setSub(studentState.subDiv)
    }
    if (studentState.pic === undefined || studentState.pic === null) {
      setManager('담당자 지정필요')
    } else {
      setManager(studentState.pic)
    }
    if (studentState.stVisit === null || studentState.stVisit === undefined) {
      setStVisitDate(null)
    } else {
      const date = parseInt(studentState.stVisit)
      setStVisitDate(date)
    }
    if (
      studentState.expEnrollDate === null ||
      studentState.expEnrollDate === undefined
    ) {
      setExpEnrollDate(null)
    } else {
      const date = parseInt(studentState.expEnrollDate)
      setExpEnrollDate(date)
    }
  }, [studentState])

  const onSubmit = data => {
    if (isDirty) {
      const isModify = confirm('변경사항이 있습니다. 수정하시겠습니까?')
      if (isModify) {
        updateStudent({
          variables: {
            updateStudentStateId: studentState.id,
            campus: studentState.campus,
            stName: data.stName.trim(),
            category: studentState.category,
            phoneNum1: data.phoneNum1.trim(),
            phoneNum2: data.phoneNum2.trim(),
            phoneNum3: data.phoneNum3.trim(),
            subject: data.subject,
            detail: data.detail.trim(),
            progress: data.progress,
            stEmail: data.stEmail.trim(),
            stAddr: studentState.stAddr,
            subDiv: data.subDiv,
            stVisit:
              data.stVisit === null
                ? null
                : typeof data.stVisit === 'string'
                ? new Date(parseInt(data.stVisit))
                : new Date(data.stVisit),
            expEnrollDate:
              data.expEnrollDate === null
                ? null
                : typeof data.expEnrollDate === 'string'
                ? new Date(parseInt(data.expEnrollDate))
                : new Date(data.expEnrollDate),
            pic: data.pic,
            receiptDiv: data.receiptDiv,
          },
          onCompleted: data => {
            alert('수정되었습니다.')
          },
        })
        const dirtyFieldsArray = [...Object.keys(dirtyFields)]
        userLogs(
          `${studentState.stName}의 상담 수정`,
          dirtyFieldsArray.join(', '),
        )
      }
    }
  }

  const onDelete = data => {
    const isDelete = confirm('상담카드를 삭제시겠습니까?')
    if (isDelete) {
      deleteStudent({
        variables: {
          deleteStudentStateId: data,
        },
        refetchQueries: [
          {
            query: SEE_STUDENT_QUERY,
            variables: { page: 1, limit: 10 },
          },
        ],
        onCompleted: () => {
          alert('상담카드가 삭제되었습니다.')
          router.push('/consult')
          userLogs(`ID : ${studentState.name} 상담카드 삭제`)
        },
      })
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

  const handleCheckboxChange = values => {
    setSubjectSelected(values)
  }
  const clickSubmit = () => {
    setValue('subject', subjectSelected)
    onClose()
  }

  if (loading) return 'Submitting...'
  if (error) return `Submission error! ${error.message}`

  return (
    <>
      {data !== undefined && (
        <MainWrap>
          <ConArea>
            <Breadcrumb rightArea={false} />
            <DetailBox>
              <TopInfo>
                <span>최근 업데이트 일시 :</span>
                {fametDate(studentState?.updatedAt)}
              </TopInfo>
              <DetailForm onSubmit={handleSubmit(onSubmit)}>
                <FlexBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="이름"
                      variant="bordered"
                      radius="md"
                      type="text"
                      label="이름"
                      defaultValue={studentState?.stName}
                      onChange={e => {
                        register('stName').onChange(e)
                      }}
                      className="w-full"
                      {...register('stName', {
                        required: {
                          value: true,
                          message: '이름을 입력해주세요.',
                        },
                      })}
                    />
                    {errors.stName && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.stName.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="이메일"
                      variant="bordered"
                      radius="md"
                      type="text"
                      label="이메일"
                      defaultValue={studentState?.stEmail || null}
                      onChange={e => {
                        register('stEmail').onChange(e)
                      }}
                      className="w-full"
                      {...register('stEmail')}
                    />
                  </AreaBox>
                </FlexBox>
                <FlexBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="'-'없이 작성해주세요"
                      variant="bordered"
                      radius="md"
                      type="text"
                      label="휴대폰번호"
                      maxLength={11}
                      defaultValue={studentState?.phoneNum1 || null}
                      onChange={e => {
                        register('phoneNum1').onChange(e)
                      }}
                      className="w-full"
                      {...register('phoneNum1', {
                        required: {
                          value: true,
                          message: '휴대폰번호를 입력해주세요.',
                        },
                        maxLength: {
                          value: 11,
                          message: '최대 11자리까지 입력 가능합니다.',
                        },
                        minLength: {
                          value: 10,
                          message: '최소 10자리 이상이어야 합니다.',
                        },
                        pattern: {
                          value: /^010[0-9]{7,8}$/,
                          message: '010으로 시작해주세요.',
                        },
                      })}
                    />
                    {errors.phoneNum1 && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.phoneNum1.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="'-'없이 작성해주세요"
                      variant="bordered"
                      radius="md"
                      type="text"
                      label="기타번호1"
                      defaultValue={studentState?.phoneNum2 || null}
                      onChange={e => {
                        register('phoneNum2').onChange(e)
                      }}
                      className="w-full"
                      {...register('phoneNum2', {
                        pattern: {
                          value: /^[0-9]+$/,
                          message: '숫자만 입력 가능합니다.',
                        },
                      })}
                    />
                    {errors.phoneNum2 && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.phoneNum2.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="'-'없이 작성해주세요"
                      variant="bordered"
                      radius="md"
                      type="text"
                      label="기타번호2"
                      defaultValue={studentState?.phoneNum3 || null}
                      onChange={e => {
                        register('phoneNum3').onChange(e)
                      }}
                      className="w-full"
                      {...register('phoneNum3', {
                        pattern: {
                          value: /^[0-9]+$/,
                          message: '숫자만 입력 가능합니다.',
                        },
                      })}
                    />
                    {errors.phoneNum3 && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.phoneNum3.message)}
                      </p>
                    )}
                  </AreaBox>
                </FlexBox>
                <AreaBox>
                  <Controller
                    control={control}
                    name="subject"
                    rules={{
                      required: {
                        value: true,
                        message: '과정을 최소 1개 이상 선택해주세요.',
                      },
                    }}
                    defaultValue={studentState?.subject}
                    render={({ field }) => (
                      <>
                        <Textarea
                          readOnly
                          value={field.value}
                          label="상담 과정 선택"
                          labelPlacement="outside"
                          className="max-w-full"
                          variant="bordered"
                          minRows={1}
                          defaultValue={studentState?.subject}
                          onClick={onOpen}
                          {...register('subject')}
                        />
                        <Modal size={'2xl'} isOpen={isOpen} onClose={onClose}>
                          <ModalContent>
                            {onClose => (
                              <>
                                <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                                <ModalBody>
                                  <BtnArea>
                                    <Button
                                      size="sm"
                                      radius="sm"
                                      variant="solid"
                                      className="text-white bg-flag1"
                                      onClick={() => {
                                        router.push('/subjects')
                                      }}
                                    >
                                      과정 등록/수정
                                    </Button>
                                  </BtnArea>
                                  <ScrollShadow
                                    orientation="horizontal"
                                    className="scrollbar"
                                  >
                                    <CheckboxGroup
                                      value={subjectSelected}
                                      onChange={handleCheckboxChange}
                                      classNames={{
                                        wrapper: 'gap-0',
                                      }}
                                    >
                                      <Theader>
                                        <TableRow>
                                          <Tcheck></Tcheck>
                                          <Tname>과정명</Tname>
                                          <TsubDiv>수강구분</TsubDiv>
                                          <Tfee>과정 금액</Tfee>
                                        </TableRow>
                                      </Theader>
                                      {subjectList?.result !== null &&
                                        subjectList?.result.map(
                                          (item, index) => (
                                            <TableItem key={index}>
                                              <TableRow>
                                                <Checkbox
                                                  key={item.id}
                                                  value={item.subjectName}
                                                >
                                                  <SubjectItem
                                                    tableData={item}
                                                  />
                                                </Checkbox>
                                              </TableRow>
                                            </TableItem>
                                          ),
                                        )}
                                      {subjectList?.result === null && (
                                        <Nolist>
                                          노출중인 과정이 없습니다.
                                        </Nolist>
                                      )}
                                    </CheckboxGroup>
                                  </ScrollShadow>
                                  {subjectList?.totalCount !== null && (
                                    <PagerWrap>
                                      <Pagination
                                        variant="light"
                                        showControls
                                        initialPage={currentSubjectPage}
                                        total={Math.ceil(
                                          subjectList?.totalCount /
                                            currentSubjectLimit,
                                        )}
                                        onChange={newPage => {
                                          setCurrentSubjectPage(newPage)
                                        }}
                                      />
                                    </PagerWrap>
                                  )}
                                </ModalBody>
                                <ModalFooter>
                                  <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                  >
                                    Close
                                  </Button>
                                  <Button
                                    color="primary"
                                    onPress={() => {
                                      clickSubmit()
                                      field.onChange(subjectSelected)
                                    }}
                                  >
                                    선택
                                  </Button>
                                </ModalFooter>
                              </>
                            )}
                          </ModalContent>
                        </Modal>
                      </>
                    )}
                  />
                  {errors.subject && (
                    <p className="px-2 pt-2 text-xs text-red-500">
                      {String(errors.subject.message)}
                    </p>
                  )}
                </AreaBox>
                <FlexBox>
                  <Controller
                    control={control}
                    name="receiptDiv"
                    defaultValue={studentState?.receiptDiv}
                    render={({ field }) => (
                      <Select
                        labelPlacement="outside"
                        label={<FilterLabel>접수구분</FilterLabel>}
                        placeholder=" "
                        className="w-full"
                        defaultValue={studentState?.receiptDiv}
                        variant="bordered"
                        selectedKeys={[receipt]}
                        onChange={value => {
                          field.onChange(value)
                          handleReceiptChange(value)
                        }}
                      >
                        {Object.entries(receiptStatus).map(([key, item]) => (
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
                    defaultValue={studentState?.subDiv}
                    render={({ field }) => (
                      <Select
                        labelPlacement="outside"
                        label={<FilterLabel>수강구분</FilterLabel>}
                        placeholder=" "
                        className="w-full"
                        defaultValue={studentState?.subDiv}
                        variant="bordered"
                        selectedKeys={[sub]}
                        onChange={value => {
                          field.onChange(value)
                          handleSubChange(value)
                        }}
                      >
                        {Object.entries(subStatus).map(([key, item]) => (
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
                    defaultValue={studentState?.pic}
                    render={({ field }) => (
                      <Select
                        labelPlacement="outside"
                        label="담당자"
                        placeholder=" "
                        className="w-full"
                        defaultValue={studentState?.pic}
                        variant="bordered"
                        selectedKeys={[manager]}
                        onChange={value => {
                          field.onChange(value)
                          handleManagerChange(value)
                        }}
                      >
                        <SelectItem
                          key={'담당자 지정필요'}
                          value={'담당자 지정필요'}
                        >
                          {'담당자 지정필요'}
                        </SelectItem>
                        {managerList?.map(item => (
                          <SelectItem
                            key={item.mUsername}
                            value={item.mUsername}
                          >
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
                    value={fametDate(studentState?.createdAt) || ''}
                    startContent={<i className="xi-calendar" />}
                    className="w-full"
                  />
                </FlexBox>
                <RadioBox>
                  <Controller
                    control={control}
                    name="progress"
                    defaultValue={studentState?.progress}
                    render={({ field, fieldState }) => (
                      <RadioGroup
                        label={<FilterLabel>진행상태</FilterLabel>}
                        orientation="horizontal"
                        className="gap-1"
                        defaultValue={String(studentState?.progress)}
                        onValueChange={value => {
                          field.onChange(parseInt(value))
                        }}
                      >
                        {Object.entries(progressStatus).map(([key, value]) => (
                          <Radio
                            key={key}
                            value={key}
                            isDisabled={key === '999' ? true : false}
                          >
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
                      defaultValue={studentState?.stVisit}
                      render={({ field }) => (
                        <DatePicker
                          locale="ko"
                          showYearDropdown
                          selected={
                            stVisitDate === null ? null : new Date(stVisitDate)
                          }
                          placeholderText="날짜를 선택해주세요."
                          isClearable
                          onChange={date => {
                            field.onChange(date)
                            setStVisitDate(date)
                          }}
                          showTimeSelect
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
                      defaultValue={studentState?.expEnrollDate}
                      render={({ field }) => (
                        <DatePicker
                          locale="ko"
                          showYearDropdown
                          selected={
                            expEnrollDate === null
                              ? null
                              : new Date(expEnrollDate)
                          }
                          placeholderText="날짜를 선택해주세요."
                          isClearable
                          onChange={date => {
                            field.onChange(date)
                            setExpEnrollDate(date)
                          }}
                          ref={field.ref}
                          dateFormat="yyyy/MM/dd"
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
                    defaultValue={studentState?.detail || ''}
                    onChange={e => {
                      register('detail').onChange(e)
                    }}
                    {...register('detail')}
                  />
                </FlexBox>
                <BtnBox>
                  <Button2
                    buttonType="submit"
                    width="100%"
                    height="2.5rem"
                    typeBorder={true}
                    fontColor="#fff"
                    bgColor="#007de9"
                  >
                    수정
                  </Button2>
                  <Button2
                    buttonType="button"
                    width="100%"
                    height="2.5rem"
                    fontColor="#007de9"
                    bgColor="#fff"
                    borderColor="#007de9"
                    typeBorder={true}
                    onClick={() => router.back()}
                  >
                    목록으로
                  </Button2>
                  {mGrade < 2 && (
                    <Button2
                      buttonType="button"
                      width="100%"
                      height="2.5rem"
                      typeBorder={true}
                      fontColor="#fff"
                      bgColor="#ff5900"
                      onClick={() => onDelete(studentState.id)}
                    >
                      삭제
                    </Button2>
                  )}
                </BtnBox>
              </DetailForm>
            </DetailBox>
            <DetailBox>
              <CreateMemo
                setMemoList={setMemoList}
                studentId={studentState?.id}
              />
              {memoList && (
                <MemoList>
                  {memoList?.map((item, index) => (
                    <MemoItem key={index}>
                      <ConsolutMemo
                        item={item}
                        setMemoList={setMemoList}
                        studentId={studentState?.id}
                      ></ConsolutMemo>
                    </MemoItem>
                  ))}
                </MemoList>
              )}
            </DetailBox>
          </ConArea>
        </MainWrap>
      )}
    </>
  )
}
