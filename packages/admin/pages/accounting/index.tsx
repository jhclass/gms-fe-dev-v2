import MainWrap from '@/components/wrappers/MainWrap'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/pages/accounting/layout'
import { styled } from 'styled-components'
import PaymentTable from '@/components/table/PaymentList'

const ConBox = styled.div`
  margin: 2rem 0;
`

export default function Accounting() {
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
          <PaymentTable />
        </ConBox>
      </MainWrap>
    </>
  )
}
Accounting.getLayout = page => <Layout>{page}</Layout>
