import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import StudentsFilterTable from '@/components/table/StudentsListFilter'
import { styled } from 'styled-components'
import { Suspense, useState } from 'react'
import Layout from '@/pages/students/nonassigned/layout'
import NonassignedFilter from '@/components/filter/NonassignedFilter'
import NonassignedList from '@/components/table/NonassignedList'
import NonassignedListFilter from '@/components/table/NonassignedListFilter'

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
export default function Nonassigned() {
  const [filterActive, setFilterActive] = useState(false)
  const [filterSearch, setFilterSearch] = useState(false)
  const [studentFilter, setStudentFilter] = useState(null)

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          isFilter={true}
          isWrite={false}
          rightArea={true}
        />
        <NonassignedFilter
          isActive={filterActive}
          onFilterSearch={setFilterSearch}
          setStudentFilter={setStudentFilter}
          studentFilter={studentFilter}
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
              <NonassignedListFilter studentFilter={studentFilter} />
            ) : (
              <NonassignedList />
            )}
          </Suspense>
        </ConBox>
      </MainWrap>
    </>
  )
}
Nonassigned.getLayout = page => <Layout>{page}</Layout>
