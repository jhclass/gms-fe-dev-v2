import { styled } from 'styled-components'
import { useRouter } from 'next/router'
import { Button, Input, Textarea } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import useUserLogsMutation from '@/utils/userLogs'
import { CREATE_HOPE_FOR_EMPLOYMENT_MUTATION } from '@/graphql/mutations'
import { useForm } from 'react-hook-form'

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
      background: ${({ theme }) => theme.colors.black};
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
const AreaBox = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
`
const FilterLabel = styled.p`
  font-weight: 500;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.black};

  span {
    color: red;
  }
`
const BtnBox = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`

export default function WishForm({ paymentId, subjectId }) {
  const router = useRouter()
  const { userLogs } = useUserLogsMutation()
  const [createHope] = useMutation(CREATE_HOPE_FOR_EMPLOYMENT_MUTATION)
  const { register, handleSubmit, reset, control, formState } = useForm()
  const { errors } = formState

  const onSubmit = data => {
    console.log(data)
    console.log(subjectId, paymentId)
    createHope({
      variables: {
        studentPaymentId: paymentId,
        subjectId: subjectId,
        workingArea: data.workingArea,
        fieldOfHope: data.fieldOfHope,
        hopefulReward: parseInt(data.hopefulReward),
        workType: data.workType,
        workingHours: parseInt(data.workingHours),
        opinion: data.opinion,
      },
      onCompleted: result => {
        userLogs(
          `수강생 ID:${paymentId} 취업 희망 현황 등록`,
          `ok: ${result.createHopeForEmployment.ok}`,
        )
        if (result.createHopeForEmployment.ok) {
          alert(`취업 희망 현황이 등록되었습니다.`)
          reset()
        }
      },
    })
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
                  label={
                    <FilterLabel>
                      근무지역 <span>*</span>
                    </FilterLabel>
                  }
                  className="w-full"
                  onChange={e => {
                    register('workingArea').onChange(e)
                  }}
                  {...register('workingArea', {
                    required: {
                      value: true,
                      message: '근무지역을 입력해주세요.',
                    },
                  })}
                />
                {errors.workingArea && (
                  <p className="px-2 pt-2 text-xs text-red">
                    {String(errors.workingArea.message)}
                  </p>
                )}
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
                    register('fieldOfHope').onChange(e)
                  }}
                  {...register('fieldOfHope', {
                    required: {
                      value: true,
                      message: '희망분야를 입력해주세요.',
                    },
                  })}
                />
                {errors.fieldOfHope && (
                  <p className="px-2 pt-2 text-xs text-red">
                    {String(errors.fieldOfHope.message)}
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
                  label={
                    <FilterLabel>
                      희망보수 <span>*</span>
                    </FilterLabel>
                  }
                  // defaultValue={managerData.mPhoneNumFriend}
                  className="w-full"
                  onChange={e => {
                    register('hopefulReward').onChange(e)
                  }}
                  {...register('hopefulReward', {
                    required: {
                      value: true,
                      message: '희망보수를 입력해주세요.',
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: '숫자만 사용가능합니다.',
                    },
                  })}
                />
                {errors.hopefulReward && (
                  <p className="px-2 pt-2 text-xs text-red">
                    {String(errors.hopefulReward.message)}
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
                  // defaultValue={managerData.email}
                  label={
                    <FilterLabel>
                      근무형태 <span>*</span>
                    </FilterLabel>
                  }
                  className="w-full"
                  onChange={e => {
                    register('workType').onChange(e)
                  }}
                  {...register('workType', {
                    required: {
                      value: true,
                      message: '근무형태를 입력해주세요.',
                    },
                  })}
                />
                {errors.workType && (
                  <p className="px-2 pt-2 text-xs text-red">
                    {String(errors.workType.message)}
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
                  // defaultValue={managerData.email}
                  label={
                    <FilterLabel>
                      근무시간 <span>*</span>
                    </FilterLabel>
                  }
                  className="w-full"
                  onChange={e => {
                    register('workingHours').onChange(e)
                  }}
                  {...register('workingHours', {
                    required: {
                      value: true,
                      message: '근무시간을 입력해주세요.',
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: '숫자만 사용가능합니다.',
                    },
                  })}
                />
                {errors.workingHours && (
                  <p className="px-2 pt-2 text-xs text-red">
                    {String(errors.workingHours.message)}
                  </p>
                )}
              </AreaBox>
            </FlexBox>
            <FlexBox>
              <AreaBox>
                <Textarea
                  label={
                    <FilterLabel>
                      교육수료 후 취업에 대한 의견 <span>*</span>
                    </FilterLabel>
                  }
                  labelPlacement="outside"
                  className="max-w-full"
                  variant="bordered"
                  minRows={5}
                  onChange={e => {
                    register('opinion').onChange(e)
                  }}
                  {...register('opinion', {
                    required: {
                      value: true,
                      message: '교육수료 후 취업에 대한 의견을 입력해주세요.',
                    },
                  })}
                />
                {errors.opinion && (
                  <p className="px-2 pt-2 text-xs text-red">
                    {String(errors.opinion.message)}
                  </p>
                )}
              </AreaBox>
            </FlexBox>
            <BtnBox>
              <Button
                type="submit"
                size="md"
                radius="md"
                variant="solid"
                color="primary"
                className="w-full text-white lg:w-[50%]"
              >
                저장
              </Button>
            </BtnBox>
          </DetailDiv>
        </form>
      </DetailBox>
    </>
  )
}
