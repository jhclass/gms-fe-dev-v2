import MainWrap from '@/components/wrappers/MainWrap'
import { Suspense, useEffect, useRef, useState } from 'react'
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
  Input,
  Link,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import {
  EDIT_LECTURES_MUTATION,
  SEARCH_LECTURES_MUTATION,
} from '@/graphql/mutations'
import { Controller, useForm } from 'react-hook-form'
import Button2 from '@/components/common/Button'
import DatePickerHeader from '@/components/common/DatePickerHeader'
import Layout from '@/pages/subjects/layout'
import SubjectModal from '@/components/modal/SubjectModal'
import LectureDates from '@/components/modal/LectureDates'
import TeacherMultiSelectID from '@/components/common/TeacherMultiSelectID'
import useUserLogsMutation from '@/utils/userLogs'
import SubDivSelect from '@/components/common/SubDivSelect'
import { useRecoilValue } from 'recoil'
import { gradeState } from '@/lib/recoilAtoms'
import useMmeQuery from '@/utils/mMe'

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
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`
const AreaBox = styled.div`
  flex: 1;
  position: relative;
`
const TimeBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;

  p {
    height: 40px;
    line-height: 40px;
  }
`

const SText = styled.p`
  font-size: 0.875rem;
  height: 40px;
  line-height: 40px;
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
  width: 100%;
  align-items: center;
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

  &.file {
    padding-bottom: 0.5rem;
  }
`
const BtnBox = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`

const LodingDiv = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-width: 20rem;
  position: relative;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const AddLink = styled.p`
  > a {
    font-size: 0.8rem;
    color: #71717a;
  }
  position: absolute;
  top: 0;
  right: 0;
  z-index: 5;
