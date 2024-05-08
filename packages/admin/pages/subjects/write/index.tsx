import MainWrap from '@/components/wrappers/MainWrap'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import router from 'next/router'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { getYear } from 'date-fns'
registerLocale('ko', ko)
const _ = require('lodash')
import { Input, Select, SelectItem, Switch, Textarea } from '@nextui-org/react'
import { subStatusState } from '@/lib/recoilAtoms'
import { useRecoilValue } from 'recoil'
import { useMutation } from '@apollo/client'
import { CREATE_SUBJECT_MUTATION } from '@/graphql/mutations'
import { Controller, useForm } from 'react-hook-form'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'
import { SEE_SUBJECT_QUERY } from '@/graphql/queries'
import DatePickerHeader from '@/components/common/DatePickerHeader'
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
const BtnBox = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`

export default function SubjectWrite() {
  const [createSubject] = useMutation(CREATE_SUBJECT_MUTATION)
  const { userLogs } = useUserLogsMutation()
  const subStatus = useRecoilValue(subStatusState)
  const { register, control, handleSubmit, formState } = useForm()
  const { errors } = formState
  const [expStartDate, setExpStartDate] = useState(null)
  const [expEndDate, setExpEndDate] = useState(null)
  const [sjStartDate, setSjStartDate] = useState(null)
  const [sjEndDate, setSjEndDate] = useState(null)
  const [sub, setSub] = useState('없음')
  const [teacher, setTeacher] = useState('강사명 없음')
  const [isSelected, setIsSelected] = useState(false)
  const years = _.range(2000, getYear(new Date()) + 5, 1)

  const onSubmit = async data => {
    try {
      const result = await createSubject({
        variables: {
          subDiv: data.subDiv,
          round: 1,
          subjectName: data.subjectName.trim(),
          subjectCode: data.subjectCode === '' ? null : data.subjectCode.trim(),
          fee: parseInt(data.fee.trim()),
          startDate:
            data.startDate === undefined ? null : new Date(data.startDate),
          endDate: data.endDate === undefined ? null : new Date(data.endDate),
          roomNum: data.roomNum === '' ? null : data.roomNum.trim(),
          exposure: isSelected,
          totalTime:
            data.totalTime === '' ? 0 : parseInt(data.totalTime.trim()),
          teacherName:
            data.teacherName === '' ? '강사명 없음' : data.teacherName,
          expiresDateStart:
            data.expiresDateStart === undefined
              ? null
              : new Date(data.expiresDateStart),
          expiresDateEnd:
            data.expiresDateEnd === undefined
              ? null
              : new Date(data.expiresDateEnd),
        },
        refetchQueries: [
          {
            query: SEE_SUBJECT_QUERY,
            variables: { page: 1, limit: 10 },
          },
        ],
      })

      if (!result.data.createSubject.ok) {
        throw new Error('과정 등록 실패')
      }

      alert('등록되었습니다.')
      userLogs(`${data.subjectName}과정 등록`)
      router.push('/subjects')
    } catch (error) {
      console.error('과정 등록 중 에러 발생:', error)
      alert('과정 등록 처리 중 오류가 발생했습니다.')
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
                    defaultValue={null}
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
                    rules={{
                      required: {
                        value: true,
                        message: '수강 구분을 선택해주세요.',
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <Select
                        labelPlacement="outside"
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
                  <DatePickerBox>
                    <Controller
                      control={control}
                      name="expiresDateStart"
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
                      name="expiresDateEnd"
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
                            expEndDate === null ? null : new Date(expEndDate)
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
                </AreaBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="예) 204호 또는 별관 204호"
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="강의실"
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
                    render={({ field, fieldState }) => (
                      <Select
                        labelPlacement="outside"
                        label="강사명"
                        placeholder=" "
                        className="w-full"
                        variant="bordered"
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
                    placeholder="강사명"
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="강사명"
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
              <BtnBox>
                <Button2
                  buttonType="submit"
                  width="100%"
                  height="2.5rem"
                  typeBorder={true}
                  fontColor="#fff"
                  bgColor="#007de9"
                >
                  등록
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
    </>
  )
}
SubjectWrite.getLayout = page => <Layout>{page}</Layout>
