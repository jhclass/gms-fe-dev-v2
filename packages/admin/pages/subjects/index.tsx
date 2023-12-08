import MainWrap from '@/components/wrappers/MainWrap'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import SubjectTable from '@/components/table/Subject'
import { styled } from 'styled-components'

const ConBox = styled.div`
  margin: 2rem 0;
`

export default function Subjects() {
  const [filterActive, setFilterActive] = useState(false)

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          onBtn={false}
        />
        <ConBox>
          <SubjectTable />
        </ConBox>
      </MainWrap>
    </>
  )
}
