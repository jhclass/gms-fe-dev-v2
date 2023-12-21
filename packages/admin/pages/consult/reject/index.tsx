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
  const [checkItem, setCheckItem] = useState([])

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          rightArea={true}
          checkItem={checkItem}
        />
        <ConBox>
          <ConsultationReject
            checkItem={checkItem}
            setCheckItem={setCheckItem}
          />
        </ConBox>
      </MainWrap>
    </>
  )
}
