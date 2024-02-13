import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useResetRecoilState } from 'recoil'
import { refundPageState } from '@/lib/recoilAtoms'
import { Controller, useForm } from 'react-hook-form'
import Button2 from '@/components/common/Button'
import { Button, Input } from '@nextui-org/react'
import { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { getYear } from 'date-fns'
import DatePickerHeader from '../common/DatePickerHeader'
registerLocale('ko', ko)
const _ = require('lodash')
import { subMonths, subDays } from 'date-fns'

type RefundFilterProps = {
  isActive: boolean
}

const FilterBox = styled(motion.div)`
  z-index: 2;
  position: relative;
`
const FilterForm = styled.form`
  display: flex;
  width: 100%;
  gap: 1.5rem;
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  flex-direction: column;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`
const BoxTop = styled.div`
  display: flex;
  flex: 1;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: column;
  }
`
const BoxMiddle = styled.div`
  display: flex;
  flex: 1;
  gap: 2rem;
  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: column;
  }
`
const ItemBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  .react-datepicker-wrapper {
    width: 100%;
  }
`
const DateBtn = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  flex-wrap: wrap;
`
const BtnBox = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;
`
const FilterVariants = {
  hidden: {
    scaleY: 0,
    transformOrigin: 'top',
    height: 0,
  },
  visible: {
    scaleY: 1,
    transformOrigin: 'top',
    height: 'auto',
    transition: {
      duration: 0.3,
    },
  },
}

export default function RefundFilter({
  isActive,
  onFilterSearch,
  setStudentFilter,
}) {
  const refundPage = useResetRecoilState(refundPageState)
  const [paymentDateRange, setPaymentDateRange] = useState([null, null])
  const [startPaymentDate, endPaymentDate] = paymentDateRange
  const years = _.range(1970, getYear(new Date()) + 1, 1)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      studentName: '',
      createdAt: undefined,
    },
  })

  const onSubmit = data => {
    if (isDirty || data.progress !== undefined) {
      const validateDateRange = (dateRange, message) => {
        if (dateRange !== undefined) {
          if (dateRange[1] !== null) {
            return true
          } else {
            alert(message)
            return false
          }
        } else {
          return true
        }
      }
      const paymentDate = validateDateRange(
        data.createdAt,
        '신청일시의 마지막날을 선택해주세요.',
      )
      if (paymentDate) {
        const filter = {
          studentName: data.studentName === '' ? null : data.studentName,
          createdAt: data.createdAt === undefined ? null : data.createdAt,
        }
        setStudentFilter(filter)
        onFilterSearch(true)
        refundPage()
      }
    }
  }
  const setDates = (start, end) => {
    setPaymentDateRange([start, end])
    setValue('createdAt', [start, end])
  }

  const handleYesterdayClick = () => {
    const yesterday = subDays(new Date(), 1)
    setDates(yesterday, yesterday)
  }

  const handleTodayClick = () => {
    const today = new Date()
    setDates(today, today)
  }

  const handleLastMonthClick = () => {
    const today = new Date()
    const lastMonth = subMonths(new Date(), 1)
    setDates(lastMonth, today)
  }

  const handleLastThreeMonthsClick = () => {
    const today = new Date()
    const lastThreeMonths = subMonths(new Date(), 3)
    setDates(lastThreeMonths, today)
  }

  const handleLastSixMonthsClick = () => {
    const today = new Date()
    const lastSixMonths = subMonths(new Date(), 6)
    setDates(lastSixMonths, today)
  }

  const handleReset = () => {
    setPaymentDateRange([null, null])
    reset()
  }

  return (
    <>
      <FilterBox
        variants={FilterVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        <FilterForm onSubmit={handleSubmit(onSubmit)}>
          <BoxTop>
            <ItemBox>
              <Controller
                control={control}
                name="createdAt"
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
                    selectsRange={true}
                    locale="ko"
                    startDate={startPaymentDate}
                    endDate={endPaymentDate}
                    onChange={e => {
                      setPaymentDateRange(e)
                      let date
                      if (e[1] !== null) {
                        date = [e[0], new Date(e[1]?.setHours(23, 59, 59, 999))]
                      } else {
                        date = [e[0], null]
                      }

                      field.onChange(date)
                    }}
                    placeholderText="기간을 선택해주세요."
                    dateFormat="yyyy/MM/dd"
                    customInput={
                      <Input
                        label="신청 일시"
                        labelPlacement="outside"
                        type="text"
                        variant="bordered"
                        id="date"
                        startContent={<i className="xi-calendar" />}
                        {...register('createdAt')}
                      />
                    }
                  />
                )}
              />
              <DateBtn>
                <Button onClick={handleYesterdayClick}>어제</Button>
                <Button onClick={handleTodayClick}>오늘</Button>
                <Button onClick={handleLastMonthClick}>1개월</Button>
                <Button onClick={handleLastThreeMonthsClick}>3개월</Button>
                <Button onClick={handleLastSixMonthsClick}>6개월</Button>
              </DateBtn>
            </ItemBox>

            <ItemBox>
              <Input
                labelPlacement="outside"
                placeholder=" "
                type="text"
                variant="bordered"
                label="수강생이름"
                id="studentName"
                {...register('studentName')}
              />
            </ItemBox>
          </BoxTop>
          <BtnBox>
            <Button2
              buttonType="submit"
              width="calc(50% - 0.5rem)"
              height="2.5rem"
              typeBorder={true}
              fontColor="#fff"
              bgColor="#007de9"
            >
              검색
            </Button2>
            <Button2
              buttonType="reset"
              width="calc(50% - 0.5rem)"
              height="2.5rem"
              fontColor="#007de9"
              bgColor="#fff"
              borderColor="#007de9"
              typeBorder={true}
              onClick={handleReset}
            >
              초기화
            </Button2>
          </BtnBox>
        </FilterForm>
      </FilterBox>
    </>
  )
}