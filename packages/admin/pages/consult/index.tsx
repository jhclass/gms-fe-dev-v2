import MainWrap from '@/components/wrappers/MainWrap'
import ConsolutationTable from '@/components/table/Consoultation'
import { useState } from 'react'
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
