import EducationalHistoryForm from '@/components/form/EducationalHistoryForm'
import EducationalHistoryList from '@/components/form/EducationalHistoryList'
import { Suspense } from 'react'
import { styled } from 'styled-components'

const LodingDiv = styled.div`
  width: 2.2rem;
  height: 2.2rem;
  padding: 0.3rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function EducationalHistory({ paymentId, subjectId }) {
  return (
    <>
      <EducationalHistoryForm paymentId={paymentId} subjectId={subjectId} />
      <Suspense
        fallback={
          <LodingDiv>
            <i className="xi-spinner-2" />
          </LodingDiv>
        }
      >
        <EducationalHistoryList paymentId={paymentId} />
      </Suspense>
    </>
  )
}
