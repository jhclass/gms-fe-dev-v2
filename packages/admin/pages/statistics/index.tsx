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
import PerformanceChart from '@/components/dashboard/PerformanceChart'

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

  const fillArrayWithNull = (dataArray, targetLength) => {
    const nullsToAdd = new Array(
      Math.max(targetLength - dataArray.length, 0),
    ).fill(null)
    return [...dataArray, ...nullsToAdd]
  }
  const originalData = [
    {
      name: ' A',
      sales: [10, 20, 30, 40, 50, 60],
    },
    {
      name: 'B',
      sales: [15, 25, 35, 45, 55, 65],
    },
    {
      name: 'c',
      sales: [25, 55, 65, 15, 6, 65, 39, 100, 420],
    },
  ]
  const tempData = originalData.map(({ name, sales }) => ({
    name: name,
    data: fillArrayWithNull(sales, 24),
  }))

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
          <PerformanceChart
            startDate={new Date('2024-12-23')}
            seriesData={tempData}
          />
        </ConBox>
      </MainWrap>
    </>
  )
}
Statistics.getLayout = page => <Layout>{page}</Layout>