`

export default function LectureWrite() {
  const router = useRouter()
  const lectureId = typeof router.query.id === 'string' ? router.query.id : null
  const grade = useRecoilValue(gradeState)
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const mPart = useMme('mPart')
  const { userLogs } = useUserLogsMutation()
  const [searchLectures] = useMutation(SEARCH_LECTURES_MUTATION)
  const [editLectures] = useMutation(EDIT_LECTURES_MUTATION, {
    context: {
      headers: {
        'x-apollo-operation-name': 'timetableAttached',
        // 'apollo-require-preflight': 'true',
      },
    },
  })
  const [campusName, setCampusName] = useState('신촌')
  const [subjectState, setSubjectState] = useState(null)
  const [sub, setSub] = useState('없음')
  const [teacher, setTeacher] = useState([])
  const [subjectSelectedData, setSubjectSelectedData] = useState(null)
  const [subjectSelected, setSubjectSelected] = useState(null)
  const [datesSelected, setDatesSelected] = useState(null)
  const years = _.range(2000, getYear(new Date()) + 5, 1)
  const [lectureStart, setLectureStart] = useState(null)
  const [lectureStartTime, setLectureStartTime] = useState(null)
  const [lectureEndTime, setLectureEndTime] = useState(null)
  const [lectureStartDate, setLectureStartDate] = useState(null)
  const [lectureEndDate, setLectureEndDate] = useState(null)
  const [isReport, setIsReport] = useState('Y')
  const fileInputRef = useRef(null)
  const [fileName, setFileName] = useState('파일을 입력해주세요.')
  const [lectureData, setLectureData] = useState(null)

  const {
    isOpen: sbjIsOpen,
    onOpen: sbjOpen,
    onClose: sbjClose,
  } = useDisclosure()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    register,
    getValues,
    control,
    setError,
    setValue,
    handleSubmit,
    resetField,
    reset,
    clearErrors,
    formState,
  } = useForm({
    defaultValues: {
      campus: lectureData?.campus,
      temporaryName: lectureData?.temporaryName,
      subDiv: lectureData?.subDiv,
      teachersId: lectureData?.teachersId,
      roomNum: lectureData?.roomNum,
      subjectId: lectureData?.subjectId,
      lecturePeriodStart: lectureData?.lecturePeriodStart,
      lecturePeriodEnd: lectureData?.lecturePeriodEnd,
      lectureDetails: lectureData?.lectureDetails,
      lectureTime: lectureData?.lectureTime,
      eduStatusReport: lectureData?.eduStatusReport,
      approvedNum: lectureData?.approvedNum,
      confirmedNum: lectureData?.confirmedNum,
      sessionNum: lectureData?.sessionNum,
      timetableAttached: lectureData?.timetableAttached,
    },
  })
  const { errors, dirtyFields, isDirty } = formState

  useEffect(() => {
    searchLectures({
      variables: {
        searchLecturesId: parseInt(lectureId),
      },
      onCompleted: result => {
        if (result.searchLectures.ok) {
          setLectureData(result.searchLectures.data[0])
        }
      },
    })
  }, [lectureId])

  const extractFileName = url => {
    if (url !== null) {
      const lastSlashIndex = url.lastIndexOf('/')
      const afterLastSlash = url.substring(lastSlashIndex + 1)
      const firstHyphenIndex = afterLastSlash.indexOf('-')
      const secondHyphenIndex = afterLastSlash.indexOf(
        '-',
        firstHyphenIndex + 1,
      )
      const fileNames = afterLastSlash.substring(secondHyphenIndex + 1)
      return fileNames
    }
  }

  useEffect(() => {
    if (lectureData) {
      if (lectureData.campus) {
        setCampusName(lectureData.campus)
      }
      if (lectureData.subDiv) {
        setSub(lectureData.subDiv)
      }
      if (lectureData.eduStatusReport) {
        setIsReport(lectureData.eduStatusReport)
      }

      if (lectureData?.lectureTime) {
        const startTime = new Date(lectureData?.lectureTime[0])
        const endTime = new Date(lectureData?.lectureTime[1])
        setLectureStartTime(startTime)
        setLectureEndTime(endTime)
      }

      if (lectureData?.lecturePeriodStart) {
        const date = parseInt(lectureData?.lecturePeriodStart)
        setLectureStartDate(date)
      }

      if (lectureData?.lecturePeriodEnd) {
        const date = parseInt(lectureData?.lecturePeriodEnd)
        setLectureEndDate(date)
      }

      if (lectureData?.teachers) {
        const date = lectureData?.teachers.map(teacher => String(teacher.id))
        setTeacher(date)
      }

      if (
        lectureData?.timetableAttached === undefined ||
        lectureData?.timetableAttached === null
      ) {
        setFileName('파일을 입력해주세요.')
      } else {
        const date = extractFileName(lectureData?.timetableAttached)
        setFileName(date)
      }
    }
  }, [lectureData])

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

  const handleCampusNameChange = e => {
    setCampusName(e.target.value)
  }

  const handleSubChange = e => {
    setSub(e.target.value)
  }

  // const handleRoomChange = e => {
  //   setRoom(e.target.value)
  // }

  const handleTypeChange = value => {
    setIsReport(value)
  }

  const handleFileChange = event => {
    const MAX_FILE_SIZE = 10 * 1024 * 1024
    const file = event.target.files[0]
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError('timetableAttached', {
          type: 'manual',
          message: '파일이 너무 큽니다. 10Mb이하만 가능합니다.',
        })
        setFileName('')
        fileInputRef.current.value = ''
        resetField('timetableAttached')
      } else {
        clearErrors('timetableAttached')
        setFileName(file.name)
        setValue('timetableAttached', file, { shouldDirty: true })
      }
    }
  }
  const handleButtonClick = e => {
    fileInputRef.current.click()
  }

  const onSubmit = async data => {
    if (isDirty) {
      const isModify = confirm('변경사항이 있습니다. 수정하시겠습니까?')
      if (isModify) {
        try {
          let teachersIdArray
          if (dirtyFields.teachersId) {
            teachersIdArray = data.teachersId
              .split(',')
              .filter(Boolean)
              .map(Number)
          }
          const result = await editLectures({
            variables: {
              editLecturesId: parseInt(lectureId),
              campus: data.campus,
              temporaryName: data.temporaryName,
              subDiv: data.subDiv,
              teachersId: dirtyFields.teachersId && teachersIdArray,
              roomNum: data.roomNum,
              subjectId:
                subjectSelectedData !== null
                  ? parseInt(subjectSelectedData.id)
                  : lectureData.subjectId,
              lecturePeriodStart: dirtyFields.lecturePeriodStart
                ? new Date(data.lecturePeriodStart)
                : new Date(parseInt(lectureData.lecturePeriodStart)),
              lecturePeriodEnd: dirtyFields.lecturePeriodEnd
                ? new Date(data.lecturePeriodEnd)
                : new Date(parseInt(lectureData.lecturePeriodEnd)),
              lectureDetails: dirtyFields.lectureDetails
                ? data.lectureDetails
                : lectureData.lectureDetails,
              lectureTime: dirtyFields.lectureTime
                ? [lectureStartTime, lectureEndTime]
                : lectureData.lectureTime,
              eduStatusReport: dirtyFields.eduStatusReport
                ? data.eduStatusReport
                : lectureData.eduStatusReport,
              approvedNum: dirtyFields.approvedNum
                ? parseInt(data.approvedNum)
                : lectureData.approvedNum,
              confirmedNum: dirtyFields.confirmedNum
                ? parseInt(data.confirmedNum)
                : lectureData.confirmedNum,
              sessionNum: dirtyFields.sessionNum
                ? parseInt(data.sessionNum)
                : lectureData.sessionNum,
              timetableAttached:
                dirtyFields.timetableAttached && data.timetableAttached,
            },
            // refetchQueries: [
            //   {
            //     query: SEE_SUBJECT_QUERY,
            //     variables: { page: 1, limit: 10 },
            //   },
            // ],
          })

          if (!result.data.editLectures.ok) {
            throw new Error('과정 수정 실패')
          }
          alert('수정되었습니다.')
          const dirtyFieldsArray = [...Object.keys(dirtyFields)]
          userLogs(
            `${lectureId} ${data.temporaryName} 강의 정보 수정`,
            dirtyFieldsArray.join(', '),
          )
          router.push('/lecture')
        } catch (error) {
          console.error('강의 수정 중 에러 발생:', error)
          alert('강의 수정 처리 중 오류가 발생했습니다.')
        }
      }
    }
  }

  const handleClick = () => {
    router.push({
      pathname: '/setting/types',
      query: { typeTab: 'subDiv' },
    })
  }

  return (
    lectureData && (
      <>
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
                  {formatDate(lectureData?.updatedAt, true)}
                </UpdateTime>
              </TopInfo>
              <DetailForm onSubmit={handleSubmit(onSubmit)}>
                <FlexBox>
                  <AreaBox style={{ minWidth: '20%' }}>
                    <Controller
                      control={control}
                      name="campus"
                      defaultValue={lectureData.campus}
                      rules={{
                        required: {
                          value: true,
                          message: '캠퍼스를 선택해주세요',
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <Select
                          labelPlacement="outside"
                          label={
                            <FilterLabel>
                              캠퍼스<span>*</span>
                            </FilterLabel>
                          }
                          placeholder=" "
                          className="w-full"
                          variant="bordered"
                          defaultSelectedKeys={[campusName]}
                          selectedKeys={[campusName]}
                          onChange={value => {
                            if (value.target.value !== '') {
                              field.onChange(value)
                              handleCampusNameChange(value)
                            }
                          }}
                        >
                          <SelectItem key={'신촌'} value={'신촌'}>
                            {'신촌'}
                          </SelectItem>
                          <SelectItem key={'홍대'} value={'홍대'}>
                            {'홍대'}
                          </SelectItem>
                        </Select>
                      )}
                    />
                    {errors.campus && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.campus.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <Controller
                      control={control}
                      name="subDiv"
                      defaultValue={lectureData.subDiv}
                      rules={{
                        required: {
                          value: true,
                          message: '수강 구분을 선택해주세요.',
                        },
                      }}
                      render={({ field, fieldState }) => (
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
                              <FilterLabel>
                                수강구분<span>*</span>
                              </FilterLabel>
                            }
                            handleChange={handleSubChange}
                            isHyphen={false}
                          />
                        </Suspense>
                      )}
                    />
                    {errors.subDiv && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.subDiv.message)}
                      </p>
                    )}
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
                  <AreaBox>
                    <Textarea
                      labelPlacement="outside"
                      placeholder="표시과목명"
                      variant="bordered"
                      radius="md"
                      type="text"
                      defaultValue={lectureData.temporaryName}
                      label={
                        <FilterLabel>
                          표시과목명<span>*</span>
                        </FilterLabel>
                      }
                      minRows={1}
                      onChange={e => {
                        register('temporaryName').onChange(e)
                      }}
                      className="w-full"
                      {...register('temporaryName', {
                        required: {
                          value: true,
                          message: '표시과목명을 입력해주세요.',
                        },
                      })}
                    />
                    {errors.temporaryName && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.temporaryName.message)}
                      </p>
                    )}
                  </AreaBox>
                </FlexBox>
                <FlexBox>
                  <AreaBox>
                    <Textarea
                      readOnly
                      value={
                        subjectSelectedData?.subjectName !== undefined
                          ? String(subjectSelectedData?.subjectName)
                          : lectureData?.subject?.subjectName !== null
                          ? lectureData?.subject?.subjectName
                          : ''
                      }
                      label={
                        <FilterLabel>
                          과정 선택<span>*</span>
                        </FilterLabel>
                      }
                      defaultValue={lectureData.subjectId}
                      labelPlacement="outside"
                      className="max-w-full"
                      variant="bordered"
                      minRows={1}
                      onClick={sbjOpen}
                      {...register('subjectId', {
                        required: {
                          value: true,
                          message: '과정을 선택해 주세요.',
                        },
                      })}
                    />
                    {errors.subjectId && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.subjectId.message)}
                      </p>
                    )}
                  </AreaBox>
                </FlexBox>
                <FlexBox>
                  <AreaBox>
                    <Controller
                      control={control}
                      name="teachersId"
                      defaultValue={lectureData.teachers}
                      rules={{
                        required: {
                          value: true,
                          message: '강사를 선택해주세요.',
                        },
                      }}
                      render={({ field }) => (
                        <Controller
                          control={control}
                          name="teachersId"
                          render={({ field, fieldState }) => (
                            <TeacherMultiSelectID
                              selecedKey={teacher}
                              field={field}
                              label={
                                <FilterLabel>
                                  강사명<span>*</span>
                                </FilterLabel>
                              }
                              handleChange={setTeacher}
                              optionDefualt={{
                                mUsername: '강사명 없음',
                                id: '강사명 없음',
                              }}
                            />
                          )}
                        />
                      )}
                    />
                    {errors.teachersId && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.teachersId.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="예) 204호 또는 별관 204호"
                      variant="bordered"
                      radius="md"
                      type="text"
                      defaultValue={lectureData.roomNum}
                      label={
                        <FilterLabel>
                          강의실<span>*</span>
                        </FilterLabel>
                      }
                      onChange={e => {
                        register('roomNum').onChange(e)
                      }}
                      className="w-full"
                      {...register('roomNum', {
                        required: {
                          value: true,
                          message: '강의실을 입력해 주세요.',
                        },
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
                    name="roomNum"
                    defaultValue={subjectState?.teacherName}
                    render={({ field }) => (
                      <Select
                        labelPlacement="outside"
                        label="강의실"
                        placeholder=" "
                        className="w-full"
                        variant="bordered"
                        defaultValue={subjectState?.teacherName}
                        selectedKeys={[room]}
                        onChange={value => {
                          if (value.target.value !== '') {
                            field.onChange(value)
                            handleRoomChange(value)
                          }
                        }}
                      >
                        {Object.entries(classRoom).map(([key, item]) => (
                          <SelectItem key={item} value={key}>
                            {item}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  />
                </AreaBox> */}
                  <AreaBox>
                    <TimeBox>
                      <DatePickerBox>
                        <Controller
                          control={control}
                          name="lectureTime"
                          defaultValue={lectureData.lectureTime[0]}
                          rules={{
                            required: {
                              value: true,
                              message: '강의 시작시간을 선택해주세요.',
                            },
                          }}
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
                              selectsStart
                              selected={
                                lectureStartTime === null
                                  ? null
                                  : new Date(lectureStartTime)
                              }
                              placeholderText="시작시간"
                              isClearable
                              onChange={date => {
                                field.onChange(date)
                                setLectureStartTime(date)
                              }}
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={10}
                              timeCaption="Time"
                              dateFormat="HH:mm"
                              onChangeRaw={e => e.preventDefault()}
                              onFocus={e => e.target.blur()}
                              customInput={
                                <Input
                                  label={
                                    <FilterLabel>
                                      강의시간<span>*</span>
                                    </FilterLabel>
                                  }
                                  labelPlacement="outside"
                                  type="text"
                                  variant="bordered"
                                  id="date"
                                  classNames={{
                                    input: 'caret-transparent',
                                  }}
                                  isReadOnly={true}
                                  startContent={<i className="xi-time-o" />}
                                />
                              }
                            />
                          )}
                        />
                      </DatePickerBox>
                      <p>-</p>
                      <DatePickerBox>
                        <Controller
                          control={control}
                          defaultValue={lectureData.lectureTime[1]}
                          name="lectureTime"
                          rules={{
                            required: {
                              value: true,
                              message: '강의 종료시간을 선택해주세요.',
                            },
                          }}
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
                              selected={
                                lectureEndTime === null
                                  ? null
                                  : new Date(lectureEndTime)
                              }
                              placeholderText="종료시간"
                              isClearable
                              selectsEnd
                              onChange={date => {
                                field.onChange(date)
                                setLectureEndTime(date)
                              }}
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={10}
                              timeCaption="Time"
                              dateFormat="HH:mm"
                              onChangeRaw={e => e.preventDefault()}
                              onFocus={e => e.target.blur()}
                              customInput={
                                <Input
                                  label=" "
                                  labelPlacement="outside"
                                  type="text"
                                  variant="bordered"
                                  id="date"
                                  classNames={{
                                    input: 'caret-transparent',
                                  }}
                                  isReadOnly={true}
                                  startContent={<i className="xi-time-o" />}
                                />
                              }
                            />
                          )}
                        />
                      </DatePickerBox>
                    </TimeBox>
                    {errors.lectureTime && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.lectureTime.message)}
                      </p>
                    )}
                  </AreaBox>
                </FlexBox>
                <FlexBox>
                  <AreaBox>
                    <DatePickerBox>
                      <Controller
                        control={control}
                        name="lecturePeriodStart"
                        defaultValue={lectureData.lecturePeriodStart}
                        rules={{
                          required: {
                            value: true,
                            message: '개강일을 선택해주세요.',
                          },
                        }}
                        render={({ field: startField }) => (
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
                              lectureStartDate === null
                                ? null
                                : new Date(lectureStartDate)
                            }
                            placeholderText="날짜를 선택해주세요."
                            isClearable
                            onChange={startDate => {
                              const adjustedDate = startDate
                                ? new Date(
                                    startDate.getFullYear(),
                                    startDate.getMonth(),
                                    startDate.getDate(),
                                    10,
                                    10,
                                    10,
                                  )
                                : null
                              startField.onChange(adjustedDate)
                              setLectureStartDate(adjustedDate)
                            }}
                            dateFormat="yyyy/MM/dd"
                            onChangeRaw={e => e.preventDefault()}
                            onFocus={e => e.target.blur()}
                            customInput={
                              <Input
                                label={
                                  <FilterLabel>
                                    개강일<span>*</span>
                                  </FilterLabel>
                                }
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
                    {errors.lecturePeriodStart && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.lecturePeriodStart.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <DatePickerBox>
                      <Controller
                        control={control}
                        name="lecturePeriodEnd"
                        defaultValue={lectureData.lecturePeriodEnd}
                        rules={{
                          required: {
                            value: true,
                            message: '종강일을 선택해주세요.',
                          },
                        }}
                        render={({ field: endField }) => (
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
                              lectureEndDate === null
                                ? null
                                : new Date(lectureEndDate)
                            }
                            minDate={new Date(lectureStartDate)}
                            placeholderText="날짜를 선택해주세요."
                            isClearable
                            onChange={endDate => {
                              const adjustedEndDate = endDate
                                ? new Date(
                                    endDate.getFullYear(),
                                    endDate.getMonth(),
                                    endDate.getDate(),
                                    23,
                                    59,
                                    59,
                                  )
                                : null
                              endField.onChange(adjustedEndDate)
                              setLectureEndDate(adjustedEndDate)
                            }}
                            dateFormat="yyyy/MM/dd"
                            onChangeRaw={e => e.preventDefault()}
                            onFocus={e => e.target.blur()}
                            customInput={
                              <Input
                                label={
                                  <FilterLabel>
                                    종강일<span>*</span>
                                  </FilterLabel>
                                }
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
                    {errors.lecturePeriodEnd && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.lecturePeriodEnd.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <FilterLabel>
                      요일선택<span>*</span>
                    </FilterLabel>
                    <div className="flex items-end gap-3 mt-1.5">
                      <Button
                        isDisabled={
                          lectureStartDate === null || lectureEndDate === null
                            ? true
                            : false
                        }
                        color={'primary'}
                        onClick={onOpen}
                      >
                        요일선택
                      </Button>
                      <Input
                        readOnly
                        defaultValue={lectureData?.lectureDetails}
                        labelPlacement="outside"
                        className="max-w-full"
                        variant="bordered"
                        onChange={e => {
                          register('lectureDetails').onChange(e)
                        }}
                        {...register('lectureDetails', {
                          required: {
                            value: true,
                            message: '요일을 선택해 주세요.',
                          },
                        })}
                      />
                    </div>
                    {errors.lectureDetails && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.lectureDetails.message)}
                      </p>
                    )}
                  </AreaBox>
                </FlexBox>
                <FlexBox>
                  <AreaBox>
                    <RadioBox>
                      <Controller
                        control={control}
                        defaultValue={lectureData.eduStatusReport}
                        name="eduStatusReport"
                        rules={{
                          required: {
                            value: true,
                            message: '교육상황보고 연동여부를 선택해주세요.',
                          },
                        }}
                        render={({ field }) => (
                          <RadioGroup
                            label={
                              <FilterLabel>
                                교육상황보고 연동여부<span>*</span>
                              </FilterLabel>
                            }
                            orientation="horizontal"
                            className="gap-[0.65rem]"
                            value={isReport}
                            onValueChange={value => {
                              field.onChange(value)
                              handleTypeChange(value)
                            }}
                          >
                            <Radio key={'Y'} value={'Y'}>
                              예
                            </Radio>
                            <Radio key={'N'} value={'N'}>
                              아니오
                            </Radio>
                          </RadioGroup>
                        )}
                      />
                    </RadioBox>
                    {errors.eduStatusReport && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.eduStatusReport.message)}
                      </p>
                    )}
                  </AreaBox>
                </FlexBox>
                <FlexBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="숫자만 입력해주세요"
                      variant="bordered"
                      radius="md"
                      type="text"
                      defaultValue={lectureData.ApprovedNum}
                      label={
                        <FilterLabel>
                          승인인원<span>*</span>
                        </FilterLabel>
                      }
                      onChange={e => {
                        register('approvedNum').onChange(e)
                      }}
                      className="w-full"
                      {...register('approvedNum', {
                        required: {
                          value: true,
                          message: '승인 인원을 입력해주세요.',
                        },
                        pattern: {
                          value: /^[가-힣a-zA-Z0-9\s]*$/,
                          message: '한글, 영어, 숫자만 사용 가능합니다.',
                        },
                      })}
                    />
                    {errors.approvedNum && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.approvedNum.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="숫자만 입력해주세요"
                      variant="bordered"
                      radius="md"
                      type="text"
                      defaultValue={lectureData.confirmedNum}
                      label={
                        <FilterLabel>
                          확정인원<span>*</span>
                        </FilterLabel>
                      }
                      onChange={e => {
                        register('confirmedNum').onChange(e)
                      }}
                      className="w-full"
                      {...register('confirmedNum', {
                        required: {
                          value: true,
                          message: '승인 인원을 입력해주세요.',
                        },
                        pattern: {
                          value: /^[가-힣a-zA-Z0-9\s]*$/,
                          message: '한글, 영어, 숫자만 사용 가능합니다.',
                        },
                      })}
                    />
                    {errors.confirmedNum && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.confirmedNum.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="숫자만 입력해주세요"
                      variant="bordered"
                      radius="md"
                      type="text"
                      label={
                        <FilterLabel>
                          교육회차<span>*</span>
                        </FilterLabel>
                      }
                      defaultValue={String(lectureData.sessionNum)}
                      onChange={e => {
                        register('sessionNum').onChange(e)
                      }}
                      className="w-full"
                      {...register('sessionNum', {
                        required: {
                          value: true,
                          message: '승인 인원을 입력해주세요.',
                        },
                        pattern: {
                          value: /^[가-힣a-zA-Z0-9\s]*$/,
                          message: '한글, 영어, 숫자만 사용 가능합니다.',
                        },
                      })}
                    />
                    {errors.sessionNum && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.sessionNum.message)}
                      </p>
                    )}
                  </AreaBox>
                </FlexBox>
                <FlexBox>
                  <AreaBox>
                    <FilterLabel className="file">훈련시간표 첨부</FilterLabel>
                    <TimeBox>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                      <Button color={'primary'} onClick={handleButtonClick}>
                        파일 선택
                      </Button>
                      <Input
                        readOnly
                        placeholder=" "
                        variant="faded"
                        radius="md"
                        type="text"
                        defaultValue={'asd'}
                        value={fileName}
                        {...register('timetableAttached')}
                      />
                    </TimeBox>
                    {errors.timetableAttached && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.timetableAttached.message)}
                      </p>
                    )}
                    {/* <TimeBox>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                    <Button color={'primary'} onClick={handleButtonClick}>
                      파일 선택
                    </Button>
                    <Input
                      readOnly={true}
                      labelPlacement="outside"
                      placeholder=" "
                      variant="faded"
                      radius="md"
                      type="text"
                      label=""
                      value={fileName}
                    />
                  </TimeBox> */}
                  </AreaBox>
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
                    이전으로
                  </Button2>
                </BtnBox>
              </DetailForm>
            </DetailBox>
          </ConArea>
        </MainWrap>
        <SubjectModal
          subjectSelected={subjectSelected}
          setSubjectSelected={setSubjectSelected}
          setSubjectSelectedData={setSubjectSelectedData}
          sbjIsOpen={sbjIsOpen}
          sbjClose={sbjClose}
          setValue={setValue}
          radio={true}
          isLecture={true}
        />

        <LectureDates
          isOpen={isOpen}
          onClose={onClose}
          setValue={setValue}
          setDatesSelected={setDatesSelected}
          startDate={lectureStartDate}
          endDate={lectureEndDate}
        />
      </>
    )
  )
}
LectureWrite.getLayout = page => <Layout>{page}</Layout>