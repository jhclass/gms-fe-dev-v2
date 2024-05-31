import MainWrap from '@/components/wrappers/MainWrap'
import ConsultationTable from '@/components/table/Consultation'
import ConsultationFilter from '@/components/table/ConsultationFilter'
import { Suspense, useEffect, useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import ConsultFilter from '@/components/filter/ConsultFilter'
import { styled } from 'styled-components'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  consultFilterActiveState,
  consultFilterState,
  consultSearchState,
  gradeState,
} from '@/lib/recoilAtoms'
import { useRouter } from 'next/router'
import Layout from '@/pages/consult/layout'
import { motion } from 'framer-motion'
import useMmeQuery from '@/utils/mMe'
import { Button } from '@nextui-org/react'
import CreateAdviceType from '@/components/form/CreateAdviceType'

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

export default function Consult() {
  const grade = useRecoilValue(gradeState)
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const [filterActive, setFilterActive] = useRecoilState(
    consultFilterActiveState,
  )
  const [filterSearch, setFilterSearch] = useRecoilState(consultFilterState)
  const [studentFilter, setStudentFilter] = useRecoilState(consultSearchState)
  const [createActive, setCreateActive] = useState(false)

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          isFilter={true}
          isWrite={true}
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
        <Suspense
          fallback={
            <LodingDiv>
              <i className="xi-spinner-2" />
            </LodingDiv>
          }
        >
          <ConsultFilter
            isActive={filterActive}
            studentFilter={studentFilter}
            onFilterSearch={setFilterSearch}
            setStudentFilter={setStudentFilter}
          />
        </Suspense>
        <Suspense
          fallback={
            <LodingDiv>
              <i className="xi-spinner-2" />
            </LodingDiv>
          }
        >
          <CreateAdviceType isActive={createActive} category="상담분야" />
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
              <ConsultationFilter studentFilter={studentFilter} />
            </Suspense>
          ) : (
            <Suspense
              fallback={
                <LodingDiv>
                  <i className="xi-spinner-2" />
                </LodingDiv>
              }
            >
              <ConsultationTable />
            </Suspense>
          )}
        </ConBox>
      </MainWrap>
    </>
  )
}
Consult.getLayout = page => <Layout>{page}</Layout>
