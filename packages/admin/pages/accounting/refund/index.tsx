import MainWrap from '@/components/wrappers/MainWrap'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/pages/accounting/layout'
import { styled } from 'styled-components'
import RefundTable from '@/components/table/RefundList'

const ConBox = styled.div`
  margin: 2rem 0;
`

export default function Refund() {
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
          <RefundTable />
        </ConBox>
      </MainWrap>
    </>
  )
}
Refund.getLayout = page => <Layout>{page}</Layout>
