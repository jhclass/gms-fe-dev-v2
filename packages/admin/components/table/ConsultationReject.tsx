import { useMutation, useQuery } from '@apollo/client'
import {
  Button,
  Checkbox,
  Pagination,
  ScrollShadow,
  cn,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import ConsultItem from '@/components/table/ConsultItem'
import { SEARCH_STUDENTSTATE_MUTATION } from '@/graphql/mutations'
import { MME_QUERY, SEE_FAVORITESTATE_QUERY } from '@/graphql/queries'

const TableArea = styled.div`
  margin-top: 0.5rem;
`
const TTopic = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.3rem;
    align-items: flex-start;
  }
`
const TopBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`
const Ttotal = styled.p`
  font-weight: 300;
  margin-right: 0.5rem;

  span {
    font-weight: 400;
    color: #007de9;
  }
`
const ColorHelp = styled.div`
  display: flex;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const ColorCip = styled.p`
  padding-left: 0.5rem;
  display: flex;
  align-items: center;
  color: #71717a;
  font-size: 0.7rem;

  span {
    display: inline-block;
    margin-right: 0.5rem;
    width: 1rem;
    height: 2px;
  }

  @media (max-width: 768px) {
    padding-left: 0;
    padding-right: 0.5rem;
  }
`
const TableWrap = styled.div`
  width: 100%;
  display: table;
  min-width: 1200px;
`
const Theader = styled.div`
  width: 100%;
  min-width: fit-content;
  display: table-row;
  flex-wrap: nowrap;
  row-gap: 1rem;
  color: #111;
  font-size: 0.875rem;
  font-weight: 700;
  border-bottom: 1px solid #e4e4e7;
  text-align: center;
`

const TheaderBox = styled.div`
  display: flex;
`
const Tfavorite = styled.div`
  display: table-cell;
  font-size: inherit;
  color: inherit;
  min-width: 30px;
  padding: 1rem 1rem 1rem 2rem;
`

const ClickBox = styled.div`
  display: flex;
  width: 100%;
`
const Tnum = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 6%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 50px;
`
const TreceiptDiv = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 9%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 100px;
`
const TsubDiv = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 9%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 100px;
`
const Tname = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 100px;
`
const Tphone = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 120px;
`
const TcreatedAt = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 120px;
`
const Tmanager = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 100px;
`
const TstVisit = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 120px;
`
const TexpEnrollDate = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 120px;
`
const Tprogress = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 90px;
`

const PagerWrap = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: center;
`
export default function ConsolutationRejectTable({ checkItem, setCheckItem }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit] = useState(10)
  const [searchStudentStateMutation] = useMutation(SEARCH_STUDENTSTATE_MUTATION)
  const [searchResult, setSearchResult] = useState(null)

  console.log(checkItem)
  useEffect(() => {
    searchStudentStateMutation({
      variables: {
        progress: 110,
        page: currentPage,
        limit: currentLimit,
      },
      onCompleted: resData => {
        const { studentState, totalCount } = resData.searchStudentState || {}
        setSearchResult({ studentState, totalCount })
      },
    })
  }, [currentPage])
  return (
    searchResult !== null && (
      <>
        <TTopic>
          <TopBox>
            <Ttotal>
              총 <span>{searchResult?.totalCount}</span>건
            </Ttotal>
          </TopBox>
        </TTopic>
        <TableArea>
          <ScrollShadow orientation="horizontal" className="scrollbar">
            <TableWrap>
              <Theader>
                <TheaderBox>
                  <Tfavorite>
                    <Checkbox
                      isDisabled
                      classNames={{
                        base: 'opacity-[.8]',
                        wrapper: 'before:border-[#111]',
                      }}
                    ></Checkbox>
                  </Tfavorite>
                  <ClickBox>
                    <Tnum>No</Tnum>
                    <Tprogress>진행상태</Tprogress>
                    <TreceiptDiv>접수구분</TreceiptDiv>
                    <TsubDiv>수강구분</TsubDiv>
                    <Tname>이름</Tname>
                    <Tphone>연락처</Tphone>
                    <TcreatedAt>등록일시</TcreatedAt>
                    <Tmanager>담당자</Tmanager>
                    <TstVisit>상담예정일</TstVisit>
                    <TexpEnrollDate>수강예정일</TexpEnrollDate>
                  </ClickBox>
                </TheaderBox>
              </Theader>

              {searchResult?.studentState.map((item, index) => (
                <ConsultItem
                  key={index}
                  tableData={item}
                  itemIndex={index}
                  currentPage={currentPage}
                  limit={currentLimit}
                  checkBtn={true}
                  checkItem={checkItem}
                  setCheckItem={setCheckItem}
                />
              ))}
            </TableWrap>
          </ScrollShadow>
          {searchResult?.totalCount > 0 && (
            <PagerWrap>
              <Pagination
                variant="light"
                showControls
                initialPage={currentPage}
                total={Math.ceil(searchResult?.totalCount / currentLimit)}
                onChange={newPage => {
                  setCurrentPage(newPage)
                }}
              />
            </PagerWrap>
          )}
        </TableArea>
      </>
    )
  )
}
