import MainWrap from '@/components/wrappers/MainWrap'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import SubjectTable from '@/components/table/Subject'
import { styled } from 'styled-components'
import SubjectsFilter from '@/components/filter/SubjectsFilter'
import { studentFilterState } from '@/lib/recoilAtoms'
import { useRecoilValue } from 'recoil'

const ConBox = styled.div`
  margin: 2rem 0;
`

export default function Subjects() {
  const [filterActive, setFilterActive] = useState(false)
  const [filterSearch, setFilterSearch] = useState(false)
  const studentFilter = useRecoilValue(studentFilterState)

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          rightArea={true}
        />
        <SubjectsFilter
          isActive={filterActive}
          onFilterToggle={setFilterActive}
          onFilterSearch={setFilterSearch}
        />
        <ConBox>
          <SubjectTable />
        </ConBox>
      </MainWrap>
    </>
  )
}
