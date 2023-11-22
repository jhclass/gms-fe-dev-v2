import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { progressStatusState } from '@/lib/recoilAtoms'
import { useForm } from 'react-hook-form'
import Button from './Button'
import ChipCheckbox from '@/components/common/ChipCheckbox'
import { CheckboxGroup, Input, Select, SelectItem } from '@nextui-org/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'

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
export default function TableFillter({ isActive }: ConsoultFilterProps) {
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

  const onSubmit = data => {
    console.log(data)
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
                placeholder=" "
                className="w-full"
                defaultValue=""
                {...register('div')}
              >
                <SelectItem key={'온라인'} value={'온라인'}>
                  온라인
                </SelectItem>
                <SelectItem key={'HRD'} value={'HRD'}>
                  HRD
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
              <Select
                labelPlacement="outside"
                label="수강구분"
                placeholder=" "
                className="w-full"
                defaultValue=""
                {...register('suvDiv')}
              >
                <SelectItem key={'HRD'} value={'HRD'}>
                  HRD
                </SelectItem>
                <SelectItem key={'일반'} value={'일반'}>
                  일반
                </SelectItem>
              </Select>
            </ItemBox>
            <ItemBox>
              <Select
                labelPlacement="outside"
                label="담당자"
                placeholder=" "
                className="w-full"
                defaultValue=""
                {...register('manager')}
              >
                <SelectItem key={'김사원'} value={'김사원'}>
                  김사원
                </SelectItem>
                <SelectItem key={'이주임'} value={'이주임'}>
                  이주임
                </SelectItem>
                <SelectItem key={'박대리'} value={'박대리'}>
                  박대리
                </SelectItem>
              </Select>
            </ItemBox>
          </BoxTop>
          <BoxMiddle>
            <ItemBox>
              <DatePicker
                selectsRange={true}
                startDate={startCreatDate}
                endDate={endCreatDate}
                onChange={update => {
                  setCreatDateRange(update)
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
                  />
                }
              />
            </ItemBox>
            <ItemBox>
              <DatePicker
                selectsRange={true}
                startDate={startVisitDate}
                endDate={endVisitDate}
                onChange={update => {
                  setVisitDateRange(update)
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
                  />
                }
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
              <CheckboxGroup
                label="진행상태"
                orientation="horizontal"
                defaultValue={['buenos-aires', 'london']}
                className="gap-1"
              >
                {Object.entries(progressStatus).map(([key, value]) => (
                  <ChipCheckbox key={key} value={value}>
                    {value}
                  </ChipCheckbox>
                ))}
              </CheckboxGroup>
            </ItemBox>
          </BoxBottom>
          <BtnBox>
            <Button
              buttonType="button"
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
            >
              초기화
            </Button>
          </BtnBox>
        </FilterForm>
      </FilterBox>
    </>
  )
}
