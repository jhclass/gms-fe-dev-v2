import MainWrap from '@/components/wrappers/MainWrap'
import Breadcrumb from '@/components/common/Breadcrumb'
import Layout from '@/pages/students/layout'
import StudentsTable from '@/components/table/StudentsList'
import StudentsFilterTable from '@/components/table/StudentsListFilter'
import { styled } from 'styled-components'
import StudentsFilter from '@/components/filter/StudentsFilter'
import { useRecoilState } from 'recoil'
import {
  studentFilterActiveState,
  studentFilterState,
  studentSearchState,
} from '@/lib/recoilAtoms'
import { Suspense, useEffect, useState } from 'react'
import io from 'socket.io-client'

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
export default function Students() {
  const [filterActive, setFilterActive] = useRecoilState(
    studentFilterActiveState,
  )
  const [filterSearch, setFilterSearch] = useRecoilState(studentFilterState)
  const [studentFilter, setStudentFilter] = useRecoilState(studentSearchState)
  // const [checkText, setCheckText] = useState('수강생 리스트 입니다.')

  // useEffect(() => {
  //   // io("통신할 서버 포트",{옵션})
  //   const socket = io('https://2fd7-1-236-97-151.ngrok-free.app', {
  //     path: '/socket.io/',
  //     // transports: ['websocekt'],
  //   })
  //   console.log('socket' + ':' + socket)
  //   socket.on('message', data => {
  //     console.log(data)
  //     console.log(data)
  //     setCheckText(data)
  //   })
  //   return () => {
  //     socket.off('message')
  //     socket.close()
  //   }
  // }, [])

  return (
    <>
      <MainWrap>
        <Breadcrumb
          onFilterToggle={setFilterActive}
          isActive={filterActive}
          isFilter={true}
          isWrite={true}
          rightArea={true}
        />
        <StudentsFilter
          isActive={filterActive}
          onFilterSearch={setFilterSearch}
          setStudentFilter={setStudentFilter}
          studentFilter={studentFilter}
        />
        <ConBox>
          {/* <div>{checkText}</div> */}
          <Suspense
            fallback={
              <LodingDiv>
                <i className="xi-spinner-2" />
              </LodingDiv>
            }
          >
            {filterSearch ? (
              <StudentsFilterTable studentFilter={studentFilter} />
            ) : (
              <StudentsTable />
            )}
          </Suspense>
        </ConBox>
      </MainWrap>
    </>
  )
}
Students.getLayout = page => <Layout>{page}</Layout>
