import MainWrap from '@/components/wrappers/MainWrap'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/pages/accounting/layout'
import { styled } from 'styled-components'
import ReqRefundTable from '@/components/table/ReqRefundList'

const ConBox = styled.div`
  margin: 2rem 0;
`

export default function RequestRefund() {
  const [filterActive, setFilterActive] = useState(false)

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          rightArea={false}
        />
        <ConBox>
          <ReqRefundTable />
        </ConBox>
      </MainWrap>
    </>
  )
}
RequestRefund.getLayout = page => <Layout>{page}</Layout>
