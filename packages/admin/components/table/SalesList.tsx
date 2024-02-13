import { useQuery } from '@apollo/client'
import { Pagination, ScrollShadow } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { SEE_AMOUNT_STUDENT_QUERY } from '@/graphql/queries'
import router from 'next/router'
import { useRecoilState } from 'recoil'
import { paymentPageState } from '@/lib/recoilAtoms'
import SalesItem from '@/components/table/SalesItem'

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
const TcreatedAt = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.12}px;
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
  font-weight: 600;
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

export default function PaymentTable() {
  const [currentPage, setCurrentPage] = useRecoilState(paymentPageState)
  const [currentLimit] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const { loading, error, data, refetch } = useQuery(SEE_AMOUNT_STUDENT_QUERY, {
    variables: { page: currentPage, limit: currentLimit },
  })
  const studentsData = data?.seeStudent || []
  const students = studentsData?.student || []

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    setTotalCount(studentsData.totalCount)
  }, [studentsData, totalCount])

  useEffect(() => {
    refetch()
    handleScrollTop()
  }, [router, refetch, currentPage])

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
                <TcreatedAt>결제일시</TcreatedAt>
                <Tamount>카드 결제금액</Tamount>
                <Tamount>현금 결제금액</Tamount>
                <Tamount>결제 합계</Tamount>
                <Tamount>카드 환불금액</Tamount>
                <Tamount>현금 환불금액</Tamount>
                <Tamount>환불 홥계</Tamount>
                <Tamount>총 매출액</Tamount>
                <Tamount>미수납액</Tamount>
              </TheaderBox>
            </Theader>
            {students?.map((item, index) => (
              <SalesItem
                key={index}
                tableData={item}
                itemIndex={index}
                currentPage={currentPage}
                limit={currentLimit}
              />
            ))}
          </TableWrap>
        </ScrollShadow>
      </TableArea>
    </>
  )
}