import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { subStatusState, subjectPageState } from '@/lib/recoilAtoms'
import { Controller, useForm } from 'react-hook-form'
import Button from '@/components/common/Button'
import { Input, Select, SelectItem } from '@nextui-org/react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { subDays, getYear, addMonths, differenceInDays } from 'date-fns'
import DatePickerHeader from '../common/DatePickerHeader'
import { useEffect, useState } from 'react'
import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
registerLocale('ko', ko)
const _ = require('lodash')
type SubjectsFilterProps = {
  isActive: boolean
}

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

const FilterBox = styled(motion.div)`
  z-index: 2;
  position: relative;
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
`
const FilterForm = styled.form`
  display: flex;
  width: 100%;
  gap: 1.5rem;

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

  .react-datepicker__close-icon {
    height: 40px;
    bottom: 0;
    top: auto;
  }
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
  display: block;

  span {
    color: red;
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

export default function PerformanceFilter({
  isActive,
  onFilterSearch,
  setPerformanceFilter,
  performanceFilter,
  clickReset,
  setClickReset,
}) {
  const router = useRouter()
  const {
    loading: managerLoading,
    error: managerError,
    data: managerData,
  } = useQuery(SEE_MANAGEUSER_QUERY)
  const managerList = managerData?.seeManageUser || []
  const [searchDateRange, setSearchDateRange] = useState([null, null])
  const [startDate, endDate] = searchDateRange
  const [manager, setManager] = useState(new Set([]))
  const years = _.range(1970, getYear(new Date()) + 1, 1)
  const [maxDate, setMaxDate] = useState(new Date())

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      period: '',
      processingManagerId: '',
    },
  })

  useEffect(() => {
    if (performanceFilter === null || clickReset) {
      setManager(new Set([]))
      setSearchDateRange([null, null])
      reset()
    }
  }, [router, clickReset])

  useEffect(() => {
    if (startDate) {
      const calculatedMaxDate = subDays(addMonths(startDate, 6), 1)
      setMaxDate(
        calculatedMaxDate > new Date() ? new Date() : calculatedMaxDate,
      )
    } else {
      setMaxDate(new Date())
    }
  }, [startDate])

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
        data.period,
        '검색 기간의 마지막날을 선택해주세요.',
      )
      if (paymentDate) {
        const filter = {
          period: data.period,
          processingManagerId: data.processingManagerId
            .split(',')
            .map(item => parseInt(item, 10)),
        }
        setPerformanceFilter(filter)
        onFilterSearch(true)
        setClickReset(false)
      }
    }
  }

  const handleReset = () => {
    setSearchDateRange([null, null])
    setManager(new Set([]))
    reset()
  }

  const handleManagerChange = e => {
    setManager(new Set(e.target.value.split(',')))
  }

  return (
    <>
      <FilterBox
        variants={FilterVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        <TopInfo>
          <Noti>
            <span>*</span> 는 필수입력입니다.
          </Noti>
        </TopInfo>
        <FilterForm onSubmit={handleSubmit(onSubmit)}>
          <BoxTop>
            <ItemBox>
              <Controller
                control={control}
                name="period"
                rules={{
                  required: {
                    value: true,
                    message: '검색 기간을 선택해주세요',
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
                    selectsRange={true}
                    isClearable
                    // maxDate={subDays(addMonths(startDate, 6), 1)}
                    // maxDate={new Date()}
                    maxDate={maxDate}
                    locale="ko"
                    startDate={startDate}
                    endDate={endDate}
                    onChange={e => {
                      setSearchDateRange(e)
                      let date
                      if (e[1] !== null) {
                        date = [
                          new Date(e[0]?.setHours(0, 0, 0, 0)),
                          new Date(e[1]?.setHours(23, 59, 59, 999)),
                        ]
                      } else {
                        date = [new Date(e[0]?.setHours(0, 0, 0, 0)), null]
                      }

                      field.onChange(e)
                    }}
                    placeholderText="기간을 선택해주세요."
                    dateFormat="yyyy/MM/dd"
                    customInput={
                      <Input
                        label={
                          <FilterLabel>
                            검색 기간<span>*</span>
                          </FilterLabel>
                        }
                        labelPlacement="outside"
                        type="text"
                        variant="bordered"
                        id="date"
                        startContent={<i className="xi-calendar" />}
                        {...register('period', {
                          required: {
                            value: true,
                            message: '검색 기간을 선택해주세요',
                          },
                        })}
                      />
                    }
                  />
                )}
              />
              {errors.period && (
                <p className="px-2 pt-2 text-xs text-red-500">
                  {String(errors.period.message)}
                </p>
              )}
            </ItemBox>
            <ItemBox>
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: '사원을 1명이상 선택해주세요',
                  },
                }}
                name="processingManagerId"
                defaultValue={'-'}
                render={({ field }) => (
                  <Select
                    labelPlacement="outside"
                    label={
                      <FilterLabel>
                        사원명<span>*</span>
                      </FilterLabel>
                    }
                    placeholder=" "
                    className="w-full"
                    isMultiline={true}
                    selectionMode="multiple"
                    defaultValue={''}
                    variant="bordered"
                    selectedKeys={manager}
                    onChange={value => {
                      if (value.target.value !== '') {
                        field.onChange(value)
                        handleManagerChange(value)
                      }
                    }}
                  >
                    {managerList
                      ?.filter(manager => manager.mPart.includes('영업팀'))
                      .map(item => (
                        <SelectItem key={item.id} value={item.mUsername}>
                          {item.mUsername}
                        </SelectItem>
                      ))}
                  </Select>
                )}
              />
              {errors.processingManagerId && (
                <p className="px-2 pt-2 text-xs text-red-500">
                  {String(errors.processingManagerId.message)}
                </p>
              )}
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
