import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { ripplesState } from '@/lib/recoilAtoms'
import { useForm } from 'react-hook-form'
import Button from './Button'
import { Input, Select, SelectItem } from '@nextui-org/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'
import { ko } from 'date-fns/esm/locale'

type ConsoultFilterProps = {
  isActive: boolean
}
const FilterBox = styled(motion.div)`
  overflow: hidden;
`
const FilterForm = styled.form`
  display: flex;
  width: 100%;
  gap: 2rem;
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: column;
  }
`
const BoxLt = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1.5rem;
`
const BoxCt = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1.5rem;
`
const BoxRt = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: space-between;
`
const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
`
const BtnBox = styled.div`
  display: flex;
  gap: 1rem;
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
  console.log(isActive)

  return (
    <>
      <FilterBox
        variants={FilterVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        <FilterForm onSubmit={handleSubmit(onSubmit)}>
          <BoxLt>
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
              <DatePicker
                locale={ko}
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
          </BoxLt>
          <BoxCt>
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
              <DatePicker
                locale={ko}
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
          </BoxCt>
          <BoxRt>
            <ItemBox>
              <Select
                labelPlacement="outside"
                label="상담상태"
                placeholder=" "
                className="w-full"
                defaultValue=""
                {...register('progress')}
              >
                <SelectItem key={'상담대기'} value={'상담대기'}>
                  상담대기
                </SelectItem>
                <SelectItem key={'상담예정'} value={'상담예정'}>
                  상담예정
                </SelectItem>
                <SelectItem key={'방문예정'} value={'방문예정'}>
                  방문예정
                </SelectItem>
              </Select>
            </ItemBox>
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
          </BoxRt>
        </FilterForm>
      </FilterBox>
    </>
  )
}
