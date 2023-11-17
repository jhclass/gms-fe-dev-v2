import Layout from '@/components/wrappers/MainWrap'
import ConsolutationTableMo from '@/components/table/ConsoultationMo'
import ConsolutationTable from '@/components/table/Consoultation'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useEffect, useState } from 'react'

export default function Consoultation() {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)

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
      <Layout>
        {isSmallScreen ? <ConsolutationTableMo /> : <ConsolutationTable />}
      </Layout>
    </>
  )
}
