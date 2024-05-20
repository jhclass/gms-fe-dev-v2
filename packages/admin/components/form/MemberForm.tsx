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
import { Button, Input, Switch, useDisclosure } from '@nextui-org/react'
import { useLazyQuery, useMutation, useSuspenseQuery } from '@apollo/client'
import { Controller, useForm } from 'react-hook-form'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'
import Layout from '@/pages/students/layout'
import {
  DEV_EDIT_MANAGE_USER_MUTATION,
  EDIT_MANAGE_USER_MUTATION,
} from '@/graphql/mutations'
import DatePickerHeader from '@/components/common/DatePickerHeader'
import { CREATE_STAMP_QUERY, SEARCH_MANAGEUSER_QUERY } from '@/graphql/queries'
import {
  ManageUser,
  // SearchManageUserResult,
  Stamp,
} from '@/src/generated/graphql'
import ChangePassword from '../modal/ChangePassword'

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
const UpdateTime = styled.p`
  span {
    color: #555;
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
const AvatarBox = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  /* @media (max-width: 768px) {
    flex-direction: column;
  } */
`

const AvatarF = styled.div`
  position: relative;
  border-radius: 100%;
  overflow: hidden;
  width: 5rem;
  height: 5rem;
  background-color: #4f46e5;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  font-size: 4rem;
  text-align: center;
  color: #fff;
  font-weight: 700;
  line-height: 5rem;
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

export default function ManagerWrite({ managerId }) {
  const router = useRouter()
  const { userLogs } = useUserLogsMutation()
  const { error, data, refetch } = useSuspenseQuery<searchManageUserQuery>(
    SEARCH_MANAGEUSER_QUERY,
    {
      variables: {
        searchManageUserId: parseInt(managerId),
      },
    },
  )
  const [
    createTamp,
    { loading: createLoading, error: createError, data: CreateData },
  ] = useLazyQuery(CREATE_STAMP_QUERY, {
    onCompleted: () => {
      refetch()
    },
  })

  const managerData = data?.searchManageUser.data[0]
  const [editManager] = useMutation(EDIT_MANAGE_USER_MUTATION)

  const { register, setValue, control, handleSubmit, formState } = useForm({
    defaultValues: {
      mUserId: managerData.mUserId,
      mUsername: managerData.mUsername,
      mPhoneNumCompany: managerData.mPhoneNumCompany,
      mPhoneNum: managerData.mPhoneNum,
      mPhoneNumFriend: managerData.mPhoneNumFriend,
      mPart: managerData.mPart,
      mRank: managerData.mRank,
      mPhoneNumInside: managerData.mPhoneNumInside,
      mAvatar: managerData.mAvatar,
      mJoiningDate: managerData.mJoiningDate,
      mAddresses: managerData.mAddresses,
      resign: managerData?.resign === 'N' ? false : true,
      email: managerData.email,
    },
  })
  const { errors, dirtyFields, isDirty } = formState
  const [joiningDate, setJoiningDate] = useState(null)
  const years = _.range(1950, getYear(new Date()) + 1, 1)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const gradeStr = data => {
    if (data == null) {
      return 'A'
    } else {
      const idF = data?.charAt(0).toUpperCase()
      return idF
    }
  }

  useEffect(() => {
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
    if (isDirty) {
      const isModify = confirm('변경사항이 있습니다. 수정하시겠습니까?')
      let part
      if (dirtyFields.mPart) {
        const parts = data.mPart.split(',').map(part => part.trim())
        part = parts
      } else {
        part = managerData.mPart
      }
      if (isModify) {
        try {
          const result = await editManager({
            variables: {
              editManageUserId: managerData.id,
              mUsername: data.mUsername.trim(),
              mRank: data.mRank === null ? null : data.mRank,
              mPart: data.mPart === null ? null : part,
              mPhoneNum: data.mPhoneNum,
              mPhoneNumFriend:
                data.mPhoneNumFriend === null || data.mPhoneNumFriend === ''
                  ? null
                  : data.mPhoneNumFriend.trim(),
              mPhoneNumCompany:
                data.mPhoneNumCompany === null || data.mPhoneNumCompany === ''
                  ? null
                  : data.mPhoneNumCompany.trim(),
              mPhoneNumInside:
                data.mPhoneNumInside === null || data.mPhoneNumInside === ''
                  ? null
                  : data.mPhoneNumInside.trim(),
              mJoiningDate:
                data.mJoiningDate === null
                  ? null
                  : typeof data.mJoiningDate === 'string'
                  ? new Date(parseInt(data.mJoiningDate))
                  : new Date(data.mJoiningDate),
              mAddresses:
                data.mAddresses === null ? null : data.mAddresses.trim(),
              email: data.email === null ? null : data.email.trim(),
              resign: data.resign === true ? 'Y' : 'N',
            },
          })

          if (!result.data.editManageUser.ok) {
            throw new Error('직원 정보 수정 실패')
          }
          const dirtyFieldsArray = [...Object.keys(dirtyFields)]
          userLogs(
            `${managerData.mUsername} 직원 정보 수정`,
            dirtyFieldsArray.join(', '),
          )
          alert('수정되었습니다.')
          router.push('/hr', undefined, { shallow: true })
        } catch (error) {
          console.error('직원 정보 수정 중 에러 발생:', error)
          alert('직원 정보 수정 처리 중 오류가 발생했습니다.')
        }
      }
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

  const clickCreate = () => {
    createTamp({ variables: { manageUserId: managerData.id } })
  }

  return (
    <>
      <MainWrap>
        <ConArea>
          <Breadcrumb
            rightArea={true}
            addRender={
              <Controller
                control={control}
                name="resign"
                defaultValue={managerData?.resign === 'N' ? false : true}
                render={({ field }) => (
                  <SwitchDiv>
                    <SwitchText>퇴사여부</SwitchText>
                    <Switch
                      size="md"
                      defaultSelected={
                        managerData?.resign === 'N' ? false : true
                      }
                      onChange={e => {
                        field.onChange((e.target as HTMLInputElement).checked)
                      }}
                    />
                  </SwitchDiv>
                )}
              />
            }
          />
          <DetailBox>
            <TopInfo>
              <Noti>
                <span>*</span> 는 필수입력입니다.
              </Noti>
              <UpdateTime>
                <span>최근 업데이트 :</span>
                {managerData.lastModifiedBy} -{' '}
                {formatDate(managerData?.updatedAt)}
              </UpdateTime>
            </TopInfo>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DetailDiv>
                <AvatarBox>
                  {managerData?.mAvatar ? (
                    <AvatarF
                      style={{
                        backgroundImage: `url('${managerData?.mAvatar}')`,
                      }}
                    ></AvatarF>
                  ) : (
                    <AvatarF>{gradeStr(managerData?.mUserId)}</AvatarF>
                  )}
                </AvatarBox>
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
                      onClick={onOpen}
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
                      onChange={e => {
                        register('mAddresses').onChange(e)
                      }}
                      {...register('mAddresses')}
                    />
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
                      defaultValue={managerData.mPhoneNumCompany}
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
                      defaultValue={managerData.mPhoneNumInside}
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
                      defaultValue={managerData.mPhoneNumFriend}
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
                      defaultValue={managerData.mPart.join(',')}
                      className="w-full"
                      onChange={e => {
                        register('mPart').onChange(e)
                      }}
                      {...register('mPart', {
                        required: {
                          value: true,
                          message: '부서를 입력해주세요.',
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
                      defaultValue={managerData.mRank}
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
                        defaultValue={managerData?.mJoiningDate}
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
                {managerData?.Stamp.length > 0 && (
                  <FlexBox>
                    <AreaSmallBox>
                      <FilterLabel>
                        도장<span>*</span>
                      </FilterLabel>
                      <div className="flex items-start gap-3 mt-1">
                        <Button
                          isDisabled={
                            managerData?.Stamp[0]?.imageUrl ? true : false
                          }
                          color={'primary'}
                          onClick={clickCreate}
                        >
                          도장 생성
                        </Button>
                        {managerData?.Stamp[0]?.imageUrl && (
                          <div className="flex items-start gap-3 px-8 border-2 rounded-lg">
                            <img
                              src={managerData?.Stamp[0]?.imageUrl}
                              alt={managerData.mUsername + '인'}
                            />
                          </div>
                        )}
                      </div>
                    </AreaSmallBox>
                    <AreaBox></AreaBox>
                    <AreaBox></AreaBox>
                  </FlexBox>
                )}
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
      <ChangePassword
        isOpen={isOpen}
        onClose={onClose}
        managerData={managerData}
      />
    </>
  )
}
ManagerWrite.getLayout = page => <Layout>{page}</Layout>
