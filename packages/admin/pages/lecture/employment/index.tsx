import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import Layout from '@/pages/lecture/layout'
import { Suspense, useState } from 'react'
import EmploymentStateFilter from '@/components/filter/EmploymentStateFilter'
import EmploymentListFilter from '@/components/table/EmploymentListFilter'
import EmploymentList from '@/components/table/EmploymentList'

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
export default function Employment() {
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
        <Suspense
          fallback={
            <LodingDiv>
              <i className="xi-spinner-2" />
            </LodingDiv>
          }
        >
          <EmploymentStateFilter
            isActive={filterActive}
            onFilterSearch={setFilterSearch}
            setStudentFilter={setStudentFilter}
          />
        </Suspense>
        <ConBox>
          {filterSearch ? (
            <EmploymentListFilter studentFilter={studentFilter} />
          ) : (
            <EmploymentList />
          )}
        </ConBox>
      </MainWrap>
    </>
  )
}
Employment.getLayout = page => <Layout>{page}</Layout>
