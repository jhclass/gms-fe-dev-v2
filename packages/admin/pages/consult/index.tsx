import MainWrap from '@/components/wrappers/MainWrap'
import ConsolutationTableMo from '@/components/table/ConsoultationMo'
import ConsolutationTable from '@/components/table/Consoultation'
import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import ConsoultFilter from '@/components/common/ConsoultFilter'
import { styled } from 'styled-components'

const ConBox = styled.div`
  margin: 2rem 0;
`

export default function Consoultation() {
  const [filterActive, setFilterActive] = useState(false)

  return (
    <>
      <MainWrap>
        <Breadcrumb onFilterToggle={setFilterActive} isActive={filterActive} />
        <ConsoultFilter isActive={filterActive} />
        <ConBox>
          <ConsolutationTable />
        </ConBox>
      </MainWrap>
    </>
  )
}
