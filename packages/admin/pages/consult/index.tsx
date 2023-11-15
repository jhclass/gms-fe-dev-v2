import Layout from '@/components/wrappers/MainWrap'
import ConsolutationTable from '@/components/table/Consoultation'
import { motion } from 'framer-motion'
import styled from 'styled-components'

export default function Home() {
  return (
    <>
      <Layout>
        <ConsolutationTable />
      </Layout>
    </>
  )
}
