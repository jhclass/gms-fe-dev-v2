import { useQuery } from '@apollo/client'
import {
  Button,
  Input,
  Pagination,
  ScrollShadow,
  Select,
  SelectItem,
  Switch,
} from '@nextui-org/react'
import { useState } from 'react'
import { styled } from 'styled-components'
import { SEE_SUBJECT_QUERY } from '@/graphql/queries'
import SubjectItem from './SubjectItem'
import { Controller, useForm } from 'react-hook-form'
import { subStatusState } from '@/lib/recoilAtoms'
import { useRecoilValue } from 'recoil'

const TableArea = styled.div`
  margin-top: 0.5rem;
`
const TTopic = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Ttotal = styled.p`
  font-weight: 300;
  margin-right: 0.5rem;

  span {
    font-weight: 400;
    color: #007de9;
  }
`
const TableWrap = styled.div`
  width: 100%;
  display: block;
  min-width: 1200px;
`
const Theader = styled.div`
  width: 100%;
  min-width: fit-content;
  display: table;
  flex-wrap: nowrap;
  row-gap: 1rem;
  color: #111;
  font-size: 0.875rem;
  font-weight: 700;
  border-bottom: 1px solid #e4e4e7;
  text-align: center;
`

const TheaderBox = styled.div`
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

const PagerWrap = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: center;
`

const HiddenLabel = styled.label`
  display: none;
`

export default function ConsolutationTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const subStatus = useRecoilValue(subStatusState)
  const { loading, error, data } = useQuery(SEE_SUBJECT_QUERY)
  const [isSelected, setIsSelected] = useState(true)
  const [sub, setSub] = useState('없음')
  const subjectData = data?.seeSubject || []

  const { register, control, setValue, handleSubmit, formState } = useForm()

  const onSubmit = data => {
    console.log(data)
  }
  const handleSubChange = e => {
    setSub(e.target.value)
  }
  return (
    <>
      {/* <TTopic>
        <Ttotal>
          총 <span>{subjectData?.length}</span>건
        </Ttotal>
      </TTopic>
      <TableArea>
        <ScrollShadow orientation="horizontal" className="scrollbar">
          <TableWrap>
            <Theader>
              <TheaderBox>
                <Tnum>No</Tnum>
                <Tdiv>
                  <Tname>과정명</Tname>
                  <TsubDiv>수강구분</TsubDiv>
                  <Tfee>과정 금액</Tfee>
                </Tdiv>
                <Ttoggle>노출여부</Ttoggle>
                <Tbtn></Tbtn>
                <TdateAt>수정일시</TdateAt>
                <Tmanager>최근수정자</Tmanager>
              </TheaderBox>
            </Theader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TableItem>
                <TableRow>
                  <Tnum>신규</Tnum>
                  <Tdiv>
                    <Tname>
                      <Input
                        variant="bordered"
                        radius="md"
                        type="text"
                        labelPlacement="outside"
                        placeholder="과정명"
                        label={<HiddenLabel>과정명</HiddenLabel>}
                        defaultValue={null}
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
                            placeholder="수강 구분"
                            size="sm"
                            className="w-full"
                            variant="bordered"
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
                        variant="bordered"
                        radius="md"
                        type="text"
                        placeholder="수강료"
                        labelPlacement="outside"
                        label={<HiddenLabel>수강료</HiddenLabel>}
                        defaultValue={null}
                        size="sm"
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
                      value={'new'}
                      name={'new'}
                      isSelected={isSelected}
                      defaultSelected={true}
                      onValueChange={setIsSelected}
                    />
                  </Ttoggle>
                  <Tbtn>
                    <Button
                      type="submit"
                      size="sm"
                      radius="sm"
                      color="primary"
                      className="text-white"
                    >
                      등록
                    </Button>
                  </Tbtn>
                  <TdateAt>-</TdateAt>
                  <Tmanager>-</Tmanager>
                </TableRow>
              </TableItem>
            </form>
            {subjectData?.map((item, index) => (
              <SubjectItem key={index} tableData={item} index={index} />
            ))}
          </TableWrap>
        </ScrollShadow>
        {subjectData?.length > 0 && (
          <PagerWrap>
            <Pagination
              variant="light"
              showControls
              total={Math.ceil(subjectData?.length / 10)}
              onChange={newPage => {
                setCurrentPage(newPage)
              }}
            />
          </PagerWrap>
        )}
      </TableArea> */}
    </>
  )
}
