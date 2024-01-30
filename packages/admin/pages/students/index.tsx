import MainWrap from '@/components/wrappers/MainWrap'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/pages/students/layout'
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

const ConBox = styled.div`
  margin: 2rem 0;
  z-index: 0;
  position: relative;
`
export default function Students() {
  const [filterActive, setFilterActive] = useRecoilState(
    studentFilterActiveState,
  )
  const [filterSearch, setFilterSearch] = useRecoilState(studentFilterState)
  const [studentFilter, setStudentFilter] = useRecoilState(studentSearchState)

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          rightArea={true}
        />
        <StudentsFilter
          isActive={filterActive}
          onFilterSearch={setFilterSearch}
          setStudentFilter={setStudentFilter}
        />
        <ConBox>
          {filterSearch ? (
            <StudentsFilterTable
              onFilterSearch={setFilterSearch}
              studentFilter={studentFilter}
              setStudentFilter={setStudentFilter}
            />
          ) : (
            <StudentsTable />
          )}
        </ConBox>
      </MainWrap>
    </>
  )
}
Students.getLayout = page => <Layout>{page}</Layout>
