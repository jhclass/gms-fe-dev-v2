import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { subStatusState, subjectPageState } from '@/lib/recoilAtoms'
import { Controller, useForm } from 'react-hook-form'
import Button from '@/components/common/Button'
import { Input } from '@nextui-org/react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { subDays, getYear, addMonths, differenceInDays } from 'date-fns'
import DatePickerHeader from '../common/DatePickerHeader'
import { useState } from 'react'
registerLocale('ko', ko)
const _ = require('lodash')
type SubjectsFilterProps = {
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
const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const BtnBox = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;
`
const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #11181c;
  padding-bottom: 0.1rem;
  display: block;
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

export default function PerformanceFilter({
  isActive,
  onFilterSearch,
  setPerformanceFilter,
}) {
  const subStatus = useRecoilValue(subStatusState)
  const subjectPage = useResetRecoilState(subjectPageState)
  const [searchDateRange, setSearchDateRange] = useState([null, null])
  const [startDate, endDate] = searchDateRange
  const years = _.range(1970, getYear(new Date()) + 1, 1)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      selectDate: '-',
      subjectName: '',
    },
  })

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

  const onSubmit = data => {
    if (isDirty) {
      const paymentDate = validateDateRange(
        data.selectDate,
        '검색 기간의 마지막날을 선택해주세요.',
      )
      if (paymentDate) {
        const filter = {
          selectDate: data.selectDate,
          subjectName: data.subjectName === '' ? null : data.subjectName,
        }

        const days = differenceInDays(new Date(endDate), new Date(startDate))
        setPerformanceFilter(filter)
        onFilterSearch(true)
        subjectPage()
      }
    }
  }

  const handleReset = () => {
    setSearchDateRange([null, null])
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
                name="selectDate"
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
                    isClearable
                    maxDate={subDays(addMonths(startDate, 1), 1)}
                    locale="ko"
                    startDate={startDate}
                    endDate={endDate}
                    onChange={e => {
                      setSearchDateRange(e)
                      let date
                      if (e[1] !== null) {
                        date = [e[0], new Date(e[1]?.setHours(23, 59, 59, 999))]
                      } else {
                        date = [e[0], null]
                      }

                      field.onChange(e)
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
                        {...register('selectDate')}
                      />
                    }
                  />
                )}
              />
            </ItemBox>
            <ItemBox>
              <Input
                labelPlacement="outside"
                placeholder=" "
                type="text"
                variant="bordered"
                label="과목명"
                {...register('subjectName')}
              />
            </ItemBox>
          </BoxTop>
          <BtnBox>
            <Button
              buttonType="submit"
              width="calc(50% - 0.5rem)"
              height="2.5rem"
              typeBorder={true}
              fontColor="#fff"
              bgColor="#007de9"
            >
              검색
            </Button>
            <Button
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
            </Button>
          </BtnBox>
        </FilterForm>
      </FilterBox>
    </>
  )
}
