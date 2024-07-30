import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import { styled } from 'styled-components'
import Layout from '@/pages/message/layout'
import { Suspense, useEffect, useState } from 'react'
import LectureList from '@/components/table/LectureList'
import LectureFilter from '@/components/filter/LectureFilter'
import MessageList from '@/components/table/MessageList'
import MessageFilter from '@/components/filter/MessageFilter'
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

export default function message() {
  const [filterActive, setFilterActive] = useState()
  const [filterSearch, setFilterSearch] = useState()
  const [studentFilter, setStudentFilter] = useState()

  const router = useRouter()
  useEffect(() => {
    router.push('/message/sms')
  }, [router])

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
        <Suspense
          fallback={
            <LodingDiv>
              <i className="xi-spinner-2" />
            </LodingDiv>
          }
        >
          <MessageFilter
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
              <MessageList />
            </Suspense>
          )}
        </ConBox>
      </MainWrap>
    </>
  )
}
message.getLayout = page => <Layout>{page}</Layout>
