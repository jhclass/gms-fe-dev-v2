import MainWrap from '@/components/wrappers/MainWrap'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from './layout'
import StudentsTable from '@/components/table/StudentsList'
import { styled } from 'styled-components'

const ConBox = styled.div`
  margin: 2rem 0;
`
export default function Students() {
  const [filterActive, setFilterActive] = useState(false)

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          rightArea={true}
        />
        <ConBox>
          <StudentsTable />
        </ConBox>
      </MainWrap>
    </>
  )
}
Students.getLayout = page => <Layout>{page}</Layout>
