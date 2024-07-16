import styled from 'styled-components'
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Pagination,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import SMSAddrItem3 from '@/components/items/SMSAddrItem3'
import { useLazyQuery } from '@apollo/client'
import { SEARCH_MANAGEUSER_QUERY } from '@/graphql/queries'

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

export default function SMSAddrModal({ groupSelected, setGroupSelected }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit] = useState(5)
  const [searchManager, { refetch, loading, error, data }] = useLazyQuery(
    SEARCH_MANAGEUSER_QUERY,
  )
  const [managerData, setManagerData] = useState(null)
  const [managerTotal, setManagerTotal] = useState(0)

  const { register, handleSubmit, getValues } = useForm()
  const searchName = getValues('mUsername')

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    if (managerData) {
      searchManager({
        variables: {
          mUsername: searchName,
          mRank: '강사',
          page: currentPage,
          limit: currentLimit,
        },
        onCompleted: result => {
          if (result.searchManageUser.ok) {
            setManagerData(result?.searchManageUser.data)
            setManagerTotal(result?.searchManageUser.totalCount)
          }
        },
      })
    }
  }, [currentPage])

  const onSubmit = data => {
    searchManager({
      variables: {
        mUsername: data.mUsername,
        mRank: '강사',
        page: currentPage,
        limit: currentLimit,
      },
      onCompleted: result => {
        if (result.searchManageUser.ok) {
          setManagerData(result?.searchManageUser.data)
          setManagerTotal(result?.searchManageUser.totalCount)
        }
      },
    })
  }

  const handleCheck = values => {
    setGroupSelected(values)
  }

  return (
    <>
      <SearchArea>
        <ItemBox onSubmit={handleSubmit(onSubmit)}>
          <Input
            labelPlacement="outside-left"
            size="sm"
            placeholder=" "
            type="text"
            variant="bordered"
            label="이름"
            {...register('mUsername')}
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
            <Tpart>강의분야</Tpart>
            <Tphone>휴대폰</Tphone>
          </TableRow>
        </Theader>
        {managerTotal > 0 && (
          <>
            {managerData?.map((teacher, index) => (
              <TableItem key={index}>
                <TableRow>
                  <Checkbox key={teacher.id} value={teacher}></Checkbox>
                  <SMSAddrItem3 teacher={teacher} />
                </TableRow>
              </TableItem>
            ))}
          </>
        )}
        {managerTotal === 0 && <Nolist>검색 결과가 없습니다.</Nolist>}
      </CheckboxGroup>
      {managerTotal > 0 && (
        <PagerWrap>
          <Pagination
            variant="light"
            showControls
            initialPage={currentPage}
            page={currentPage}
            total={Math.ceil(managerTotal / currentLimit)}
            onChange={newPage => {
              setCurrentPage(newPage)
            }}
          />
        </PagerWrap>
      )}
    </>
  )
}
