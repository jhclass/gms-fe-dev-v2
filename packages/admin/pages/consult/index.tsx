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
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)
  const [filterActive, setFilterActive] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth <= 768
      setIsSmallScreen(isSmall)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <MainWrap>
        <Breadcrumb onFilterToggle={setFilterActive} isActive={filterActive} />
        <ConsoultFilter isActive={filterActive} />
        <ConBox>
          {isSmallScreen ? <ConsolutationTableMo /> : <ConsolutationTable />}
        </ConBox>
      </MainWrap>
    </>
  )
}
