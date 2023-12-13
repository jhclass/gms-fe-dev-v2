import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { progressStatusState, studentFilterState } from '@/lib/recoilAtoms'
import { Controller, useForm } from 'react-hook-form'
import Button from '../common/Button'
import ChipCheckbox from '@/components/common/ChipCheckbox'
import { CheckboxGroup, Input, Radio, RadioGroup } from '@nextui-org/react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
registerLocale('ko', ko)
import { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'

type ConsoultFilterProps = {
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

const receiptData = {
  0: '온라인',
  1: '전화',
  2: '방문',
}

const subData = {
  0: 'HRD',
  1: '일반',
}

export default function TableFillter({
  isActive,
  onFilterToggle,
  onFilterSearch,
}) {
  const [
    getManage,
    { data: seeManageUserData, error, loading: seeMansgeuserLoading },
  ] = useLazyQuery(SEE_MANAGEUSER_QUERY)
  const manageData = seeManageUserData?.seeManageUser || []
  const setFilterState = useSetRecoilState(studentFilterState)
  const filterState = useRecoilState(studentFilterState)
  const [receipt, setReceipt] = useState('')
  const [sub, setSub] = useState('')
  const [manager, setManager] = useState('')
  const [progressSelected, setProgressSelected] = useState([])
  const progressStatus = useRecoilValue(progressStatusState)
  const [creatDateRange, setCreatDateRange] = useState([null, null])
  const [startCreatDate, endCreatDate] = creatDateRange
  const [visitDateRange, setVisitDateRange] = useState([null, null])
  const [startVisitDate, endVisitDate] = visitDateRange

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    setFocus,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const handleReceiptChange = (value: string) => {
    setValue('receiptDiv', value)
    setReceipt(value)
  }

  const handleSubChange = (value: string) => {
    setValue('subDiv', value)
    setSub(value)
  }

  const handleCheckboxChange = (value: string[]) => {
    const numericKeys = value.map(key => parseInt(key, 10))
    setValue('groupSelected', numericKeys)
    setProgressSelected(value)
  }

  const handleRemoveItem = (index: number) => {
    const updatedGroupSelected = progressSelected.filter((_, i) => i !== index)
    setValue('groupSelected', updatedGroupSelected)
    setProgressSelected(updatedGroupSelected)
  }

  const manageClick = e => {
    setManager(e.target.value)
  }

  const receiptClick = e => {
    setReceipt(e.target.value)
  }
  const subClick = e => {
    setValue('subDiv', e.target.value)
    setSub(e.target.value)
  }

  const onSubmit = data => {
    const validateDateRange = (dateRange, message) => {
      if (dateRange[0] !== null) {
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

    const creatDate = validateDateRange(
      creatDateRange,
      '등록일시의 마지막날을 선택해주세요.',
    )
    const visitDate = validateDateRange(
      visitDateRange,
      '방문예정일의 마지막날을 선택해주세요.',
    )

    if (creatDate && visitDate) {
      const filter = {
        receiptDiv: data.receiptDiv,
        subDiv: data.subDiv,
        pic: data.pic,
        createdAt: data.creatDateRange,
        stVisit: data.visitDateRange,
        stName: data.stName,
        progress: data.groupSelected,
      }

      setFilterState(filter)
      onFilterToggle(false)
      onFilterSearch(true)
    }
  }

  const handleReset = () => {
    reset()
    setCreatDateRange([null, null])
    setVisitDateRange([null, null])
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
                name="receiptDiv"
                render={({ field, fieldState }) => (
                  <RadioGroup
                    label={<FilterLabel>진행상태</FilterLabel>}
                    orientation="horizontal"
                    className="gap-1 radioBox"
                    value={receipt}
                    onValueChange={handleReceiptChange}
                  >
                    {Object.entries(receiptData).map(([key, item]) => (
                      <Radio key={key} value={item}>
                        {item}
                      </Radio>
                    ))}
                  </RadioGroup>
                )}
              />
            </ItemBox>
            <ItemBox>
              <Controller
                control={control}
                name="subDiv"
                render={({ field, fieldState }) => (
                  <RadioGroup
                    label={<FilterLabel>수강구분</FilterLabel>}
                    orientation="horizontal"
                    className="gap-1 radioBox"
                    value={sub}
                    onValueChange={handleSubChange}
                  >
                    {Object.entries(subData).map(([key, item]) => (
                      <Radio key={key} value={item}>
                        {item}
                      </Radio>
                    ))}
                  </RadioGroup>
                )}
              />
            </ItemBox>
            <ItemBox>
              <Input
                labelPlacement="outside"
                placeholder=" "
                type="text"
                variant="bordered"
                label="담당자"
                id="pic"
                {...register('pic')}
              />
              {/* <Controller
                name="pic"
                control={control}
                render={({ field }) => (
                  <Select
                    labelPlacement="outside"
                    label="담당자"
                    placeholder=" "
                    className="w-full"
                    value={field.value}
                    selectedKeys={[manager]}
                    onChange={manageClick}
                    {...register('pic')}
                  >
                    {manageData.map((item, index) => (
                      <SelectItem
                        key={index}
                        value={item.mUsername}
                        onClick={() => {
                          field.onChange(item.mUsername)
                        }}
                      >
                        {item.mUsername}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              /> */}
            </ItemBox>
          </BoxTop>
          <BoxMiddle>
            <ItemBox>
              <Controller
                control={control}
                name="creatDateRange"
                render={({ field }) => (
                  <DatePicker
                    locale="ko"
                    showYearDropdown
                    selectsRange={true}
                    startDate={startCreatDate}
                    endDate={endCreatDate}
                    onChange={e => {
                      setCreatDateRange(e)
                      const date = [
                        e[0],
                        new Date(e[1]?.setHours(23, 59, 59, 999)),
                      ]
                      field.onChange(date)
                    }}
                    placeholderText="기간을 선택해주세요."
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
            <ItemBox>
              <Controller
                control={control}
                name="visitDateRange"
                render={({ field }) => (
                  <DatePicker
                    locale="ko"
                    showYearDropdown
                    selectsRange={true}
                    startDate={startVisitDate}
                    endDate={endVisitDate}
                    onChange={e => {
                      setVisitDateRange(e)
                      const date = [
                        e[0],
                        new Date(e[1]?.setHours(23, 59, 59, 999)),
                      ]
                      field.onChange(date)
                    }}
                    placeholderText="기간을 선택해주세요."
                    customInput={
                      <Input
                        label="상담예정일"
                        labelPlacement="outside"
                        type="text"
                        variant="bordered"
                        id="date"
                        startContent={<i className="xi-calendar" />}
                        {...register('stVisit')}
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
                label="수강생이름"
                id="stName"
                {...register('stName')}
              />
            </ItemBox>
          </BoxMiddle>
          <BoxBottom>
            <ItemBox>
              <Controller
                control={control}
                name="groupSelected"
                render={({ field, fieldState }) => (
                  <CheckboxGroup
                    label={<FilterLabel>진행상태</FilterLabel>}
                    orientation="horizontal"
                    defaultValue={['buenos-aires', 'london']}
                    className="gap-1 radioBox"
                    value={progressSelected}
                    onValueChange={handleCheckboxChange}
                  >
                    {Object.entries(progressStatus).map(([key, value]) => (
                      <ChipCheckbox key={key} value={key}>
                        {value.name}
                      </ChipCheckbox>
                    ))}
                  </CheckboxGroup>
                )}
              />
            </ItemBox>
          </BoxBottom>
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
