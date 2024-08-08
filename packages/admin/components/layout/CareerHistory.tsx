import styled from 'styled-components'
import { Suspense, useState } from 'react'
import CareerHistoryForm from '@/components/form/CareerHistoryForm'
import CareerHistoryList from '@/components/form/CareerHistoryList'

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
const AreaTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    font-size: 1.2rem;
    font-weight: 600;
  }
`
const Noti = styled.p`
  font-size: 0.75rem;
  span {
    color: red;
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

export default function CareerHistory({ paymentId, subjectId, mId }) {
  const [isCreate, setIsCreate] = useState(false)
  return (
    <>
      <DetailBox>
        <DetailDiv>
          <AreaTitle>
            <h4>경력 사항 작성</h4>
            <Noti>
              <span>*</span> 는 필수입력입니다.
            </Noti>
          </AreaTitle>
          <CareerHistoryForm
            setIsCreate={setIsCreate}
            paymentId={paymentId}
            subjectId={subjectId}
          />
        </DetailDiv>
      </DetailBox>
      <DetailBox>
        <DetailDiv>
          <AreaTitle>
            <h4>경력 사항 리스트</h4>
            <Noti>
              <span>*</span> 는 필수입력입니다.
            </Noti>
          </AreaTitle>
          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <CareerHistoryList
              isCreate={isCreate}
              setIsCreate={setIsCreate}
              paymentId={paymentId}
              mId={mId}
            />
          </Suspense>
        </DetailDiv>
      </DetailBox>
    </>
  )
}
