import MainWrap from '@/components/wrappers/MainWrap'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { getYear } from 'date-fns'
registerLocale('ko', ko)
const _ = require('lodash')
import { Input, Select, SelectItem, Switch, Textarea } from '@nextui-org/react'
import { gradeState, subStatusState } from '@/lib/recoilAtoms'
import { useRecoilValue } from 'recoil'
import { useMutation } from '@apollo/client'
import {
  CREATE_SUBJECT_MUTATION,
  DELETE_SUBJECT_MUTATION,
  SEARCH_SUBJECT_MUTATION,
  UPDATE_SUBJECT_MUTATION,
} from '@/graphql/mutations'
import { Controller, useForm } from 'react-hook-form'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'
import { SEE_SUBJECT_QUERY } from '@/graphql/queries'
import useMmeQuery from '@/utils/mMe'
import DatePickerHeader from '@/components/common/DatePickerHeader'
import SubjectRoundItem from '@/components/items/SubjectRoundItem'
import Layout from '@/pages/subjects/layout'

const ConArea = styled.div`
  width: 100%;
  max-width: 1400px;
`
const SwitchDiv = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  padding: 0.5rem 0 0.5rem 0.5rem;
  border-radius: 0.75rem;
`
const SwitchText = styled.span`
  width: max-content;
  padding-right: 0.5rem;
  font-size: 0.8rem;
`
const DetailBox = styled.div`
  margin-top: 2rem;
  background: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
`
const DetailForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media (max-width: 768px) {
    gap: 1rem;
  }
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

const SemiTitle = styled.p`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #ff5900;
  padding-bottom: 0.375rem;
  display: block;
`
const ColFlexBox = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
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
const AreaSmallBox = styled.div`
  width: 10%;
  @media (max-width: 768px) {
    width: 100% !important;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
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
const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #11181c;
  padding-bottom: 0.1rem;
  display: block;

  span {
    color: red;
  }
`
const BtnBox = styled.div<{ $isMaster: boolean }>`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 768px) {
    ${props => props.$isMaster && 'flex-wrap:wrap;'}
    button {
      ${props => props.$isMaster && ' width: calc(50% - 0.5rem);'}
    }
  }
