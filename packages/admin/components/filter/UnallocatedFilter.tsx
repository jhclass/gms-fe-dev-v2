import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { studentPageState, subStatusState } from '@/lib/recoilAtoms'
import { Controller, useForm } from 'react-hook-form'
import Button from '@/components/common/Button'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { getYear } from 'date-fns'
import DatePickerHeader from '@/components/common/DatePickerHeader'
import { useRouter } from 'next/router'
registerLocale('ko', ko)
const _ = require('lodash')

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
  flex-direction: column;
  flex: 1;
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

export default function StudentsFilter({
  isActive,
  // onFilterSearch,
  // setStudentFilter,
  // studentFilter,
}) {
  const router = useRouter()
  const studentPage = useResetRecoilState(studentPageState)
  const [birthdayRange, setBirthdayRange] = useState([null, null])
  const [startBirthday, endBirthday] = birthdayRange
  const [creatDateRange, setCreatDateRange] = useState([null, null])
  const [startCreatDate, endCreatDate] = creatDateRange
  const subStatus = useRecoilValue(subStatusState)
  const [sub, setSub] = useState('-')
  const [name, setName] = useState('')
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
      subDiv: '',
      birthday: undefined,
      createdAt: undefined,
    },
  })

  // useEffect(() => {
  //   if (
  //     Object.keys(studentFilter).length === 0 ||
  //     studentFilter?.studentName === null
  //   ) {
  //     setName('')
  //   } else {
  //     setName(studentFilter?.studentName)
  //   }
  //   if (
  //     Object.keys(studentFilter).length === 0 ||
  //     studentFilter?.subDiv === null
  //   ) {
  //     setSub('-')
  //   } else {
  //     setSub(studentFilter?.subDiv)
  //   }
  //   if (
  //     Object.keys(studentFilter).length === 0 ||
  //     studentFilter?.birthday === null
  //   ) {
  //     setBirthdayRange([null, null])
  //   } else {
  //     setBirthdayRange([studentFilter?.birthday[0], studentFilter?.birthday[1]])
  //   }
  //   if (
  //     Object.keys(studentFilter).length === 0 ||
  //     studentFilter?.createdAt === null
  //   ) {
  //     setCreatDateRange([null, null])
  //   } else {
  //     setCreatDateRange([
  //       studentFilter?.createdAt[0],
  //       studentFilter?.createdAt[1],
  //     ])
  //   }
  // }, [router, studentFilter])

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
      const createDate = validateDateRange(
        data.createdAt,
        '방문예정일의 마지막날을 선택해주세요.',
      )
      if (birthdayDate && createDate) {
        const filter = {
          studentName: data.studentName === '' ? null : data.studentName,
          phoneNum: data.phoneNum === '' ? null : data.phoneNum,
          birthday: data.birthday === undefined ? null : data.birthday,
          createdAt: data.createdAt === undefined ? null : data.createdAt,
        }
        // setStudentFilter(filter)
        // onFilterSearch(true)
        studentPage()
      }
    }
  }

  const handleSubChange = e => {
    setSub(e.target.value)
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
              <Controller
                control={control}
                name="subDiv"
                defaultValue={'-'}
                render={({ field }) => (
                  <Select
                    labelPlacement="outside"
                    label={<FilterLabel>수강구분</FilterLabel>}
                    placeholder=" "
                    defaultValue={'-'}
                    className="w-full"
                    variant="bordered"
                    selectedKeys={[sub]}
                    onChange={value => {
                      if (value.target.value !== '') {
                        field.onChange(value)
                        handleSubChange(value)
                      }
                    }}
                  >
                    {Object.entries(subStatus).map(([key, item]) =>
                      key === '0' ? (
                        <SelectItem value="-" key={'-'}>
                          -
                        </SelectItem>
                      ) : (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ),
                    )}
                  </Select>
                )}
              />
            </ItemBox>
            <ItemBox>
              <Input
                labelPlacement="outside"
                placeholder=" "
                type="text"
                variant="bordered"
                label="수강생이름"
                value={name}
                onValueChange={setName}
                id="studentName"
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
          <BoxMiddle>
            <ItemBox>
              <Input
                labelPlacement="outside"
                placeholder=" "
                type="text"
                variant="bordered"
                label="과정명"
                value={name}
                onValueChange={setName}
                id="studentName"
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
            <ItemBox>
              <DatePickerBox>
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
                      locale="ko"
                      startDate={startCreatDate}
                      endDate={endCreatDate}
                      onChange={e => {
                        setCreatDateRange(e)
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
                      onChangeRaw={e => e.preventDefault()}
                      onFocus={e => e.target.blur()}
                      placeholderText="기간을 선택해주세요."
                      dateFormat="yyyy/MM/dd"
                      customInput={
                        <Input
                          label="등록일자"
                          labelPlacement="outside"
                          type="text"
                          variant="bordered"
                          id="date"
                          classNames={{
                            input: 'caret-transparent',
                          }}
                          isReadOnly={true}
                          startContent={<i className="xi-calendar" />}
                          {...register('createdAt')}
                        />
                      }
                    />
                  )}
                />
              </DatePickerBox>
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
