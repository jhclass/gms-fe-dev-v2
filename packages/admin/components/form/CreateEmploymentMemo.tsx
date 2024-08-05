import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import { Button, Input, Radio, RadioGroup, Textarea } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import {
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
  align-items: center;
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

export default function CreateEmploymentMemo(props) {
  const studentId = props.studentId
  const { userLogs } = useUserLogsMutation()
  const [createMemo] = useMutation(CREATE_STUDENT_MEMO_MUTATION)
  const [searchStudentMutation] = useMutation(SEARCH_STUDENT_MEMO_MUTATION)
  const { register, handleSubmit, reset, control, formState } = useForm()
  const { isDirty, isSubmitSuccessful } = formState
  const [memoType, setMemoType] = useState('기초상담')
  const [memoDate, setMemoDate] = useState(null)
  const years = _.range(2000, getYear(new Date()) + 5, 1)

  const onSubmit = async data => {
    if (isDirty) {
      try {
        const { content } = data

        const {
          data: {
            createStudentMemo: { ok },
          },
        } = await createMemo({
          variables: {
            content: content.trim(),
            studentId: studentId,
          },
        })

        userLogs(`수강생 ID:${studentId} 메모 등록`, `ok: ${ok}`)

        if (!ok) {
          throw new Error('메모 등록 실패')
        }

        props.setMemoList([])

        const {
          data: { searchStudent },
        } = await searchStudentMutation({
          variables: {
            searchStudentId: parseInt(studentId),
          },
        })

        if (!searchStudent.ok) {
          throw new Error('학생 조회 실패')
        }

        const { studentMemo } = searchStudent.student[0]
        props.setMemoList(studentMemo)
      } catch (error) {
        console.error('에러 발생:', error)
      }
    }
  }
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ content: '' })
    }
  }, [formState])

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
                name="cashOrCard"
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
          </AreaBox>
          <AreaBox>
            <DatePickerBox>
              <Controller
                control={control}
                rules={{ required: '상담 일자를 선택해주세요.' }}
                name="paymentDate"
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
            {/* {errors.paymentDate && (
              <p className="px-2 pt-2 text-xs text-red">
                {String(errors.paymentDate.message)}
              </p>
            )} */}
          </AreaBox>
        </FlexBox>
        <MemoBox>
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
              register('content').onChange(e)
            }}
            {...register('content')}
          />
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
