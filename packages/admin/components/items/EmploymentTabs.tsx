import { Tab, Tabs } from '@nextui-org/react'
import { styled } from 'styled-components'
import { useState } from 'react'
import EmploymentMemo from '@/components/form/EmploymentMemo'
import CreateEmploymentMemo from '@/components/form/CreateEmploymentMemo'
import WishForm from '@/components/form/WishForm'
import Recommendation from '@/components/table/Recommendation'
import EmploymentForm from '@/components/form/EmploymentForm'

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
  margin-bottom: 0.5rem;

  h4 {
    font-size: 1.2rem;
    font-weight: 600;
  }
`

export default function EmploymentTabs({ paymentId, subjectId }) {
  const [selected, setSelected] = useState('consultation')

  return (
    <>
      <Tabs
        variant="underlined"
        aria-label="Options"
        color="primary"
        classNames={{
          tabList: 'flex-wrap',
          tab: 'w-auto',
          panel: 'flex flex-col gap-[2rem]',
        }}
        className="mt-[2rem]"
        selectedKey={selected}
        onSelectionChange={e => setSelected(String(e))}
      >
        <Tab key="consultation" title="상담현황">
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>상담작성</h4>
              </AreaTitle>
              <CreateEmploymentMemo
                paymentId={paymentId}
                subjectId={subjectId}
              />
            </DetailDiv>
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>상담리스트</h4>
              </AreaTitle>
              <EmploymentMemo />
            </DetailDiv>
          </DetailBox>
        </Tab>
        <Tab key="employment" title="취업관리">
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>취업희망현황</h4>
              </AreaTitle>
              <WishForm paymentId={paymentId} subjectId={subjectId} />
            </DetailDiv>
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>취업 추천 현황</h4>
              </AreaTitle>
              <Recommendation paymentId={paymentId} subjectId={subjectId} />
            </DetailDiv>
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>취업현황</h4>
              </AreaTitle>
              <EmploymentForm />
            </DetailDiv>
          </DetailBox>
        </Tab>
      </Tabs>
    </>
  )
}
