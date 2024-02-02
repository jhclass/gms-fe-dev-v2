import MainWrap from '@/components/wrappers/MainWrap'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/pages/accounting/layout'
import { styled } from 'styled-components'
import PaymentTable from '@/components/table/PaymentList'
import PaymentFilter from '@/components/filter/PaymentFilter'
import { useRecoilState } from 'recoil'
import {
  paymentFilterActiveState,
  paymentFilterState,
  paymentSearchState,
} from '@/lib/recoilAtoms'
import PaymentFilterTable from '@/components/table/PaymentListFilter'

const ConBox = styled.div`
  margin: 2rem 0;
`

export default function Accounting() {
  const [filterActive, setFilterActive] = useRecoilState(
    paymentFilterActiveState,
  )
  const [filterSearch, setFilterSearch] = useRecoilState(paymentFilterState)
  const [studentFilter, setStudentFilter] = useRecoilState(paymentSearchState)

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          rightArea={true}
        />
        <PaymentFilter
          isActive={filterActive}
          onFilterSearch={setFilterSearch}
          setStudentFilter={setStudentFilter}
        />
        <ConBox>
          {filterSearch ? (
            <PaymentFilterTable
              onFilterSearch={setFilterSearch}
              studentFilter={studentFilter}
              setStudentFilter={setStudentFilter}
            />
          ) : (
            <PaymentTable />
          )}
        </ConBox>
      </MainWrap>
    </>
  )
}
Accounting.getLayout = page => <Layout>{page}</Layout>
