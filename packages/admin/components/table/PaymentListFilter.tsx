import { useMutation, useQuery } from '@apollo/client'
import { Button, Pagination, ScrollShadow } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { SEE_AMOUNT_STUDENT_QUERY } from '@/graphql/queries'
import router from 'next/router'
import PaymentItem from '@/components/table/PaymentItem'
import { useRecoilState } from 'recoil'
import { paymentPageState } from '@/lib/recoilAtoms'

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
const TopBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`
const ColorHelp = styled.div`
  display: flex;
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
const Tnum = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 6%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.06}px;
`
const Tamount = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
`
const Tname = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.09}px;
`
const Tsubject = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 18%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.18}px;
`
const Tphone = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
`
const TcreatedAt = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
`
const Tmanager = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.09}px;
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

export default function PaymentFilterTable({
  onFilterSearch,
  studentFilter,
  setStudentFilter,
}) {
  const [currentPage, setCurrentPage] = useRecoilState(paymentPageState)
  const [currentLimit] = useState(10)
  // const [searchStudentFilterMutation] = useMutation(
  //   SEARCH_STUDENT_FILTER_MUTATION,
  // )
  const [searchResult, setSearchResult] = useState(null)

  useEffect(() => {
    // searchStudentFilterMutation({
    //   variables: {
    //     ...studentFilter,
    //     page: currentPage,
    //     perPage: currentLimit,
    //   },
    //   onCompleted: resData => {
    //     const { student, totalCount } = resData.searchStudent || {}
    //     setSearchResult({ student, totalCount })
    //   },
    // })
  }, [studentFilter, currentPage])

  const resetList = () => {
    setStudentFilter({})
    onFilterSearch(false)
  }

  return (
    <>
      <TTopic>
        <TopBox>
          <Ttotal>
            총
            <span>
              {searchResult?.totalCount === null ? 0 : searchResult?.totalCount}
            </span>
            건이 검색되었습니다.
          </Ttotal>
          <Button size="sm" radius="sm" color="primary" onClick={resetList}>
            전체보기
          </Button>
        </TopBox>
        <ColorHelp>
          <ColorCip>
            <span style={{ background: '#007de9' }}></span> : 신규
          </ColorCip>
          <ColorCip>
            <span style={{ background: '#FF5900' }}></span> : 미배정
          </ColorCip>
        </ColorHelp>
      </TTopic>
      <TableArea>
        <ScrollShadow orientation="horizontal" className="scrollbar">
          <TableWrap>
            <Theader>
              <TheaderBox>
                <TcreatedAt>결제일시</TcreatedAt>
                <Tname>이름</Tname>
                <Tmanager>수납 담당자</Tmanager>
                <Tsubject>수강과정</Tsubject>
                <Tamount className="fee">수강료</Tamount>
                <Tamount className="discount">할인금액</Tamount>
                <Tamount className="actual">실 수강료</Tamount>
                <Tamount className="unpaid">미수납액</Tamount>
                <Tamount className="amount">카드결제액</Tamount>
                <Tamount className="amount">현금결제액</Tamount>
                <Tamount className="amount">결제합계</Tamount>
              </TheaderBox>
            </Theader>
            {searchResult?.totalCount > 0 &&
              searchResult?.student.map((item, index) => (
                <PaymentItem
                  key={index}
                  tableData={item}
                  itemIndex={index}
                  currentPage={currentPage}
                  limit={currentLimit}
                />
              ))}
            {searchResult?.totalCount === 0 && (
              <Nolist>검색결과가 없습니다.</Nolist>
            )}
          </TableWrap>
        </ScrollShadow>
        {searchResult?.totalCount > 0 && (
          <PagerWrap>
            <Pagination
              variant="light"
              showControls
              initialPage={currentPage}
              page={currentPage}
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
}