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
  Input,
  Link,
  Switch,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import { useLazyQuery, useMutation, useSuspenseQuery } from '@apollo/client'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'
import Layout from '@/pages/students/layout'
import { EDIT_MANAGE_USER_MUTATION } from '@/graphql/mutations'
import DatePickerHeader from '@/components/common/DatePickerHeader'
import { CREATE_STAMP_QUERY, SEARCH_MANAGEUSER_QUERY } from '@/graphql/queries'
import { SearchManageUserResult } from '@/src/generated/graphql'
import ChangePassword from '@/components/modal/ChangePassword'
import { Controller, useForm } from 'react-hook-form'
import useMmeQuery from '@/utils/mMe'
import { useRecoilValue } from 'recoil'
import { gradeState } from '@/lib/recoilAtoms'
import AdviceMultiSelect from '@/components/common/AdviceMultiSelect'
import Address from '@/components/common/Address'

const DetailBox = styled.div`
  background: #fff;
  border-radius: 0.5rem;
  /* padding: 1.5rem; */
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
const UpdateTime = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
    align-items: flex-end;
  }
`

const UpdateCon = styled.p`
  position: relative;
  &:first-child {
    padding-right: 0.4rem;
    &:after {
      content: '';
      width: 0.3rem;
      height: 1px;
      background: #11181c;
      position: absolute;
      top: 50%;
      margin-top: -0.5px;
      right: -0.2rem;
    }
  }
  > span {
    color: #555;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
    align-items: flex-end;
    &:first-child {
      padding-right: 0;
      &:after {
        display: none;
      }
    }
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
  background-color: #fff;
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
  position: relative;
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

type searchManageUserQuery = {
  searchManageUser: SearchManageUserResult
}

export default function WishForm() {
  const grade = useRecoilValue(gradeState)
  const { useMme } = useMmeQuery()
  const loginMGrade = useMme('mGrade')
  const loginMPart = useMme('mPart') || []
  const router = useRouter()
  const [adviceType, setAdviceType] = useState([])
  const { userLogs } = useUserLogsMutation()
  // const { error, data, refetch } = useSuspenseQuery<searchManageUserQuery>(
  //   SEARCH_MANAGEUSER_QUERY,
  //   {
  //     variables: {
  //       searchManageUserId: parseInt(managerId),
  //     },
  //   },
  // )
  // const [
  //   createTamp,
  //   { loading: createLoading, error: createError, data: CreateData },
  // ] = useLazyQuery(CREATE_STAMP_QUERY, {
  //   onCompleted: result => {
  //     if (result.createStamp.ok) {
  //       userLogs(`${managerData.mUsername} 직원 stemp 생성`)
  //       refetch()
  //     }
  //   },
  // })

  // const managerData = data?.searchManageUser.data[0]
  const [editManager] = useMutation(EDIT_MANAGE_USER_MUTATION)

  const { register, control, handleSubmit, setValue, formState } = useForm()
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

  // useEffect(() => {
  //   if (
  //     managerData?.mJoiningDate === null ||
  //     managerData?.mJoiningDate === undefined
  //   ) {
  //     setJoiningDate(null)
  //   } else {
  //     const date = parseInt(managerData?.mJoiningDate)
  //     setJoiningDate(date)
  //   }
  // }, [managerData])

  const onSubmit = async data => {
    if (isDirty) {
      const isModify = confirm('변경사항이 있습니다. 수정하시겠습니까?')
      let part
      if (dirtyFields.mPart) {
        const parts = String(data.mPart)
          .split(',')
          .map(part => part.trim())
        part = parts
      } else {
        // part = managerData.mPart
      }
      if (isModify) {
        try {
          const result = await editManager({
            variables: {
              // editManageUserId: managerData.id,
              mUsername: data.mUsername.trim(),
              mPhoneNum: data.mPhoneNum.trim(),
              mPart: data.mPart === null ? null : part,
              mPhoneNumFriend:
                data.mPhoneNumFriend === null
                  ? null
                  : data.mPhoneNumFriend.trim(),
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
            throw new Error('강사 정보 수정 실패')
          }
          const dirtyFieldsArray = [...Object.keys(dirtyFields)]
          userLogs(
            // `${managerData.mUsername} 강사 정보 수정`,
            dirtyFieldsArray.join(', '),
          )
          alert('수정되었습니다.')
          window.location.href = '/hr/teacher'
        } catch (error) {
          console.error('강사 정보 수정 중 에러 발생:', error)
          alert('강사 정보 수정 처리 중 오류가 발생했습니다.')
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
    // createTamp({ variables: { manageUserId: managerData.id } })
  }

  const handleClick = () => {
    router.push({
      pathname: '/setting/types',
      query: { typeTab: 'teacherType' },
    })
  }

  return (
    <>
      <DetailBox>
        <TopInfo>
          <Noti>
            <span>*</span> 는 필수입력입니다.
          </Noti>
          <UpdateTime>
            <UpdateCon>
              <span>최근 업데이트 : </span>
              {/* {managerData.lastModifiedBy} */}
            </UpdateCon>
            <UpdateCon>{/* {formatDate(managerData?.updatedAt) */}</UpdateCon>
          </UpdateTime>
        </TopInfo>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DetailDiv>
            <FlexBox>
              <AreaBox>
                <Input
                  labelPlacement="outside"
                  placeholder="근무지역"
                  variant={'bordered'}
                  radius="md"
                  type="text"
                  // defaultValue={managerData.mUsername}
                  label={<FilterLabel>근무지역</FilterLabel>}
                  className="w-full"
                  onChange={e => {
                    register('mUsername').onChange(e)
                  }}
                  {...register('mUsername', {
                    required: {
                      value: true,
                      message: '이름을 입력해주세요.',
                    },
                  })}
                />
              </AreaBox>
              <AreaBox>
                <Input
                  labelPlacement="outside"
                  placeholder="희망분야"
                  variant={'bordered'}
                  radius="md"
                  type="text"
                  // defaultValue={managerData.mPhoneNum}
                  label={
                    <FilterLabel>
                      희망분야<span>*</span>
                    </FilterLabel>
                  }
                  className="w-full"
                  onChange={e => {
                    register('mPhoneNum').onChange(e)
                  }}
                  {...register('mPhoneNum', {
                    required: {
                      value: true,
                      message: '희망분야를 입력해주세요.',
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
                  placeholder="희망보수"
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="희망보수"
                  // defaultValue={managerData.mPhoneNumFriend}
                  className="w-full"
                  maxLength={12}
                  onChange={e => {
                    register('mPhoneNumFriend').onChange(e)
                  }}
                  {...register('mPhoneNumFriend')}
                />
              </AreaBox>
              <AreaBox>
                <Input
                  labelPlacement="outside"
                  placeholder=" "
                  variant="bordered"
                  radius="md"
                  type="text"
                  // defaultValue={managerData.email}
                  label="근무형태"
                  className="w-full"
                  onChange={e => {
                    register('email').onChange(e)
                  }}
                  {...register('email')}
                />
              </AreaBox>
              <AreaBox>
                <Input
                  labelPlacement="outside"
                  placeholder=" "
                  variant="bordered"
                  radius="md"
                  type="text"
                  // defaultValue={managerData.email}
                  label="근무시간"
                  className="w-full"
                  onChange={e => {
                    register('email').onChange(e)
                  }}
                  {...register('email')}
                />
              </AreaBox>
            </FlexBox>
            <FlexBox>
              <Textarea
                label={<FilterLabel>교육수료 후 취업에 대한 의견</FilterLabel>}
                labelPlacement="outside"
                className="max-w-full"
                variant="bordered"
                minRows={5}
                onChange={e => {
                  register('detail').onChange(e)
                }}
                {...register('detail')}
              />
            </FlexBox>
            <BtnBox>
              {loginMGrade < grade.general || loginMPart?.includes('교무팀') ? (
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
              ) : null}
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
    </>
  )
}