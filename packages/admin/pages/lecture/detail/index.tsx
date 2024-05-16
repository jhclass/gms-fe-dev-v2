import MainWrap from '@/components/wrappers/MainWrap'
import { useEffect, useRef, useState } from 'react'
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
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Switch,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import { classRoomState, gradeState, subStatusState } from '@/lib/recoilAtoms'
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
import SubjectModal from '@/components/modal/SubjectModal'
import LectureDates from '@/components/modal/LectureDates'
import TeacherSelect from '@/components/common/TeacherSelect'

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
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`
const AreaBox = styled.div`
  flex: 1;
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

export default function SubjectDetail() {
  const grade = useRecoilValue(gradeState)
  const router = useRouter()
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const classRoom = useRecoilValue(classRoomState)
  const [subjectState, setSubjectState] = useState(null)
  const [subjectRoundItem, setSubjectRoundItem] = useState([])
  const subStatus = useRecoilValue(subStatusState)
  const [sub, setSub] = useState('없음')
  const [teacher, setTeacher] = useState('강사명 없음')
  const [room, setRoom] = useState('강의실 없음')
  const [subjectSelectedData, setSubjectSelectedData] = useState(null)
  const [subjectSelected, setSubjectSelected] = useState(null)
  const [datesSelected, setDatesSelected] = useState(null)
  const years = _.range(2000, getYear(new Date()) + 5, 1)
  const [expStartDate, setExpStartDate] = useState(null)
  const [expEndDate, setExpEndDate] = useState(null)
  const [sjStartDate, setSjStartDate] = useState(null)
  const [sjEndDate, setSjEndDate] = useState(null)
  const [isReport, setIsReport] = useState('Y')
  const fileInputRef = useRef(null)
  const [fileName, setFileName] = useState('파일을 선택하세요.')

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
    formState,
  } = useForm()

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

  const handleRoomChange = e => {
    setRoom(e.target.value)
  }

  const handleTypeChange = value => {
    setIsReport(value)
  }

  const handleFileChange = event => {
    const file = event.target.files[0]
    if (file) {
      setFileName(file.name)
    }
  }
  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const renderMonthContent = (shortMonth, longMonth, day) => {
    const fullYear = new Date(day).getFullYear()
    const tooltipText = `Tooltip for month: ${longMonth} ${fullYear}`

    return <span title={tooltipText}>{shortMonth + 1}</span>
  }

  return (
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
                {formatDate(subjectState?.updatedAt, true)}
              </UpdateTime>
            </TopInfo>
            <DetailForm>
              <FlexBox>
                <AreaBox style={{ minWidth: '20%' }}>
                  <Select
                    labelPlacement="outside"
                    defaultValue={subjectState?.subDiv}
                    label={
                      <FilterLabel>
                        학교(원)<span>*</span>
                      </FilterLabel>
                    }
                    placeholder=" "
                    className="w-full"
                    variant="bordered"
                    selectedKeys={['신촌']}
                  >
                    <SelectItem key={'신촌'} value={'신촌'}>
                      {'신촌'}
                    </SelectItem>
                  </Select>
                </AreaBox>
                <AreaBox>
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
                        handleSubChange(value)
                      }
                    }}
                  >
                    {Object.entries({
                      ...subStatus,
                      실업자: '실업자',
                      재직자: '재직자',
                    }).map(([key, item]) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </Select>
                </AreaBox>
                <AreaBox>
                  <DatePickerBox>
                    <Controller
                      control={control}
                      name="expiresDateStart"
                      defaultValue={subjectState?.expiresDateStart}
                      render={({ field }) => (
                        <DatePicker
                          renderMonthContent={renderMonthContent}
                          showMonthYearPicker
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
                          dateFormat="yyyy/MM"
                          onChangeRaw={e => e.preventDefault()}
                          onFocus={e => e.target.blur()}
                          customInput={
                            <Input
                              label={
                                <FilterLabel>
                                  강의배정 년월<span>*</span>
                                </FilterLabel>
                              }
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
                    label={
                      <FilterLabel>
                        표시과목명<span>*</span>
                      </FilterLabel>
                    }
                    minRows={1}
                  />
                </AreaBox>
              </FlexBox>
              <FlexBox>
                <AreaBox>
                  <Textarea
                    readOnly
                    label={
                      <FilterLabel>
                        과목 선택<span>*</span>
                      </FilterLabel>
                    }
                    labelPlacement="outside"
                    className="max-w-full"
                    variant="bordered"
                    minRows={1}
                    onClick={sbjOpen}
                  />
                </AreaBox>
              </FlexBox>
              <FlexBox>
                <AreaBox>
                  <Controller
                    control={control}
                    name="teacherName"
                    defaultValue={subjectState?.teacherName}
                    render={({ field }) => (
                      <Controller
                        control={control}
                        name="teacherName"
                        render={({ field, fieldState }) => (
                          <TeacherSelect
                            selecedKey={teacher}
                            defaultValue={subjectState?.teacherName}
                            field={field}
                            label={'강사명'}
                            handleChange={handleTeacherChange}
                            optionDefualt={{
                              mUsername: '강사명 없음',
                              mUserId: '강사명 없음',
                            }}
                          />
                        )}
                      />
                    )}
                  />
                </AreaBox>
                <AreaBox>
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
                </AreaBox>
                <AreaBox>
                  <TimeBox>
                    <DatePickerBox>
                      <Controller
                        control={control}
                        name="startTime"
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
                            selected={
                              sjEndDate === null ? null : new Date(sjEndDate)
                            }
                            placeholderText="시작시간"
                            isClearable
                            onChange={date => {
                              field.onChange(date)
                              setSjEndDate(date)
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
                                label="강의 시간"
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
                        name="endTime"
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
                            selected={
                              sjEndDate === null ? null : new Date(sjEndDate)
                            }
                            placeholderText="종료시간"
                            isClearable
                            onChange={date => {
                              field.onChange(date)
                              setSjEndDate(date)
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
                            sjStartDate === null ? null : new Date(sjStartDate)
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
                              label="강의 기간(개강일)"
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
                              label="강의 기간(종강일)"
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
                  <FilterLabel>
                    요일선택<span>*</span>
                  </FilterLabel>
                  <div className="flex items-end gap-3">
                    <Button color={'primary'} onClick={onOpen}>
                      요일선택
                    </Button>
                    {datesSelected !== null && (
                      <SText>
                        총 수업 일수 <b>{datesSelected.length}</b>일
                      </SText>
                    )}
                  </div>
                </AreaBox>
              </FlexBox>
              <FlexBox>
                <AreaBox>
                  <RadioBox>
                    <Controller
                      control={control}
                      name="cashOrCard"
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
                </AreaBox>
              </FlexBox>
              {isReport === 'Y' && (
                <>
                  <FlexBox>
                    <AreaBox>
                      <Input
                        labelPlacement="outside"
                        placeholder="숫자만 입력해주세요"
                        variant="bordered"
                        radius="md"
                        type="text"
                        label={
                          <FilterLabel>
                            승인인원<span>*</span>
                          </FilterLabel>
                        }
                        defaultValue={subjectState?.roomNum}
                        onChange={e => {
                          // register('roomNum').onChange(e)
                        }}
                        className="w-full"
                        // {...register('roomNum', {
                        //   pattern: {
                        //     value: /^[가-힣a-zA-Z0-9\s]*$/,
                        //     message: '한글, 영어, 숫자만 사용 가능합니다.',
                        //   },
                        // })}
                      />
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
                            확정인원<span>*</span>
                          </FilterLabel>
                        }
                        defaultValue={subjectState?.roomNum}
                        onChange={e => {
                          // register('roomNum').onChange(e)
                        }}
                        className="w-full"
                        // {...register('roomNum', {
                        //   pattern: {
                        //     value: /^[가-힣a-zA-Z0-9\s]*$/,
                        //     message: '한글, 영어, 숫자만 사용 가능합니다.',
                        //   },
                        // })}
                      />
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
                    </AreaBox>
                  </FlexBox>
                  <FlexBox>
                    <AreaBox>
                      <FilterLabel className="file">
                        훈련시간표 첨부
                      </FilterLabel>
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
                          readOnly={true}
                          labelPlacement="outside"
                          placeholder=" "
                          variant="faded"
                          radius="md"
                          type="text"
                          label=""
                          value={fileName}
                        />
                      </TimeBox>
                    </AreaBox>
                  </FlexBox>
                </>
              )}
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
      />
      <LectureDates
        isOpen={isOpen}
        onClose={onClose}
        setValue={setValue}
        setDatesSelected={setDatesSelected}
      />
    </>
  )
}
SubjectDetail.getLayout = page => <Layout>{page}</Layout>
