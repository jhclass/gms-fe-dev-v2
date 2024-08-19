import styled from 'styled-components'
import { Suspense, useState } from 'react'
import EmploymentMemoList from '@/components/form/EmploymentMemoList'
import EmploymentMemoForm from '@/components/form/EmploymentMemoForm'
import DropOutMemoForm from '../form/DropOutMemoForm'
import DropOutMemoList from '../form/DropOutMemoList'
import useMmeQuery from '@/utils/mMe'
import ReaularEvaluationForm from '../form/ReaularEvaluationForm'
import ReaularEvaluationList from '../form/ReaularEvaluationList'

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

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
const Noti = styled.p`
  font-size: 0.75rem;

  span {
    color: red;
  }

  @media (max-width: 480px) {
    width: 100%;
    text-align: right;
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

export default function RegularEvaluation({ lectureId, subjectId }) {
  const [isCreate, setIsCreate] = useState(false)
  const { useMme } = useMmeQuery()
  const mId = useMme('mUserId')
  return (
    <>
      <DetailBox>
        <DetailDiv>
          <AreaTitle>
            <h4>정기평가 내용설정</h4>
            <Noti>
              <span>*</span> 는 필수입력입니다.
            </Noti>
          </AreaTitle>
          <ReaularEvaluationForm
            setIsCreate={setIsCreate}
            subjectId={subjectId}
          />
        </DetailDiv>
      </DetailBox>
      <DetailBox>
        <DetailDiv>
          <AreaTitle>
            <h4>정기평가 내용설정 리스트</h4>
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
            <ReaularEvaluationList
              isCreate={isCreate}
              setIsCreate={setIsCreate}
              lectureId={lectureId}
              subjectId={subjectId}
              mId={mId}
            />
          </Suspense>
        </DetailDiv>
      </DetailBox>
    </>
  )
}
