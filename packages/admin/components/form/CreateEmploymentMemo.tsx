import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import { Button, Input, Radio, RadioGroup, Textarea } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import {
  CREATE_STUDENT_CONSULTATION_MUTATION,
  CREATE_STUDENT_MEMO_MUTATION,
  SEARCH_STUDENT_MEMO_MUTATION,
} from '@/graphql/mutations'
import { Controller, useForm } from 'react-hook-form'
import useUserLogsMutation from '@/utils/userLogs'
import DatePickerHeader from '@/components/common/DatePickerHeader'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { getYear } from 'date-fns'
registerLocale('ko', ko)
const _ = require('lodash')

const DetailForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const MemoBox = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex: 1 3;

  textarea {
    width: 100%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.3rem;
  }
`
const MemoBtn = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1.75rem;
  width: 5rem;

  @media (max-width: 768px) {
    padding-top: 0;
    width: 100%;
  }
`

const FlexBox = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding-right: 6rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding-right: 0;
  }
`

const FlexBoxTop = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding-right: 6rem;

  @media (max-width: 768px) {
    padding-right: 0;
    flex-direction: column;
    gap: 0.3rem;
  }
`
const AreaBox = styled.div`
  flex: 1;
  width: 100%;
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

const FilterLabel = styled.p`
  font-weight: 500;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.black};

  span {
    color: red;
  }
`

export default function CreateEmploymentMemo({ paymentId, subjectId }) {
  const { userLogs } = useUserLogsMutation()
  const [createConsultation] = useMutation(CREATE_STUDENT_CONSULTATION_MUTATION)

  const { register, handleSubmit, reset, control, formState } = useForm()
  const { errors } = formState
  const [memoType, setMemoType] = useState('기초상담')
  const [memoDate, setMemoDate] = useState(null)
  const years = _.range(2000, getYear(new Date()) + 5, 1)

  const onSubmit = data => {
    console.log(data)
    console.log(subjectId, paymentId)
    createConsultation({
      variables: {
        subjectId: subjectId,
        studentPaymentId: paymentId,
        typeOfConsultation: data.typeOfConsultation,
        dateOfConsultation: data.dateOfConsultation,
        detailsOfConsultation: data.detailsOfConsultation,
      },
      onCompleted: result => {
        console.log(result)
        userLogs(
          `수강생 ID:${paymentId} ${data.typeOfConsultation} 등록`,
          `ok: ${result.createStudentConsultation.ok}`,
        )
        if (result.createStudentConsultation.ok) {
          alert(`${data.typeOfConsultation} 등록되었습니다.`)
          reset()
          setMemoType('기초상담')
          setMemoDate(null)
        }
      },
    })
  }

  const handleTypeChange = value => {
    setMemoType(value)
  }
  return (
    <>
      <DetailForm onSubmit={handleSubmit(onSubmit)}>
        <FlexBox>
          <AreaBox>
            <RadioBox>
              <Controller
                control={control}
                name="typeOfConsultation"
                rules={{
                  required: {
                    value: true,
                    message: '상담 구분을 선택해주세요.',
                  },
                }}
                defaultValue={memoType}
                render={({ field }) => (
                  <RadioGroup
                    label={
                      <FilterLabel>
                        상담 구분<span>*</span>
                      </FilterLabel>
                    }
                    orientation="horizontal"
                    className="gap-[0.65rem]"
                    value={memoType}
                    onValueChange={value => {
                      field.onChange(value)
                      handleTypeChange(value)
                    }}
                  >
                    <Radio key={'기초상담'} value={'기초상담'}>
                      기초상담
                    </Radio>
                    <Radio key={'취업상담'} value={'취업상담'}>
                      취업상담
                    </Radio>
                    <Radio key={'사후관리'} value={'사후관리'}>
                      사후관리
                    </Radio>
                  </RadioGroup>
                )}
              />
            </RadioBox>
            {errors.typeOfConsultation && (
              <p className="px-2 pt-2 text-xs text-red">
                {String(errors.typeOfConsultation.message)}
              </p>
            )}
          </AreaBox>
          <AreaBox>
            <DatePickerBox>
              <Controller
                control={control}
                rules={{ required: '상담 일자를 선택해주세요.' }}
                name="dateOfConsultation"
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
                    selected={memoDate === null ? null : new Date(memoDate)}
                    placeholderText="날짜를 선택해주세요."
                    isClearable
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={1}
                    onChange={date => {
                      field.onChange(date)
                      setMemoDate(date)
                    }}
                    dateFormat="yyyy/MM/dd HH:mm"
                    onChangeRaw={e => e.preventDefault()}
                    onFocus={e => e.target.blur()}
                    customInput={
                      <Input
                        ref={field.ref}
                        label={
                          <FilterLabel>
                            상담 일자<span>*</span>
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
            {errors.dateOfConsultation && (
              <p className="px-2 pt-2 text-xs text-red">
                {String(errors.dateOfConsultation.message)}
              </p>
            )}
          </AreaBox>
        </FlexBox>
        <MemoBox>
          <AreaBox>
            <Textarea
              label={
                <FilterLabel>
                  상담 내용<span>*</span>
                </FilterLabel>
              }
              labelPlacement="outside"
              className="max-w-full"
              variant="bordered"
              minRows={5}
              onChange={e => {
                register('detailsOfConsultation').onChange(e)
              }}
              {...register('detailsOfConsultation', {
                required: {
                  value: true,
                  message: '상담 내용을 입력해주세요.',
                },
              })}
            />
            {errors.dateOfConsultation && (
              <p className="px-2 pt-2 text-xs text-red">
                {String(errors.dateOfConsultation.message)}
              </p>
            )}
          </AreaBox>
          <MemoBtn>
            <Button type="submit" color="primary" className="w-full text-white">
              등록
            </Button>
          </MemoBtn>
        </MemoBox>
      </DetailForm>
    </>
  )
}
