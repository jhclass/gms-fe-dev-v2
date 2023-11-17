import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { ripplesState } from '@/lib/recoilAtoms'
import { useForm } from 'react-hook-form'
import Button from './Button'

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

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  color: #71717a;
`

const Select = styled.select`
  margin-top: 0.3rem;
  position: relative;
  padding: 0.375rem 0.75rem;
  width: 100%;
  height: 2.5rem;
  border: 1px solid #fafafa;
  border-radius: 0.5rem;
  font-weight: 400;
  color: #71717a;
  background: #f2f2f2;
`
const SelectItem = styled.option`
  color: #71717a;
`

const Input = styled.input`
  margin-top: 0.3rem;
  position: relative;
  padding: 0.375rem 0.75rem;
  width: 100%;
  height: 2.5rem;
  border: 1px solid #fafafa;
  border-radius: 0.5rem;
  font-weight: 400;
  color: #71717a;
  background: #f2f2f2;
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
              <Label>접수구분</Label>
              <Select defaultValue="" {...register('div')}>
                <SelectItem value=""></SelectItem>
                <SelectItem value="온라인">온라인</SelectItem>
                <SelectItem value="HRD">HRD</SelectItem>
                <SelectItem value="방문">방문</SelectItem>
                <SelectItem value="전화">전화</SelectItem>
              </Select>
            </ItemBox>
            <ItemBox>
              <Label>담당자</Label>
              <Select defaultValue="" {...register('manager')}>
                <SelectItem value=""></SelectItem>
                <SelectItem value="김사원">김사원</SelectItem>
                <SelectItem value="이주임">이주임</SelectItem>
                <SelectItem value="박대리">박대리</SelectItem>
              </Select>
            </ItemBox>
          </BoxLt>
          <BoxCt>
            <ItemBox>
              <Label>수강구분</Label>
              <Select defaultValue="" {...register('suvDiv')}>
                <SelectItem value=""></SelectItem>
                <SelectItem value="HRD">HRD</SelectItem>
                <SelectItem value="일반">일반</SelectItem>
              </Select>
            </ItemBox>
            <ItemBox>
              <Label>수강생이름</Label>
              <Input type="text" {...register('name')} />
            </ItemBox>
          </BoxCt>
          <BoxRt>
            <ItemBox>
              <Label>상담상태</Label>
              <Select defaultValue="" {...register('progress')}>
                <SelectItem value=""></SelectItem>
                <SelectItem value="상담대기">상담대기</SelectItem>
                <SelectItem value="상담예정">상담예정</SelectItem>
                <SelectItem value="방문예정">방문예정</SelectItem>
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
