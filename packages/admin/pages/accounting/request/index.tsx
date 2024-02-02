import MainWrap from '@/components/wrappers/MainWrap'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/pages/accounting/layout'
import { styled } from 'styled-components'
import ReqRefundTable from '@/components/table/ReqRefundList'
import ReqRefundFilter from '@/components/filter/ReqRefundFilter'
import { useRecoilState } from 'recoil'
import {
  reqRefundFilterActiveState,
  reqRefundFilterState,
  reqRefundSearchState,
} from '@/lib/recoilAtoms'
import ReqRefundFilterTable from '@/components/table/ReqRefundListFilter'

const ConBox = styled.div`
  margin: 2rem 0;
`

export default function RequestRefund() {
  const [filterActive, setFilterActive] = useRecoilState(
    reqRefundFilterActiveState,
  )
  const [filterSearch, setFilterSearch] = useRecoilState(reqRefundFilterState)
  const [studentFilter, setStudentFilter] = useRecoilState(reqRefundSearchState)

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          rightArea={true}
        />
        <ReqRefundFilter
          isActive={filterActive}
          onFilterSearch={setFilterSearch}
          setStudentFilter={setStudentFilter}
        />
        <ConBox>
          {filterSearch ? (
            <ReqRefundFilterTable
              onFilterSearch={setFilterSearch}
              studentFilter={studentFilter}
              setStudentFilter={setStudentFilter}
            />
          ) : (
            <ReqRefundTable />
          )}
        </ConBox>
      </MainWrap>
    </>
  )
}
RequestRefund.getLayout = page => <Layout>{page}</Layout>
