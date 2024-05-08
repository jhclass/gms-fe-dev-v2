import MainWrap from '@/components/wrappers/MainWrap'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/pages/accounting/layout'
import { styled } from 'styled-components'
import SalesListTable from '@/components/table/SalesList'
import SalesFilter from '@/components/filter/SalesFilter'

const ConBox = styled.div`
  margin: 2rem 0;
`

export default function Sales() {
  const [filterActive, setFilterActive] = useState(true)
  const [filterSearch, setFilterSearch] = useState(false)
  const [salesFilter, setSalesFilter] = useState([])
  const [days, setDays] = useState(0)
  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          isFilter={false}
          isWrite={false}
          rightArea={false}
        />
        <SalesFilter
          isActive={filterActive}
          onFilterSearch={setFilterSearch}
          setSalesFilter={setSalesFilter}
          setDays={setDays}
        />
        <ConBox>
          <SalesListTable salesFilter={salesFilter} days={days} />
        </ConBox>
      </MainWrap>
    </>
  )
}
Sales.getLayout = page => <Layout>{page}</Layout>
