import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import { Input, Button, useDisclosure } from '@nextui-org/react'
import { useLazyQuery, useMutation, useSuspenseQuery } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { CREATE_STAMP_QUERY, MME_QUERY } from '@/graphql/queries'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'
import { EDIT_MANAGE_USER_MUTATION } from '@/graphql/mutations'
import Layout from '@/pages/member/layout'
import { ManageUser } from '@/src/generated/graphql'
import ChangePassword from '@/components/modal/ChangePassword'
import { useRef, useState } from 'react'
import Address from '@/components/common/Address'

const ConArea = styled.div`
  width: 100%;
  max-width: 1400px;
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

const FilterLabel = styled.p`
  font-weight: 500;
  font-size: 0.875rem;
  color: #11181c;

  span {
    color: red;
  }
`
const BtnBox = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`

type mmeQuery = {
  mMe: ManageUser
}

export default function Profile() {
  const router = useRouter()
  const { error, data, refetch } = useSuspenseQuery<mmeQuery>(MME_QUERY)
  const [editManager] = useMutation(EDIT_MANAGE_USER_MUTATION, {
    context: {
      headers: {
        'x-apollo-operation-name': 'mAvatar',
        // 'apollo-require-preflight': 'true',
      },
    },
  })
  const { userLogs } = useUserLogsMutation()
  const mMeData = data?.mMe
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, handleSubmit, setValue, setError, clearErrors, formState } =
    useForm()
  const { errors, isDirty, dirtyFields } = formState
  const [avatarImg, setAvatartImg] = useState(null)
  const fileInputRef = useRef(null)

  const gradeStr = data => {
    if (data == null) {
      return 'A'
    } else {
      const idF = data?.charAt(0).toUpperCase()
      return idF
    }
  }

  const onSubmit = data => {
    if (isDirty) {
      editManager({
        variables: {
          mUsername: data.mUsername === '' ? null : data.mUsername,
          mPhoneNum: data.mPhoneNum === '' ? null : data.mPhoneNum,
          mPhoneNumCompany:
            data.mPhoneNumCompany === '' ? null : data.mPhoneNumCompany,
          mPhoneNumInside:
            data.mPhoneNumInside === '' ? null : data.mPhoneNumInside,
          mPhoneNumFriend:
            data.mPhoneNumFriend === '' ? null : data.mPhoneNumFriend,

          mZipCode: data.mZipCode === '' ? null : data.mZipCode.trim(),
          mAddresses: data.mAddresses === '' ? null : data.mAddresses,
          mAddressDetail:
            data.mAddressDetail === '' ? null : data.mAddressDetail.trim(),
          email: data.email === '' ? null : data.email,
          mAvatar: data.mAvatar,
        },
        refetchQueries: [
          {
            query: MME_QUERY,
          },
        ],
        onCompleted: result => {
          if (result.editManageUser.ok) {
            const dirtyFieldsArray = [...Object.keys(dirtyFields)]
            userLogs(
              `관리자 ${data.mUsername} 정보 수정`,
              dirtyFieldsArray.join(', '),
            )
            alert('정보가 수정되었습니다.')
          }
        },
      })
    }
  }

  const [
    createTamp,
    { loading: createLoading, error: createError, data: CreateData },
  ] = useLazyQuery(CREATE_STAMP_QUERY, {
    onCompleted: () => {
      refetch()
    },
  })

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

  const handleFileChange = event => {
    const MAX_FILE_SIZE = 10 * 1024 * 1024
    const file = event.target.files[0]
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError('mAvatar', {
          type: 'manual',
          message: '파일이 너무 큽니다. 10Mb이하만 가능합니다.',
        })
      } else {
        clearErrors('mAvatar')
        const reader = new FileReader()
        reader.onloadend = () => {
          setAvatartImg(reader.result)
        }
        reader.readAsDataURL(file)
        setValue('mAvatar', file, { shouldDirty: true })
      }
    }
  }

  const handleButtonClick = e => {
    fileInputRef.current.click()
  }

  if (error) {
    console.log(error)
  }
  const clickCreate = () => {
    createTamp({ variables: { manageUserId: mMeData.id } })
  }

  return (
    mMeData && (
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
                  <span>최근 업데이트 :</span>
                  {formatDate(mMeData?.updatedAt)}
                </UpdateTime>
              </TopInfo>
              <DetailForm onSubmit={handleSubmit(onSubmit)}>
                <AvatarBox>
                  {mMeData?.mAvatar ? (
                    <AvatarF
                      style={{
                        backgroundImage: `${
                          avatarImg === null
                            ? `url('${mMeData?.mAvatar}')`
                            : `url('${avatarImg}')`
                        } `,
                      }}
                    ></AvatarF>
                  ) : (
                    <AvatarF
                      style={{
                        backgroundColor:
                          avatarImg === null ? '#4f46e5' : 'transparent',
                        backgroundImage:
                          avatarImg !== null ? `url('${avatarImg}')` : 'none',
                      }}
                    >
                      {avatarImg === null ? gradeStr(mMeData?.mUserId) : null}
                    </AvatarF>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                  <Button
                    size="sm"
                    color={'primary'}
                    onClick={handleButtonClick}
                    className="bg-[#07bbae]"
                  >
                    프로필 변경
                  </Button>
                </AvatarBox>
                {errors.mAvatar && (
                  <p className="px-2 pt-2 text-xs text-red-500">
                    {String(errors.mAvatar.message)}
                  </p>
                )}
                <FlexBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="이름"
                      variant={'bordered'}
                      radius="md"
                      type="text"
                      defaultValue={mMeData?.mUsername}
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
                <Address
                  codeValueName={'mZipCode'}
                  valueName={'mAddresses'}
                  detailValueName={'mAddressDetail'}
                  setValue={setValue}
                  defaultPostcode={
                    mMeData.mZipCode === null || mMeData.mZipCode === ''
                      ? '우편번호'
                      : mMeData.mZipCode
                  }
                  defaultAddress={
                    mMeData.mAddresses === null || mMeData.mAddresses === ''
                      ? '주소 검색을 클릭해주세요.'
                      : mMeData.mAddresses
                  }
                  defaultDetails={
                    mMeData.mAddressDetail === null ||
                    mMeData.mAddressDetail === ''
                      ? '상세주소'
                      : mMeData.mAddressDetail
                  }
                />
                <FlexBox>
                  <AreaBox>
                    <Input
                      labelPlacement="outside"
                      placeholder="ex)503"
                      variant="bordered"
                      radius="md"
                      type="text"
                      label="내선번호"
                      className="w-full"
                      defaultValue={mMeData.mPhoneNumInside}
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
                      placeholder=" "
                      variant="bordered"
                      radius="md"
                      type="text"
                      defaultValue={mMeData?.email}
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
                      defaultValue={mMeData?.mPhoneNumCompany}
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
                      placeholder="연락처"
                      variant={'bordered'}
                      radius="md"
                      type="text"
                      defaultValue={mMeData?.mPhoneNum}
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
                      placeholder="비상 연락망"
                      variant="bordered"
                      radius="md"
                      type="text"
                      label="기타 연락처"
                      className="w-full"
                      maxLength={12}
                      defaultValue={mMeData?.mPhoneNumFriend}
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
                      isReadOnly
                      defaultValue={mMeData?.mPart.join(',')}
                      labelPlacement="outside"
                      placeholder=" "
                      variant="faded"
                      radius="md"
                      type="text"
                      label={
                        <FilterLabel>
                          부서명<span>*</span>
                        </FilterLabel>
                      }
                      className="w-full"
                      {...register('mPart')}
                    />
                  </AreaBox>
                  <AreaBox>
                    <Input
                      isReadOnly
                      defaultValue={mMeData?.mRank}
                      labelPlacement="outside"
                      placeholder=" "
                      variant="faded"
                      radius="md"
                      type="text"
                      label={
                        <FilterLabel>
                          직책/직위<span>*</span>
                        </FilterLabel>
                      }
                      className="w-full"
                      maxLength={11}
                      {...register('mRank')}
                    />
                  </AreaBox>
                  <AreaBox>
                    <Input
                      isReadOnly
                      defaultValue={
                        mMeData?.mJoiningDate === null
                          ? ''
                          : formatDate(mMeData?.mJoiningDate)
                      }
                      labelPlacement="outside"
                      placeholder="입사일"
                      variant="faded"
                      radius="md"
                      type="text"
                      label={
                        <FilterLabel>
                          입사일<span>*</span>
                        </FilterLabel>
                      }
                      startContent={<i className="xi-calendar" />}
                      className="w-full"
                      {...register('mJoiningDate')}
                    />
                  </AreaBox>
                </FlexBox>
                <FlexBox>
                  <AreaBox>
                    <FilterLabel>
                      도장<span>*</span>
                    </FilterLabel>
                    <div className="flex items-start gap-3 mt-1">
                      <Button
                        isDisabled={mMeData?.Stamp[0]?.imageUrl ? true : false}
                        color={'primary'}
                        onClick={clickCreate}
                      >
                        도장 생성
                      </Button>
                      {mMeData?.Stamp[0]?.imageUrl && (
                        <div className="flex items-start gap-3 px-8 border-2 rounded-lg">
                          <img
                            src={mMeData?.Stamp[0]?.imageUrl}
                            alt={mMeData.mUsername + '인'}
                          />
                        </div>
                      )}
                    </div>
                  </AreaBox>
                  <AreaBox></AreaBox>
                  <AreaBox></AreaBox>
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
        <ChangePassword
          isOpen={isOpen}
          onClose={onClose}
          managerData={mMeData}
        />
      </>
    )
  )
}
Profile.getLayout = page => <Layout>{page}</Layout>
