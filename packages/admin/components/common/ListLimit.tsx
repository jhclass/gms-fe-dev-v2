import { Button, Select, SelectItem } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'

const LimitBox = styled.div`
  color: #71717a;
  display: flex;
  gap: 0.5rem;
  background: #fff;
  padding: 0.3rem 0.3rem;
  border-radius: 0.5rem;
`

const Lable = styled.p`
  color: #71717a;
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
      <LimitBox>
        <Select
          labelPlacement="outside-left"
          label={<Lable>노출수</Lable>}
          placeholder=" "
          className="w-[7rem] items-center"
          defaultValue={String(currentLimit)}
          variant="bordered"
          size="sm"
          selectedKeys={[value]}
          onSelectionChange={e => handleSelectionChange(e)}
          classNames={{
            label: 'w-[4rem]',
          }}
        >
          <SelectItem value={'10'} key={'10'}>
            10
          </SelectItem>
          <SelectItem value={'20'} key={'20'}>
            20
          </SelectItem>
          <SelectItem value={'30'} key={'30'}>
            30
          </SelectItem>
          <SelectItem value={'50'} key={'50'}>
            50
          </SelectItem>
        </Select>
        <Button size="sm" color="primary" onClick={changeLimit}>
          적용
        </Button>
      </LimitBox>
    </>
  )
}
