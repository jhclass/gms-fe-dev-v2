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

export default function AttendanceTabs({ lectureId, students }) {
  const completion = useRecoilValue(completionStatus)
  const { useMme } = useMmeQuery()
  const mId = useMme('mUserId')
  const [selected, setSelected] = useState('eduInfo')
  const dropOutStudents = students?.filter(
    student => student.courseComplete === completion.dropout,
  )

  console.log(dropOutStudents)

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
          <DropOutList students={dropOutStudents} />
        </Tab>
        <Tab key="career" title="중도탈락 사전점검"></Tab>
        <Tab key="certificate" title="자격취득현황"></Tab>
        <Tab key="employmentState" title="취업현황"></Tab>
        <Tab key="wishEmployment" title="정기평가 내용설정"></Tab>
      </Tabs>
    </>
  )
}