`

export default function SubjectDetail() {
  const grade = useRecoilValue(gradeState)
  const router = useRouter()
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const subjectId = typeof router.query.id === 'string' ? router.query.id : null
  const subjectsPage = router.query.page
  const subjectsLimit = router.query.limit
  const [createSubject] = useMutation(CREATE_SUBJECT_MUTATION)
  const [deleteSubject] = useMutation(DELETE_SUBJECT_MUTATION)
  const [updateSubject] = useMutation(UPDATE_SUBJECT_MUTATION)
  const [searchSubjectMutation, { data, loading, error }] = useMutation(
    SEARCH_SUBJECT_MUTATION,
  )
  const [subjectState, setSubjectState] = useState(null)
  const [subjectRoundItem, setSubjectRoundItem] = useState([])
  const { userLogs } = useUserLogsMutation()
  const subStatus = useRecoilValue(subStatusState)

  const { register, control, handleSubmit, formState } = useForm({
    defaultValues: {
      updateSubjectId: subjectState?.id,
      subDiv: subjectState?.subDiv,
      subjectName: subjectState?.subjectName,
      subjectCode: subjectState?.subjectCode,
      fee: subjectState?.fee,
      startDate: subjectState?.startDate,
      endDate: subjectState?.endDate,
      roomNum: subjectState?.roomNum,
      exposure: subjectState?.exposure,
      totalTime: subjectState?.totalTime,
      teacherName: subjectState?.teacherName,
      expiresDateStart: subjectState?.expiresDateStart,
      expiresDateEnd: subjectState?.expiresDateEnd,
      round: subjectState?.round,
    },
  })
  const { isDirty, dirtyFields, errors } = formState

  const [expStartDate, setExpStartDate] = useState(null)
  const [expEndDate, setExpEndDate] = useState(null)
  const [sjStartDate, setSjStartDate] = useState(null)
  const [sjEndDate, setSjEndDate] = useState(null)
  const [sub, setSub] = useState('없음')
  const [teacher, setTeacher] = useState('강사명 없음')
  const [isSelected, setIsSelected] = useState(Boolean)
  const years = _.range(2000, getYear(new Date()) + 5, 1)

  const fetchSubjectData = async variables => {
    const response = await searchSubjectMutation({ variables })
    if (!response.data.searchSubject.ok) {
      throw new Error('Failed to fetch subject data')
    }
    return response.data.searchSubject.result
  }

  const searchData = async () => {
    try {
      const [subject] = await fetchSubjectData({
        searchSubjectId: parseInt(subjectId),
      })
      setSubjectState(subject)
      if (subject.subjectCode !== null) {
        const roundData = await fetchSubjectData({
          subjectCode: subject.subjectCode,
        })
        setSubjectRoundItem(roundData)
      }
    } catch (error) {
      console.error('Failed to fetch data:', error.message)
    }
  }

  useEffect(() => {
    if (subjectId !== null) {
      searchData()
    }
  }, [router])

  useEffect(() => {
    if (subjectState !== null) {
      setIsSelected(subjectState.exposure)
      setSub(subjectState.subDiv ?? '없음')
      setTeacher(subjectState.teacherName ?? '강사명 없음')
      setExpStartDate(
        subjectState.expiresDateStart != null
          ? parseInt(subjectState.expiresDateStart)
          : null,
      )
      setExpEndDate(
        subjectState.expiresDateEnd != null
          ? parseInt(subjectState.expiresDateEnd)
          : null,
      )
      setSjStartDate(
        subjectState.startDate != null
          ? parseInt(subjectState.startDate)
          : null,
      )
      setSjEndDate(
        subjectState.endDate != null ? parseInt(subjectState.endDate) : null,
      )
    }
  }, [subjectState])

  const onSubmit = async data => {
    if (isDirty || subjectState.exposure !== isSelected) {
      const isModify = confirm('변경사항이 있습니다. 수정하시겠습니까?')
      if (isModify) {
        try {
          const result = await updateSubject({
            variables: {
              updateSubjectId: subjectState.id,
              subjectName: data.subjectName.trim(),
              round: parseInt(data.round),
              subjectCode:
                data.subjectCode === '' ? null : data.subjectCode.trim(),
              fee: parseInt(data.fee.trim()),
              subDiv: data.subDiv,
              startDate:
                data.startDate === null
                  ? null
                  : typeof data.startDate === 'string'
                  ? new Date(parseInt(data.startDate))
                  : new Date(data.startDate),
              endDate:
                data.endDate === null
                  ? null
                  : typeof data.endDate === 'string'
                  ? new Date(parseInt(data.endDate))
                  : new Date(data.endDate),
              roomNum: data.roomNum === '' ? null : data.roomNum.trim(),
              exposure: isSelected,
              totalTime:
                data.totalTime === '' ? 0 : parseInt(data.totalTime.trim()),
              teacherName:
                data.teacherName === '' ? '강사명 없음' : data.teacherName,
              expiresDateStart:
                data.expiresDateStart === null
                  ? null
                  : typeof data.expiresDateStart === 'string'
                  ? new Date(parseInt(data.expiresDateStart))
                  : new Date(data.expiresDateStart),
              expiresDateEnd:
                data.expiresDateEnd === null
                  ? null
                  : typeof data.expiresDateEnd === 'string'
                  ? new Date(parseInt(data.expiresDateEnd))
                  : new Date(data.expiresDateEnd),
            },
          })

          if (!result.data.updateSubject.ok) {
            throw new Error('과정 수정 실패')
          }
          const dirtyFieldsArray = [...Object.keys(dirtyFields)]
          userLogs(
            `${subjectState.subjectName} 과목 수정`,
            dirtyFieldsArray.join(', '),
          )
          alert('수정되었습니다.')
          router.back()
        } catch (error) {
          console.error('과목 수정 중 에러 발생:', error)
          alert('과목 수정 처리 중 오류가 발생했습니다.')
        }
      }
    }
  }

  const onCopy = async () => {
    const isCopy = confirm('과정을 복사하시겠습니까?')
    if (!isCopy) return

    try {
      const result = await createSubject({
        variables: {
          subDiv: subjectState?.subDiv,
          subjectName: subjectState?.subjectName,
          round: parseInt(subjectState.round + 1),
          subjectCode:
            subjectState?.subjectCode === null
              ? null
              : subjectState?.subjectCode,
          fee: parseInt(subjectState?.fee),
          startDate:
            subjectState?.startDate === null
              ? null
              : new Date(parseInt(subjectState.startDate)),
          endDate:
            subjectState?.endDate === null
              ? null
              : new Date(parseInt(subjectState.endDate)),
          roomNum: subjectState.roomNum === null ? null : subjectState?.roomNum,
          exposure: subjectState?.exposure,
          totalTime:
            subjectState?.totalTime === null
              ? 0
              : parseInt(subjectState?.totalTime),
          teacherName:
            subjectState?.teacherName === null
              ? '강사명 없음'
              : subjectState?.teacherName,
          expiresDateStart:
            subjectState?.expiresDateStart === null
              ? null
              : new Date(parseInt(subjectState.expiresDateStart)),
          expiresDateEnd:
            subjectState?.expiresDateEnd === null
              ? null
              : new Date(parseInt(subjectState.expiresDateEnd)),
        },
        refetchQueries: [
          { query: SEE_SUBJECT_QUERY, variables: { page: 1, limit: 10 } },
        ],
      })

      if (!result.data.createSubject.ok) {
        throw new Error('과정 복사 실패')
      }

      userLogs(`${subjectState.subjectName} 과정 복사`)
      alert('복사되었습니다.')
      router.back()
    } catch (error) {
      console.error('과정 복사 중 에러 발생:', error)
      alert('과정 복사 처리 중 오류가 발생했습니다.')
    }
  }

  const onDelete = async data => {
    const isDelete = confirm('과정을 삭제하시겠습니까?')
    if (!isDelete) return
    try {
      const result = await deleteSubject({
        variables: {
          deleteSubjectId: data,
        },
        refetchQueries: [
          {
            query: SEE_SUBJECT_QUERY,
            variables: {
              page: Number(subjectsPage),
              limit: Number(subjectsLimit),
            },
          },
        ],
      })

      if (!result.data.deleteSubject.ok) {
        throw new Error('과정 삭제 실패')
      }

      userLogs(`${subjectState.subjectName} 과목 삭제`)
      alert('과정이 삭제되었습니다.')
      router.back()
    } catch (error) {
      console.error('과정 삭제 중 에러 발생:', error)
      alert('과정 삭제 처리 중 오류가 발생했습니다.')
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
  const handleSubChange = e => {
    setSub(e.target.value)
  }
  const handleTeacherChange = e => {
    setTeacher(e.target.value)
  }

  return (
    <>
      {data !== undefined && (
        <MainWrap>
          <ConArea>
            <Breadcrumb
              isFilter={false}
              isWrite={false}
              rightArea={true}
              addRender={
                <SwitchDiv>
                  <SwitchText>노출여부</SwitchText>
                  <Switch
                    size="md"
                    isSelected={isSelected}
                    onValueChange={setIsSelected}
                  />
                </SwitchDiv>
              }
            />
            <DetailBox>
              <TopInfo>
                <Noti>
                  <span>*</span> 는 필수입력입니다.
                </Noti>
                <UpdateTime>
                  <span>최근 업데이트 일시 :</span>
                  {formatDate(subjectState?.updatedAt, true)}
                </UpdateTime>
              </TopInfo>
              <DetailForm onSubmit={handleSubmit(onSubmit)}>
                <FlexBox>
                  <AreaBox>
                    <Textarea
                      labelPlacement="outside"
                      placeholder="과정명"
                      variant="bordered"
                      radius="md"
                      type="text"
                      label={
                        <FilterLabel>
                          과정명<span>*</span>
                        </FilterLabel>
                      }
                      minRows={1}
                      defaultValue={subjectState?.subjectName}
                      onChange={e => {
                        register('subjectName').onChange(e)
                      }}
                      className="w-full"
                      {...register('subjectName', {
                        required: {
                          value: true,
                          message: '과정명을 입력해주세요.',
                        },
                      })}
                    />
                    {errors.subjectName && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.subjectName.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaSmallBox>
                    <Input
                      labelPlacement="outside"
                      variant="bordered"
                      radius="md"
                      type="number"
                      placeholder=" "
                      label={<FilterLabel>회차</FilterLabel>}
                      defaultValue={subjectState?.round}
                      className="w-full"
                      min={1}
                      {...register('round', {
                        required: {
                          value: true,
                          message: '회차를 작성해주세요.',
                        },
                        min: {
                          value: 1,
                          message: '1이상의 숫자를 작성해주세요.',
                        },
                      })}
                    />
                    {errors.round && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.round.message)}
                      </p>
                    )}
                  </AreaSmallBox>
                </FlexBox>
                <FlexBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder=" "
                      variant="bordered"
                      radius="md"
                      type="text"
                      label={
                        <FilterLabel>
                          과정코드<span>*</span>
                        </FilterLabel>
                      }
                      defaultValue={subjectState?.subjectCode}
                      onChange={e => {
                        register('subjectCode').onChange(e)
                      }}
                      className="w-full"
                      {...register('subjectCode', {
                        required: {
                          value: true,
                          message: '과정코드을 입력해주세요.',
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9\s]*$/,
                          message: '특수 문자는 사용할 수 없습니다.',
                        },
                      })}
                    />
                    {errors.subjectCode && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.subjectCode.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="수강료"
                      variant="bordered"
                      radius="md"
                      type="text"
                      label={
                        <FilterLabel>
                          수강료<span>*</span>
                        </FilterLabel>
                      }
                      defaultValue={subjectState?.fee}
                      onChange={e => {
                        register('fee').onChange(e)
                      }}
                      className="w-full"
                      {...register('fee', {
                        required: {
                          value: true,
                          message: '수강료를 입력해주세요.',
                        },
                        pattern: {
                          value: /^[0-9]+$/,
                          message: '숫자만 입력 가능합니다.',
                        },
                      })}
                    />
                    {errors.fee && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.fee.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <Controller
                      control={control}
                      name="subDiv"
                      defaultValue={subjectState?.subDiv}
                      render={({ field, fieldState }) => (
                        <Select
                          labelPlacement="outside"
                          defaultValue={subjectState?.subDiv}
                          label={
                            <FilterLabel>
                              수강구분<span>*</span>
                            </FilterLabel>
                          }
                          placeholder=" "
                          className="w-full"
                          variant="bordered"
                          selectedKeys={[sub]}
                          onChange={value => {
                            if (value.target.value !== '') {
                              field.onChange(value)
                              handleSubChange(value)
                            }
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
                    {errors.subDiv && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.subDiv.message)}
                      </p>
                    )}
                  </AreaBox>
                </FlexBox>
                <FlexBox>
                  <AreaBox>
                    {mGrade < grade.general ? (
                      <DatePickerBox>
                        <Controller
                          control={control}
                          name="expiresDateStart"
                          defaultValue={subjectState?.expiresDateStart}
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
                                expStartDate === null
                                  ? null
                                  : new Date(expStartDate)
                              }
                              placeholderText="날짜를 선택해주세요."
                              isClearable
                              onChange={date => {
                                field.onChange(date)
                                setExpStartDate(date)
                              }}
                              dateFormat="yyyy/MM/dd"
                              onChangeRaw={e => e.preventDefault()}
                              onFocus={e => e.target.blur()}
                              customInput={
                                <Input
                                  label="승인 유효기간(시작일)"
                                  labelPlacement="outside"
                                  variant="bordered"
                                  type="text"
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
                    ) : (
                      <Input
                        isReadOnly
                        labelPlacement="outside"
                        placeholder="승인 유효기간(시작일)"
                        variant="faded"
                        radius="md"
                        type="text"
                        label="승인 유효기간(시작일)"
                        value={
                          subjectState?.expiresDateStart === null
                            ? ''
                            : formatDate(subjectState?.expiresDateStart, false)
                        }
                        startContent={<i className="xi-calendar" />}
                        className="w-full"
                      />
                    )}
                  </AreaBox>
                  <AreaBox>
                    {mGrade < grade.general ? (
                      <DatePickerBox>
                        <Controller
                          control={control}
                          name="expiresDateEnd"
                          defaultValue={subjectState?.expiresDateEnd}
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
                                expEndDate === null
                                  ? null
                                  : new Date(expEndDate)
                              }
                              placeholderText="날짜를 선택해주세요."
                              isClearable
                              onChange={date => {
                                field.onChange(date)
                                setExpEndDate(date)
                              }}
                              dateFormat="yyyy/MM/dd"
                              onChangeRaw={e => e.preventDefault()}
                              onFocus={e => e.target.blur()}
                              customInput={
                                <Input
                                  label="승인 유효기간(만료일)"
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
                    ) : (
                      <Input
                        isReadOnly
                        labelPlacement="outside"
                        placeholder="승인 유효기간(시작일)"
                        variant="faded"
                        radius="md"
                        type="text"
                        label="승인 유효기간(시작일)"
                        value={
                          subjectState?.expiresDateEnd === null
                            ? ''
                            : formatDate(subjectState?.expiresDateEnd, false)
                        }
                        startContent={<i className="xi-calendar" />}
                        className="w-full"
                      />
                    )}
                  </AreaBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="예) 204호 또는 별관 204호"
                      variant="bordered"
                      radius="md"
                      type="text"
                      label="강의실"
                      defaultValue={subjectState?.roomNum}
                      onChange={e => {
                        register('roomNum').onChange(e)
                      }}
                      className="w-full"
                      {...register('roomNum', {
                        pattern: {
                          value: /^[가-힣a-zA-Z0-9\s]*$/,
                          message: '한글, 영어, 숫자만 사용 가능합니다.',
                        },
                      })}
                    />
                    {errors.roomNum && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.roomNum.message)}
                      </p>
                    )}
                  </AreaBox>
                  {/* <AreaBox>
                    <Controller
                      control={control}
                      name="teacherName"
                      defaultValue={subjectState?.teacherName}
                      render={({ field }) => (
                        <Select
                          labelPlacement="outside"
                          label="강사명"
                          placeholder=" "
                          className="w-full"
                          variant="bordered"
                          defaultValue={subjectState?.teacherName}
                          selectedKeys={[teacher]}
                          onChange={value => {
                              if (value.target.value !== '') {
                                field.onChange(value)
                            handleTeacherChange(value)
                            }
                          }}
                        >
                          <SelectItem key={'강사명 없음'} value={'강사명 없음'}>
                            {'강사명 없음'}
                          </SelectItem>
                          <SelectItem key={'김강사'} value={'김강사'}>
                            {'김강사'}
                          </SelectItem>
                          <SelectItem key={'이강사'} value={'이강사'}>
                            {'이강사'}
                          </SelectItem>
                          {managerList?.map(item => (
                            <SelectItem key={item.mUsername} value={item.mUsername}>
                              {item.mUsername}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />
                  </AreaBox> */}
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder=" "
                      variant="bordered"
                      radius="md"
                      type="text"
                      label="강사명"
                      defaultValue={subjectState?.teacherName}
                      onChange={e => {
                        register('teacherName').onChange(e)
                      }}
                      className="w-full"
                      {...register('teacherName')}
                    />
                  </AreaBox>
                </FlexBox>
                <FlexBox>
                  <AreaBox>
                    <DatePickerBox>
                      <Controller
                        control={control}
                        name="startDate"
                        defaultValue={subjectState?.startDate}
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
                              sjStartDate === null
                                ? null
                                : new Date(sjStartDate)
                            }
                            placeholderText="날짜를 선택해주세요."
                            isClearable
                            onChange={date => {
                              field.onChange(date)
                              setSjStartDate(date)
                            }}
                            dateFormat="yyyy/MM/dd"
                            onChangeRaw={e => e.preventDefault()}
                            onFocus={e => e.target.blur()}
                            customInput={
                              <Input
                                label="개강일"
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
                  </AreaBox>
                  <AreaBox>
                    <DatePickerBox>
                      <Controller
                        control={control}
                        name="endDate"
                        defaultValue={subjectState?.endDate}
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
                              sjEndDate === null ? null : new Date(sjEndDate)
                            }
                            placeholderText="날짜를 선택해주세요."
                            isClearable
                            onChange={date => {
                              field.onChange(date)
                              setSjEndDate(date)
                            }}
                            dateFormat="yyyy/MM/dd"
                            onChangeRaw={e => e.preventDefault()}
                            onFocus={e => e.target.blur()}
                            customInput={
                              <Input
                                label="종강일"
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
                  </AreaBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="총 강의시간"
                      variant="bordered"
                      radius="md"
                      type="text"
                      label="총 강의시간"
                      defaultValue={subjectState?.totalTime}
                      onChange={e => {
                        register('totalTime').onChange(e)
                      }}
                      className="w-full"
                      {...register('totalTime', {
                        pattern: {
                          value: /^[0-9]+$/,
                          message: '숫자만 입력 가능합니다.',
                        },
                      })}
                    />
                    {errors.totalTime && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.totalTime.message)}
                      </p>
                    )}
                  </AreaBox>
                </FlexBox>
                <BtnBox $isMaster={mGrade < grade.general}>
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
                    이전으로
                  </Button2>
                  <Button2
                    buttonType="button"
                    width="100%"
                    height="2.5rem"
                    typeBorder={true}
                    fontColor="#ff5900"
                    bgColor="#fff"
                    borderColor="#ff5900"
                    onClick={() => onCopy()}
                  >
                    복사하기
                  </Button2>
                  {mGrade < grade.general && (
                    <Button2
                      buttonType="button"
                      width="100%"
                      height="2.5rem"
                      typeBorder={true}
                      fontColor="#fff"
                      bgColor="#ff5900"
                      onClick={() => onDelete(subjectState.id)}
                    >
                      삭제
                    </Button2>
                  )}
                </BtnBox>
              </DetailForm>
            </DetailBox>
            {subjectRoundItem?.length > 1 && (
              <DetailBox>
                <SemiTitle>동일 과정코드 내역</SemiTitle>

                <ColFlexBox>
                  {subjectRoundItem
                    .filter(item => item.id !== subjectState.id)
                    .map((item, index) => (
                      <SubjectRoundItem key={index} listData={item} />
                    ))}
                </ColFlexBox>
              </DetailBox>
            )}
          </ConArea>
        </MainWrap>
      )}
    </>
  )
}
SubjectDetail.getLayout = page => <Layout>{page}</Layout>
