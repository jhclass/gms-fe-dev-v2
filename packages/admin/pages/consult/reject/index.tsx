import MainWrap from '@/components/wrappers/MainWrap'
import ConsultationReject from '@/components/table/ConsultationReject'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'

const ConBox = styled.div`
  margin: 2rem 0;
`

export default function Consult() {
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
          <ConsultationReject />
        </ConBox>
      </MainWrap>
    </>
  )
}
