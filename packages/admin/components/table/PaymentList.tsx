import { useSuspenseQuery } from '@apollo/client'
import { Pagination, ScrollShadow } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { SEE_PAYMENT_QUERY } from '@/graphql/queries'
import router from 'next/router'
import PaymentItem from '@/components/table/PaymentItem'
import { useRecoilState } from 'recoil'
import { paymentPageState } from '@/lib/recoilAtoms'
import { StudentPaymentResult } from '@/src/generated/graphql'

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
  width: 9%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.09}px;
`
const Tname = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.08}px;
`
const Tsubject = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 21%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.21}px;
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
  width: 9%;
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

type seePaymentQuery = {
  seeStudentPayment: StudentPaymentResult
}

export default function PaymentTable() {
  const [currentPage, setCurrentPage] = useRecoilState(paymentPageState)
  const [currentLimit] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const { error, data, refetch } = useSuspenseQuery<seePaymentQuery>(
    SEE_PAYMENT_QUERY,
    {
      variables: { page: currentPage, limit: currentLimit },
    },
  )
  const studentsData = data?.seeStudentPayment
  const students = studentsData?.StudentPayment

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    setTotalCount(studentsData.totalCount)
  }, [studentsData, totalCount])

  useEffect(() => {
    handleScrollTop()
  }, [currentPage])

  useEffect(() => {
    const handleRouteChange = () => {
      refetch()
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  if (error) {
    console.log(error)
  }

  return (
    <>
      <TTopic>
        <Ttotal>
          총 <span>{totalCount}</span>건
        </Ttotal>
      </TTopic>
      <TableArea>
        <ScrollShadow orientation="horizontal" className="scrollbar">
          <TableWrap>
            <Theader>
              <TheaderBox>
                <Tnum>No</Tnum>
                <TcreatedAt>최근 업데이트</TcreatedAt>
                <Tname>수강생명</Tname>
                <Tmanager>수강 담당자</Tmanager>
                <Tsubject>수강과정</Tsubject>
                <Tamount className="fee">수강료</Tamount>
                <Tamount className="discount">할인금액</Tamount>
                <Tamount className="actual">실 수강료</Tamount>
                <Tamount className="unpaid">미수납액</Tamount>
                <Tamount className="amount">총 결제액</Tamount>
              </TheaderBox>
            </Theader>
            {totalCount > 0 &&
              students?.map((item, index) => (
                <PaymentItem
                  key={index}
                  tableData={item}
                  itemIndex={index}
                  currentPage={currentPage}
                  limit={currentLimit}
                />
              ))}
            {totalCount === 0 && <Nolist>등록된 수강생이 없습니다.</Nolist>}
          </TableWrap>
        </ScrollShadow>
        {totalCount > 0 && (
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
}
