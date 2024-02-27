import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import PerformanceBox from './PerformanceBox'
import { SEARCH_PAYMENT_MUTATION } from '@/graphql/mutations'
import PerformanceTotal from './PerformanceTotal'
import PerformanceChart from '../dashboard/PerformanceChart'
import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'

const ListBox = styled.div`
  margin-top: 2rem;
  background: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
`

export default function PerformanceList({ ids, dateRange }) {
  const [searchPayment] = useMutation(SEARCH_PAYMENT_MUTATION)
  const [allData, setAllData] = useState([])
  const [totalAmount, setTotalAmount] = useState([])
  const [countTotal, setCountTotal] = useState([])
  const [idList, setIdList] = useState([])

  useEffect(() => {
    searchPayment({
      variables: {
        period: dateRange,
        processingManagerId: ids,
      },
      onCompleted: result => {
        if (result.searchStudentPayment.ok) {
          setAllData(result.searchStudentPayment.data)
          const managerId = result.searchStudentPayment.data?.map(
            item => item.processingManagerId,
          )
          const totalAmount = result.searchStudentPayment.data?.map(
            item => item.totalActualAmount,
          )
          const totalCount = result.searchStudentPayment.data?.map(
            item => item.totalCount,
          )
          setTotalAmount(totalAmount)
          setCountTotal(totalCount)
          setIdList(managerId)
        }
      },
    })
  }, [ids, dateRange])

  return (
    allData?.length > 0 && (
      <>
        <div style={{ marginBottom: '3rem' }}>
          <PerformanceChart
            managerIds={idList}
            totalAmount={totalAmount}
            totalCount={countTotal}
          />
        </div>
        {allData?.map((item, index) => (
          <ListBox key={index}>
            <div style={{ marginBottom: '1.5rem' }}>
              <PerformanceTotal
                ranking={index}
                managerId={item.processingManagerId}
                totalAmount={item.totalActualAmount}
                totalCount={item.totalCount}
              />
            </div>
            <PerformanceBox managerData={item} />
          </ListBox>
        ))}
      </>
    )
  )
}