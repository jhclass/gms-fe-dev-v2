import { styled } from 'styled-components'
import { useRecoilValue } from 'recoil'
import { subStatusState } from '@/lib/recoilAtoms'
import { useEffect, useState } from 'react'
import { Button, Input, Select, SelectItem, Switch } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'

type ConsoultItemProps = {
  tableData: {
    id: number
    subDiv: string
    subjectName: string
    createdAt: string
    updatedAt: string
    fee: number
    startDate: string
    endDate: string
    roomNum: string
    exposure: boolean
  }
  index: number
}
const TableItem = styled.div`
  display: table;
  position: relative;
  width: 100%;
  min-width: fit-content;
  flex-wrap: nowrap;
  row-gap: 1rem;
  border-bottom: 1px solid #e4e4e7;
  color: #71717a;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  background: #fff;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.8);
  }
`
const TableRow = styled.div`
  display: table-row;
  width: 100%;
  min-width: fit-content;
  text-align: center;
`
const Tnum = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 7%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.08}px;
  vertical-align: middle;
`
const Tdiv = styled.div`
  display: flex;
  width: 100%;
  min-width: ${1200 * 0.57}px;
  align-items: center;
`
const Tname = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 300px;
`
const TsubDiv = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 25%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 150px;
`
const Tfee = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 25%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 150px;
`
const Ttoggle = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
  vertical-align: middle;
`
const Tbtn = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
  vertical-align: middle;
`
const Tmanager = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
  vertical-align: middle;
`
const TdateAt = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.14}px;
  vertical-align: middle;
`

const HiddenLabel = styled.label`
  display: none;
`

export default function ConsolutItem(props: ConsoultItemProps) {
  const subjectData = props.tableData
  const [isSelected, setIsSelected] = useState(true)
  const subStatus = useRecoilValue(subStatusState)
  const [sub, setSub] = useState('없음')
  const { register, control, setValue, handleSubmit, formState } = useForm()
  const getDate = (DataDate: string): string => {
    const LocalDdate = new Date(parseInt(DataDate)).toLocaleDateString()
    return LocalDdate
  }

  useEffect(() => {
    if (subjectData && sub === '없음') {
      if (subjectData.subDiv !== null) {
        setSub(subjectData.subDiv)
      } else {
        setSub('없음')
      }
    }
  }, [sub])

  const feeFormet = fee => {
    const result = fee
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    return result
  }
  const handleSubChange = e => {
    setSub(e.target.value)
  }

  const onSubmit = data => {
    console.log(data)
  }
  return (
    <>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <TableItem>
          <TableRow>
            <Tnum>{props.index + 1}</Tnum>
            <Tdiv>
              <Tname>
                <Input
                  labelPlacement="outside"
                  label={<HiddenLabel>과정명</HiddenLabel>}
                  variant="bordered"
                  radius="md"
                  type="text"
                  defaultValue={subjectData.subjectName}
                  size="sm"
                  onChange={e => {
                    register('subjectName').onChange(e)
                  }}
                  className="w-full"
                  {...register('subjectName')}
                />
              </Tname>
              <TsubDiv>
                <Controller
                  control={control}
                  name="subDiv"
                  render={({ field, fieldState }) => (
                    <Select
                      labelPlacement="outside"
                      label={<HiddenLabel>수강 구분</HiddenLabel>}
                      className="w-full"
                      variant="bordered"
                      size="sm"
                      selectedKeys={[sub]}
                      onChange={value => {
                        field.onChange(value)
                        handleSubChange
                      }}
                    >
                      {Object.entries(subStatus).map(([key, item]) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </TsubDiv>
              <Tfee>
                <Input
                  labelPlacement="outside"
                  label={<HiddenLabel>수강료</HiddenLabel>}
                  variant="bordered"
                  radius="md"
                  type="text"
                  defaultValue={feeFormet(subjectData.fee)}
                  size="sm"
                  onValueChange={value => feeFormet(value)}
                  onChange={e => {
                    register('fee').onChange(e)
                  }}
                  className="w-full"
                  {...register('fee')}
                />
              </Tfee>
            </Tdiv>
            <Ttoggle>
              <Switch
                value={String(subjectData.id)}
                name={String(subjectData.id)}
                isSelected={isSelected}
                defaultSelected={subjectData.exposure}
                onValueChange={setIsSelected}
              />
            </Ttoggle>
            <Tbtn>
              <Button
                type="submit"
                size="sm"
                radius="sm"
                className="text-white bg-flag1"
              >
                수정
              </Button>
            </Tbtn>
            <TdateAt>
              {subjectData.updatedAt === null
                ? getDate(subjectData.createdAt)
                : getDate(subjectData.updatedAt)}
            </TdateAt>
            <Tmanager>최근수정자</Tmanager>
          </TableRow>
        </TableItem>
      </form> */}
    </>
  )
}
