import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import {
  consultPageState,
  gradeState,
  progressStatusState,
  receiptStatusState,
  smsPageState,
  subStatusState,
} from '@/lib/recoilAtoms'
import { Controller, useForm } from 'react-hook-form'
import { Button, Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import DatePickerHeader from '@/components/common/DatePickerHeader'
import { getYear, subMonths } from 'date-fns'
registerLocale('ko', ko)
const _ = require('lodash')

const FilterBox = styled.div`
  position: absolute;
  top: 45px;
  right: 0.25rem;
  z-index: 5;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    width: 100%;
    top: unset;
    right: unset;
    position: relative;
  }
`
const FilterForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  /* border-bottom: 1px solid #d4d4d8; */

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`
const BoxTop = styled.div`
  display: flex;
  flex: 1;
  gap: 0.5rem;
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`

const BtnBox = styled.div`
  display: flex;
  gap: 0.5rem;
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

export default function SmsSendFilter({
  filterSearch,
  onFilterSearch,
  setSmsFilter,
  smsFilter,
}) {
  const smsPage = useResetRecoilState(smsPageState)
  const [receiver, setReceiver] = useState('')
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      receiver: '',
    },
  })

  useEffect(() => {
    if (Object.keys(smsFilter).length === 0 || smsFilter?.phoneNum === null) {
      setReceiver('')
    } else {
      setReceiver(smsFilter?.receiver)
    }
  }, [])

  const onSubmit = data => {
    if (isDirty) {
      const filter = {
        receiver: data.receiver,
      }
      setSmsFilter(filter)
      onFilterSearch(true)
      smsPage()
    }
  }

  const handleReset = () => {
    const url = '/message/sms?smsTab=send'
    window.location.href = url
  }

  return (
    <>
      <FilterBox>
        <FilterForm onSubmit={handleSubmit(onSubmit)}>
          <BoxTop>
            <ItemBox>
              <Input
                labelPlacement="outside"
                placeholder="'-'없이 작성해주세요"
                type="text"
                variant="bordered"
                label="받는사람 연락처"
                value={receiver}
                size={'sm'}
                onValueChange={setReceiver}
                maxLength={11}
                classNames={{
                  inputWrapper: 'bg-white',
                }}
                id="receiver"
                {...register('receiver', {
                  maxLength: {
                    value: 11,
                    message: '최대 11자리까지 입력 가능합니다.',
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: '숫자만 사용가능합니다.',
                  },
                })}
              />
              {errors.receiver && (
                <p className="px-2 pt-2 text-xs text-red-500">
                  {String(errors.receiver.message)}
                </p>
              )}
            </ItemBox>
            <BtnBox>
              <Button
                size="sm"
                radius="sm"
                variant="solid"
                color="primary"
                className={'w-full'}
                type="submit"
              >
                검색
              </Button>
              {filterSearch && (
                <Button
                  size="sm"
                  radius="sm"
                  variant="bordered"
                  color="primary"
                  onClick={handleReset}
                  className="w-full bg-white"
                >
                  전체보기
                </Button>
              )}
            </BtnBox>
          </BoxTop>
        </FilterForm>
      </FilterBox>
    </>
  )
}
