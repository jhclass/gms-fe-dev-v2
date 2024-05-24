import Layout from '@/pages/testCate/layout'
import { useEffect, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { getYear } from 'date-fns'
registerLocale('ko', ko)
const _ = require('lodash')
import MainWrap from '@/components/wrappers/MainWrap'
import { Button } from '@nextui-org/react'
import { styled } from 'styled-components'
// import DatePickerHeader from '@/components/common/DatePickerHeader'

const DatePickerBox = styled.div`
  .react-datepicker__day--keyboard-selected {
    background-color: transparent;
  }
  .react-datepicker__day--highlighted {
    background-color: #007de9;
    color: #fff;
  }
`

export default function TestDate() {
  const startDate = new Date('2024-01-10')
  const endDate = new Date('2024-03-15')
  const [disabledDays, setDisabledDays] = useState([])
  const [selectedDates, setSelectedDates] = useState([])

  useEffect(() => {
    let currentDate = new Date(startDate)
    let updatedSelectedDates = []

    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split('T')[0]
      updatedSelectedDates.push(dateString)

      currentDate.setDate(currentDate.getDate() + 1)
    }
    setSelectedDates(updatedSelectedDates)
  }, [])

  const calculateMonthsShown = (startDate, endDate) => {
    const startYear = startDate.getFullYear()
    const endYear = endDate.getFullYear()
    const startMonth = startDate.getMonth()
    const endMonth = endDate.getMonth()

    // 두 날짜 사이의 총 월 수 계산
    const months = (endYear - startYear) * 12 + endMonth - startMonth + 1
    return months
  }

  const monthsShown = calculateMonthsShown(startDate, endDate)

  const isDayDisabled = date => {
    const day = date.getDay()
    return disabledDays.includes(day)
  }

  const updateSelectedDates = (isDayDisabled, day) => {
    if (isDayDisabled) {
      let newDatesToAdd = []
      let currentDate = new Date(startDate)
      while (currentDate <= endDate) {
        if (currentDate.getDay() === day) {
          const dateString = currentDate.toISOString().split('T')[0]
          if (!selectedDates.includes(dateString)) {
            newDatesToAdd.push(dateString)
          }
        }
        currentDate.setDate(currentDate.getDate() + 1)
      }

      setSelectedDates(prevSelectedDates => [
        ...prevSelectedDates,
        ...newDatesToAdd,
      ])
    } else {
      setSelectedDates(prevSelectedDates => {
        return prevSelectedDates.filter(dateString => {
          const date = new Date(dateString)
          return date.getDay() !== day
        })
      })
    }
  }

  // 요일 선택 핸들러
  const toggleDay = day => {
    setDisabledDays(prev => {
      const isDayDisabled = prev.includes(day)
      const newDisabledDays = isDayDisabled
        ? prev.filter(d => d !== day)
        : [...prev, day]

      updateSelectedDates(isDayDisabled, day)

      return newDisabledDays
    })
  }

  const formatDate = date => {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }

  const handleDateSelect = date => {
    const dateString = formatDate(date)

    setSelectedDates(currentSelectedDates => {
      const isSelected = currentSelectedDates.some(
        selectedDate => selectedDate === dateString,
      )

      if (isSelected) {
        return currentSelectedDates.filter(
          selectedDate => selectedDate !== dateString,
        )
      } else {
        return [...currentSelectedDates, dateString]
      }
    })
  }

  const clickDate = () => {
    console.log(selectedDates)
  }

  return (
    <MainWrap>
      <DatePickerBox>
        <div>
          {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={disabledDays.includes(index)}
                onChange={() => toggleDay(index)}
              />
              {day}
            </label>
          ))}
        </div>
        <DatePicker
          inline
          locale="ko"
          highlightDates={selectedDates.map(dateString => new Date(dateString))}
          onChange={handleDateSelect}
          filterDate={date => !isDayDisabled(date)}
          selected={startDate}
          minDate={startDate}
          maxDate={endDate}
          monthsShown={monthsShown}
        />
        <Button onClick={clickDate}> 선택된날짜</Button>
      </DatePickerBox>
    </MainWrap>
  )
}
TestDate.getLayout = page => <Layout>{page}</Layout>
