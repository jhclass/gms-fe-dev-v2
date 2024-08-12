import { Button, Select, SelectItem } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'

const FilterForm = styled.form`
  display: flex;
  width: 100%;
  gap: 1rem;
  padding: 0 0 1.5rem 0;
  margin-top: 1rem;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 768px) {
    padding: 0 0 1.5rem 0;
  }
`
const LimitBox = styled.div`
  width: 12.5rem;
  position: relative;
  display: flex;
  flex: 1;
  gap: 0.5rem;
  align-items: flex-end;

  @media (max-width: 768px) {
    width: 100%;
  }
`

// const LimitBox = styled.div`
//   position: relative;
//   color: ${({ theme }) => theme.colors.gray};
//   display: flex;
//   gap: 0.5rem;
//   padding: 0.3rem 0.3rem;
//   border-radius: 0.5rem;

//   &:after {
//     content: '';
//     width: 1px;
//     height: 50%;
//     background: ${({ theme }) => theme.colors.gray};
//     position: absolute;
//     left: -0.75rem;
//     top: 50%;
//     transform: translateY(-50%);
//   }

//   @media screen and (max-width: 768px) {
//     &:after {
//       display: none;
//     }
//   }
// `

const Lable = styled.p`
  color: ${({ theme }) => theme.colors.gray};
`

export default function ListLimitSelect({ currentLimit, setCurrentLimit }) {
  const [value, setValue] = useState('10')

  useEffect(() => {
    setValue(String(currentLimit))
  }, [currentLimit])

  const handleSelectionChange = e => {
    if (e.anchorKey !== undefined) {
      setValue(e.anchorKey)
    }
  }
  const changeLimit = () => {
    setCurrentLimit(parseInt(value))
  }

  return (
    <>
      <FilterForm>
        <LimitBox>
          <Select
            labelPlacement={'outside-left'}
            label={<p className="hidden">페이지 당 노출수</p>}
            placeholder=" "
            className="items-center"
            defaultValue={String(currentLimit)}
            variant="bordered"
            size="sm"
            selectedKeys={[value]}
            onSelectionChange={e => handleSelectionChange(e)}
            classNames={{
              label: 'pr-0',
              trigger: 'bg-white',
              value: 'text-gray text-[0.8rem]',
            }}
          >
            <SelectItem value={'10'} key={'10'}>
              10개씩 보기
            </SelectItem>
            <SelectItem value={'20'} key={'20'}>
              20개씩 보기
            </SelectItem>
            <SelectItem value={'30'} key={'30'}>
              30개씩 보기
            </SelectItem>
            <SelectItem value={'50'} key={'50'}>
              50개씩 보기
            </SelectItem>
          </Select>
          <Button size="sm" color="primary" onClick={changeLimit}>
            적용
          </Button>
        </LimitBox>
      </FilterForm>
    </>
  )
}
