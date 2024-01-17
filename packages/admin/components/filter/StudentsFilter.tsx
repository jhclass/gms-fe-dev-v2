import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { subStatusState } from '@/lib/recoilAtoms'
import { Controller, useForm } from 'react-hook-form'
import Button from '@/components/common/Button'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
registerLocale('ko', ko)

type ConsultFilterProps = {
  isActive: boolean
}

const FilterBox = styled(motion.div)`
  overflow: hidden;
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
const BoxBottom = styled.div`
  display: flex;
  flex: 1;
  gap: 2rem;
  justify-content: space-between;
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

export default function StudentsFillter({
  isActive,
  onFilterSearch,
  setStudentFilter,
}) {
  const subStatus = useRecoilValue(subStatusState)
  const [sub, setSub] = useState('-')
  const [birthdayRange, setBirthdayRange] = useState([null, null])
  const [startBirthday, endBirthday] = birthdayRange
  const [creatDateRange, setCreatDateRange] = useState([null, null])
  const [startCreatDate, endCreatDate] = creatDateRange

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
      phoneNum: '',
      birthday: undefined,
      createdAt: undefined,
    },
  })

  const handleSubChange = e => {
    setSub(e.target.value)
  }

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
      const birthdayDate = validateDateRange(
        data.birthday,
        '생년월일의 마지막날을 선택해주세요.',
      )
      const visitDate = validateDateRange(
        data.stVisit,
        '방문예정일의 마지막날을 선택해주세요.',
      )
      if (birthdayDate && visitDate) {
        const filter = {
          studentName: data.studentName === '' ? null : data.studentName,
          phoneNum: data.phoneNum === '' ? null : data.phoneNum,
          birthday: data.birthday === undefined ? null : data.birthday,
          createdAt: data.createdAt === undefined ? null : data.createdAt,
        }
        setStudentFilter(filter)
        onFilterSearch(true)
      }
    }
  }

  const handleReset = () => {
    setCreatDateRange([null, null])
    setBirthdayRange([null, null])
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
              <Input
                labelPlacement="outside"
                placeholder="'-'없이 작성해주세요"
                type="text"
                variant="bordered"
                label="연락처"
                id="phoneNum"
                {...register('phoneNum', {
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
              {errors.phoneNum && (
                <p className="px-2 pt-2 text-xs text-red-500">
                  {String(errors.phoneNum.message)}
                </p>
              )}
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
          <BoxMiddle>
            <ItemBox>
              <Controller
                control={control}
                name="birthday"
                render={({ field }) => (
                  <DatePicker
                    selectsRange={true}
                    locale="ko"
                    showYearDropdown
                    startDate={startBirthday}
                    endDate={endBirthday}
                    onChange={e => {
                      setBirthdayRange(e)
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
                        label="생년월일"
                        labelPlacement="outside"
                        type="text"
                        variant="bordered"
                        id="date"
                        startContent={<i className="xi-calendar" />}
                        {...register('birthday')}
                      />
                    }
                  />
                )}
              />
            </ItemBox>
            <ItemBox>
              <Controller
                control={control}
                name="createdAt"
                render={({ field }) => (
                  <DatePicker
                    selectsRange={true}
                    locale="ko"
                    showYearDropdown
                    startDate={startCreatDate}
                    endDate={endCreatDate}
                    onChange={e => {
                      setCreatDateRange(e)
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
                        label="등록일시"
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
          </BoxMiddle>
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