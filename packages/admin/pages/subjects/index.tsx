import MainWrap from '@/components/wrappers/MainWrap'
import { Suspense, useState } from 'react'
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
  const grade = useRecoilValue(gradeState)
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const [filterActive, setFilterActive] = useRecoilState(
    subjectFilterActiveState,
  )
  const [filterSearch, setFilterSearch] = useRecoilState(subjectFilterState)
  const [subjectFilter, setSubjectFilter] = useRecoilState(subjectSearchState)
  const [createActive, setCreateActive] = useState(false)

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          rightArea={true}
          addRender={
            mGrade < grade.general && (
              <>
                {
                  <Button
                    size="sm"
                    radius="sm"
                    variant="solid"
                    color="primary"
                    className="text-white ml-[0.5rem]"
                    onClick={() => {
                      setCreateActive(prev => !prev)
                    }}
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
        <CreateAdviceType
          isActive={createActive}
          onCreateToggle={setCreateActive}
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
              <SubjectFilter
                onFilterSearch={setFilterSearch}
                subjectFilter={subjectFilter}
                setSubjectFilter={setSubjectFilter}
              />
            ) : (
              <SubjectTable />
            )}
          </Suspense>
        </ConBox>
      </MainWrap>
    </>
  )
}
Subjects.getLayout = page => <Layout>{page}</Layout>
