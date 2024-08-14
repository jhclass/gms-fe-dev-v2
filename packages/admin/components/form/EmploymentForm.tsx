import { Button, Input, Radio, RadioGroup } from '@nextui-org/react'
import { styled } from 'styled-components'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { getYear } from 'date-fns'
registerLocale('ko', ko)
const _ = require('lodash')
import DatePickerHeader from '@/components/common/DatePickerHeader'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import useUserLogsMutation from '@/utils/userLogs'
import { useMutation } from '@apollo/client'
import { CREATE_EMPLOYMENT_MUTATION } from '@/graphql/mutations'
import { SEARCH_SM_QUERY } from '@/graphql/queries'

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

export default function EmploymentForm({ paymentId, subjectId }) {
  const { userLogs } = useUserLogsMutation()
  const [createEmployment] = useMutation(CREATE_EMPLOYMENT_MUTATION)
  const [employmentDate, setEmploymentDate] = useState(null)
  const [employmentType, setEmploymentType] = useState('취업')
  const [imploymentInsurance, setImploymentInsurance] = useState('Y')
  const [proofOfImployment, setProofOfImployment] = useState('Y')
  const [relatedFields, setRelatedFields] = useState('동일')
  const [completionType, setCompletionType] = useState('수료취업')
  const years = _.range(2000, getYear(new Date()) + 5, 1)
  const { register, handleSubmit, reset, control, formState } = useForm()
  const { errors } = formState

  const formatDate = data => {
    const date = new Date(data)
    const formatted =
      `${date.getFullYear()}-` +
      `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
      `${date.getDate().toString().padStart(2, '0')}`
    return formatted
  }

  const onSubmit = data => {
    createEmployment({
      variables: {
        studentPaymentId: paymentId,
        subjectId: subjectId,
        employmentType: data.companyName === '' ? '취업' : data.companyName,
        dateOfEmployment:
          data.dateOfEmployment === undefined
            ? null
            : new Date(data.dateOfEmployment),
        companyName: data.companyName === '' ? null : data.companyName,
        businessNum: data.businessNum === '' ? null : data.businessNum,
        responsibilities:
          data.responsibilities === '' ? null : data.responsibilities,
        location: data.location === '' ? null : data.location,
        phoneNum: data.phoneNum === '' ? null : data.phoneNum,
        businessSize: data.businessSize === '' ? null : data.businessSize,
        imploymentInsurance:
          data.imploymentInsurance === '' ? 'Y' : data.imploymentInsurance,
        proofOfImployment:
          data.proofOfImployment === '' ? 'Y' : data.proofOfImployment,
        relatedFields: data.relatedFields === '' ? '동일' : data.relatedFields,
        completionType:
          data.completionType === '' ? '수료취업' : data.completionType,
      },
      refetchQueries: [SEARCH_SM_QUERY],
      onCompleted: result => {
        userLogs(
          `수강생 ID:${paymentId} 취업 현황 등록`,
          `ok: ${result.createEmploymentStatus.ok}`,
        )
        if (result.createEmploymentStatus.ok) {
          alert(`취업 현황이 등록되었습니다.`)
          reset()
        }
      },
    })
  }

  return (
    <>
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
                <Controller
                  control={control}
                  name="employmentType"
                  rules={{
                    required: { value: true, message: '구분을 선택해 주세요.' },
                  }}
                  defaultValue={employmentType}
                  render={({ field, fieldState }) => (
                    <RadioGroup
                      label={
                        <FilterLabel>
                          구분 <span>*</span>
                        </FilterLabel>
                      }
                      orientation="horizontal"
                      className="gap-1"
                      defaultValue={'취업'}
                      value={employmentType}
                      onValueChange={value => {
                        field.onChange(value)
                        setEmploymentType(value)
                      }}
                    >
                      <Radio key={'취업'} value={'취업'}>
                        취업
                      </Radio>
                      <Radio key={'창업'} value={'창업'}>
                        창업
                      </Radio>
                    </RadioGroup>
                  )}
                />
                {errors.employmentType && (
                  <p className="px-2 pt-2 text-xs text-red">
                    {String(errors.employmentType.message)}
                  </p>
                )}
              </AreaBox>
              <AreaBox>
                <DatePickerBox>
                  <Controller
                    control={control}
                    name="dateOfEmployment"
                    rules={{
                      required: {
                        value: true,
                        message: '취득일자를 선택해주세요.',
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
                          employmentDate === null
                            ? null
                            : new Date(employmentDate)
                        }
                        placeholderText="날짜를 선택해주세요."
                        isClearable
                        onChange={date => {
                          field.onChange(date)
                          setEmploymentDate(date)
                        }}
                        onChangeRaw={e => e.preventDefault()}
                        onFocus={e => e.target.blur()}
                        dateFormat="yyyy/MM/dd"
                        customInput={
                          <Input
                            label={
                              <FilterLabel>
                                취업일자 <span>*</span>
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
                {errors.dateOfEmployment && (
                  <p className="px-2 pt-2 text-xs text-red">
                    {String(errors.dateOfEmployment.message)}
                  </p>
                )}
              </AreaBox>
              <AreaBox>
                <Input
                  labelPlacement="outside"
                  placeholder="회사명"
                  variant={'bordered'}
                  radius="md"
                  type="text"
                  label={
                    <FilterLabel>
                      회사명<span>*</span>
                    </FilterLabel>
                  }
                  className="w-full"
                  onChange={e => {
                    register('companyName').onChange(e)
                  }}
                  {...register('companyName', {
                    required: {
                      value: true,
                      message: '회사명을 입력해주세요.',
                    },
                  })}
                />
                {errors.companyName && (
                  <p className="px-2 pt-2 text-xs text-red">
                    {String(errors.companyName.message)}
                  </p>
                )}
              </AreaBox>
              <AreaBox>
                <Input
                  labelPlacement="outside"
                  placeholder="사업자번호"
                  variant={'bordered'}
                  radius="md"
                  type="text"
                  label="사업자번호"
                  className="w-full"
                  onChange={e => {
                    register('businessNum').onChange(e)
                  }}
                  {...register('businessNum', {
                    required: {
                      value: true,
                      message: '사업자 번호를 입력해주세요.',
                    },
                  })}
                />
                {errors.businessNum && (
                  <p className="px-2 pt-2 text-xs text-red">
                    {String(errors.businessNum.message)}
                  </p>
                )}
              </AreaBox>
            </FlexBox>
            <FlexBox>
              <AreaBox>
                <Input
                  labelPlacement="outside"
                  placeholder="담당업무"
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="담당업무"
                  className="w-full"
                  onChange={e => {
                    register('responsibilities').onChange(e)
                  }}
                  {...register('responsibilities', {
                    required: {
                      value: true,
                      message: '담당업무를 입력해주세요.',
                    },
                  })}
                />
                {errors.businessNum && (
                  <p className="px-2 pt-2 text-xs text-red">
                    {String(errors.businessNum.message)}
                  </p>
                )}
              </AreaBox>
              <AreaBox>
                <Input
                  labelPlacement="outside"
                  placeholder="전화번호"
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="전화번호"
                  className="w-full"
                  maxLength={12}
                  onChange={e => {
                    register('phoneNum').onChange(e)
                  }}
                  {...register('phoneNum', {
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
                {errors.phoneNum && (
                  <p className="px-2 pt-2 text-xs text-red">
                    {String(errors.phoneNum.message)}
                  </p>
                )}
              </AreaBox>
              <AreaBox>
                <Input
                  labelPlacement="outside"
                  placeholder="소재지"
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="소재지"
                  className="w-full"
                  onChange={e => {
                    register('location').onChange(e)
                  }}
                  {...register('location', {
                    required: {
                      value: true,
                      message: '소재지를 입력해주세요.',
                    },
                  })}
                />
                {errors.location && (
                  <p className="px-2 pt-2 text-xs text-red">
                    {String(errors.location.message)}
                  </p>
                )}
              </AreaBox>
              <AreaBox>
                <Input
                  labelPlacement="outside"
                  placeholder="사업장 규모"
                  variant="bordered"
                  radius="md"
                  type="text"
                  label="사업장 규모"
                  className="w-full"
                  onChange={e => {
                    register('businessSize').onChange(e)
                  }}
                  {...register('businessSize', {
                    required: {
                      value: true,
                      message: '사업장 규모를 입력해주세요.',
                    },
                  })}
                />
                {errors.businessSize && (
                  <p className="px-2 pt-2 text-xs text-red">
                    {String(errors.businessSize.message)}
                  </p>
                )}
              </AreaBox>
            </FlexBox>
            <FlexBox>
              <AreaBox>
                <Controller
                  control={control}
                  name="imploymentInsurance"
                  rules={{
                    required: {
                      value: true,
                      message: '고용보험 여부를 선택해 주세요.',
                    },
                  }}
                  defaultValue={imploymentInsurance}
                  render={({ field, fieldState }) => (
                    <RadioGroup
                      label={
                        <FilterLabel>
                          고용보험 <span>*</span>
                        </FilterLabel>
                      }
                      orientation="horizontal"
                      className="gap-1"
                      value={imploymentInsurance}
                      onValueChange={value => {
                        field.onChange(value)
                        setImploymentInsurance(value)
                      }}
                    >
                      <Radio key={'Y'} value={'Y'}>
                        Y
                      </Radio>
                      <Radio key={'N'} value={'N'}>
                        N
                      </Radio>
                    </RadioGroup>
                  )}
                />
                {errors.imploymentInsurance && (
                  <p className="px-2 pt-2 text-xs text-red">
                    {String(errors.imploymentInsurance.message)}
                  </p>
                )}
              </AreaBox>
              <AreaBox>
                <Controller
                  control={control}
                  name="proofOfImployment"
                  rules={{
                    required: {
                      value: true,
                      message: '재직증명 여부를 선택해 주세요.',
                    },
                  }}
                  defaultValue={proofOfImployment}
                  render={({ field, fieldState }) => (
                    <RadioGroup
                      label={
                        <FilterLabel>
                          재직증명 <span>*</span>
                        </FilterLabel>
                      }
                      orientation="horizontal"
                      className="gap-1"
                      value={proofOfImployment}
                      onValueChange={value => {
                        field.onChange(value)
                        setProofOfImployment(value)
                      }}
                    >
                      <Radio key={'Y'} value={'Y'}>
                        Y
                      </Radio>
                      <Radio key={'N'} value={'N'}>
                        N
                      </Radio>
                    </RadioGroup>
                  )}
                />
                {errors.proofOfImployment && (
                  <p className="px-2 pt-2 text-xs text-red">
                    {String(errors.proofOfImployment.message)}
                  </p>
                )}
              </AreaBox>
              <AreaBox>
                <Controller
                  control={control}
                  name="relatedFields"
                  rules={{
                    required: {
                      value: true,
                      message: '관련 분야를 선택해 주세요.',
                    },
                  }}
                  defaultValue={relatedFields}
                  render={({ field, fieldState }) => (
                    <RadioGroup
                      label={
                        <FilterLabel>
                          관련분야 <span>*</span>
                        </FilterLabel>
                      }
                      orientation="horizontal"
                      className="gap-1"
                      value={relatedFields}
                      onValueChange={value => {
                        field.onChange(value)
                        setRelatedFields(value)
                      }}
                    >
                      <Radio key={'동일'} value={'동일'}>
                        동일
                      </Radio>
                      <Radio key={'관련'} value={'관련'}>
                        관련
                      </Radio>
                      <Radio key={'다른'} value={'다른'}>
                        다른
                      </Radio>
                    </RadioGroup>
                  )}
                />
                {errors.relatedFields && (
                  <p className="px-2 pt-2 text-xs text-red">
                    {String(errors.relatedFields.message)}
                  </p>
                )}
              </AreaBox>
              <AreaBox>
                <Controller
                  control={control}
                  name="completionType"
                  rules={{
                    required: {
                      value: true,
                      message: '취업 형태를 선택해 주세요.',
                    },
                  }}
                  defaultValue={completionType}
                  render={({ field, fieldState }) => (
                    <RadioGroup
                      label={
                        <FilterLabel>
                          취업형태 <span>*</span>
                        </FilterLabel>
                      }
                      orientation="horizontal"
                      className="gap-1"
                      value={completionType}
                      onValueChange={value => {
                        field.onChange(value)
                        setCompletionType(value)
                      }}
                    >
                      <Radio key={'조기취업'} value={'조기취업'}>
                        조기취업
                      </Radio>
                      <Radio key={'수료취업'} value={'수료취업'}>
                        수료취업
                      </Radio>
                    </RadioGroup>
                  )}
                />
                {errors.completionType && (
                  <p className="px-2 pt-2 text-xs text-red">
                    {String(errors.completionType.message)}
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
