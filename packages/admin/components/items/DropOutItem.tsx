import {
  DELETE_STUDENT_CONSULTATION_MUTATION,
  EDIT_STUDENT_CONSULTATION_MUTATION,
} from '@/graphql/mutations'
import useUserLogsMutation from '@/utils/userLogs'
import { useMutation } from '@apollo/client'
import { Button, Input, Radio, RadioGroup, Textarea } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { styled } from 'styled-components'
import DatePickerHeader from '@/components/common/DatePickerHeader'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { getYear } from 'date-fns'
registerLocale('ko', ko)
const _ = require('lodash')

const FlexBox = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  flex: 1 3;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }

  &.textBox {
    align-items: center;
  }
`

const AreaBox = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
`

const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${({ theme }) => theme.colors.black};
  padding-bottom: 0.1rem;
  display: block;

  span {
    color: red;
  }
`

export default function EmploymentMemoItem({ item }) {
  const [dropOutType, setDropOutType] = useState('수강포기')
  const [studentName, setStudentName] = useState('')
  const [dropOutDate, setDropOutDate] = useState(null)
  console.log(item)
  useEffect(() => {
    if (item.courseComplete) {
      setDropOutType(item.courseComplete)
    }
    if (item.student.name) {
      setStudentName(item.student.name)
    }
    if (
      item.dateOfDroppingOut === null ||
      item.dateOfDroppingOut === undefined
    ) {
      setDropOutDate(null)
    } else {
      const timestamp = parseInt(item.dateOfDroppingOut)
      setDropOutDate(timestamp)
    }
  }, [item])
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
  return (
    <>
      <FlexBox>
        <AreaBox>
          <Input
            isReadOnly={true}
            labelPlacement="outside"
            variant="bordered"
            value={studentName}
            label="수강생명"
            type="text"
            placeholder=" "
            className="w-full"
          />
        </AreaBox>
        <AreaBox>
          <RadioGroup
            label="중도탈락 구분"
            orientation="horizontal"
            className="gap-[0.65rem]"
            value={dropOutType}
            isReadOnly={true}
          >
            <Radio key={'수강포기'} value={'수강포기'}>
              수강포기
            </Radio>
            <Radio key={'미수료'} value={'미수료'}>
              미수료
            </Radio>
          </RadioGroup>
        </AreaBox>
        <AreaBox>
          <Input
            isReadOnly={true}
            labelPlacement="outside"
            variant="bordered"
            value={dropOutDate}
            label="중도탈락일자"
            type="text"
            placeholder=" "
            className="w-full"
          />
        </AreaBox>
      </FlexBox>
      <FlexBox className="textBox">
        <AreaBox>
          <Textarea
            isReadOnly={true}
            label="중도탈락 사유"
            labelPlacement="outside"
            className="max-w-full"
            variant="bordered"
            minRows={3}
          />
        </AreaBox>
      </FlexBox>
    </>
  )
}
