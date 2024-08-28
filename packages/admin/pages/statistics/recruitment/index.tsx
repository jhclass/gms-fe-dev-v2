import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'
import {
  recruitmentFilterActiveState,
  recruitmentFilterState,
} from '@/lib/recoilAtoms'
import Layout from '@/pages/statistics/recruitment/layout'
import RecruitmentTable from '@/components/table/RecruitmentList'
import RecruitmentFilter from '@/components/filter/RecruitmentFilter'

const ConBox = styled.div`
  margin: 2rem 0;
  z-index: 0;
  position: relative;
`

export default function Statistics() {
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
          isFilter={true}
          isWrite={false}
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
