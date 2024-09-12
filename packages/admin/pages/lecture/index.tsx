import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import Layout from '@/pages/lecture/layout'
import { Suspense, useEffect, useState } from 'react'
import LectureList from '@/components/table/LectureList'
import LectureFilter from '@/components/filter/LectureFilter'
import LectureFilterList from '@/components/table/LectureFilterList'
import useMmeQuery from '@/utils/mMe'
import { gradeState } from '@/lib/recoilAtoms'
import { useRecoilValue } from 'recoil'
import LectureTeacherList from '@/components/table/LectureTeacherList'

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

export default function Lecture() {
  const grade = useRecoilValue(gradeState)
  const { useMme } = useMmeQuery()
  const mId = useMme('id')
  const mGrade = useMme('mGrade')
  const [filterActive, setFilterActive] = useState()
  const [filterSearch, setFilterSearch] = useState()
  const [lectureFilter, setLectureFilter] = useState(null)

  useEffect(() => {
    if (mGrade === grade.teacher) {
      const filter = {
        teacherId: parseInt(mId),
      }
      setLectureFilter(filter)
    }
  }, [mId, mGrade])

  return (
    <>
      {mGrade >= 0 && (
        <MainWrap>
          {mGrade === grade.teacher ? (
            <>
              <Breadcrumb
                onFilterToggle={null}
                isActive={false}
                isFilter={false}
                isWrite={false}
                rightArea={false}
                addTitle={'(강사전용)'}
              />
              <ConBox>
                <Suspense
                  fallback={
                    <LodingDiv>
                      <i className="xi-spinner-2" />
                    </LodingDiv>
                  }
                >
                  <LectureTeacherList lectureFilter={lectureFilter} />
                </Suspense>
              </ConBox>
            </>
          ) : (
            <>
              <Breadcrumb
                onFilterToggle={setFilterActive}
                isActive={filterActive}
                isFilter={true}
                isWrite={true}
                rightArea={true}
              />
              <Suspense
                fallback={
                  <LodingDiv>
                    <i className="xi-spinner-2" />
                  </LodingDiv>
                }
              >
                <LectureFilter
                  isActive={filterActive}
                  lectureFilter={lectureFilter}
                  onFilterSearch={setFilterSearch}
                  setLectureFilter={setLectureFilter}
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
                    <LectureFilterList lectureFilter={lectureFilter} />
                  </Suspense>
                ) : (
                  <Suspense
                    fallback={
                      <LodingDiv>
                        <i className="xi-spinner-2" />
                      </LodingDiv>
                    }
                  >
                    <LectureList />
                  </Suspense>
                )}
              </ConBox>
            </>
          )}
        </MainWrap>
      )}
    </>
  )
}
Lecture.getLayout = page => <Layout>{page}</Layout>
