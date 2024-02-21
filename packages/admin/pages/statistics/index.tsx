import MainWrap from '@/components/wrappers/MainWrap'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import SubjectTable from '@/components/table/SubjectList'
import { styled } from 'styled-components'
import SubjectsFilter from '@/components/filter/SubjectsFilter'
import SubjectFilter from '@/components/table/SubjectFilterTable'
import CreateAdviceType from '@/components/form/CreateAdviceType'
import { motion } from 'framer-motion'
import { Button } from '@nextui-org/react'
import useMmeQuery from '@/utils/mMe'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  gradeState,
  subjectFilterActiveState,
  subjectFilterState,
  subjectSearchState,
} from '@/lib/recoilAtoms'
import Layout from '@/pages/statistics/layout'
import PerformanceFilter from '@/components/filter/PerformanceFilter'

const ConBox = styled.div`
  margin: 2rem 0;
  z-index: 0;
  position: relative;
`
const ActiveIcon = styled(motion.i)`
  color: #fff;
`

const IconVariants = {
  initial: {
    scale: 0,
    display: 'none',
  },
  active: {
    scale: 1,
    display: 'inline',
  },
}

export default function Statistics() {
  const grade = useRecoilValue(gradeState)
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const [filterActive, setFilterActive] = useRecoilState(
    subjectFilterActiveState,
  )
  const [filterSearch, setFilterSearch] = useRecoilState(subjectFilterState)
  const [performanceFilter, setPerformanceFilter] =
    useRecoilState(subjectSearchState)

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          rightArea={true}
        />
        <PerformanceFilter
          isActive={filterActive}
          onFilterSearch={setFilterSearch}
          setPerformanceFilter={setPerformanceFilter}
        />
        <ConBox>
          <SubjectTable />
        </ConBox>
      </MainWrap>
    </>
  )
}
Statistics.getLayout = page => <Layout>{page}</Layout>
