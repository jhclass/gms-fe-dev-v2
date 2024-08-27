import MainWrap from '@/components/wrappers/MainWrap'
import { Suspense, useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { getYear } from 'date-fns'
registerLocale('ko', ko)
const _ = require('lodash')
import {
  Button,
  Chip,
  Input,
  Link,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import {
  progressStatusState,
  subStatusState,
  receiptStatusState,
  gradeState,
} from '@/lib/recoilAtoms'
import { useRecoilValue } from 'recoil'
import { useMutation } from '@apollo/client'
import {
  DELETE_STUDENT_STATE_MUTATION,
  SEARCH_STUDENTSTATE_MUTATION,
  UPDATE_STUDENT_STATE_MUTATION,
} from '@/graphql/mutations'
import { Controller, useForm } from 'react-hook-form'
import { SEE_STUDENT_STATE_QUERY } from '@/graphql/queries'
import useUserLogsMutation from '@/utils/userLogs'
import ConsolutMemo from '@/components/form/ConsolutMemo'
import CreateMemo from '@/components/form/CreateMemo'
import useMmeQuery from '@/utils/mMe'
import AdviceTypeModal from '@/components/modal/AdviceTypeModal'
import SubjectModal from '@/components/modal/SubjectModal'
import DatePickerHeader from '@/components/common/DatePickerHeader'
import ConsolutRepeated from '@/components/items/ConsolutRepeated'
import Layout from '@/pages/consult/layout'
import ManagerSelect from '@/components/common/ManagerSelect'
import SubDivSelect from '@/components/common/SubDivSelect'
import FormTopInfo from '@/components/common/FormTopInfo'

const ConArea = styled.div`
  width: 100%;
  max-width: 1400px;
`
const LodingDiv = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-width: 20rem;
  position: relative;
  background: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const DetailBox = styled.div`
  margin-top: 2rem;
  background: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
`
const SemiTitle = styled.p`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${({ theme }) => theme.colors.accent};
  padding-bottom: 0.375rem;
  display: block;
`
const DetailForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media (max-width: 768px) {
    gap: 1rem;
  }
`
const ColFlexBox = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`
const FlexBox = styled.div`
  display: flex;
  gap: 1rem;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const AreaBox = styled.div`
  flex: 1;
  position: relative;
`
const DatePickerBox = styled.div`
  width: 100%;
  .react-datepicker-wrapper {
    display: inline;
    width: 100%;
  }
  .react-datepicker__input-container {
    display: inline;
  }
  .react-datepicker__close-icon {
    height: 2.5rem;
    top: auto;
    bottom: 0;
  }
  .react-datepicker__triangle {
    left: 1.5rem !important;
    transform: translate(0, 0) !important;
  }
`
const RadioBox = styled.div`
  display: flex;
  z-index: 1;
  width: 100%;
`
const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${({ theme }) => theme.colors.black};
  padding-bottom: 0.1rem;
  display: block;

  span {
    color: red;

    &.multi {
      font-size: 0.8rem;
      color: ${({ theme }) => theme.colors.gray};
    }
  }
`
const BtnBox = styled.div`
  display: flex;
  gap: 0.5rem;
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
const LabelFlex = styled.div`
  position: relative;
`
const AddLink = styled.p`
  > a {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.gray};
  }
  position: absolute;
  top: 0;
  right: 0;
  z-index: 5;
`

export default function ConsultDetail() {
  const router = useRouter()
  const grade = useRecoilValue(gradeState)
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const mPart = useMme('mPart') || []
  const studentId = typeof router.query.id === 'string' ? router.query.id : null
  const [updateStudent] = useMutation(UPDATE_STUDENT_STATE_MUTATION)
  const [deleteStudent] = useMutation(DELETE_STUDENT_STATE_MUTATION)
  const [searchStudentStateMutation] = useMutation(SEARCH_STUDENTSTATE_MUTATION)
  const { userLogs } = useUserLogsMutation()
  const progressStatus = useRecoilValue(progressStatusState)
  const receiptStatus = useRecoilValue(receiptStatusState)
  const subStatus = useRecoilValue(subStatusState)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: sbjIsOpen,
    onOpen: sbjOpen,
    onClose: sbjClose,
  } = useDisclosure()
  const [subjectSelected, setSubjectSelected] = useState([])
  const [adviceTypeSelected, setAdviceTypeSelected] = useState([])
  const [adviceTypeSelectedName, setAdviceTypeSelectedName] = useState([])
  const [stVisitDate, setStVisitDate] = useState(null)
  const [expEnrollDate, setExpEnrollDate] = useState(null)
  const [receipt, setReceipt] = useState('-')
  const [sub, setSub] = useState('-')
  const [manager, setManager] = useState('담당자 지정필요')
  const [consultation, setConsultation] = useState([])
  const [memoList, setMemoList] = useState([])
  const [studentState, setStudentState] = useState(null)
  const studentAdvice = studentState?.adviceTypes?.map(obj => obj.type) || []
  const addArr = [...studentAdvice]
  const years = _.range(2000, getYear(new Date()) + 5, 1)
  const fetchStudentState = async () => {
    if (studentId === null) return

    try {
      const { data } = await searchStudentStateMutation({
        variables: { searchStudentStateId: parseInt(studentId) },
      })

      if (!data || !data.searchStudentState.ok) {
        throw new Error('학생 상태를 불러오는 데 실패했습니다.')
      }

      return data.searchStudentState.studentState
    } catch (error) {
      console.error('학생 상태 조회 에러:', error)
    }
  }

  const fetchRelatedData = async (phoneNum1, stName) => {
    try {
      const { data } = await searchStudentStateMutation({
        variables: { phoneNum1, stName },
      })

      if (!data || !data.searchStudentState.ok) {
        throw new Error('관련 데이터를 불러오는 데 실패했습니다.')
      }

      return data.searchStudentState.studentState
    } catch (error) {
      console.error('관련 데이터 조회 에러:', error)
    }
  }

  const fetchData = async () => {
    const studentState = await fetchStudentState()

    if (studentState) {
      setStudentState(studentState[0])
      setMemoList(studentState[0].consultationMemo || [])

      const consultationData = await fetchRelatedData(
        studentState[0].phoneNum1,
        studentState[0].stName,
      )
      if (consultationData) {
        setConsultation(consultationData)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [router])

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
      adviceTypes: studentState?.adviceTypes,
      expEnrollDate: studentState?.expEnrollDate,
      perchase: studentState?.perchase,
      pic: studentState?.pic,
      receiptDiv: studentState?.receiptDiv,
    },
  })
  const { isDirty, dirtyFields, errors } = formState

  useEffect(() => {
    if (studentState?.subject?.length === 0) {
      setSubjectSelected([])
    } else {
      setSubjectSelected(studentState?.subject)
    }
    if (
      studentState?.receiptDiv === '' ||
      studentState?.receiptDiv === undefined
    ) {
      setReceipt('-')
    } else {
      setReceipt(studentState?.receiptDiv)
    }
    if (studentState?.subDiv === null || studentState?.subDiv === undefined) {
      setSub('-')
    } else {
      setSub(studentState?.subDiv)
    }
    if (studentState?.pic === undefined || studentState?.pic === null) {
      setManager('담당자 지정필요')
    } else {
      setManager(studentState?.pic)
    }
    if (studentState?.stVisit === null || studentState?.stVisit === undefined) {
      setStVisitDate(null)
    } else {
      const date = parseInt(studentState?.stVisit)
      setStVisitDate(date)
    }
    if (
      studentState?.expEnrollDate === null ||
      studentState?.expEnrollDate === undefined
    ) {
      setExpEnrollDate(null)
    } else {
      const date = parseInt(studentState?.expEnrollDate)
      setExpEnrollDate(date)
    }
    if (studentState?.adviceTypes) {
      const name = studentState?.adviceTypes.map(item => item.type)
      const id = studentState?.adviceTypes.map(item => item.id)
      setAdviceTypeSelected(id)
      setAdviceTypeSelectedName(name)
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
            adviceTypes: data.adviceTypes === '' ? [] : adviceTypeSelected,
            subject:
              data.subject === '' ? studentState.subject : subjectSelected,
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
            lastModifiedTime: new Date(),
          },
          onCompleted: result => {
            const dirtyFieldsArray = [...Object.keys(dirtyFields)]
            userLogs(
              `${studentState.stName}의 상담 수정`,
              ` ok: ${result.updateStudentState.ok} / ${dirtyFieldsArray.join(
                ', ',
              )}`,
            )
            if (result.updateStudentState.ok) {
              alert('수정되었습니다.')
              router.back()
            }
          },
        })
      }
    } else {
      alert('변경된 내용이 없습니다.')
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
            query: SEE_STUDENT_STATE_QUERY,
            variables: { page: 1, limit: 10 },
          },
        ],
        onCompleted: result => {
          userLogs(
            `ID : ${studentState.name} 상담카드 삭제`,
            `ok: ${result.deleteStudentState.ok}`,
          )
          if (result.deleteStudentState.ok) {
            alert('상담카드가 삭제되었습니다.')
            router.back()
          }
        },
      })
    }
  }

  const formatDate = data => {
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

  const handleClickAdviceType = () => {
    router.push({
      pathname: '/setting/types',
      query: { typeTab: 'adviceType' },
    })
  }

  const handleClick = () => {
    router.push({
      pathname: '/setting/types',
      query: { typeTab: 'subDiv' },
    })
  }

  return (
    <>
      {studentState !== null && (
        <MainWrap>
          <ConArea>
            <Breadcrumb isFilter={false} isWrite={false} rightArea={false} />
            <DetailBox>
              <FormTopInfo item={studentState} noti={true} />
              <DetailForm onSubmit={handleSubmit(onSubmit)}>
                <FlexBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="이름"
                      variant="bordered"
                      radius="md"
                      type="text"
                      label={
                        <FilterLabel>
                          이름<span>*</span>
                        </FilterLabel>
                      }
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
                        pattern: {
                          value: /^[가-힣a-zA-Z0-9\s]*$/,
                          message: '한글, 영어, 숫자만 사용 가능합니다.',
                        },
                      })}
                    />
                    {errors.stName && (
                      <p className="px-2 pt-2 text-xs text-red">
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
                      {...register('stEmail', {
                        pattern: {
                          value:
                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                          message: '유효하지 않은 이메일 형식입니다.',
                        },
                      })}
                    />
                    {errors.stEmail && (
                      <p className="px-2 pt-2 text-xs text-red">
                        {String(errors.stEmail.message)}
                      </p>
                    )}
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
                      label={
                        <FilterLabel>
                          휴대폰번호<span>*</span>
                        </FilterLabel>
                      }
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
                      <p className="px-2 pt-2 text-xs text-red">
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
                      maxLength={12}
                      {...register('phoneNum2', {
                        pattern: {
                          value: /^[0-9]+$/,
                          message: '숫자만 입력 가능합니다.',
                        },
                        maxLength: {
                          value: 12,
                          message: '최대 12자리까지 입력 가능합니다.',
                        },
                      })}
                    />
                    {errors.phoneNum2 && (
                      <p className="px-2 pt-2 text-xs text-red">
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
                      maxLength={12}
                      {...register('phoneNum3', {
                        pattern: {
                          value: /^[0-9]+$/,
                          message: '숫자만 입력 가능합니다.',
                        },
                        maxLength: {
                          value: 12,
                          message: '최대 12자리까지 입력 가능합니다.',
                        },
                      })}
                    />
                    {errors.phoneNum3 && (
                      <p className="px-2 pt-2 text-xs text-red">
                        {String(errors.phoneNum3.message)}
                      </p>
                    )}
                  </AreaBox>
                </FlexBox>
                <AreaBox>
                  <Controller
                    control={control}
                    name="adviceTypes"
                    rules={{
                      required: {
                        value: true,
                        message: '상담 분야를 최소 1개 이상 선택해주세요.',
                      },
                    }}
                    defaultValue={addArr}
                    render={({ field }) => (
                      <>
                        <Textarea
                          readOnly
                          value={String(adviceTypeSelectedName)}
                          label={
                            <FilterLabel>
                              상담 분야<span>*</span>{' '}
                              <span className="multi">(중복가능)</span>
                            </FilterLabel>
                          }
                          labelPlacement="outside"
                          className="max-w-full"
                          variant="bordered"
                          minRows={1}
                          onClick={onOpen}
                          {...register('adviceTypes')}
                        />
                        <Suspense
                          fallback={
                            <LodingDiv>
                              <i className="xi-spinner-2" />
                            </LodingDiv>
                          }
                        >
                          <AdviceTypeModal
                            adviceTypeSelected={adviceTypeSelected}
                            setAdviceTypeSelected={setAdviceTypeSelected}
                            setAdviceTypeSelectedName={
                              setAdviceTypeSelectedName
                            }
                            isOpen={isOpen}
                            onClose={onClose}
                            setValue={setValue}
                          />
                        </Suspense>
                      </>
                    )}
                  />
                  {errors.adviceTypes && (
                    <p className="px-2 pt-2 text-xs text-red">
                      {String(errors.adviceTypes.message)}
                    </p>
                  )}
                  {mGrade < grade.general && (
                    <AddLink>
                      <Link
                        size="sm"
                        underline="hover"
                        href="#"
                        onClick={handleClickAdviceType}
                      >
                        상담분야 추가
                      </Link>
                    </AddLink>
                  )}
                </AreaBox>
                <AreaBox>
                  <Textarea
                    readOnly
                    label={
                      <FilterLabel>
                        상담 과정 선택 <span className="multi">(중복가능)</span>
                      </FilterLabel>
                    }
                    labelPlacement="outside"
                    className="max-w-full"
                    variant="bordered"
                    minRows={1}
                    defaultValue={studentState?.subject}
                    onClick={sbjOpen}
                    {...register('subject')}
                  />
                </AreaBox>
                <FlexBox>
                  <AreaBox>
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
                            if (value.target.value !== '') {
                              field.onChange(value)
                              handleReceiptChange(value)
                            }
                          }}
                        >
                          {Object.entries(receiptStatus).map(([key, item]) =>
                            key === '0' ? (
                              <SelectItem value={'-'} key={'-'}>
                                -
                              </SelectItem>
                            ) : (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ),
                          )}
                        </Select>
                      )}
                    />
                  </AreaBox>
                  <AreaBox>
                    <Controller
                      control={control}
                      name="subDiv"
                      defaultValue={studentState?.subDiv}
                      render={({ field }) => (
                        <Suspense
                          fallback={
                            <LodingDiv>
                              <i className="xi-spinner-2" />
                            </LodingDiv>
                          }
                        >
                          <SubDivSelect
                            selectedKey={sub}
                            field={field}
                            label={
                              <LabelFlex>
                                <FilterLabel>수강구분</FilterLabel>
                              </LabelFlex>
                            }
                            handleChange={handleSubChange}
                            isHyphen={false}
                            optionDefault={{ type: '-' }}
                          />
                        </Suspense>
                      )}
                    />
                    {(mGrade < grade.general || mPart.includes('영업팀')) && (
                      <AddLink>
                        <Link
                          size="sm"
                          underline="hover"
                          href="#"
                          onClick={handleClick}
                        >
                          수강구분 추가
                        </Link>
                      </AddLink>
                    )}
                  </AreaBox>
                </FlexBox>
                <FlexBox>
                  <Controller
                    control={control}
                    name="pic"
                    defaultValue={studentState?.pic}
                    render={({ field }) => (
                      <Suspense
                        fallback={
                          <LodingDiv>
                            <i className="xi-spinner-2" />
                          </LodingDiv>
                        }
                      >
                        <ManagerSelect
                          selectedKey={manager}
                          field={field}
                          label={'담당자'}
                          defaultValue={studentState ? studentState.pic : null}
                          handleChange={handleManagerChange}
                          optionDefault={{
                            mUsername: '담당자 지정필요',
                            mUserId: '담당자 지정필요',
                          }}
                          filter={{
                            // mGrade: grade.master,
                            mPart: '영업팀',
                          }}
                        />
                      </Suspense>
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
                    value={formatDate(studentState?.createdAt) || ''}
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
                          renderCustomHeader={({
                            date,
                            changeYear,
                            changeMonth,
                            decreaseMonth,
                            increaseMonth,
                          }) => (
                            <DatePickerHeader
                              rangeYears={years}
                              clickDate={date}
                              changeYear={changeYear}
                              changeMonth={changeMonth}
                              decreaseMonth={decreaseMonth}
                              increaseMonth={increaseMonth}
                            />
                          )}
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
                          onChangeRaw={e => e.preventDefault()}
                          onFocus={e => e.target.blur()}
                          showTimeSelect
                          dateFormat="yyyy/MM/dd HH:mm"
                          customInput={
                            <Input
                              label="상담예정일"
                              labelPlacement="outside"
                              type="text"
                              variant="bordered"
                              id="date"
                              classNames={{
                                input: 'caret-transparent',
                              }}
                              isReadOnly={true}
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
                          renderCustomHeader={({
                            date,
                            changeYear,
                            changeMonth,
                            decreaseMonth,
                            increaseMonth,
                          }) => (
                            <DatePickerHeader
                              rangeYears={years}
                              clickDate={date}
                              changeYear={changeYear}
                              changeMonth={changeMonth}
                              decreaseMonth={decreaseMonth}
                              increaseMonth={increaseMonth}
                            />
                          )}
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
                          dateFormat="yyyy/MM/dd"
                          onChangeRaw={e => e.preventDefault()}
                          onFocus={e => e.target.blur()}
                          customInput={
                            <Input
                              label="수강예정일"
                              labelPlacement="outside"
                              type="text"
                              variant="bordered"
                              id="date"
                              classNames={{
                                input: 'caret-transparent',
                              }}
                              isReadOnly={true}
                              startContent={<i className="xi-calendar" />}
                            />
                          }
                        />
                      )}
                    />
                  </DatePickerBox>
                </FlexBox>
                {(studentState?.classMethod.includes('전화상담') ||
                  studentState?.classMethod.includes('방문상담')) && (
                  <FlexBox>
                    {studentState?.classMethod.includes('전화상담') && (
                      <Chip variant="bordered" color="primary">
                        &#128222; 전화상담 원해요.
                      </Chip>
                    )}
                    {studentState?.classMethod.includes('방문상담') && (
                      <Chip variant="bordered" color="primary">
                        &#127939; 방문상담 원해요.
                      </Chip>
                    )}
                  </FlexBox>
                )}
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
                  <Button
                    type="submit"
                    color="primary"
                    className="w-full text-white"
                  >
                    수정
                  </Button>
                  <Button
                    variant="bordered"
                    color="primary"
                    className="w-full text-primary"
                    onClick={() => router.back()}
                  >
                    이전으로
                  </Button>
                  {mGrade < grade.general && (
                    <Button
                      className="w-full text-white bg-accent"
                      onClick={() => onDelete(studentState.id)}
                    >
                      삭제
                    </Button>
                  )}
                </BtnBox>
              </DetailForm>
            </DetailBox>
            {consultation?.length > 1 && (
              <DetailBox>
                <SemiTitle>중복 상담 문의 내역</SemiTitle>
                <ColFlexBox>
                  {consultation
                    .filter(item => item.id !== studentState.id)
                    .map((item, index) => (
                      <ConsolutRepeated
                        key={index}
                        index={index + 1}
                        listData={item}
                      />
                    ))}
                </ColFlexBox>
              </DetailBox>
            )}

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
      <SubjectModal
        subjectSelected={subjectSelected}
        setSubjectSelected={setSubjectSelected}
        sbjIsOpen={sbjIsOpen}
        sbjClose={sbjClose}
        setValue={setValue}
      />
    </>
  )
}
ConsultDetail.getLayout = page => <Layout>{page}</Layout>
