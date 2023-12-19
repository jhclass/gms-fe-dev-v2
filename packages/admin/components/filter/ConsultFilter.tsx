import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import {
  progressStatusState,
  receiptStatusState,
  subStatusState,
} from '@/lib/recoilAtoms'
import { Controller, useForm } from 'react-hook-form'
import Button from '../common/Button'
import ChipCheckbox from '@/components/common/ChipCheckbox'
import {
  CheckboxGroup,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from '@nextui-org/react'
import { useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'
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
  setStudentFilter,
}) {
  const {
    data: seeManageUserData,
    error,
    loading: seeMansgeuserLoading,
  } = useQuery(SEE_MANAGEUSER_QUERY)
  const receiptStatus = useRecoilValue(receiptStatusState)
  const subStatus = useRecoilValue(subStatusState)
  const managerList = seeManageUserData?.seeManageUser || []
  const [receipt, setReceipt] = useState('-')
  const [sub, setSub] = useState('-')
  const [manager, setManager] = useState('-')
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
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      receiptDiv: '-',
      subDiv: '-',
      pic: '-',
      createdAt: undefined,
      stVisit: undefined,
      stName: '',
      progress: undefined,
    },
  })

  const handleReceiptChange = e => {
    setReceipt(e.target.value)
  }

  const handleSubChange = e => {
    setSub(e.target.value)
  }
  const handleManagerChange = e => {
    setManager(e.target.value)
  }

  const handleCheckboxChange = (value: string[]) => {
    const numericKeys = value.map(key => parseInt(key, 10))
    setValue('progress', numericKeys)
    setProgressSelected(value)
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

      const creatDate = validateDateRange(
        data.createdAt,
        '등록일시의 마지막날을 선택해주세요.',
      )
      const visitDate = validateDateRange(
        data.stVisit,
        '방문예정일의 마지막날을 선택해주세요.',
      )

      if (creatDate && visitDate) {
        const filter = {
          receiptDiv: data.receiptDiv === '-' ? null : data.receiptDiv,
          subDiv: data.subDiv === '-' ? null : data.subDiv,
          pic: data.pic === '-' ? null : data.pic,
          createdAt: data.createdAt === undefined ? null : data.createdAt,
          stVisit: data.stVisit === undefined ? null : data.stVisit,
          stName: data.stName === '' ? null : data.stName,
          progress: data.progress,
        }
        setStudentFilter(filter)
        onFilterToggle(false)
        onFilterSearch(true)
      }
    }
  }

  const handleReset = () => {
    setReceipt('-')
    setSub('-')
    setManager('-')
    setCreatDateRange([null, null])
    setVisitDateRange([null, null])
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
                name="receiptDiv"
                defaultValue={'-'}
                render={({ field }) => (
                  <Select
                    labelPlacement="outside"
                    label={<FilterLabel>접수구분</FilterLabel>}
                    placeholder=" "
                    className="w-full"
                    defaultValue={'-'}
                    variant="bordered"
                    selectedKeys={[receipt]}
                    onChange={value => {
                      field.onChange(value)
                      handleReceiptChange(value)
                    }}
                  >
                    {Object.entries(receiptStatus).map(([key, item]) =>
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
                      field.onChange(value)
                      handleSubChange(value)
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
              <Controller
                control={control}
                name="pic"
                defaultValue={'-'}
                render={({ field }) => (
                  <Select
                    labelPlacement="outside"
                    label="담당자"
                    placeholder=" "
                    className="w-full"
                    defaultValue={'-'}
                    variant="bordered"
                    selectedKeys={[manager]}
                    onChange={value => {
                      field.onChange(value)
                      handleManagerChange(value)
                    }}
                  >
                    <SelectItem key={'-'} value={'-'}>
                      {'-'}
                    </SelectItem>
                    {managerList?.map(item => (
                      <SelectItem key={item.mUsername} value={item.mUsername}>
                        {item.mUsername}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
            </ItemBox>
          </BoxTop>
          <BoxMiddle>
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
            <ItemBox>
              <Controller
                control={control}
                name="stVisit"
                render={({ field }) => (
                  <DatePicker
                    locale="ko"
                    showYearDropdown
                    selectsRange={true}
                    startDate={startVisitDate}
                    endDate={endVisitDate}
                    onChange={e => {
                      setVisitDateRange(e)
                      let date
                      if (e[1] !== null) {
                        date = [e[0], new Date(e[1]?.setHours(23, 59, 59, 999))]
                      } else {
                        date = [e[0], null]
                      }
                      field.onChange(date)
                    }}
                    dateFormat="yyyy/MM/dd"
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
                name="progress"
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