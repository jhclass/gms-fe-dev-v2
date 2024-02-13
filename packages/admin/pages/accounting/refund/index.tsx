import MainWrap from '@/components/wrappers/MainWrap'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/pages/accounting/layout'
import { styled } from 'styled-components'
import RefundTable from '@/components/table/RefundList'
import RefundFilter from '@/components/filter/RefundFilter'
import { useRecoilState } from 'recoil'
import {
  refundFilterActiveState,
  refundFilterState,
  refundSearchState,
} from '@/lib/recoilAtoms'
import RefundFilterTable from '@/components/table/RefundFilterList'

const ConBox = styled.div`
  margin: 2rem 0;
`

export default function Refund() {
  const [filterActive, setFilterActive] = useRecoilState(
    refundFilterActiveState,
  )
  const [filterSearch, setFilterSearch] = useRecoilState(refundFilterState)
  const [studentFilter, setStudentFilter] = useRecoilState(refundSearchState)

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          rightArea={true}
        />
        <RefundFilter
          isActive={filterActive}
          onFilterSearch={setFilterSearch}
          setStudentFilter={setStudentFilter}
        />
        <ConBox>
          {filterSearch ? (
            <RefundFilterTable
              onFilterSearch={setFilterSearch}
              studentFilter={studentFilter}
              setStudentFilter={setStudentFilter}
            />
          ) : (
            <RefundTable />
          )}
        </ConBox>
      </MainWrap>
    </>
  )
}
Refund.getLayout = page => <Layout>{page}</Layout>