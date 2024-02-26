import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { motion } from 'framer-motion'
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
import PerformanceList from '@/components/table/PerformanceList'
import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'
import { useMutation, useQuery } from '@apollo/client'
import PerformanceBox from '@/components/table/PerformanceBox'
import { useEffect, useState } from 'react'
import { SEARCH_PAYMENT_MUTATION } from '@/graphql/mutations'

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
  const {
    data: seeManageUserData,
    error,
    loading: seeMansgeuserLoading,
  } = useQuery(SEE_MANAGEUSER_QUERY)
  const [filterActive, setFilterActive] = useRecoilState(
    subjectFilterActiveState,
  )
  const [filterSearch, setFilterSearch] = useRecoilState(subjectFilterState)
  const [performanceFilter, setPerformanceFilter] =
    useRecoilState(subjectSearchState)
  const managerList = seeManageUserData?.seeManageUser.filter(
    user => user.mPart === '영업팀' || user.mGrade === 1,
  )
  const ids = managerList?.map(user => user.id)

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
          <PerformanceList ids={ids} />
        </ConBox>
      </MainWrap>
    </>
  )
}
Statistics.getLayout = page => <Layout>{page}</Layout>
