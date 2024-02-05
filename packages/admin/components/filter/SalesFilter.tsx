import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useResetRecoilState } from 'recoil'
import { paymentPageState } from '@/lib/recoilAtoms'
import { Controller, useForm } from 'react-hook-form'
import Button2 from '@/components/common/Button'
import { Input } from '@nextui-org/react'
import { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { getYear } from 'date-fns'
import DatePickerHeader from '../common/DatePickerHeader'
registerLocale('ko', ko)
const _ = require('lodash')
import { subMonths, subDays, addMonths } from 'date-fns'

type SalesFilterProps = {
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
  align-items: flex-end;
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

export default function SalesFilter({
  isActive,
  onFilterSearch,
  setStudentFilter,
}) {
  const paymentPage = useResetRecoilState(paymentPageState)
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
    // console.log(
    //   startPaymentDate.getYear() === endPaymentDate.getYear() &&
    //     startPaymentDate.getMonth() === endPaymentDate.getMonth() &&
    //     startPaymentDate.getDate() === endPaymentDate.getDate(),
    // )
    // if (isDirty || data.progress !== undefined) {
    //   const validateDateRange = (dateRange, message) => {
    //     if (dateRange !== undefined) {
    //       if (dateRange[1] !== null) {
    //         return true
    //       } else {
    //         alert(message)
    //         return false
    //       }
    //     } else {
    //       return true
    //     }
    //   }
    //   const paymentDate = validateDateRange(
    //     data.createdAt,
    //     '결제일시의 마지막날을 선택해주세요.',
    //   )
    //   if (paymentDate) {
    //     const filter = {
    //       studentName: data.studentName === '' ? null : data.studentName,
    //       createdAt: data.createdAt === undefined ? null : data.createdAt,
    //     }
    //     setStudentFilter(filter)
    //     onFilterSearch(true)
    //     paymentPage()
    //   }
    // }
  }
  const setDates = (start, end) => {
    setPaymentDateRange([start, end])
    setValue('createdAt', [start, end])
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
                    maxDate={addMonths(startPaymentDate, 1)}
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
                        label="검색 기간"
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
            </ItemBox>
            <BtnBox>
              <Button2
                buttonType="submit"
                width="100%"
                height="2.5rem"
                typeBorder={true}
                fontColor="#fff"
                bgColor="#007de9"
              >
                적용
              </Button2>
            </BtnBox>
          </BoxTop>
          <BoxMiddle>
            <ItemBox>
              <p>검색 기간은 최대 1달 입니다.</p>
              <p>기간검색은 일별로 검색됩니다.</p>
              <p>일별 검색은 24시간으로 검색됩니다.</p>
            </ItemBox>
          </BoxMiddle>
        </FilterForm>
      </FilterBox>
    </>
  )
}
