import styled from 'styled-components'
import { Suspense } from 'react'
import TabFormTopInfo from '@/components/common/TabFormTopInfo'
import WishEmploymentList from '@/components/list/WishEmploymentList'

const DetailBox = styled.div`
  background: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
`
const DetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media (max-width: 768px) {
    gap: 1rem;
  }
`
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

export default function WishEmployment({ paymentId, subjectId }) {
  return (
    <>
      <DetailBox>
        <DetailDiv>
          <TabFormTopInfo title={'취업 희망 현황'} noti={true} />
          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <WishEmploymentList paymentId={paymentId} subjectId={subjectId} />
          </Suspense>
        </DetailDiv>
      </DetailBox>
    </>
  )
}
