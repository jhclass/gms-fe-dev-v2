import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import Layout from '@/pages/hr/layout'
import { Suspense, useState } from 'react'
import LectureList from '@/components/table/LectureList'
import LectureFilter from '@/components/filter/LectureFilter'
import ManagerList from '@/components/table/ManagerList'
import ManagerFilter from '@/components/filter/ManagerFilter'
import TeacherList from '@/components/table/TeacherList'
import TeacherFilter from '@/components/filter/TeacherFilter'
import TeacherFilterList from '@/components/table/TeacherFilterList'
import { useRecoilValue } from 'recoil'
import { gradeState } from '@/lib/recoilAtoms'
import useMmeQuery from '@/utils/mMe'

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

export default function Teacher() {
  const grade = useRecoilValue(gradeState)
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const mPart = useMme('mPart')
  const [filterActive, setFilterActive] = useState()
  const [filterSearch, setFilterSearch] = useState()
  const [teacherFilter, setTeacherFilter] = useState()

  return (
    mPart && (
      <>
        <MainWrap>
          <Breadcrumb
            onFilterToggle={setFilterActive}
            isActive={filterActive}
            isFilter={true}
            isWrite={
              mGrade < grade.general || mPart.includes('교무팀') ? true : false
            }
            rightArea={true}
          />
          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            <TeacherFilter
              isActive={filterActive}
              onFilterSearch={setFilterSearch}
              setTeacherFilter={setTeacherFilter}
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
                <TeacherFilterList teacherFilter={teacherFilter} />
              </Suspense>
            ) : (
              <Suspense
                fallback={
                  <LodingDiv>
                    <i className="xi-spinner-2" />
                  </LodingDiv>
                }
              >
                <TeacherList />
              </Suspense>
            )}
          </ConBox>
        </MainWrap>
      </>
    )
  )
}
Teacher.getLayout = page => <Layout>{page}</Layout>
