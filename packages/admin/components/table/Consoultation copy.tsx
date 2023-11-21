import { gql, useQuery } from '@apollo/client'
import { Pagination, ScrollShadow } from '@nextui-org/react'
import { useState } from 'react'
import { styled } from 'styled-components'
import ConsoultItem from '@/components/table/ConsoultItem'

const SeeStudent_QUERY = gql`
  query Query($page: Int) {
    seeStudentState(page: $page) {
      id
      campus
      stName
      phoneNum1
      currentManager
      progress
      subDiv
      stVisit
      expEnrollDate
      createdAt
      favorite
      receiptDiv
    }
  }
`

const TableWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Theader = styled.div`
  width: 100%;
  min-width: fit-content;
  display: flex;
  flex-wrap: nowrap;
  row-gap: 1rem;
  color: #111;
  font-size: 0.875rem;
  font-weight: 700;
  border-bottom: 1px solid #e4e4e7;
`
const Tfavorite = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2%;
  font-size: inherit;
  color: inherit;
  min-width: 30px;
  padding: 1rem 1rem 1rem 2rem;
  min-width: 30px;
`
const ClickBox = styled.div`
  display: flex;
  width: 98%;
`
const Tnum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5%;
  font-size: inherit;
  color: inherit;
  min-width: 68px;
  padding: 1rem;
`
const TreceiptDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  font-size: inherit;
  color: inherit;
  padding: 1rem;
  min-width: 114px;
`
const TsubDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 114px;
`
const Tname = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 147px;
`
const Tphone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 150px;
`
const TcreatedAt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 120px;
`
const Tmanager = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 114px;
`
const TstVisit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 120px;
`
const TexpEnrollDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12%;
  padding: 1rem;
  font-size: inherit;
  color: inherit;
  min-width: 120px;
`
const Tprogress = styled.div`
  display: flex;
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

  const { loading, error, data } = useQuery(SeeStudent_QUERY, {
    variables: { page: currentPage },
  })

  const students = data?.seeStudentState || []

  return (
    <>
      <TableWrap>
        <ScrollShadow orientation="horizontal" className="scrollbar">
          <Theader>
            <Tfavorite>
              <i className="xi-star"></i>
            </Tfavorite>
            <ClickBox>
              <Tnum>No</Tnum>

              <TreceiptDiv>접수구분</TreceiptDiv>
              <TsubDiv>수강구분</TsubDiv>
              <Tname>이름</Tname>
              <Tphone>연락처</Tphone>
              <TcreatedAt>등록일시</TcreatedAt>
              <Tmanager>담당자</Tmanager>
              <TstVisit>상담예정일</TstVisit>
              <TexpEnrollDate>수강예정월</TexpEnrollDate>
              <Tprogress>진행상태</Tprogress>
            </ClickBox>
          </Theader>
          {students.map((item, index) => (
            <ConsoultItem key={index} tableData={item} itemIndex={index} />
          ))}
        </ScrollShadow>
      </TableWrap>

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
