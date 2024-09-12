import styled from 'styled-components'
import { Suspense, useState } from 'react'
import DropOutMemoForm from '@/components/form/DropOutMemoForm'
import DropOutMemoList from '@/components/list/DropOutMemoList'
import useMmeQuery from '@/utils/mMe'
import TabFormTopInfo from '@/components/common/TabFormTopInfo'

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

export default function DropOutMemo({ lectureId, subjectId, students }) {
  const [isCreate, setIsCreate] = useState(false)
  const { useMme } = useMmeQuery()
  const mId = useMme('mUserId')

  return (
    <>
      <DetailBox>
        <DetailDiv>
          <TabFormTopInfo title={'중도탈락 사전점검'} noti={true} />
          <DropOutMemoForm
            setIsCreate={setIsCreate}
            subjectId={subjectId}
            students={students}
          />
        </DetailDiv>
      </DetailBox>
      <DetailBox>
        <DetailDiv>
          <TabFormTopInfo title={'중도탈락 사전점검 리스트'} noti={true} />
          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <DropOutMemoList
              isCreate={isCreate}
              setIsCreate={setIsCreate}
              lectureId={lectureId}
              mId={mId}
            />
          </Suspense>
        </DetailDiv>
      </DetailBox>
    </>
  )
}
