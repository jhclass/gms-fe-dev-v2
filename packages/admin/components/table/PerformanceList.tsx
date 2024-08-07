import { useMutation } from '@apollo/client'
import { Suspense, useEffect, useState } from 'react'
import { styled } from 'styled-components'
import PerformanceBox from './PerformanceBox'
import { SALES_STATISTICS_MUTATION } from '@/graphql/mutations'
import PerformanceTotal from '@/components/table/PerformanceTotal'
import PerformanceChart from '@/components/dashboard/PerformanceChart'
import PerformanceRefundBox from './PerformanceRefundBox'

const ListBox = styled.div`
  margin-top: 2rem;
  background: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
`

const TotalList = styled.div`
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  margin-bottom: 1.5rem;
`
const LodingDiv = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-width: 20rem;
  position: relative;
  background: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function PerformanceList({ ids, dateRange, filterSearch }) {
  const [salesStatistics] = useMutation(SALES_STATISTICS_MUTATION)
  const [allData, setAllData] = useState([])
  const [totalActualAmount, setTotalActualAmount] = useState([])
  const [totalAmount, setTotalAmount] = useState([])
  const [totalCount, setTotalCount] = useState([])
  const [totalRefundAmount, setTotalRefundAmount] = useState([])
  const [totalRefundCount, setTotalRefundCount] = useState([])
  const [idList, setIdList] = useState([])
  const [succMutation, setSuccMutation] = useState(false)

  useEffect(() => {
    salesStatistics({
      variables: {
        period: dateRange,
        receiverId: ids,
      },
      onCompleted: result => {
        if (result.salesStatistics.ok) {
          setAllData(result.salesStatistics.data)
          const managerId = result.salesStatistics.data?.map(
            item => item.receiverId,
          )
          const totalActualAmount = result.salesStatistics.data?.map(
            item => item.totalActualAmount,
          )
          const totalAmount = result.salesStatistics.data?.map(
            item => item.totalAmount,
          )
          const totalCount = result.salesStatistics.data?.map(
            item => item.totalPaymentCount,
          )
          const totalRefundAmount = result.salesStatistics.data?.map(
            item => item.totalRefundAmount,
          )
          const totalRefundCount = result.salesStatistics.data?.map(
            item => item.totalRefundCount,
          )
          setTotalActualAmount(totalActualAmount)
          setTotalAmount(totalAmount)
          setTotalCount(totalCount)
          setTotalRefundAmount(totalRefundAmount)
          setTotalRefundCount(totalRefundCount)
          setIdList(managerId)
          setSuccMutation(true)
          console.log('기본 props mutation 완료')
        }
      },
    })
  }, [ids, dateRange])

  return (
    succMutation && (
      <>
        <div style={{ marginBottom: '3rem' }}>
          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <PerformanceChart
              managerIds={idList}
              totalAmount={totalAmount}
              totalCount={totalCount}
              totalRefundAmount={totalRefundAmount}
            />
          </Suspense>
        </div>
        {allData?.map((item, index) => (
          <ListBox key={index}>
            <TotalList>
              <Suspense
                fallback={
                  <LodingDiv>
                    <i className="xi-spinner-2" />
                  </LodingDiv>
                }
              >
                <PerformanceTotal
                  ranking={index}
                  managerId={item.receiverId}
                  totalActualAmount={item.totalActualAmount}
                  totalAmount={item.totalAmount}
                  totalPaymentCount={item.totalPaymentCount}
                  totalRefundAmount={item.totalRefundAmount}
                  totalRefundCount={item.totalRefundCount}
                />
              </Suspense>
            </TotalList>
            <PerformanceBox
              managerData={item}
              dateRange={dateRange}
              filterSearch={filterSearch}
              totalPaymentCount={item.totalPaymentCount - item.totalRefundCount}
            />
            <PerformanceRefundBox
              managerData={item}
              dateRange={dateRange}
              filterSearch={filterSearch}
              totalRefundCount={item.totalRefundCount}
            />
          </ListBox>
        ))}
      </>
    )
  )
}
