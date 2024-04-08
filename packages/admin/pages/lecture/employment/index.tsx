import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import { motion } from 'framer-motion'
import Layout from '@/pages/lecture/layout'
import { Suspense, useState } from 'react'
import LectureList from '@/components/table/LectureList'
import LectureFilter from '@/components/filter/LectureFilter'
import EmploymentStateList from '@/components/table/EmploymentStateList'
import EmploymentStateFilter from '@/components/filter/EmploymentStateFilter'

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

export default function Lecture() {
  const [filterActive, setFilterActive] = useState()
  const [filterSearch, setFilterSearch] = useState()
  const [studentFilter, setStudentFilter] = useState()

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          rightArea={true}
        />
        <Suspense
          fallback={
            <LodingDiv>
              <i className="xi-spinner-2" />
            </LodingDiv>
          }
        >
          <EmploymentStateFilter
            isActive={filterActive}
            // studentFilter={studentFilter}
            // onFilterSearch={setFilterSearch}
            // setStudentFilter={setStudentFilter}
          />
        </Suspense>
        <ConBox>
          {filterSearch ? (
            <Suspense
              fallback={
                <LodingDiv>
                  <i className="xi-spinner-2" />
                </LodingDiv>
              }
            >
              {/* <ConsultationFilter studentFilter={studentFilter} /> */}
            </Suspense>
          ) : (
            <Suspense
              fallback={
                <LodingDiv>
                  <i className="xi-spinner-2" />
                </LodingDiv>
              }
            >
              <EmploymentStateList />
            </Suspense>
          )}
        </ConBox>
      </MainWrap>
    </>
  )
}
Lecture.getLayout = page => <Layout>{page}</Layout>
