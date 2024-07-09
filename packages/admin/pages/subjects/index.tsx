import MainWrap from '@/components/wrappers/MainWrap'
import { Suspense, useEffect, useState } from 'react'
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
import Layout from '@/pages/subjects/layout'
import { useRouter } from 'next/router'

const ConBox = styled.div`
  margin: 2rem 0;
  z-index: 0;
  position: relative;
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

export default function Subjects() {
  const router = useRouter()
  const grade = useRecoilValue(gradeState)
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const mPart = useMme('mPart') || []
  const [filterActive, setFilterActive] = useRecoilState(
    subjectFilterActiveState,
  )
  const [filterSearch, setFilterSearch] = useRecoilState(subjectFilterState)
  const [subjectFilter, setSubjectFilter] = useRecoilState(subjectSearchState)
  const [createActive, setCreateActive] = useState(false)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  const handleClick = () => {
    router.push({
      pathname: '/setting/types',
      query: { typeTab: 'subDiv' },
    })
  }

  return (
    mPart !== undefined &&
    mGrade !== undefined && (
      <>
        <MainWrap>
          <Breadcrumb
            onFilterToggle={setFilterActive}
            isActive={filterActive}
            isFilter={true}
            isWrite={true}
            rightArea={true}
            addRender={
              (mGrade < grade.general || mPart.includes('영업팀')) && (
                <>
                  {
                    <Button
                      size="sm"
                      radius="sm"
                      variant="solid"
                      color="primary"
                      className="text-white ml-[0.5rem]"
                      onClick={handleClick}
                    >
                      <ActiveIcon
                        variants={IconVariants}
                        initial="initial"
                        animate={createActive ? 'active' : 'initial'}
                        className="xi-check-min"
                      />
                      분야 관리
                    </Button>
                  }
                </>
              )
            }
          />
          <SubjectsFilter
            isActive={filterActive}
            onFilterSearch={setFilterSearch}
            setSubjectFilter={setSubjectFilter}
            subjectFilter={subjectFilter}
          />
          <ConBox>
            <Suspense
              fallback={
                <LodingDiv>
                  <i className="xi-spinner-2" />
                </LodingDiv>
              }
            >
              {filterSearch ? (
                <SubjectFilter subjectFilter={subjectFilter} />
              ) : (
                <SubjectTable />
              )}
            </Suspense>
          </ConBox>
        </MainWrap>
      </>
    )
  )
}
Subjects.getLayout = page => <Layout>{page}</Layout>
