import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { motion } from 'framer-motion'
import useMmeQuery from '@/utils/mMe'
import { useRecoilValue } from 'recoil'
import { gradeState } from '@/lib/recoilAtoms'
import Layout from '@/pages/statistics/layout'
import PerformanceFilter from '@/components/filter/PerformanceFilter'
import PerformanceList from '@/components/table/PerformanceList'
import { SEE_MANAGEUSER_QUERY } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@nextui-org/react'

const ConBox = styled.div`
  margin: 2rem 0;
  z-index: 0;
  position: relative;
`
const DeleteDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`
const LodingDiv = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-width: 20rem;
  position: relative;
  background: none;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  const router = useRouter()
  const grade = useRecoilValue(gradeState)
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const { data, error, loading } = useQuery(SEE_MANAGEUSER_QUERY)
  const [filterActive, setFilterActive] = useState(true)
  const [filterSearch, setFilterSearch] = useState(false)
  const [performanceFilter, setPerformanceFilter] = useState(null)
  const [clickReset, setClickReset] = useState(false)
  const managerList = data?.seeManageUser.filter(user =>
    user.mPart.includes('영업팀'),
  )
  const [ids, setIds] = useState(null)
  const [dateRange, setDateRange] = useState(null)

  useEffect(() => {
    if (performanceFilter === null) {
      const allIds = managerList?.map(user => user.id)
      const currentDate = new Date()
      const sixMonthsAgoDate = new Date()
      sixMonthsAgoDate.setMonth(currentDate.getMonth() - 6)
      setIds(allIds)
      setDateRange([sixMonthsAgoDate, currentDate])
    } else {
      setIds(performanceFilter.processingManagerId)
      setDateRange(performanceFilter.period)
    }
  }, [router, performanceFilter, data])

  if (error) {
    console.log(error)
  }

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          rightArea={true}
          addRender={
            <DeleteDiv>
              {performanceFilter !== null && (
                <Button
                  size="sm"
                  radius="sm"
                  variant="bordered"
                  color="primary"
                  className="bg-white min-w-unit-1"
                  onClick={() => {
                    setFilterActive(true)
                    setFilterSearch(false)
                    setPerformanceFilter(null)
                    setClickReset(true)
                  }}
                  startContent={<i className="xi-redo" />}
                ></Button>
              )}
            </DeleteDiv>
          }
        />
        <Suspense
          fallback={
            <LodingDiv>
              <i className="xi-spinner-2" />
            </LodingDiv>
          }
        >
          <PerformanceFilter
            isActive={filterActive}
            onFilterSearch={setFilterSearch}
            setPerformanceFilter={setPerformanceFilter}
            performanceFilter={performanceFilter}
            clickReset={clickReset}
            setClickReset={setClickReset}
          />
        </Suspense>
        <ConBox>
          {ids && dateRange && (
            <PerformanceList ids={ids} dateRange={dateRange} />
          )}
        </ConBox>
      </MainWrap>
    </>
  )
}
Statistics.getLayout = page => <Layout>{page}</Layout>
