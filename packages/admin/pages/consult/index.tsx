import MainWrap from '@/components/wrappers/MainWrap'
import ConsultationTable from '@/components/table/Consultation'
import ConsultationFilter from '@/components/table/ConsultationFilter'
import { Suspense } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import ConsultFilter from '@/components/filter/ConsultFilter'
import { styled } from 'styled-components'
import { useRecoilState } from 'recoil'
import {
  consultFilterActiveState,
  consultFilterState,
  consultSearchState,
} from '@/lib/recoilAtoms'
import { useRouter } from 'next/router'
import Layout from '@/pages/consult/layout'

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
  const router = useRouter()
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
          <ConsultFilter
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
              <ConsultationFilter studentFilter={studentFilter} />
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
