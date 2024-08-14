import { Tab, Tabs } from '@nextui-org/react'
import { styled } from 'styled-components'
import { Suspense, useState } from 'react'
import useMmeQuery from '@/utils/mMe'
import EducationalHistory from '@/components/layout/EducationalHistory'
import CareerHistory from '@/components/layout/CareerHistory'
import Certificate from '@/components/layout/Certificate'
import EmploymentMemo from '@/components/layout/EmploymentMemo'
import WishEmployment from '@/components/layout/WishEmployment'
import RecoEmployment from '@/components/layout/RecoEmployment'
import Employment from '@/components/layout/Employment'
import { useRecoilValue } from 'recoil'
import { completionStatus } from '@/lib/recoilAtoms'
import DropOutList from '../form/DropOutList'
import CertificateNameList from '../form/CertificateNameList'
import EmploymentNameList from '../form/EmploymentNameList'
import DropOutMemo from '../layout/DropOutMemo'

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

export default function AttendanceTabs({ lectureId, students, subjectId }) {
  const completion = useRecoilValue(completionStatus)
  const { useMme } = useMmeQuery()
  const mId = useMme('mUserId')
  const [selected, setSelected] = useState('eduInfo')
  const dropOutStudents = students?.filter(
    student => student.courseComplete === completion.dropout,
  )

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
        <Tab key="eduInfo" title="중도탈락현황">
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>중도 탈락 현황</h4>
              </AreaTitle>
              <DropOutList students={dropOutStudents} />
            </DetailDiv>
          </DetailBox>
        </Tab>
        <Tab key="career" title="중도탈락 사전점검">
          <DropOutMemo
            lectureId={lectureId}
            subjectId={subjectId}
            students={students}
          />
        </Tab>
        <Tab key="certificate" title="자격취득현황">
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>자격 취득 현황</h4>
              </AreaTitle>
              <Suspense
                fallback={
                  <LodingDiv>
                    <i className="xi-spinner-2" />
                  </LodingDiv>
                }
              >
                <CertificateNameList lectureId={lectureId} />
              </Suspense>
            </DetailDiv>
          </DetailBox>
        </Tab>
        <Tab key="employmentState" title="취업현황">
          <DetailBox>
            <DetailDiv>
              <AreaTitle>
                <h4>취업 현황</h4>
              </AreaTitle>
              <Suspense
                fallback={
                  <LodingDiv>
                    <i className="xi-spinner-2" />
                  </LodingDiv>
                }
              >
                <EmploymentNameList lectureId={lectureId} />
              </Suspense>
            </DetailDiv>
          </DetailBox>
        </Tab>
        <Tab key="wishEmployment" title="정기평가 내용설정"></Tab>
      </Tabs>
    </>
  )
}
