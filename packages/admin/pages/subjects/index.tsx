import MainWrap from '@/components/wrappers/MainWrap'
import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import SubjectTable from '@/components/table/Subject'
import { styled } from 'styled-components'
import SubjectsFilter from '@/components/filter/SubjectsFilter'
import SubjectFilter from '@/components/table/SubjectFilterTable'
import CreateAdviceType from '@/components/form/CreateAdviceType'
import { motion } from 'framer-motion'
import { Button } from '@nextui-org/react'
import useMmeQuery from '@/utils/mMe'
import { useRecoilState } from 'recoil'
import {
  subjectFilterActiveState,
  subjectFilterState,
  subjectSearchState,
} from '@/lib/recoilAtoms'

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

export default function Subjects() {
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
            mGrade < 2 && (
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
        />
        <CreateAdviceType
          isActive={createActive}
          onCreateToggle={setCreateActive}
        />
        <ConBox>
          {filterSearch ? (
            <SubjectFilter
              onFilterSearch={setFilterSearch}
              subjectFilter={subjectFilter}
              setSubjectFilter={setSubjectFilter}
            />
          ) : (
            <SubjectTable />
          )}
        </ConBox>
      </MainWrap>
    </>
  )
}
