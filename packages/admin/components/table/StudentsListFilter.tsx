import { useMutation, useQuery } from '@apollo/client'
import { Pagination, ScrollShadow } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import {
  MME_FAVO_QUERY,
  SEE_FAVORITESTATE_QUERY,
  SEE_STUDENT_QUERY,
  SEE_STUDENT_STATE_QUERY,
} from '@/graphql/queries'
import FavoItem from '@/components/table/FavoItem'
import router from 'next/router'
import StudentsItem from '@/components/table/StudentsItem'
import { SEARCH_STUDENT_FILTER_MUTATION } from '@/graphql/mutations'

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
const ColorHelp = styled.div`
  display: flex;
`

const ColorCip = styled.p`
  padding-left: 0.5rem;
  display: flex;
  align-items: center;
  color: #71717a;
  font-size: 0.7rem;

  span {
    display: inline-block;
    margin-right: 0.5rem;
    width: 1rem;
    height: 2px;
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

const TheaderBox = styled.div`
  display: flex;
  padding-left: 0.5rem;
`
const Tnum = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 7%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.07}px;
`
const Tprogress = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.08}px;
`
const TsubDiv = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 8%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.08}px;
`
const Tbirthday = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
`
const Tname = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.1}px;
  font-weight: 600;
`
const Tsubject = styled.div`
  position: relative;
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 26%;
  padding: 1rem;
  font-size: inherit;
  min-width: ${1200 * 0.26}px;
  font-weight: 600;
`
const Tphone = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.11}px;
`
const TcreatedAt = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
`
const Tmanager = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: ${1200 * 0.1}px;
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

export default function StudentsTable({
  isActive,
  onFilterSearch,
  setSubjectFilter,
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit] = useState(10)
  const [searchStudentFilterMutation] = useMutation(
    SEARCH_STUDENT_FILTER_MUTATION,
  )
  const [searchResult, setSearchResult] = useState(null)

  // useEffect(() => {
  //   searchStudentFilterMutation({
  //     variables: {
  //       ...studentFilter,
  //       page: currentPage,
  //       perPage: currentLimit,
  //     },
  //     onCompleted: resData => {
  //       const { studentState, totalCount } = resData.searchStudentState || {}
  //       setSearchResult({ studentState, totalCount })
  //     },
  //   })
  // }, [studentFilter, currentPage])

  // const resetList = () => {
  //   setStudentFilter({})
  //   onFilterSearch(false)
  // }

  return (
    <>
      <TTopic>
        <Ttotal>{/* 총 <span>{totalCount}</span>건 */}</Ttotal>
        <ColorHelp>
          <ColorCip>
            <span style={{ background: '#007de9' }}></span> : 신규
          </ColorCip>
          <ColorCip>
            <span style={{ background: '#FF5900' }}></span> : 미배정
          </ColorCip>
        </ColorHelp>
      </TTopic>
      <TableArea>
        <ScrollShadow orientation="horizontal" className="scrollbar">
          <TableWrap>
            <Theader>
              <TheaderBox>
                <Tnum>No</Tnum>
                <Tprogress>진행상태</Tprogress>
                <TsubDiv>수강구분</TsubDiv>
                <Tbirthday>생년월일</Tbirthday>
                <Tname>이름</Tname>
                <Tsubject>수강과정</Tsubject>
                <Tphone>연락처</Tphone>
                <Tmanager>담당자</Tmanager>
                <TcreatedAt>등록일시</TcreatedAt>
              </TheaderBox>
            </Theader>
            {/* {students?.map((item, index) => (
              <StudentsItem
                forName="student"
                key={index}
                tableData={item}
                itemIndex={index}
                currentPage={currentPage}
                limit={currentLimit}
              />
            ))} */}
          </TableWrap>
        </ScrollShadow>
        <PagerWrap>
          <Pagination
            variant="light"
            showControls
            initialPage={1}
            total={2}
            onChange={newPage => {
              setCurrentPage(newPage)
            }}
          />
        </PagerWrap>
      </TableArea>
    </>
  )
}
