import MainWrap from '@/components/wrappers/MainWrap'
import ConsultationTable from '@/components/table/Consultation'
import ConsultationFilter from '@/components/table/ConsultationFilter'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import ConsultFilter from '@/components/filter/ConsultFilter'
import { styled } from 'styled-components'

const ConBox = styled.div`
  margin: 2rem 0;
`

export default function Consult() {
  const [filterActive, setFilterActive] = useState(false)
  const [filterSearch, setFilterSearch] = useState(false)
  const [studentFilter, setStudentFilter] = useState()

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          rightArea={true}
        />
        <ConsultFilter
          isActive={filterActive}
          onFilterToggle={setFilterActive}
          onFilterSearch={setFilterSearch}
          setStudentFilter={setStudentFilter}
        />
        <ConBox>
          {filterSearch ? (
            <ConsultationFilter
              onFilterSearch={setFilterSearch}
              studentFilter={studentFilter}
              setStudentFilter={setStudentFilter}
            />
          ) : (
            <ConsultationTable />
          )}
        </ConBox>
      </MainWrap>
    </>
  )
}
