import styled from 'styled-components'
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Pagination,
} from '@nextui-org/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import SMSAddrItem1 from '@/components/items/SMSAddrItem1'

const SearchArea = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const ItemBox = styled.form`
  display: flex;
  gap: 0.5rem;
`
const Theader = styled.div`
  width: 100%;
  min-width: fit-content;
  display: table-row;
  flex-wrap: nowrap;
  color: #111;
  font-size: 0.875rem;
  font-weight: 700;
  border-bottom: 1px solid #e4e4e7;
  text-align: center;
`
const TableItem = styled.div`
  display: table;
  position: relative;
  width: 100%;
  min-width: fit-content;
  flex-wrap: nowrap;
  border-bottom: 1px solid #e4e4e7;
  color: #71717a;
  font-size: 0.875rem;
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
const Tcheck = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
`
const Tname = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 30%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`
const Tpart = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 40%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`
const Tphone = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 30%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`

const PagerWrap = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: center;
`
const Nolist = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  color: #71717a;
`

export default function SMSAddrModal() {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit, setCurrentLimit] = useState(5)
  const [groupSelected, setGroupSelected] = useState(null)
  const { register, handleSubmit, reset } = useForm()

  const handleCheck = values => {
    setGroupSelected(values)
  }

  return (
    <>
      <SearchArea>
        <ItemBox>
          <Input
            labelPlacement="outside-left"
            size="sm"
            placeholder=" "
            type="text"
            variant="bordered"
            label="이름"
            // defaultValue={subjectSearch}
            {...register('subjectName')}
          />
          <Button
            type="submit"
            size="sm"
            radius="sm"
            variant="solid"
            color="primary"
            className="text-white"
          >
            검색
          </Button>
        </ItemBox>
      </SearchArea>
      <CheckboxGroup
        value={groupSelected || []}
        onChange={handleCheck}
        classNames={{
          wrapper: 'gap-0',
        }}
      >
        <Theader>
          <TableRow>
            <Tcheck></Tcheck>
            <Tname>이름</Tname>
            <Tpart>생일</Tpart>
            <Tphone>휴대폰</Tphone>
          </TableRow>
        </Theader>
        <TableItem>
          <TableRow>
            <Checkbox key={1} value={'1'}></Checkbox>
            <SMSAddrItem1 />
          </TableRow>
        </TableItem>
        <Nolist>노출중인 과정이 없습니다.</Nolist>
      </CheckboxGroup>
      <PagerWrap>
        <Pagination
          variant="light"
          showControls
          initialPage={currentPage}
          page={currentPage}
          total={Math.ceil(20 / currentLimit)}
          onChange={newPage => {
            setCurrentPage(newPage)
          }}
        />
      </PagerWrap>
    </>
  )
}
