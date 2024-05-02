import MainWrap from '@/components/wrappers/MainWrap'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { getYear } from 'date-fns'
registerLocale('ko', ko)
const _ = require('lodash')
import { Button, Input, Radio, RadioGroup, Switch } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import { Controller, useForm } from 'react-hook-form'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'
import Layout from '@/pages/students/layout'
import {
  CHECK_DOUBLE_MUTATION,
  CREATE_STUDENT_MUTATION,
} from '@/graphql/mutations'
import DatePickerHeader from '@/components/common/DatePickerHeader'

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
  width: 100%;
`
const AreaSmallBox = styled.div``
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
const FilterLabel = styled.p`
  font-weight: 500;
  font-size: 0.875rem;
  color: #11181c;

  span {
    color: red;
  }
`
const InputText = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  width: 2rem;
`
const BtnBox = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`

export default function StudentsWrite() {
  const router = useRouter()
  const { userLogs } = useUserLogsMutation()
  const [createStudent] = useMutation(CREATE_STUDENT_MUTATION)
  const [checkDouble] = useMutation(CHECK_DOUBLE_MUTATION)
  const { register, getValues, control, handleSubmit, formState, reset } =
    useForm()
  const { errors, isDirty } = formState
  const [birthdayDate, setBirthdayDate] = useState(null)
  const [isSelected, setIsSelected] = useState(false)
  const years = _.range(1950, getYear(new Date()) + 1, 1)

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <>
      <MainWrap>
        <ConArea>
          <Breadcrumb
            rightArea={true}
            addRender={
              <SwitchDiv>
                <SwitchText>퇴사여부</SwitchText>
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <DetailDiv>
                <FlexBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="아이디"
                      variant={'bordered'}
                      radius="md"
                      type="text"
                      label={
                        <FilterLabel>
                          아이디<span>*</span>
                        </FilterLabel>
                      }
                      className="w-full"
                      onChange={e => {
                        register('name').onChange(e)
                      }}
                      {...register('name', {
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
                    {errors.name && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.name.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="비밀번호"
                      variant={'bordered'}
                      radius="md"
                      type="text"
                      label={
                        <FilterLabel>
                          비밀번호<span>*</span>
                        </FilterLabel>
                      }
                      className="w-full"
                      onChange={e => {
                        register('phoneNum1').onChange(e)
                      }}
                      maxLength={11}
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
                </FlexBox>
                <FlexBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="이름"
                      variant={'bordered'}
                      radius="md"
                      type="text"
                      label={
                        <FilterLabel>
                          이름<span>*</span>
                        </FilterLabel>
                      }
                      className="w-full"
                      onChange={e => {
                        register('name').onChange(e)
                      }}
                      {...register('name', {
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
                    {errors.name && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.name.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="연락처"
                      variant={'bordered'}
                      radius="md"
                      type="text"
                      label={
                        <FilterLabel>
                          연락처<span>*</span>
                        </FilterLabel>
                      }
                      className="w-full"
                      onChange={e => {
                        register('phoneNum1').onChange(e)
                      }}
                      maxLength={11}
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
                      placeholder="기타 연락처"
                      variant="bordered"
                      radius="md"
                      type="text"
                      label="기타 연락처"
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
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.phoneNum2.message)}
                      </p>
                    )}
                  </AreaBox>
                </FlexBox>
                <FlexBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="강의분야"
                      variant={'bordered'}
                      radius="md"
                      type="text"
                      label={
                        <FilterLabel>
                          강의 분야<span>*</span>
                        </FilterLabel>
                      }
                      className="w-full"
                      onChange={e => {
                        register('name').onChange(e)
                      }}
                      {...register('name', {
                        required: {
                          value: true,
                          message: '강의분야를 입력해주세요.',
                        },
                        pattern: {
                          value: /^[가-힣a-zA-Z0-9\s]*$/,
                          message: '한글, 영어, 숫자만 사용 가능합니다.',
                        },
                      })}
                    />
                    {errors.name && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.name.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="직책"
                      variant={'bordered'}
                      radius="md"
                      type="text"
                      label={<FilterLabel>직책</FilterLabel>}
                      className="w-full"
                      onChange={e => {
                        register('name').onChange(e)
                      }}
                      {...register('name', {
                        pattern: {
                          value: /^[가-힣a-zA-Z0-9\s]*$/,
                          message: '한글, 영어, 숫자만 사용 가능합니다.',
                        },
                      })}
                    />
                    {errors.name && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.name.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <DatePickerBox>
                      <Controller
                        control={control}
                        name="birthday"
                        rules={{
                          required: {
                            value: true,
                            message: '입사일을 선택해주세요.',
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
                            showYearDropdown
                            selected={
                              birthdayDate === null
                                ? null
                                : new Date(birthdayDate)
                            }
                            openToDate={new Date('2000/04/11')}
                            placeholderText="날짜를 선택해주세요."
                            isClearable
                            onChange={date => {
                              field.onChange(date)
                              setBirthdayDate(date)
                            }}
                            dateFormat="yyyy/MM/dd"
                            onChangeRaw={e => e.preventDefault()}
                            onFocus={e => e.target.blur()}
                            customInput={
                              <Input
                                ref={field.ref}
                                label={
                                  <FilterLabel>
                                    입사일<span>*</span>
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
                    {errors.birthday && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.birthday.message)}
                      </p>
                    )}
                  </AreaBox>
                </FlexBox>
                <FlexBox>
                  <AreaBox>
                    {/* <FilterLabel>
                      도장<span>*</span>
                    </FilterLabel> */}
                    <div className="flex items-start gap-3">
                      <Button color={'primary'}>도장 생성</Button>
                      <div className="flex items-start gap-3 px-8 border-2 rounded-lg">
                        <img
                          src="https://instaclone-uploadsss.s3.ap-northeast-2.amazonaws.com/stamps/2-1714446421459-stamp.png"
                          alt="Description of image"
                        />
                      </div>
                    </div>
                    <div></div>
                  </AreaBox>
                </FlexBox>
                <BtnBox>
                  <Button
                    type="submit"
                    size="md"
                    radius="md"
                    variant="solid"
                    color="primary"
                    className="w-full text-white"
                  >
                    등록
                  </Button>
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
              </DetailDiv>
            </form>
          </DetailBox>
        </ConArea>
      </MainWrap>
    </>
  )
}
StudentsWrite.getLayout = page => <Layout>{page}</Layout>
