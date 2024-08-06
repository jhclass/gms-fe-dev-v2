import {
  Button,
  Checkbox,
  Input,
  Radio,
  RadioGroup,
  ScrollShadow,
  Textarea,
} from '@nextui-org/react'
import { styled } from 'styled-components'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { getYear } from 'date-fns'
registerLocale('ko', ko)
const _ = require('lodash')
import DatePickerHeader from '@/components/common/DatePickerHeader'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useUserLogsMutation from '@/utils/userLogs'
import { useRouter } from 'next/router'

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
  color: ${({ theme }) => theme.colors.black};

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
    color: ${({ theme }) => theme.colors.gray};
  }
  position: absolute;
  top: 0;
  right: 0;
  z-index: 5;
`

export default function EmploymentForm() {
  const router = useRouter()
  const [employmentDate, setEmploymentDate] = useState(null)
  const years = _.range(2000, getYear(new Date()) + 5, 1)
  const { userLogs } = useUserLogsMutation()
  const { register, control, handleSubmit, setValue, formState } = useForm()
  const { errors, dirtyFields, isDirty } = formState

  const formatDate = data => {
    const date = new Date(data)
    const formatted =
      `${date.getFullYear()}-` +
      `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
      `${date.getDate().toString().padStart(2, '0')}`
    return formatted
  }

  const onSubmit = data => {
    console.log(data)
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
                  <p className="px-2 pt-2 text-xs text-red">
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
              <Button
                type="submit"
                size="md"
                radius="md"
                variant="solid"
                color="primary"
                className="w-full text-white"
              >
                저장
              </Button>
              <Button
                variant="bordered"
                color="primary"
                className="w-full text-primary"
                onClick={() => router.back()}
              >
                이전으로
              </Button>
            </BtnBox>
          </DetailDiv>
        </form>
      </DetailBox>
    </>
  )
}
