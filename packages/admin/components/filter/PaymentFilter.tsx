import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useResetRecoilState } from 'recoil'
import { paymentPageState } from '@/lib/recoilAtoms'
import { Controller, useForm } from 'react-hook-form'
import Button2 from '@/components/common/Button'
import { Button, Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { getYear } from 'date-fns'
import DatePickerHeader from '../common/DatePickerHeader'
registerLocale('ko', ko)
const _ = require('lodash')
import { subMonths, subDays } from 'date-fns'
import { useRouter } from 'next/router'

type PaymentFilterProps = {
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

export default function PaymentFilter({
  isActive,
  onFilterSearch,
  setStudentFilter,
  studentFilter,
}) {
  const router = useRouter()
  const paymentPage = useResetRecoilState(paymentPageState)
  const [paymentDateRange, setPaymentDateRange] = useState([null, null])
  const [startPaymentDate, endPaymentDate] = paymentDateRange
  const years = _.range(1970, getYear(new Date()) + 1, 1)
  const [name, setName] = useState('')

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
      period: undefined,
    },
  })

  useEffect(() => {
    if (
      Object.keys(studentFilter).length === 0 ||
      studentFilter?.studentName === null
    ) {
      setName('')
    } else {
      setName(studentFilter?.studentName)
    }
    if (
      Object.keys(studentFilter).length === 0 ||
      studentFilter?.period === null
    ) {
      setPaymentDateRange([null, null])
    } else {
      setPaymentDateRange([studentFilter?.period[0], studentFilter?.period[1]])
    }
  }, [router, studentFilter])

  const onSubmit = data => {
    if (isDirty) {
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
        data.period,
        '결제일시의 마지막날을 선택해주세요.',
      )
      if (paymentDate) {
        const filter = {
          studentName: data.studentName === '' ? null : data.studentName,
          period: data.period === undefined ? null : data.period,
        }
        setStudentFilter(filter)
        onFilterSearch(true)
        paymentPage()
      }
    }
  }
  const setDates = (start, end) => {
    setPaymentDateRange([start, end])
    const setStart = new Date(start.setHours(0, 0, 0, 0))
    const setEnd = new Date(end.setHours(23, 59, 59, 999))
    setValue('period', [setStart, setEnd], { shouldDirty: true })
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
              <DatePickerBox>
                <Controller
                  control={control}
                  name="period"
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
                          date = [
                            new Date(e[0]?.setHours(0, 0, 0, 0)),
                            new Date(e[1]?.setHours(23, 59, 59, 999)),
                          ]
                        } else {
                          date = [new Date(e[0]?.setHours(0, 0, 0, 0)), null]
                        }

                        field.onChange(date)
                      }}
                      placeholderText="기간을 선택해주세요."
                      dateFormat="yyyy/MM/dd"
                      onChangeRaw={e => e.preventDefault()}
                      customInput={
                        <Input
                          label="결제 일시"
                          labelPlacement="outside"
                          type="text"
                          variant="bordered"
                          id="date"
                          classNames={{
                            input: 'caret-transparent',
                          }}
                          startContent={<i className="xi-calendar" />}
                          {...register('period')}
                        />
                      }
                    />
                  )}
                />
                <DateBtn>
                  <Button size="sm" onClick={handleYesterdayClick}>
                    어제
                  </Button>
                  <Button size="sm" onClick={handleTodayClick}>
                    오늘
                  </Button>
                  <Button size="sm" onClick={handleLastMonthClick}>
                    1개월
                  </Button>
                  <Button size="sm" onClick={handleLastThreeMonthsClick}>
                    3개월
                  </Button>
                  <Button size="sm" onClick={handleLastSixMonthsClick}>
                    6개월
                  </Button>
                </DateBtn>
              </DatePickerBox>
            </ItemBox>

            <ItemBox>
              <Input
                labelPlacement="outside"
                placeholder=" "
                type="text"
                variant="bordered"
                label="수강생이름"
                id="studentName"
                value={name}
                onValueChange={setName}
                {...register('studentName', {
                  pattern: {
                    value: /^[가-힣a-zA-Z0-9\s]*$/,
                    message: '한글, 영어, 숫자만 사용 가능합니다.',
                  },
                })}
              />
              {errors.studentName && (
                <p className="px-2 pt-2 text-xs text-red-500">
                  {String(errors.studentName.message)}
                </p>
              )}
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
