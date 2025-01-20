import MainWrap from '@/components/wrappers/MainWrap'
import { Suspense } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import WorkboardFilter from '@/components/filter/WorkboardFilter'
import { useRecoilState } from 'recoil'
import {
  workboardFilterActiveState,
  workboardFilterState,
  workboardSearchState,
} from '@/lib/recoilAtoms'
import Layout from '@/pages/subjects/layout'
import WorkboardTable from '@/components/table/WorkboardTable'
import WorkboardFilterTable from '@/components/table/WorkboardFilterTable'

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

export default function Workboard() {
  const [filterActive, setFilterActive] = useRecoilState(
    workboardFilterActiveState,
  )
  const [filterSearch, setFilterSearch] = useRecoilState(workboardFilterState)
  const [workboardFilter, setWorkboardFilter] =
    useRecoilState(workboardSearchState)
  console.log('filterSearchState', filterActive)
  console.log('workboardfilter', JSON.stringify(workboardFilter))
  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          rightArea={true}
          isFilter={true}
          write={{
            permissionName: null,
            link: '/workboard/write',
          }}
          addRender={''}
        />
        <WorkboardFilter
          isActive={filterActive}
          onFilterSearch={setFilterSearch}
          setWorkboardFilter={setWorkboardFilter}
          workboardFilter={workboardFilter}
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
              <WorkboardFilterTable workboardFilter={workboardFilter} />
            ) : (
              <WorkboardTable />
            )}
          </Suspense>
        </ConBox>
      </MainWrap>
    </>
  )
}
Workboard.getLayout = page => <Layout>{page}</Layout>
