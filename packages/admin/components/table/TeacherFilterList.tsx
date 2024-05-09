import { useLazyQuery, useSuspenseQuery } from '@apollo/client'
import { Button, Pagination, ScrollShadow } from '@nextui-org/react'
import { Fragment, useEffect, useState } from 'react'
import { styled } from 'styled-components'
import ConsultItem from '@/components/table/ConsultItem'
import {
  MME_FAVO_QUERY,
  SEARCH_MANAGEUSER_QUERY,
  SEE_FAVORITESTATE_QUERY,
  SEE_MANAGEUSER_QUERY,
  SEE_STUDENT_STATE_QUERY,
} from '@/graphql/queries'
import FavoItem from '@/components/table/FavoItem'
import router from 'next/router'
import { useRecoilState } from 'recoil'
import { consultPageState } from '@/lib/recoilAtoms'
import {
  ManageUser,
  SearchManageUserResult,
  StudentState,
  StudentStateResponse,
} from '@/src/generated/graphql'
import ManagerItem from './ManagerItem'
import TeacherItem from './TeacherItem'

const TableArea = styled.div`
  margin-top: 0.5rem;
`
const TTopic = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Ttotal = styled.p`
  font-weight: 300;
  margin-right: 0.5rem;

  span {
    font-weight: 400;
    color: #007de9;
  }
`
const TableWrap = styled.div`
  width: 100%;
  display: table;
  min-width: 1200px;
`
const Theader = styled.div`
  width: 100%;
  min-width: fit-content;
  display: table-row;
  flex-wrap: nowrap;
  row-gap: 1rem;
  color: #111;
  font-size: 0.875rem;
  font-weight: 700;
  border-bottom: 1px solid #e4e4e7;
  text-align: center;
`
const TopBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`
const TheaderBox = styled.div`
  display: flex;
`
const ClickBox = styled.div`
  display: flex;
  width: 100%;
`
const Tnum = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 6%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.06}px;
`
const Tname = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.12}px;
  font-weight: 600;
`
const Tpart = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 15%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.15}px;
`
const Trank = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 9%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.09}px;
`
const Tphone = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 14%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.14}px;
`
const Temail = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 20%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.2}px;
`
const TjoiningDate = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.12}px;
`
const PagerWrap = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: center;
`
const Nolist = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  color: #71717a;
`
type searchManageUserQuery = {
  searchManageUser: SearchManageUserResult
}
export default function TeacherFilterTable({ teacherFilter }) {
  const [searchManager, { refetch, loading, error, data }] = useLazyQuery(
    SEARCH_MANAGEUSER_QUERY,
    {},
  )
  // const { error, data, refetch } = useSuspenseQuery<searchManageUserQuery>(
  //   SEARCH_MANAGEUSER_QUERY,
  //   {
  //     variables: {
  //       ...teacherFilter,
  //       mGrade: 20,
  //     },
  //   },
  // )
  const [managerData, setManagerData] = useState(null)
  const [managerTotal, setManagerTotal] = useState(0)

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  useEffect(() => {
    if (teacherFilter) {
      searchManager({
        variables: {
          ...teacherFilter,
          mGrade: 20,
        },
        onCompleted: result => {
          console.log(result)
          setManagerData(result?.searchManageUser.data)
          setManagerTotal(result?.searchManageUser.totalCount)
        },
      })
    }
  }, [teacherFilter])

  const resetList = () => {
    window.location.href = '/hr/teacher'
  }

  if (error) {
    console.log(error)
  }

  return (
    managerData && (
      <>
        <TTopic>
          <TopBox>
            <Ttotal>
              총<span>{managerTotal === null ? 0 : managerTotal}</span>
              건이 검색되었습니다.
            </Ttotal>
            <Button size="sm" radius="sm" color="primary" onClick={resetList}>
              전체보기
            </Button>
          </TopBox>
        </TTopic>
        <TableArea>
          <ScrollShadow orientation="horizontal" className="scrollbar">
            <TableWrap>
              <Theader>
                <TheaderBox>
                  <ClickBox>
                    <Tnum>No</Tnum>
                    <Tname>아이디</Tname>
                    <Tname>이름</Tname>
                    <Tpart>강의 분야</Tpart>
                    <Trank>직책</Trank>
                    <Tphone>연락처</Tphone>
                    <Temail>이메일</Temail>
                    <TjoiningDate>입사일</TjoiningDate>
                  </ClickBox>
                </TheaderBox>
              </Theader>
              {managerData.length > 0 &&
                managerData?.map((item, index) => (
                  <TeacherItem
                    forName="student"
                    key={index}
                    tableData={item}
                    itemIndex={index}
                  />
                ))}
              {managerTotal === 0 && <Nolist>등록된 강사가 없습니다.</Nolist>}
            </TableWrap>
          </ScrollShadow>
        </TableArea>
      </>
    )
  )
}