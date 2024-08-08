import { Tab, Tabs } from '@nextui-org/react'
import { styled } from 'styled-components'
import { Suspense, useState } from 'react'
import useMmeQuery from '@/utils/mMe'
import Recommendation from '@/components/table/Recommendation'
import EmploymentForm from '@/components/form/EmploymentForm'
import EducationalHistory from '@/components/layout/EducationalHistory'
import CareerHistory from '@/components/layout/CareerHistory'
import Certificate from '@/components/layout/Certificate'
import EmploymentMemo from '@/components/layout/EmploymentMemo'
import WishEmployment from '@/components/layout/WishEmployment'

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

export default function EmploymentTabs({ paymentId, subjectId }) {
  const { useMme } = useMmeQuery()
  const mId = useMme('mUserId')
  const [selected, setSelected] = useState('eduInfo')

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
        <Tab key="eduInfo" title="학력사항">
          <EducationalHistory
            paymentId={paymentId}
            subjectId={subjectId}
            mId={mId}
          />
        </Tab>
        <Tab key="career" title="경력사항">
          <CareerHistory
            paymentId={paymentId}
            subjectId={subjectId}
            mId={mId}
          />
        </Tab>
        <Tab key="certificate" title="자격취득현황">
          <Certificate paymentId={paymentId} subjectId={subjectId} mId={mId} />
        </Tab>
        <Tab key="consultation" title="상담현황">
          <EmploymentMemo
            paymentId={paymentId}
            subjectId={subjectId}
            mId={mId}
          />
        </Tab>
        <Tab key="wishEmployment" title="취업희망현황">
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>취업 희망 현황</h4>
              </AreaTitle>
              <Suspense
                fallback={
                  <LodingDiv>
                    <i className="xi-spinner-2" />
                  </LodingDiv>
                }
              >
                <WishEmployment
                  paymentId={paymentId}
                  subjectId={subjectId}
                  mId={mId}
                />
              </Suspense>
            </DetailDiv>
          </DetailBox>
        </Tab>
        <Tab key="recoEmployment" title="취업추천현황">
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>취업 추천 현황</h4>
              </AreaTitle>
              <Recommendation paymentId={paymentId} subjectId={subjectId} />
            </DetailDiv>
          </DetailBox>
        </Tab>
        <Tab key="employmentState" title="취업현황">
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
