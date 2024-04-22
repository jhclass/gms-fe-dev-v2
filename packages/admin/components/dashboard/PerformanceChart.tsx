import { styled } from 'styled-components'
import { Suspense } from 'react'
import PerformanceChartCon from '@/components/dashboard/PerformanceChartCon'

const LodingDiv = styled.div`
  /* padding: 1.5rem;
  width: 100%;
  min-width: 20rem;
  position: relative;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  width: 500px;
  height: 500px;
  background: red;
`

export default function PerformanceChart({
  managerIds,
  totalAmount,
  totalCount,
  totalRefundAmount,
}) {
  return (
    <Suspense
      fallback={
        <LodingDiv>
          <i className="xi-spinner-2" />
        </LodingDiv>
      }
    >
      <PerformanceChartCon
        managerIds={managerIds}
        totalAmount={totalAmount}
        totalCount={totalCount}
        totalRefundAmount={totalRefundAmount}
      />
    </Suspense>
  )
}
