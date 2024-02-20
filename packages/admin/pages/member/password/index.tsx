import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { Input } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { MME_QUERY } from '@/graphql/queries'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'
import { EDIT_MANAGE_USER_MUTATION } from '@/graphql/mutations'
import Layout from '@/pages/member/layout'

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
  const [editManager] = useMutation(EDIT_MANAGE_USER_MUTATION)
  const { userLogs } = useUserLogsMutation()
  const { register, handleSubmit, formState } = useForm()
  const { errors, isDirty, dirtyFields } = formState

  const onSubmit = data => {
    if (isDirty) {
      editManager({
        variables: {
          mPassword: data.mPassword,
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
              `관리자 ${data.mUsername} 비밀번호 수정`,
              dirtyFieldsArray.join(', '),
            )
            alert('비밀번호가 수정되었습니다.')
          }
        },
      })
    }
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
                    placeholder=" "
                    variant="bordered"
                    radius="md"
                    type="text"
                    label="이름"
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
              </FlexBox>
              <FlexBox>
                <AreaBox>
                  <Input
                    defaultValue=" "
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
              <BtnBox>
                <Button2
                  buttonType="submit"
                  width="100%"
                  height="2.5rem"
                  typeBorder={true}
                  fontColor="#fff"
                  bgColor="#007de9"
                >
                  비밀번호 변경
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
