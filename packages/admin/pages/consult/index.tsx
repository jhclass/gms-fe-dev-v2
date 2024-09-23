import MainWrap from '@/components/wrappers/MainWrap'
import { Suspense } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { useRecoilState } from 'recoil'
import {
  consultFilterActiveState,
  consultFilterState,
  consultSearchState,
} from '@/lib/recoilAtoms'
import Layout from '@/pages/consult/layout'
import ConsultationTable from '@/components/table/ConsultationTable'
import ConsultationFilterTable from '@/components/table/ConsultationFilterTable'
import ConsultationFilter from '@/components/filter/ConsultationFilter'

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

export default function Consult() {
  const [filterActive, setFilterActive] = useRecoilState(
    consultFilterActiveState,
  )
  const [filterSearch, setFilterSearch] = useRecoilState(consultFilterState)
  const [studentFilter, setStudentFilter] = useRecoilState(consultSearchState)

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          rightArea={true}
          isFilter={true}
          write={{
            isWrite: true,
            permissionName: null,
          }}
          typeBtn={{
            typeLink: 'adviceType',
            permissionName: '상담분야',
          }}
          addRender={''}
        />
        <Suspense
          fallback={
            <LodingDiv>
              <i className="xi-spinner-2" />
            </LodingDiv>
          }
        >
          <ConsultationFilter
            isActive={filterActive}
            studentFilter={studentFilter}
            onFilterSearch={setFilterSearch}
            setStudentFilter={setStudentFilter}
          />
        </Suspense>
        <ConBox>
          {filterSearch ? (
            <Suspense
              fallback={
                <LodingDiv>
                  <i className="xi-spinner-2" />
                </LodingDiv>
              }
            >
              <ConsultationFilterTable studentFilter={studentFilter} />
            </Suspense>
          ) : (
            <Suspense
              fallback={
                <LodingDiv>
                  <i className="xi-spinner-2" />
                </LodingDiv>
              }
            >
              <ConsultationTable />
            </Suspense>
          )}
        </ConBox>
      </MainWrap>
    </>
  )
}
Consult.getLayout = page => <Layout>{page}</Layout>
