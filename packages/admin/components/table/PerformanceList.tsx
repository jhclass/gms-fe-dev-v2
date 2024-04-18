import { useMutation } from '@apollo/client'
import { Suspense, useEffect, useState } from 'react'
import { styled } from 'styled-components'
import PerformanceBox from './PerformanceBox'
import { SALES_STATISTICS_MUTATION } from '@/graphql/mutations'
import PerformanceTotal from '@/components/table/PerformanceTotal'
import PerformanceChart from '@/components/dashboard/PerformanceChart'

const ListBox = styled.div`
  margin-top: 2rem;
  background: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
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
const AreaBox = styled.div`
  flex: 1;
  width: 100%;
`
const AreaBoxS = styled.div`
  min-width: 5%;
  text-align: center;
  @media (max-width: 768px) {
    min-width: 100%;
    text-align: left;
  }
`
const FlexBox = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #11181c;
  display: block;
  padding-bottom: 0.375rem;
  span {
    color: red;
  }
`

export default function PerformanceList({ ids, dateRange }) {
  const [salesStatistics] = useMutation(SALES_STATISTICS_MUTATION)
  const [allData, setAllData] = useState([])
  const [totalAmount, setTotalAmount] = useState([])
  const [countTotal, setCountTotal] = useState([])
  const [idList, setIdList] = useState([])

  useEffect(() => {
    salesStatistics({
      variables: {
        period: dateRange,
        processingManagerId: ids,
      },
      onCompleted: result => {
        if (result.salesStatistics.ok) {
          setAllData(result.salesStatistics.data)
          const managerId = result.salesStatistics.data?.map(
            item => item.processingManagerId,
          )
          const totalAmount = result.salesStatistics.data?.map(
            item => item.totalActualAmount,
          )
          const totalCount = result.salesStatistics.data?.map(
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
    <>
      <div style={{ marginBottom: '3rem' }}>
        <PerformanceChart
          managerIds={idList}
          totalAmount={totalAmount}
          totalCount={countTotal}
        />
      </div>
      <ListBox>
        <FlexBox>
          <AreaBoxS>
            <FilterLabel>순위</FilterLabel>
          </AreaBoxS>
          <AreaBox>
            <FilterLabel>이름</FilterLabel>
          </AreaBox>
          <AreaBox>
            <FilterLabel>총 결제 건수</FilterLabel>
          </AreaBox>
          <AreaBox>
            <FilterLabel>총 매출액</FilterLabel>
          </AreaBox>
          <AreaBox>
            <FilterLabel>총 환불액</FilterLabel>
          </AreaBox>
        </FlexBox>
        {allData?.map((item, index) => (
          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <PerformanceTotal
              key={index}
              ranking={index}
              managerId={item.processingManagerId}
              totalAmount={item.totalActualAmount}
              totalCount={item.totalCount}
            />
          </Suspense>
        ))}
      </ListBox>
      <ListBox>
        <PerformanceBox
          managerData={undefined}
          dateRange={undefined}
          totalCount={undefined}
        />
      </ListBox>
    </>
  )
}
