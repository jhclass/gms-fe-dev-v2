import { styled } from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import { Input, Radio, RadioGroup, Textarea } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import {
  DELETE_STUDENT_MEMO_MUTATION,
  SEARCH_STUDENT_MEMO_MUTATION,
  UPDATE_STUDENT_MEMO_MUTATION,
} from '@/graphql/mutations'
import { Controller, useForm } from 'react-hook-form'
import Button2 from '@/components/common/Button'
import useUserLogsMutation from '@/utils/userLogs'
import useMmeQuery from '@/utils/mMe'
import DatePickerHeader from '../common/DatePickerHeader'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { getYear } from 'date-fns'
import { useState } from 'react'
registerLocale('ko', ko)
const _ = require('lodash')

const DetailForm = styled.form`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  border: 2px solid hsl(240 6% 90%);
  padding: 1rem;
  border-radius: 0.5rem;
`

const MemoList = styled.ul`
  margin-top: 1.5rem;
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`
const MemoListBtn = styled.p`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;

  button {
    width: 5rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;

    button {
      width: 50%;
    }
  }
`
const MemoInfo = styled.label`
  display: flex;
  gap: 0.3rem;
`
const MemoGrade = styled.span`
  width: 0.8rem;
  height: 0.8rem;
  overflow: hidden;
  border-radius: 100%;
  background: #4f46e5;
  text-align: center;
  font-weight: 700;
  color: #fff;
  line-height: 0.8rem;
  font-size: 0.5rem;
`
const MemoName = styled.span`
  color: #11181c;
  font-weight: 600;
`
const MemoTime = styled.span``

const FlexBox = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.3rem;
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
  color: #11181c;

  span {
    color: red;
  }
`

type memoData = {
  id: number
  content: string
  createdAt: string
  updatedAt: string
  manageUser: {
    id: number
    mUserId: string
    mUsername: string
  }
  manageUserId: number
}

export default function EmploymentMemo(props) {
  const { useMme } = useMmeQuery()
  const mId = useMme('id')
  const { userLogs } = useUserLogsMutation()
  const [deleteMemo] = useMutation(DELETE_STUDENT_MEMO_MUTATION)
  const [updateMemo] = useMutation(UPDATE_STUDENT_MEMO_MUTATION)
  const [searchStudentMutation] = useMutation(SEARCH_STUDENT_MEMO_MUTATION)
  const years = _.range(2000, getYear(new Date()) + 5, 1)
  const [memoType, setMemoType] = useState('기초상담')
  const [memoDate, setMemoDate] = useState(null)
  const { register, handleSubmit, control, formState } = useForm({})
  const { isDirty } = formState
  const onDelete = data => {
    const isDelete = confirm('메모를 삭제하시겠습니까?')
    if (isDelete) {
      deleteMemo({
        variables: {
          deleteStudentMemoId: data,
        },
        onCompleted: result => {
          if (result.deleteStudentMemo.ok) {
            props.setMemoList([])
            searchStudentMutation({
              variables: {
                searchStudentId: parseInt(props.studentId),
              },
              onCompleted: data => {
                if (data.searchStudent.ok) {
                  props.setMemoList(data.searchStudent.student[0].studentMemo)
                  userLogs(`수강생 id:${data} 메모 삭제`)
                }
              },
            })
          }
        },
      })
    }
  }

  const onSubmit = data => {
    if (isDirty) {
      updateMemo({
        variables: {
          editStudentMemoId: parseInt(data.id),
          content: data.content.trim(),
        },
        onCompleted: result => {
          if (result.editStudentMemo.ok) {
            props.setMemoList([])
            searchStudentMutation({
              variables: {
                searchStudentId: parseInt(props.studentId),
              },
              onCompleted: data => {
                if (data.searchStudent.ok) {
                  props.setMemoList(data.searchStudent.student[0].studentMemo)
                }
              },
            })
          }
        },
      })
      userLogs(`수강생 id:${data.id} 메모 수정`)
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

  const gradeStr = data => {
    if (data == null) {
      return 'A'
    } else {
      const idF = data?.charAt(0).toUpperCase()
      return idF
    }
  }

  const handleTypeChange = value => {
    setMemoType(value)
  }

  return (
    <DetailForm onSubmit={handleSubmit(onSubmit)}>
      <FlexBoxTop>
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
              <p className="px-2 pt-2 text-xs text-red-500">
                {String(errors.paymentDate.message)}
              </p>
            )} */}
        </AreaBox>
      </FlexBoxTop>
      <FlexBox>
        <Input
          labelPlacement="outside"
          placeholder=" "
          variant="bordered"
          radius="md"
          type="text"
          label="아이디"
          // defaultValue={props.item?.id}
          // value={props.item?.id}
          className="hidden w-full"
          {...register('id')}
        />
        <Controller
          name="content"
          control={control}
          // defaultValue={props.item.content}
          render={({ field }) => (
            <>
              <Textarea
                label={
                  <MemoInfo>
                    <MemoGrade>
                      {/* {gradeStr(props.item.manageUser?.mUserId)} */}A
                    </MemoGrade>
                    <MemoName>
                      {/* {props.item.manageUser?.mUsername} */}
                      작성자
                    </MemoName>
                    <MemoTime>
                      {/* {formatDate(props.item.updatedAt)} */}
                      2024.06.04 13:00
                    </MemoTime>
                  </MemoInfo>
                }
                ref={field.ref}
                // isReadOnly={mId == props.item.manageUser?.id ? false : true}
                variant="faded"
                className="max-w-full"
                value={field.value}
                onChange={e => field.onChange(e.target.value)}
                {...register('content')}
              />
            </>
          )}
        />
        {/* {mId == props.item.manageUser?.id && ( */}
        <MemoListBtn>
          <Button2
            buttonType="submit"
            width="100%"
            height="2.5rem"
            typeBorder={true}
            fontColor="#fff"
            bgColor="#007de9"
          >
            수정
          </Button2>
          <Button2
            buttonType="button"
            width="100%"
            height="2.5rem"
            fontColor="#007de9"
            bgColor="#fff"
            borderColor="#007de9"
            typeBorder={true}
            onClick={() => onDelete(props.item.id)}
          >
            삭제
          </Button2>
        </MemoListBtn>
        {/* )} */}
      </FlexBox>
    </DetailForm>
  )
}
