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
import { useMutation, useSuspenseQuery } from '@apollo/client'
import { Controller, useForm } from 'react-hook-form'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'
import Layout from '@/pages/students/layout'
import {
  CHECK_DOUBLE_MUTATION,
  CREATE_STUDENT_MUTATION,
  DEV_EDIT_MANAGE_USER_MUTATION,
} from '@/graphql/mutations'
import DatePickerHeader from '@/components/common/DatePickerHeader'
import { SEARCH_MANAGEUSER_QUERY } from '@/graphql/queries'
import {
  ManageUser,
  // SearchManageUserResult,
  Stamp,
} from '@/src/generated/graphql'

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
interface ExtendedStamp extends Stamp {
  imageUrl: string // imageUrl 속성을 추가합니다.
}

type SearchManageUserResult = {
  data: ManageUser
  stamps: ExtendedStamp[] // 이 배열은 확장된 Stamp 타입을 사용합니다.
}
type searchManageUserQuery = {
  searchManageUser: SearchManageUserResult
}

export default function StudentsWrite({ managerId }) {
  const router = useRouter()
  const { userLogs } = useUserLogsMutation()
  const { error, data } = useSuspenseQuery<searchManageUserQuery>(
    SEARCH_MANAGEUSER_QUERY,
    {
      variables: {
        searchManageUserId: parseInt(managerId),
      },
    },
  )
  const managerData = data?.searchManageUser.data[0]
  const [devEditManager] = useMutation(DEV_EDIT_MANAGE_USER_MUTATION)

  const {
    register,
    setValue,
    clearErrors,
    setError,
    control,
    handleSubmit,
    formState,
    watch,
  } = useForm({
    defaultValues: {
      mUserId: managerData.mUserId,
      mUsername: managerData.mUsername,
      mPassword: managerData.mPassword,
      mPhoneNumCompany: managerData.mPhoneNumCompany,
      mPhoneNum: managerData.mPhoneNum,
      mPhoneNumFriend: managerData.mPhoneNumFriend,
      mPart: managerData.mPart,
      mPhoneNumInside: managerData.mPhoneNumInside,
      mAvatar: managerData.mAvatar,
      mJoiningDate: managerData.mJoiningDate,
      mAddresses: managerData.mAddresses,
      resign: managerData.resign,
      email: managerData.email,
    },
  })
  const { errors, dirtyFields, isDirty } = formState
  const [joiningDate, setJoiningDate] = useState(null)
  const [isSelected, setIsSelected] = useState(false)
  const years = _.range(1950, getYear(new Date()) + 1, 1)
  useEffect(() => {
    if (managerData?.resign === 'N') {
      setIsSelected(false)
    } else {
      setIsSelected(true)
    }
    if (
      managerData?.mJoiningDate === null ||
      managerData?.mJoiningDate === undefined
    ) {
      setJoiningDate(null)
    } else {
      const date = parseInt(managerData?.mJoiningDate)
      setJoiningDate(date)
    }
  }, [managerData])

  const onSubmit = async data => {
    console.log(data, isDirty)
    if (isDirty || managerData.resign !== isSelected) {
      const isModify = confirm('변경사항이 있습니다. 수정하시겠습니까?')
      if (isModify) {
        try {
          const result = await devEditManager({
            variables: {
              mUserId: [managerData.mUserId],
              mUsername: data.mUsername.trim(),
              mPassword: managerData.mPassword,
              mPhoneNum: data.mPhoneNum.trim(),
              mPart: data.mPart === '' ? null : data.mPart,
              mPhoneNumFriend:
                data.mPhoneNumFriend === ''
                  ? null
                  : data.mPhoneNumFriend.trim(),
              mJoiningDate:
                data.mJoiningDate === undefined
                  ? null
                  : new Date(data.mJoiningDate),
              mAddresses:
                data.mAddresses === '' ? null : data.mAddresses.trim(),
              email: data.email === '' ? null : data.email.trim(),
              resign: isSelected === true ? 'Y' : 'N',
            },
          })

          if (!result.data.devEditManageUser.ok) {
            throw new Error('강사 정보 수정 실패')
          }
          const dirtyFieldsArray = [...Object.keys(dirtyFields)]
          userLogs(
            `${managerData.mUsername} 강사 정보 수정`,
            dirtyFieldsArray.join(', '),
          )
          alert('수정되었습니다.')
          router.back()
        } catch (error) {
          console.error('강사 정보 수정 중 에러 발생:', error)
          alert('강사 정보 수정 처리 중 오류가 발생했습니다.')
        }
      }
    }
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
                      isReadOnly={true}
                      labelPlacement="outside"
                      placeholder="아이디"
                      variant={'faded'}
                      radius="md"
                      type="text"
                      defaultValue={managerData.mUserId}
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
                          value: /^[가-힣a-zA-Z0-9\s]*$/,
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
                    <FilterLabel>비밀번호</FilterLabel>
                    <Button
                      size="md"
                      radius="md"
                      variant="solid"
                      className="w-full mt-1 text-white bg-flag1"
                      // onClick={}
                    >
                      비밀번호 변경
                    </Button>
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
                      defaultValue={managerData.mUsername}
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
                      defaultValue={managerData.mPhoneNum}
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
                    {errors.mPhoneNum && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.mPhoneNum.message)}
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
                      defaultValue={managerData.mPhoneNumFriend}
                      className="w-full"
                      maxLength={12}
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
                      placeholder=" "
                      variant="bordered"
                      radius="md"
                      type="text"
                      label="주소"
                      className="w-full"
                      defaultValue={managerData.mAddresses}
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
                      defaultValue={managerData.email}
                      label="이메일"
                      className="w-full"
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
                      placeholder="강의분야"
                      variant={'bordered'}
                      radius="md"
                      type="text"
                      label="강의 분야"
                      defaultValue={managerData.mPart.join(',')}
                      className="w-full"
                      onChange={e => {
                        register('namPartme').onChange(e)
                      }}
                      {...register('mPart')}
                    />
                    {errors.mPart && (
                      <p className="px-2 pt-2 text-xs text-red-500">
                        {String(errors.mPart.message)}
                      </p>
                    )}
                  </AreaBox>
                  <AreaBox>
                    <DatePickerBox>
                      <Controller
                        control={control}
                        name="mJoiningDate"
                        defaultValue={managerData?.mJoiningDate}
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
                            openToDate={new Date('2000/04/11')}
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
                                label="입사일"
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
                </FlexBox>
                <FlexBox>
                  <AreaSmallBox>
                    <FilterLabel>
                      도장<span>*</span>
                    </FilterLabel>
                    <div className="flex items-start gap-3 mt-1">
                      <Button
                        isDisabled={managerData?.Stamp?.imageUrl ? true : false}
                        color={'primary'}
                      >
                        도장 생성
                      </Button>
                      {managerData?.Stamp?.imageUrl && (
                        <div className="flex items-start gap-3 px-8 border-2 rounded-lg">
                          <img
                            src={managerData?.Stamp?.imageUrl}
                            alt={managerData.mUsername + '인'}
                          />
                        </div>
                      )}
                    </div>
                  </AreaSmallBox>
                  <AreaBox></AreaBox>
                  <AreaBox></AreaBox>
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
                    수정
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
