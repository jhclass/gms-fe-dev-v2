import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useResetRecoilState } from 'recoil'
import { workboardPageState } from '@/lib/recoilAtoms'
import { Controller, useForm } from 'react-hook-form'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import DatePickerHeader from '@/components/common/DatePickerHeader'
import { getYear } from 'date-fns'
import { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AdviceSelect from '@/components/common/select/AdviceSelect'
import { writer } from 'repl'
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
const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
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
const BtnBox = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;
`
const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${({ theme }) => theme.colors.black};
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

const LodingDiv = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-width: 20rem;
  position: relative;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function WorkBoardFilter({
  isActive,
  onFilterSearch,
  setWorkboardFilter,
  workboardFilter,
}) {
  const router = useRouter()
  const years = _.range(2000, getYear(new Date()) + 5, 1)
  const workboardPage = useResetRecoilState(workboardPageState)
  const [sub, setSub] = useState('-')
  const [top, setTop] = useState('')
  const [wst, setWst] = useState('-')
  const [wr, setWr] = useState('')
  const [peri, setPeri] = useState([])

  const [sbjName, setSbjName] = useState('')
  const [workDateRange, setWorkDateRange] = useState([null, null])
  const [startWorkDate, endWorkDate] = workDateRange
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      workStatus: '-',
      subDiv: '-',
      toPerson: '',
      writer: '',
      workPeriod: null,
    },
  })
  useEffect(() => {
    if (
      Object.keys(workboardFilter).length === 0 ||
      workboardFilter?.toTeam === null
    ) {
      setSub('-')
    } else {
      setSub(workboardFilter?.toTeam)
    }
    if (
      Object.keys(workboardFilter).length === 0 ||
      workboardFilter?.toPerson === null
    ) {
      setTop('')
    } else {
      setTop(workboardFilter?.toPerson)
    }
    if (
      Object.keys(workboardFilter).length === 0 ||
      workboardFilter?.workStatus === null
    ) {
      setWst('-')
    } else {
      setWst(workboardFilter?.workStatus)
    }
    if (
      Object.keys(workboardFilter).length === 0 ||
      workboardFilter?.writer === null
    ) {
      setWr('')
    } else {
      setWr(workboardFilter?.writer)
    }
    if (
      Object.keys(workboardFilter).length === 0 ||
      workboardFilter?.workPeriod === null
    ) {
      setPeri(null)
    } else {
      setPeri(workboardFilter?.workPeriod)
    }
  }, [router, workboardFilter])

  const handleSubChange = e => {
    setSub(e.target.value)
  }

  const handleWorkStatusChange = e => {
    setWst(e.target.value)
  }
  const onSubmit = data => {
    if (isDirty) {
      const filter = {
        toTeam: data.subDiv === '-' ? null : data.subDiv,
        toPerson: data.toPerson === '' ? null : data.toPerson,
        workStatus: data.workStatus === '-' ? null : data.workStatus,
        writer: data.writer === '' ? null : data.writer,
        workPeriod: data.workPeriod === null ? null : data.workPeriod,
      }
      setWorkboardFilter(filter)
      onFilterSearch(true)
      workboardPage()
    }
  }

  const handleReset = () => {
    setSub('-')
    setWst('-')
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
                  <Suspense
                    fallback={
                      <LodingDiv>
                        <i className="xi-spinner-2" />
                      </LodingDiv>
                    }
                  >
                    <AdviceSelect
                      selectedKey={sub}
                      field={field}
                      label={'작업부서명'}
                      handleChange={handleSubChange}
                      optionDefault={{
                        type: '-',
                      }}
                      category={'부서'}
                    />
                  </Suspense>
                )}
              />
            </ItemBox>
            <ItemBox>
              <Input
                labelPlacement="outside"
                placeholder=" "
                type="text"
                variant="bordered"
                label="작업자명"
                value={top}
                onValueChange={setTop}
                {...register('toPerson')}
              />
            </ItemBox>
            <ItemBox>
              <Controller
                control={control}
                name="workStatus"
                defaultValue={'-'}
                render={({ field }) => (
                  <Select
                    labelPlacement="outside"
                    label={<FilterLabel>진행상태</FilterLabel>}
                    placeholder=" "
                    defaultValue={'-'}
                    className="w-full"
                    variant="bordered"
                    selectedKeys={[wst]}
                    onChange={value => {
                      if (value.target.value !== '') {
                        field.onChange(value)
                        handleWorkStatusChange(value)
                      }
                    }}
                  >
                    <SelectItem value="-" key={'-'}>
                      -
                    </SelectItem>
                    <SelectItem value="미처리" key={'미처리'}>
                      미처리
                    </SelectItem>
                    <SelectItem value="진행중" key={'진행중'}>
                      진행중
                    </SelectItem>
                    <SelectItem value="작업완료" key={'작업완료'}>
                      작업완료
                    </SelectItem>
                    <SelectItem value="재진행요청" key={'재진행요청청'}>
                      재진행요청
                    </SelectItem>
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
                label="요청자명"
                value={sbjName}
                onValueChange={setSbjName}
                {...register('writer')}
              />
            </ItemBox>
            <ItemBox>
              <DatePickerBox>
                <Controller
                  control={control}
                  name="workPeriod"
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
                      locale="ko"
                      showYearDropdown
                      selectsRange={true}
                      startDate={startWorkDate}
                      endDate={endWorkDate}
                      onChange={e => {
                        setWorkDateRange(e)
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
                      isClearable
                      dateFormat="yyyy/MM/dd"
                      onChangeRaw={e => e.preventDefault()}
                      disabledKeyboardNavigation
                      onFocus={e => e.target.blur()}
                      placeholderText="기간을 선택해주세요."
                      customInput={
                        <Input
                          label="요청일(기간)"
                          labelPlacement="outside"
                          type="text"
                          variant="bordered"
                          id="date"
                          classNames={{
                            input: 'caret-transparent',
                          }}
                          isReadOnly={true}
                          startContent={<i className="xi-calendar" />}
                          {...register('workPeriod')}
                        />
                      }
                    />
                  )}
                />
              </DatePickerBox>
            </ItemBox>
          </BoxTop>
          <BtnBox>
            <Button
              type="submit"
              color="primary"
              className="w-[50%] text-white"
            >
              검색
            </Button>
            <Button
              color="primary"
              variant="bordered"
              className="w-[50%] text-primary"
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
