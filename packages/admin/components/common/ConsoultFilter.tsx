import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { progressStatusState, studentFilterState } from '@/lib/recoilAtoms'
import { Controller, useForm } from 'react-hook-form'
import Button from './Button'
import ChipCheckbox from '@/components/common/ChipCheckbox'
import { CheckboxGroup, Input, Select, SelectItem } from '@nextui-org/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
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
export default function TableFillter({ isActive, onFilterToggle }) {
  const [
    getManage,
    { data: seeManageUserData, error, loading: seeMansgeuserLoading },
  ] = useLazyQuery(SEE_MANAGEUSER_QUERY)
  const setFilterState = useSetRecoilState(studentFilterState)

  const manageData = seeManageUserData?.seeManageUser || []
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

  const [values, setValues] = useState('asdasdds')

  const manageClick = () => {
    getManage()
  }

  const onSubmit = data => {
    const filter = {
      receiptDiv: data?.receiptDiv,
      subDiv: data?.subDiv,
      pic: data?.pic,
      createdAt: data?.creatDateRange,
      stVisit: data?.visitDateRange,
      stName: data?.stName,
      progress: data?.groupSelected,
    }
    setFilterState(filter)
    onFilterToggle(false)
  }

  const handleReset = () => {
    reset({ receiptDiv: '' })
    setCreatDateRange([null, null])
    setVisitDateRange([null, null])
    setValues('sasss')
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
              <Select
                labelPlacement="outside"
                label="접수구분"
                placeholder=""
                className="w-full"
                defaultValue={'0'}
                {...register('receiptDiv')}
              >
                <SelectItem key={'0'} value="">
                  온라인
                </SelectItem>
                <SelectItem key={'온라인'} value={'온라인'}>
                  온라인
                </SelectItem>
                <SelectItem key={'방문'} value={'방문'}>
                  방문
                </SelectItem>
                <SelectItem key={'전화'} value={'전화'}>
                  전화
                </SelectItem>
              </Select>
            </ItemBox>
            <ItemBox>
              <Controller
                name="subDiv"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    labelPlacement="outside"
                    label="수강구분"
                    placeholder=" "
                    className="w-full"
                    defaultValue=""
                    value={field.value}
                    {...register('subDiv')}
                  >
                    <SelectItem key={'HRD'} value={'HRD'}>
                      HRD
                    </SelectItem>
                    <SelectItem key={'일반'} value={'일반'}>
                      일반
                    </SelectItem>
                  </Select>
                )}
              />
            </ItemBox>
            <ItemBox>
              <Controller
                name="pic"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    onClick={manageClick}
                    labelPlacement="outside"
                    label="담당자"
                    placeholder=" "
                    className="w-full"
                    value={field.value}
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
              />
            </ItemBox>
          </BoxTop>
          <BoxMiddle>
            <ItemBox>
              <Controller
                control={control}
                name="creatDateRange"
                render={({ field }) => (
                  <DatePicker
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
                    label="진행상태"
                    orientation="horizontal"
                    defaultValue={['buenos-aires', 'london']}
                    className="gap-1"
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
            >
              검색
            </Button>
            <Button
              buttonType="reset"
              width="calc(50% - 0.5rem)"
              height="2.5rem"
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
