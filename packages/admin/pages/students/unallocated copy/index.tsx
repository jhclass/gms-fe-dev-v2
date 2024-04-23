import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/pages/students/unallocated/layout'
import StudentsTable from '@/components/table/StudentsList'
import StudentsFilterTable from '@/components/table/StudentsListFilter'
import { styled } from 'styled-components'
import StudentsFilter from '@/components/filter/StudentsFilter'
import { useRecoilState } from 'recoil'
import {
  studentFilterActiveState,
  studentFilterState,
  studentSearchState,
} from '@/lib/recoilAtoms'
import { Suspense, useState } from 'react'
import UnallocatedList from '@/components/table/UnallocatedList'
import UnallocatedFilter from '@/components/filter/UnallocatedFilter'

const ConBox = styled.div`
  margin: 2rem 0;
  z-index: 0;
  position: relative;
`
const LodingDiv = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-width: 20rem;
  position: relative;
  background: none;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export default function Students() {
  const [filterActive, setFilterActive] = useState()
  const [filterSearch, setFilterSearch] = useState()
  const [studentFilter, setStudentFilter] = useState()

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          rightArea={true}
        />
        <UnallocatedFilter
          isActive={filterActive}
          // onFilterSearch={setFilterSearch}
          // setStudentFilter={setStudentFilter}
          // studentFilter={studentFilter}
        />
        <ConBox>
          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            {filterSearch ? (
              <StudentsFilterTable studentFilter={studentFilter} />
            ) : (
              <UnallocatedList />
            )}
          </Suspense>
        </ConBox>
      </MainWrap>
    </>
  )
}
Students.getLayout = page => <Layout>{page}</Layout>
