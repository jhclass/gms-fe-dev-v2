import MainWrap from '@/components/wrappers/MainWrap'
import ConsultationTable from '@/components/table/Consultation'
import ConsultationFilter from '@/components/table/ConsultationFilter'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import ConsultFilter from '@/components/filter/ConsultFilter'
import { styled } from 'styled-components'
import { useRecoilState, useResetRecoilState } from 'recoil'
import {
  consultFilterActiveState,
  consultFilterState,
  consultSearchState,
} from '@/lib/recoilAtoms'
import { useRouter } from 'next/router'
import Layout from './layout'

const ConBox = styled.div`
  margin: 2rem 0;
  z-index: 0;
  position: relative;
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
          rightArea={true}
        />
        <ConsultFilter
          isActive={filterActive}
          studentFilter={studentFilter}
          onFilterSearch={setFilterSearch}
          setStudentFilter={setStudentFilter}
        />
        <ConBox>
          {filterSearch ? (
            <ConsultationFilter
              onFilterSearch={setFilterSearch}
              studentFilter={studentFilter}
              setStudentFilter={setStudentFilter}
            />
          ) : (
            <ConsultationTable />
          )}
        </ConBox>
      </MainWrap>
    </>
  )
}
Consult.getLayout = page => <Layout>{page}</Layout>
