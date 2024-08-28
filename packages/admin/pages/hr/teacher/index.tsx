import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import Layout from '@/pages/hr/layout'
import { Suspense, useState } from 'react'
import TeacherList from '@/components/table/TeacherList'
import TeacherFilter from '@/components/filter/TeacherFilter'
import TeacherFilterList from '@/components/table/TeacherFilterList'
import { useRecoilValue } from 'recoil'
import { gradeState } from '@/lib/recoilAtoms'
import useMmeQuery from '@/utils/mMe'
import { Button } from '@nextui-org/react'
import { motion } from 'framer-motion'
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
export default function Teacher() {
  const router = useRouter()
  const grade = useRecoilValue(gradeState)
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const mPart = useMme('mPart') || []
  const [filterActive, setFilterActive] = useState()
  const [filterSearch, setFilterSearch] = useState()
  const [teacherFilter, setTeacherFilter] = useState()
  const [createActive, setCreateActive] = useState(false)

  const handleClick = () => {
    router.push({
      pathname: '/setting/types',
      query: { typeTab: 'teacherType' },
    })
  }

  return (
    mPart && (
      <>
        <MainWrap>
          <Breadcrumb
            onFilterToggle={setFilterActive}
            isActive={filterActive}
            isFilter={true}
            isWrite={
              mGrade <= grade.subMaster || mPart.includes('교무팀')
                ? true
                : false
            }
            rightArea={true}
            addRender={
              (mGrade <= grade.subMaster || mPart.includes('교무팀')) && (
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
                <TeacherFilterList
                  teacherFilter={teacherFilter}
                  mGrade={mGrade}
                  mPart={mPart}
                />
              </Suspense>
            ) : (
              <Suspense
                fallback={
                  <LodingDiv>
                    <i className="xi-spinner-2" />
                  </LodingDiv>
                }
              >
                <TeacherList mGrade={mGrade} mPart={mPart} />
              </Suspense>
            )}
          </ConBox>
        </MainWrap>
      </>
    )
  )
}
Teacher.getLayout = page => <Layout>{page}</Layout>
