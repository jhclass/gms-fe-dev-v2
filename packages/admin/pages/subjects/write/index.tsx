import MainWrap from '@/components/wrappers/MainWrap'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import router from 'next/router'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
registerLocale('ko', ko)
import { Input, Select, SelectItem, Switch } from '@nextui-org/react'
import { subStatusState } from '@/lib/recoilAtoms'
import { useRecoilValue } from 'recoil'
import { useMutation } from '@apollo/client'
import { CREATE_SUBJECT_MUTATION } from '@/graphql/mutations'
import { Controller, useForm } from 'react-hook-form'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'

const SwitchDiv = styled.div`
  width: 6.5rem;
`
const SwitchText = styled.span`
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
  gap: 1rem;
  justify-content: center;
`

export default function Consoultation() {
  const [createSubject] = useMutation(CREATE_SUBJECT_MUTATION)
  const { userLogs } = useUserLogsMutation()
  const subStatus = useRecoilValue(subStatusState)
  const { register, control, handleSubmit, formState } = useForm()
  const { errors } = formState
  const [sjStartDate, setSjStartDate] = useState(null)
  const [sjEndDate, setSjEndDate] = useState(null)
  const [sub, setSub] = useState('없음')
  const [teacher, setTeacher] = useState('강사명 없음')
  const [isSelected, setIsSelected] = useState(false)

  const onSubmit = data => {
    createSubject({
      variables: {
        subDiv: data.subDiv,
        subjectName: data.subjectName,
        fee: parseInt(data.fee),
        startDate: data.stVisit === undefined ? null : new Date(data.startDate),
        endDate: data.endDate === undefined ? null : new Date(data.endDate),
        roomNum: data.roomNum === '' ? null : Number(data.roomNum),
        exposure: isSelected,
        totalTime: data.totalTime === '' ? 0 : data.totalTime,
        teacherName:
          data.teacherName === undefined ? '강사명 없음' : data.teacherName,
      },
      onCompleted: data => {
        console.log(data)
        alert('등록되었습니다.')
        router.push('/subjects')
      },
    })
    userLogs(`${data.subjectName}과정 등록`)
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
        <Breadcrumb
          rightArea={true}
          addRender={
            <SwitchDiv>
              <Switch
                size="md"
                isSelected={isSelected}
                onValueChange={setIsSelected}
              >
                <SwitchText>노출여부</SwitchText>
              </Switch>
            </SwitchDiv>
          }
        />
        <DetailBox>
          <DetailForm onSubmit={handleSubmit(onSubmit)}>
            <FlexBox>
              <AreaBox>
                <Input
                  labelPlacement="outside"
                  placeholder="과정명"
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="과정명"
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
              <AreaBox>
                <Input
                  labelPlacement="outside"
                  placeholder="수강료"
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="수강료"
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
            </FlexBox>
            <FlexBox>
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
                      label={<FilterLabel>수강구분</FilterLabel>}
                      placeholder=" "
                      className="w-full"
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
                {errors.subDiv && (
                  <p className="px-2 pt-2 text-xs text-red-500">
                    {String(errors.subDiv.message)}
                  </p>
                )}
              </AreaBox>
              <AreaBox>
                <Input
                  labelPlacement="outside"
                  placeholder="강의실"
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="강의실"
                  onChange={e => {
                    register('roomNum').onChange(e)
                  }}
                  className="w-full"
                  {...register('roomNum')}
                />
              </AreaBox>
              <AreaBox>
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
                        field.onChange(value)
                        handleTeacherChange(value)
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
                      {/* {managerList?.map(item => (
                        <SelectItem key={item.mUsername} value={item.mUsername}>
                          {item.mUsername}
                        </SelectItem>
                      ))} */}
                    </Select>
                  )}
                />
              </AreaBox>
            </FlexBox>
            <FlexBox>
              <DatePickerBox>
                <Controller
                  control={control}
                  name="startDate"
                  render={({ field }) => (
                    <DatePicker
                      locale="ko"
                      showYearDropdown
                      selected={
                        sjStartDate === null ? null : new Date(sjStartDate)
                      }
                      placeholderText="기간을 선택해주세요."
                      isClearable
                      onChange={date => {
                        field.onChange(date)
                        setSjStartDate(date)
                      }}
                      ref={field.ref}
                      dateFormat="yyyy/MM/dd"
                      customInput={
                        <Input
                          label="개강일"
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
                  name="endDate"
                  render={({ field }) => (
                    <DatePicker
                      locale="ko"
                      showYearDropdown
                      selected={sjEndDate === null ? null : new Date(sjEndDate)}
                      placeholderText="기간을 선택해주세요."
                      isClearable
                      onChange={date => {
                        field.onChange(date)
                        setSjEndDate(date)
                      }}
                      ref={field.ref}
                      dateFormat="yyyy/MM/dd"
                      customInput={
                        <Input
                          label="종강일"
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
                onClick={() => router.push('/subjects')}
              >
                목록으로
              </Button2>
            </BtnBox>
          </DetailForm>
        </DetailBox>
      </MainWrap>
    </>
  )
}
