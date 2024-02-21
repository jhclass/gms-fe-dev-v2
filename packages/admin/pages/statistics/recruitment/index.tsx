import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { motion } from 'framer-motion'
import useMmeQuery from '@/utils/mMe'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  gradeState,
  recruitmentFilterActiveState,
  recruitmentFilterState,
} from '@/lib/recoilAtoms'
import Layout from '@/pages/statistics/layout'
import RecruitmentFilter from '@/components/filter/recruitmentFilter'
import RecruitmentTable from '@/components/table/RecruitmentList'

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
    recruitmentFilterActiveState,
  )
  const [filterSearch, setFilterSearch] = useRecoilState(recruitmentFilterState)
  const [recruitmentFilter, setRecruitmentFilter] = useRecoilState(
    recruitmentFilterState,
  )

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          rightArea={true}
        />
        <RecruitmentFilter
          isActive={filterActive}
          onFilterSearch={setFilterSearch}
          setRecruitmentFilter={setRecruitmentFilter}
        />
        <ConBox>
          {filterSearch ? (
            <></>
          ) : (
            // <SubjectFilter
            //   onFilterSearch={setFilterSearch}
            //   recruitmentFilter={recruitmentFilter}
            //   setRecruitmentFilter={setRecruitmentFilter}
            // />
            <RecruitmentTable />
          )}
        </ConBox>
      </MainWrap>
    </>
  )
}
Statistics.getLayout = page => <Layout>{page}</Layout>
