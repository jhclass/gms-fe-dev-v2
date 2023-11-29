import MainWrap from '@/components/wrappers/MainWrap'
import ConsoultationTable from '@/components/table/Consoultation'
import ConsoultationFilter from '@/components/table/ConsoultationFilter'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import ConsoultFilter from '@/components/common/ConsoultFilter'
import { styled } from 'styled-components'
import { useRecoilValue } from 'recoil'
import { studentFilterState } from '@/lib/recoilAtoms'

const ConBox = styled.div`
  margin: 2rem 0;
`

export default function Consoultation() {
  const [filterActive, setFilterActive] = useState(false)
  const studentFilter = useRecoilValue(studentFilterState)

  return (
    <>
      <MainWrap>
        <Breadcrumb onFilterToggle={setFilterActive} isActive={filterActive} />
        <ConsoultFilter
          isActive={filterActive}
          onFilterToggle={setFilterActive}
        />
        <ConBox>
          {studentFilter !== null ? (
            <ConsoultationFilter />
          ) : (
            <ConsoultationTable />
          )}
        </ConBox>
      </MainWrap>
    </>
  )
}
