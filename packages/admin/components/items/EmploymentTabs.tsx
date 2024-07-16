import { Tab, Tabs } from '@nextui-org/react'
import { styled } from 'styled-components'
import { useEffect, useState } from 'react'
import useMmeQuery from '@/utils/mMe'
import { useRecoilValue } from 'recoil'
import { gradeState } from '@/lib/recoilAtoms'
import { useRouter } from 'next/router'
import SMSCard from '@/components/items/SMSCard'
import SMSList from '@/components/table/SMSList'
import AropoutStateList from '../table/AropoutStateList'
import EmploymentMemo from '../form/EmploymentMemo'
import CreateEmploymentMemo from '../form/CreateEmploymentMemo'
import EmploymentList from '../table/EmploymentList'
import WishForm from '../form/WishForm'
import RecommendationList from '../table/RecommendationList'

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

export default function EmploymentTabs() {
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
              <CreateEmploymentMemo />
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
              <WishForm />
            </DetailDiv>
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>취업 추천 현황</h4>
              </AreaTitle>
              <RecommendationList />
            </DetailDiv>
          </DetailBox>
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>취업현황</h4>
              </AreaTitle>
              <EmploymentList />
            </DetailDiv>
          </DetailBox>
        </Tab>
      </Tabs>
    </>
  )
}
