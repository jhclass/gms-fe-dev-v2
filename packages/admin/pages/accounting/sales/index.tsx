import MainWrap from '@/components/wrappers/MainWrap'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/pages/accounting/layout'
import { styled } from 'styled-components'
import SalesListTable from '@/components/table/SalesList'
import SalesFilter from '@/components/filter/SalesFilter'
import { useRecoilState } from 'recoil'
import {
  salesFilterActiveState,
  salesFilterState,
  salesSearchState,
} from '@/lib/recoilAtoms'

const ConBox = styled.div`
  margin: 2rem 0;
`

export default function Sales() {
  const [filterActive, setFilterActive] = useRecoilState(salesFilterActiveState)
  const [filterSearch, setFilterSearch] = useRecoilState(salesFilterState)
  const [studentFilter, setStudentFilter] = useRecoilState(salesSearchState)
  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          rightArea={false}
        />
        <SalesFilter
          isActive={filterActive}
          onFilterSearch={setFilterSearch}
          setStudentFilter={setStudentFilter}
        />
        <ConBox>
          <SalesListTable />
        </ConBox>
      </MainWrap>
    </>
  )
}
Sales.getLayout = page => <Layout>{page}</Layout>
