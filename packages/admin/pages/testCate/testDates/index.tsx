import Layout from '@/pages/testCate/layout'
import { useEffect, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import MainWrap from '@/components/wrappers/MainWrap'
// import DatePickerHeader from '../common/DatePickerHeader'

export default function TestDate() {
  const startDate = new Date('2024-04-01')
  const endDate = new Date('2024-04-30')
  // 사용자가 선택한 요일을 저장하는 배열
  const [disabledDays, setDisabledDays] = useState([])
  const [selectedDates, setSelectedDates] = useState([])

  useEffect(() => {
    const updatedSelectedDates = [...selectedDates]
    let currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay()
      const isSelectedDay = disabledDays.includes(dayOfWeek)
      const isSelectedDate = selectedDates.some(
        selectedDate => selectedDate.getTime() === currentDate.getTime(),
      )
      if (isSelectedDay && isSelectedDate) {
        const index = selectedDates.findIndex(
          selectedDate => selectedDate.getTime() === currentDate.getTime(),
        )
        console.log(currentDate, index)
        // 유효한 인덱스인 경우에만 제거
        // if (index !== -1) {
        //   updatedSelectedDates.splice(index, 1)
        // }
      } else if (!isSelectedDay && !isSelectedDate) {
        updatedSelectedDates.push(new Date(currentDate))
      }

      currentDate.setDate(currentDate.getDate() + 1)
    }

    setSelectedDates(updatedSelectedDates)
  }, [disabledDays])

  const isDayDisabled = date => {
    const day = date.getDay()
    return disabledDays.includes(day)
  }

  // 요일 선택 핸들러
  const toggleDay = day => {
    setDisabledDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day],
    )
  }

  const handleDateSelect = date => {
    const isSelected = selectedDates.find(
      selectedDate => selectedDate.getTime() === date.getTime(),
    )
    if (isSelected) {
      setSelectedDates(
        selectedDates.filter(
          selectedDate => selectedDate.getTime() !== date.getTime(),
        ),
      )
    } else {
      setSelectedDates([...selectedDates, date])
    }
  }

  // console.log('disabledDays', disabledDays)
  // console.log('selectedDates', selectedDates)
  return (
    <MainWrap>
      <div>
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
          selected={null}
          highlightDates={selectedDates}
          // onChange={date => setStartDate(date)}
          onChange={handleDateSelect}
          filterDate={date => !isDayDisabled(date)}
          minDate={startDate}
          maxDate={endDate}
          // 선택된 요일이 비활성화된 요일 배열에 포함되어 있지 않으면 선택 가능
        />
      </div>
    </MainWrap>
  )
}
TestDate.getLayout = page => <Layout>{page}</Layout>
