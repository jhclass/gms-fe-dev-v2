import MainWrap from '@/components/wrappers/MainWrap'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'

export default function Registration() {
  const [filterActive, setFilterActive] = useState(false)

  return (
    <>
      <MainWrap>
        <Breadcrumb onFilterToggle={setFilterActive} isActive={filterActive} />
      </MainWrap>
    </>
  )
}
