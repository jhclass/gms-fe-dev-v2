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
import { Button, Input, Radio, RadioGroup, Switch } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import { Controller, useForm } from 'react-hook-form'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'
import Layout from '@/pages/students/layout'
import {
  CHECK_DOUBLE_MUTATION,
  CREATE_MANAGE_USER_MUTATION,
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
  const [createManager] = useMutation(CREATE_MANAGE_USER_MUTATION)
  const {
    register,
    setValue,
    clearErrors,
    setError,
    control,
    handleSubmit,
    formState,
    watch,
  } = useForm()
  const { errors } = formState
  const [joiningDate, setJoiningDate] = useState(null)
  const years = _.range(1950, getYear(new Date()) + 1, 1)

  const password = watch('mPassword')
  const confirmPassword = watch('mPassword1')
  const checkPassword = (password1, password2) => {
    if (password1 && password2) {
      if (password1 !== password2 || password1.length !== password2.length) {
        setError('mPassword1', {
          type: 'manual',
          message: '비밀번호가 일치하지 않습니다.',
        })
      } else {
        clearErrors('mPassword1')
      }
    }
  }

  useEffect(() => {
    checkPassword(password, confirmPassword)
  }, [password, confirmPassword, setError, clearErrors])

  const onSubmit = data => {
    checkPassword(data.mPassword, data.mPassword1)
    if (data.mPart) {
      const parts = data.mPart.split(',').map(part => part.trim())
      setValue('mPart', parts)
    }
    createManager({
      variables: {
        mUserId: data.mUserId.trim(),
        mUsername: data.mUsername.trim(),
        mPassword: data.mPassword.trim(),
        mGrade: 10,
        mRank: data.mRank === '' ? null : data.mRank,
        mPart: data.mPart === '' ? null : data.mPart,
        mPhoneNum: data.mPhoneNum.trim(),
        mPhoneNumFriend:
          data.mPhoneNumFriend === '' ? null : data.mPhoneNumFriend.trim(),
        mPhoneNumCompany:
          data.mPhoneNumCompany === '' ? null : data.mPhoneNumCompany.trim(),
        mPhoneNumInside:
          data.mPhoneNumInside === '' ? null : data.mPhoneNumInside.trim(),
        mJoiningDate:
          data.mJoiningDate === undefined ? null : new Date(data.mJoiningDate),
        mAddresses: data.mAddresses === '' ? null : data.mAddresses.trim(),
        email: data.email === '' ? null : data.email.trim(),
      },
      onCompleted: result => {
        if (result.createManagerAccount.ok) {
          userLogs(`${data.mUsername}직원 등록`)
          alert('등록되었습니다.')
          router.back()
        }
      },
    })
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
            </TopInfo>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DetailDiv>
                <FlexBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="이름영문 예) gildong[홍길동]"
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
                        register('mUserId').onChange(e)
                      }}
                      {...register('mUserId', {
                        required: {
                          value: true,
                          message: '아이디을 입력해주세요.',
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9\s]*$/,
                          message: '영어, 숫자만 사용 가능합니다.',
                        },
                      })}
                    />
                    {errors.mUserId && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.mUserId.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="hc+입사년월일 예) hc240101"
                      variant={'bordered'}
                      radius="md"
                      type="password"
                      label={
                        <FilterLabel>
                          비밀번호<span>*</span>
                        </FilterLabel>
                      }
                      className="w-full"
                      onChange={e => {
                        register('mPassword').onChange(e)
                      }}
                      maxLength={8}
                      {...register('mPassword', {
                        required: {
                          value: true,
                          message: '비밀번호를 입력해주세요.',
                        },
                        maxLength: {
                          value: 8,
                          message: '최대 8자리까지 입력 가능합니다.',
                        },
                        minLength: {
                          value: 3,
                          message: '최소 3자리 이상이어야 합니다.',
                        },
                      })}
                    />
                    {errors.mPassword && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.mPassword.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="비밀번호 확인"
                      variant={'bordered'}
                      radius="md"
                      type="password"
                      label={
                        <FilterLabel>
                          비밀번호확인<span>*</span>
                        </FilterLabel>
                      }
                      className="w-full"
                      onChange={e => {
                        register('mPassword1').onChange(e)
                      }}
                      maxLength={8}
                      {...register('mPassword1', {
                        required: {
                          value: true,
                          message: '비밀번호를 입력해주세요.',
                        },
                      })}
                    />
                    {errors.mPassword1 && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.mPassword1.message)}
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
                        register('mUsername').onChange(e)
                      }}
                      {...register('mUsername', {
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
                    {errors.mUsername && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.mUsername.message)}
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
                        register('mPhoneNum').onChange(e)
                      }}
                      maxLength={11}
                      {...register('mPhoneNum', {
                        required: {
                          value: true,
                          message: '연락처를 입력해주세요.',
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
                    {errors.mPhoneNum && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.mPhoneNum.message)}
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
                      label="주소"
                      className="w-full"
                      onChange={e => {
                        register('mAddresses').onChange(e)
                      }}
                      {...register('mAddresses')}
                    />
                    {errors.mAddresses && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.mAddresses.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder=" "
                      variant="bordered"
                      radius="md"
                      type="text"
                      label="이메일"
                      className="w-full"
                      onChange={e => {
                        register('email').onChange(e)
                      }}
                      {...register('email', {
                        pattern: {
                          value:
                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                          message: '유효하지 않은 이메일 형식입니다.',
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.email.message)}
                      </p>
                    )}
                  </AreaBox>
                </FlexBox>
                <FlexBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="직통번호"
                      variant={'bordered'}
                      radius="md"
                      type="text"
                      label="직통번호"
                      className="w-full"
                      onChange={e => {
                        register('mPhoneNumCompany').onChange(e)
                      }}
                      {...register('mPhoneNumCompany', {
                        pattern: {
                          value: /^[0-9]+$/,
                          message: '숫자만 입력 가능합니다.',
                        },
                      })}
                    />
                    {errors.mPhoneNumCompany && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.mPhoneNumCompany.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="ex)503"
                      variant="bordered"
                      radius="md"
                      type="text"
                      label="내선번호"
                      className="w-full"
                      onChange={e => {
                        register('mPhoneNumInside').onChange(e)
                      }}
                      {...register('mPhoneNumInside', {
                        pattern: {
                          value: /^[0-9]+$/,
                          message: '숫자만 입력 가능합니다.',
                        },
                      })}
                    />
                    {errors.mPhoneNumInside && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.mPhoneNumInside.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="비상 연락망"
                      variant="bordered"
                      radius="md"
                      type="text"
                      label="기타 연락처"
                      className="w-full"
                      maxLength={12}
                      onChange={e => {
                        register('mPhoneNumFriend').onChange(e)
                      }}
                      {...register('mPhoneNumFriend', {
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
                    {errors.mPhoneNumFriend && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.mPhoneNumFriend.message)}
                      </p>
                    )}
                  </AreaBox>
                </FlexBox>
                <FlexBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="ex) 교무팀,인사팀"
                      variant={'bordered'}
                      radius="md"
                      type="text"
                      label={
                        <FilterLabel>
                          부서명<span>*</span>
                        </FilterLabel>
                      }
                      className="w-full"
                      onChange={e => {
                        register('mPart').onChange(e)
                      }}
                      {...register('mPart', {
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
                    {errors.mPart && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.mPart.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="ex) 팀장 or 대리"
                      variant={'bordered'}
                      radius="md"
                      type="text"
                      label={<FilterLabel>직책/직위</FilterLabel>}
                      className="w-full"
                      onChange={e => {
                        register('mRank').onChange(e)
                      }}
                      {...register('mRank', {
                        pattern: {
                          value: /^[가-힣a-zA-Z0-9\s]*$/,
                          message: '한글, 영어, 숫자만 사용 가능합니다.',
                        },
                      })}
                    />
                    {errors.mRank && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.mRank.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <DatePickerBox>
                      <Controller
                        control={control}
                        name="mJoiningDate"
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
                              joiningDate === null
                                ? null
                                : new Date(joiningDate)
                            }
                            placeholderText="날짜를 선택해주세요."
                            isClearable
                            onChange={date => {
                              field.onChange(date)
                              setJoiningDate(date)
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
                    {errors.mJoiningDate && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.mJoiningDate.message)}
                      </p>
                    )}
                  </AreaBox>
                </FlexBox>
                <FlexBox>
                  <AreaBox>
                    <div className="flex items-center gap-3">
                      <Button isDisabled={true} color={'primary'}>
                        도장 생성
                      </Button>
                      <Noti>
                        <span>*</span> 도장 생성은 아이디 생성 후 진행해주세요.
                      </Noti>
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
