import { useMutation } from '@apollo/client'
import { Pagination, ScrollShadow } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import PerformanceItem from './PerformanceItem'
import { SALES_STATISTICS_LIST_MUTATION } from '@/graphql/mutations'

const TableArea = styled.div``
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
  display: table;
  min-width: 700px;
  border-bottom: 1px solid #e4e4e7;
  border-radius: 0.5rem;
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
  text-align: center;
`

const TheaderBox = styled.div`
  display: flex;
`
const Tnum = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 7%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.07}px;
`
const Tamount = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.11}px;
`
const Tname = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.1}px;
`
const Tsubject = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 40%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.4}px;
`
const TcreatedAt = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.11}px;
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
`
const Nolist = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  font-size: 0.875rem;
  color: #71717a;
`
const PagerWrap = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: center;
`

export default function PerformanceBox({ managerData, dateRange, totalCount }) {
  const [salesStatisticsList] = useMutation(SALES_STATISTICS_LIST_MUTATION)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit] = useState(5)
  const [detailData, setDetailData] = useState(null)

  // useEffect(() => {
  //   if (currentPage !== 1) {
  //     setCurrentPage(1)
  //   }
  // }, [dateRange, managerData])

  // useEffect(() => {
  //   salesStatisticsList({
  //     variables: {
  //       period: dateRange,
  //       processingManagerId: managerData.processingManagerId,
  //       page: currentPage,
  //       limit: currentLimit,
  //     },
  //     onCompleted: result => {
  //       if (result.salesStatisticsList.ok) {
  //         setDetailData(result.salesStatisticsList.data)
  //       }
  //     },
  //   })
  // }, [currentPage])
  // console.log('1', managerData)

  return (
    managerData && (
      <>
        <TableArea>
          <ScrollShadow orientation="horizontal" className="scrollbar">
            <TableWrap>
              <Theader>
                <TheaderBox>
                  <Tnum>No</Tnum>
                  <TcreatedAt>결제 일시</TcreatedAt>
                  <Tname>수강생명</Tname>
                  <Tmanager>수납 담당자</Tmanager>
                  <Tsubject>수강과정</Tsubject>
                  <Tamount className="amount">카드 결제액</Tamount>
                  <Tamount className="amount">현금 결제액</Tamount>
                </TheaderBox>
              </Theader>
              {totalCount !== 0 && (
                <>
                  {detailData &&
                    detailData.map((item, index) => (
                      <PerformanceItem
                        key={index}
                        currentPage={currentPage}
                        limit={currentLimit}
                        tableData={item}
                        itemIndex={index}
                      />
                    ))}
                </>
              )}
              {detailData?.totalCount === 0 && (
                <Nolist>데이터가 없습니다.</Nolist>
              )}
            </TableWrap>
          </ScrollShadow>
          {totalCount !== 0 && (
            <PagerWrap>
              <Pagination
                variant="light"
                showControls
                initialPage={currentPage}
                page={currentPage}
                total={Math.ceil(totalCount / currentLimit)}
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
