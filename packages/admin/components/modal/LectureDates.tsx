import styled from 'styled-components'
import {
  Button,
  CheckboxGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
} from '@nextui-org/react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { useEffect, useState } from 'react'
import ChipCheckbox from '../common/ChipCheckbox'
registerLocale('ko', ko)
const _ = require('lodash')

const DatePickerBox = styled.div`
  .react-datepicker {
    width: 100%;
  }
  .react-datepicker__month-container {
    width: 100%;
  }
  .react-datepicker__day--selected {
    background: none;
    color: #000;

    &.react-datepicker__day--disabled {
      color: #ccc;
    }
  }
  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header {
    font-size: 1rem;
  }
  .react-datepicker__navigation {
    display: none;
  }
  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    width: 100%;
    max-width: 2.7rem;

    @media (max-width: 768px) {
      max-width: 2rem;
    }
  }
  .react-datepicker__day--keyboard-selected {
    background-color: transparent;
  }
  .react-datepicker__day--highlighted {
    background-color: #007de9;
    color: #fff;
  }
`

const DayCheck = styled.div`
  display: flex;
  gap: 0.2rem;
  flex-wrap: wrap;
`
export default function LectureDates({
  isOpen,
  onClose,
  setValue,
  setDatesSelected,
}) {
  const startDate = new Date('2024-01-11')
  const endDate = new Date('2024-03-15')
  const [disabledDays, setDisabledDays] = useState([])
  const [selectedDates, setSelectedDates] = useState([])
  const [groupSelected, setGroupSelected] = useState([])

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
    console.log(day)
    setGroupSelected(day)
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

  const clickAdviceSubmit = () => {
    setValue('lectureDetails', selectedDates)
    setDatesSelected(selectedDates)
    onClose()
  }

  return (
    <>
      <Modal size={'md'} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                기간선택
                <DayCheck>
                  {/* {['일', '월', '화', '수', '목', '금', '토'].map(
                    (day, index) => (
                      <label key={index}>
                        <input
                          type="checkbox"
                          checked={disabledDays.includes(index)}
                          onChange={() => toggleDay(index)}
                        />
                        {day}
                      </label>
                    ),
                  )} */}

                  {[' 일 ', ' 월 ', ' 화 ', ' 수 ', ' 목 ', ' 금 ', ' 토 '].map(
                    (day, index) => (
                      <ChipCheckbox
                        key={index}
                        value={index}
                        onChange={e => toggleDay(index)}
                      >
                        {day}
                      </ChipCheckbox>
                    ),
                  )}
                </DayCheck>
              </ModalHeader>
              <ModalBody>
                <ScrollShadow className="scrollbar min-h-[10rem] max-h-[25rem]">
                  <DatePickerBox>
                    <DatePicker
                      inline
                      locale="ko"
                      highlightDates={selectedDates.map(
                        dateString => new Date(dateString),
                      )}
                      onChange={handleDateSelect}
                      filterDate={date => !isDayDisabled(date)}
                      selected={startDate}
                      minDate={startDate}
                      maxDate={endDate}
                      monthsShown={monthsShown}
                    />
                  </DatePickerBox>
                </ScrollShadow>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    clickAdviceSubmit()
                    // field.onChange(adviceTypeSelected)
                    clickDate()
                  }}
                >
                  선택
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
