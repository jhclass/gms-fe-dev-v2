import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import {
  progressStatusState,
  receiptStatusState,
  subStatusState,
} from '@/lib/recoilAtoms'
import { Controller, useForm } from 'react-hook-form'
import Button from '@/components/common/Button'
import ChipCheckbox from '@/components/common/ChipCheckbox'
import { CheckboxGroup, Input, Select, SelectItem } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { SEE_ADVICE_TYPE_QUERY, SEE_MANAGEUSER_QUERY } from '@/graphql/queries'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko'
import { useRouter } from 'next/router'
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

export default function ConsultFillter({
  isActive,
  onFilterSearch,
  studentFilter,
  setStudentFilter,
}) {
  const router = useRouter()
  const {
    data: seeManageUserData,
    error,
    loading: seeMansgeuserLoading,
  } = useQuery(SEE_MANAGEUSER_QUERY)
  const {
    loading: adviceLoading,
    error: adviceError,
    data: adviceData,
  } = useQuery(SEE_ADVICE_TYPE_QUERY)
  const managerList = seeManageUserData?.seeManageUser || []
  const adviceList = adviceData?.seeAdviceType.adviceType || []
  const receiptStatus = useRecoilValue(receiptStatusState)
  const subStatus = useRecoilValue(subStatusState)
  const progressStatus = useRecoilValue(progressStatusState)
  const [receipt, setReceipt] = useState('-')
  const [sub, setSub] = useState('-')
  const [manager, setManager] = useState('-')
  const [adviceType, setAdviceType] = useState('-')
  const [creatDateRange, setCreatDateRange] = useState([null, null])
  const [startCreatDate, endCreatDate] = creatDateRange
  const [visitDateRange, setVisitDateRange] = useState([null, null])
  const [startVisitDate, endVisitDate] = visitDateRange
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [progressSelected, setProgressSelected] = useState([])

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      receiptDiv: '-',
      subDiv: '-',
      pic: '-',
      createdAt: undefined,
      stVisit: undefined,
      stName: '',
      progress: undefined,
      phoneNum1: '',
      adviceType: '-',
    },
  })

  useEffect(() => {
    if (
      Object.keys(studentFilter).length === 0 ||
      studentFilter?.receiptDiv === null
    ) {
      setReceipt('-')
    } else {
      setReceipt(studentFilter?.receiptDiv)
    }
    if (
      Object.keys(studentFilter).length === 0 ||
      studentFilter?.subDiv === null
    ) {
      setSub('-')
    } else {
      setSub(studentFilter?.subDiv)
    }
    if (
      Object.keys(studentFilter).length === 0 ||
      studentFilter?.pic === null
    ) {
      setManager('-')
    } else {
      setManager(studentFilter?.pic)
    }
    if (
      Object.keys(studentFilter).length === 0 ||
      studentFilter?.adviceType === null
    ) {
      setAdviceType('-')
    } else {
      setAdviceType(studentFilter?.adviceType)
    }
    if (
      Object.keys(studentFilter).length === 0 ||
      studentFilter?.createdAt === null
    ) {
      setCreatDateRange([null, null])
    } else {
      setCreatDateRange([
        studentFilter?.createdAt[0],
        studentFilter?.createdAt[1],
      ])
    }
    if (
      Object.keys(studentFilter).length === 0 ||
      studentFilter?.stVisit === null
    ) {
      setVisitDateRange([null, null])
    } else {
      setVisitDateRange([studentFilter?.stVisit[0], studentFilter?.stVisit[1]])
    }
    if (
      Object.keys(studentFilter).length === 0 ||
      studentFilter?.phoneNum1 === null
    ) {
      setPhone('')
    } else {
      setPhone(studentFilter?.phoneNum1)
    }
    if (
      Object.keys(studentFilter).length === 0 ||
      studentFilter?.stName === null
    ) {
      setName('')
    } else {
      setName(studentFilter?.stName)
    }
    if (
      Object.keys(studentFilter).length === 0 ||
      studentFilter?.progress === undefined ||
      studentFilter?.progress === null
    ) {
      setProgressSelected([])
    } else {
      const numericKeys = studentFilter?.progress.map(key => String(key))
      setProgressSelected(numericKeys)
    }
  }, [router])

  const handleReceiptChange = e => {
    setReceipt(e.target.value)
  }

  const handleSubChange = e => {
    setSub(e.target.value)
  }
  const handleManagerChange = e => {
    setManager(e.target.value)
  }
  const handleAdviceChange = e => {
    setAdviceType(e.target.value)
  }
  const handleProgressChange = (value: string[]) => {
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
          phoneNum1: data.phoneNum1 === '' ? null : data.phoneNum1,
          adviceType: data.adviceType === '-' ? null : data.adviceType,
        }
        setStudentFilter(filter)
        onFilterSearch(true)
      }
    }
  }

  const handleReset = () => {
    setReceipt('-')
    setSub('-')
    setManager('-')
    setAdviceType('-')
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
                    {managerList
                      ?.filter(
                        manager => manager.mGrade > 0 && manager.mGrade < 3,
                      )
                      .map(item => (
                        <SelectItem key={item.mUsername} value={item.mUsername}>
                          {item.mUsername}
                        </SelectItem>
                      ))}
                  </Select>
                )}
              />
            </ItemBox>
            <ItemBox>
              <Controller
                control={control}
                name="adviceType"
                defaultValue={'-'}
                render={({ field }) => (
                  <Select
                    labelPlacement="outside"
                    label="상담분야"
                    placeholder=" "
                    className="w-full"
                    defaultValue={'-'}
                    variant="bordered"
                    selectedKeys={[adviceType]}
                    onChange={value => {
                      field.onChange(value)
                      handleAdviceChange(value)
                    }}
                  >
                    <SelectItem key={'-'} value={'-'}>
                      {'-'}
                    </SelectItem>
                    {adviceList?.map(item => (
                      <SelectItem key={item.type} value={item.type}>
                        {item.type}
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
                placeholder="'-'없이 작성해주세요"
                type="text"
                variant="bordered"
                label="연락처"
                value={phone}
                onValueChange={setPhone}
                onChange={e => {
                  register('phoneNum1').onChange(e)
                }}
                {...register('phoneNum1', {
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
              {errors.phoneNum1 && (
                <p className="px-2 pt-2 text-xs text-red-500">
                  {String(errors.phoneNum1.message)}
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
                value={name}
                onValueChange={setName}
                onChange={e => {
                  register('stName').onChange(e)
                }}
                {...register('stName')}
              />
              {name}
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
                    className="gap-1 radioBox"
                    value={progressSelected}
                    onValueChange={handleProgressChange}
                  >
                    {Object.entries(progressStatus)
                      .filter(([key]) => key !== '110')
                      .map(([key, value]) => (
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
