import MainWrap from '@/components/wrappers/MainWrap'
import { useEffect } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import { Input, Button } from '@nextui-org/react'
import { useMutation, useQuery } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { MME_QUERY } from '@/graphql/queries'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'
import Layout from './layout'
import { EDIT_MANAGE_USER_MUTATION } from '@/graphql/mutations'

const ConArea = styled.div`
  width: 100%;
  max-width: 1400px;
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

const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #11181c;
  padding-bottom: 0.37rem;
  display: block;
`
const BtnBox = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`

export default function Profile() {
  const router = useRouter()
  const { loading, error, data } = useQuery(MME_QUERY)
  const [editManager] = useMutation(EDIT_MANAGE_USER_MUTATION)
  const { userLogs } = useUserLogsMutation()
  const mMeData = data?.mMe
  const { register, handleSubmit, formState } = useForm()
  const { errors, isDirty, dirtyFields } = formState

  useEffect(() => {
    // searchSubjectMutation({
    //   variables: { exposure: true, page: currentPage, limit: currentLimit },
    //   onCompleted: resData => {
    //     const { result, totalCount } = resData.searchSubject || {}
    //     setSubjectList({ result, totalCount })
    //   },
    // })
  }, [router])

  const onSubmit = data => {
    if (isDirty) {
      editManager({
        variables: {
          mUsername: data.mUsername === '' ? null : data.mUsername,
          mPassword: mMeData.mPassword,
          mGrade: mMeData.mGrade,
          mRank: mMeData.mRank,
          mPhoneNum: data.mPhoneNum === '' ? null : data.mPhoneNum,
          mPhoneNumCompany: mMeData.mPhoneNumCompany,
          mPhoneNumInside: mMeData.mPhoneNumInside,
          mPhoneNumFriend:
            data.mPhoneNumFriend === '' ? null : data.mPhoneNumFriend,
          mPart: mMeData.mPart,
          mAvatar: mMeData.mAvatar,
          mJoiningDate: mMeData.mJoiningDate,
          mAddresses: data.mAddresses === '' ? null : data.mAddresses,
        },
        refetchQueries: [
          {
            query: MME_QUERY,
          },
        ],
        onCompleted: data => {
          alert('정보가 수정되었습니다.')
        },
      })
      const dirtyFieldsArray = [...Object.keys(dirtyFields)]
      userLogs(
        `관리자 ${data.mUsername} 정보 수정`,
        dirtyFieldsArray.join(', '),
      )
    }
  }

  const fametDate = data => {
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

  return (
    <>
      <MainWrap>
        <ConArea>
          <Breadcrumb rightArea={false} />
          <DetailBox>
            <DetailForm onSubmit={handleSubmit(onSubmit)}>
              <FlexBox>
                <AreaBox>
                  <Input
                    labelPlacement="outside"
                    placeholder="이름"
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="이름"
                    defaultValue={mMeData.mUsername}
                    onChange={e => {
                      register('mUsername').onChange(e)
                    }}
                    className="w-full"
                    {...register('mUsername', {
                      required: {
                        value: true,
                        message: '이름을 입력해주세요.',
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
                  <FilterLabel>비밀번호</FilterLabel>
                  <Button
                    size="md"
                    radius="md"
                    variant="solid"
                    className="w-full text-white bg-flag1"
                  >
                    비밀번호 변경
                  </Button>
                </AreaBox>
                <AreaBox>
                  <Input
                    isReadOnly
                    defaultValue={mMeData.mPhoneNumInside}
                    labelPlacement="outside"
                    placeholder=" "
                    variant="faded"
                    radius="md"
                    type="text"
                    label="내선번호"
                    className="w-full"
                    {...register('mPhoneNumInside')}
                  />
                </AreaBox>
              </FlexBox>
              <FlexBox>
                <Input
                  defaultValue={mMeData.mAddresses}
                  labelPlacement="outside"
                  placeholder=" "
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="주소"
                  onChange={e => {
                    register('mAddresses').onChange(e)
                  }}
                  className="w-full"
                  {...register('mAddresses')}
                />
              </FlexBox>
              <FlexBox>
                <AreaBox>
                  <Input
                    isReadOnly
                    defaultValue={mMeData.mPhoneNumCompany}
                    labelPlacement="outside"
                    placeholder="'-'없이 작성해주세요"
                    variant="faded"
                    radius="md"
                    type="text"
                    label="번호"
                    className="w-full"
                    {...register('mPhoneNumCompany')}
                  />
                </AreaBox>
                <AreaBox>
                  <Input
                    defaultValue={mMeData.mPhoneNum}
                    labelPlacement="outside"
                    placeholder="'-'없이 작성해주세요"
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="휴대폰번호"
                    onChange={e => {
                      register('mPhoneNum').onChange(e)
                    }}
                    className="w-full"
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
                  {errors.phoneNum1 && (
                    <p className="px-2 pt-2 text-xs text-red-500">
                      {String(errors.phoneNum1.message)}
                    </p>
                  )}
                </AreaBox>
                <AreaBox>
                  <Input
                    defaultValue={mMeData.mPhoneNumFriend}
                    labelPlacement="outside"
                    placeholder="'-'없이 작성해주세요"
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="기타번호"
                    onChange={e => {
                      register('mPhoneNumFriend').onChange(e)
                    }}
                    className="w-full"
                    {...register('mPhoneNumFriend', {
                      pattern: {
                        value: /^[0-9]+$/,
                        message: '숫자만 입력 가능합니다.',
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
                    isReadOnly
                    defaultValue={mMeData.mPart}
                    labelPlacement="outside"
                    placeholder=" "
                    variant="faded"
                    radius="md"
                    type="text"
                    label="부서"
                    className="w-full"
                    {...register('mPart')}
                  />
                </AreaBox>
                <AreaBox>
                  <Input
                    isReadOnly
                    defaultValue={mMeData.mRank}
                    labelPlacement="outside"
                    placeholder=" "
                    variant="faded"
                    radius="md"
                    type="text"
                    label="직급"
                    className="w-full"
                    maxLength={11}
                    {...register('mRank')}
                  />
                </AreaBox>
                <AreaBox>
                  <Input
                    isReadOnly
                    defaultValue={
                      mMeData.mJoiningDate === null
                        ? ''
                        : fametDate(mMeData.mJoiningDate)
                    }
                    labelPlacement="outside"
                    placeholder="입사일"
                    variant="faded"
                    radius="md"
                    type="text"
                    label="입사일"
                    startContent={<i className="xi-calendar" />}
                    className="w-full"
                    {...register('mJoiningDate')}
                  />
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
                  정보 수정
                </Button2>
              </BtnBox>
            </DetailForm>
          </DetailBox>
        </ConArea>
      </MainWrap>
    </>
  )
}
Profile.getLayout = page => <Layout>{page}</Layout>
