import { gql, useQuery } from '@apollo/client'
import { Pagination, ScrollShadow } from '@nextui-org/react'
import { useState } from 'react'
import { styled } from 'styled-components'
import ConsoultItem from '@/components/table/ConsoultItem'

const SeeStudent_QUERY = gql`
  query Query($page: Int!, $limit: Int) {
    seeStudentState(page: $page, limit: $limit) {
      ok
      message
      studentState {
        id
        stName
        phoneNum1
        progress
        subDiv
        stVisit
        expEnrollDate
        createdAt
        favorite
        receiptDiv
        pic
      }
    }
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
`
const Tfavorite = styled.div`
  display: table-cell;
  font-size: inherit;
  color: inherit;
  min-width: 30px;
  padding: 1rem 1rem 1rem 2rem;
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
  min-width: 50px;
`
const TreceiptDiv = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 9%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 100px;
`
const TsubDiv = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 9%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 100px;
`
const Tname = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 100px;
`
const Tphone = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 120px;
`
const TcreatedAt = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 120px;
`
const Tmanager = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 100px;
`
const TstVisit = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 120px;
`
const TexpEnrollDate = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 120px;
`
const Tprogress = styled.div`
  display: table-cell;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 90px;
`

const PagerWrap = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: center;
`

export default function ConsolutationTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit, setCurrentLimit] = useState(10)
  const { loading, error, data } = useQuery(SeeStudent_QUERY, {
    variables: { page: currentPage, limit: currentLimit },
  })

  const students = data?.seeStudentState.studentState || []

  return (
    <>
      <ScrollShadow orientation="horizontal" className="scrollbar">
        <TableWrap>
          <Theader>
            <TheaderBox>
              <Tfavorite>
                <i className="xi-star"></i>
              </Tfavorite>
              <ClickBox>
                <Tnum>No</Tnum>
                <Tprogress>진행상태</Tprogress>
                <TreceiptDiv>접수구분</TreceiptDiv>
                <TsubDiv>수강구분</TsubDiv>
                <Tname>이름</Tname>
                <Tphone>연락처</Tphone>
                <TcreatedAt>등록일시</TcreatedAt>
                <Tmanager>담당자</Tmanager>
                <TstVisit>상담예정일</TstVisit>
                <TexpEnrollDate>수강예정월</TexpEnrollDate>
              </ClickBox>
            </TheaderBox>
          </Theader>
          {students.map((item, index) => (
            <ConsoultItem key={index} tableData={item} itemIndex={index} />
          ))}
        </TableWrap>
      </ScrollShadow>

      <PagerWrap>
        <Pagination
          variant="light"
          showControls
          total={10}
          initialPage={currentPage}
          onChange={newPage => {
            setCurrentPage(newPage)
          }}
        />
      </PagerWrap>
    </>
  )
}
