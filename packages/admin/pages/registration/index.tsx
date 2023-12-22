import MainWrap from '@/components/wrappers/MainWrap'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from './layout'

export default function Registration() {
  const [filterActive, setFilterActive] = useState(false)

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          rightArea={false}
        />
        <p>개발자만</p>
      </MainWrap>
    </>
  )
}
Registration.getLayout = page => <Layout>{page}</Layout>
